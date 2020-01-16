/* Element Operations Layer */
HTMLCollection.prototype.each = function(callback) {
    for(let i=0;i<this.length;i++) {
        callback(this[i], this);
    }
}

NodeList.prototype.each = function(callback) {
    for(let i=0;i<this.length;i++) {
        callback(this[i], this);
    }
}

//Nodes
document.__proto__.createNodeList = function(nodeArray) {
    let nodelist = document.createDocumentFragment().childNodes; 
    let nd = {
        length: {value:nodeArray.length},
        item: {
            value: function(i) {
                return this[+i || null];
            },
            enumerable: true
        }
    }

    for(let i =0;i<nodeArray.length;i++) nd[i] = {value:nodeArray[i], enumerable:true};

    Object.freeze(nd);
    return Object.create(nodelist, nd);
}

document.__proto__.createHTMLCollection = function(collectionArray) {
    let nd = {
        length: {value:collectionArray.length}
    }

    for(let i =0;i<collectionArray.length;i++) nd[i] = {value:collectionArray[i], enumerable:true};

    Object.freeze(nd);
    return Object.create(HTMLCollection.prototype, nd);
}

//Find Child
HTMLElement.prototype.getChildById = function(childId) {
    for(let child of this.childNodes) {
        if(child.hasChildNodes()) { let res = child.getChildById(childId); if(res!=null && res!=undefined) return res; }
        if(child.id==childId) { return child; }
    }
    return null;
}

HTMLElement.prototype.getChildByTagName = function(childTag) {
    for(let child of this.childNodes) {
        if(child.hasChildNodes()) { let res = child.getChildByTagName(childTag); if(res!=null && res!=undefined) return res; }
        if(child.tagName==childTag.toUpperCase()) { return child; }
    }
    return null;
}

HTMLElement.prototype.getChildsByTagName = function(childTag) {
    if(!Array.isArray(arguments[1])) { arguments[1] = []; }
    for(let child of this.childNodes) {
        if(child.hasChildNodes()) { child.getChildsByTagName(childTag, arguments[1]); /*let res = child.getChildsByTagName(childTag, arguments[1]); if(res!=null && res!=undefined) console.log(res);*/ }
        //onsole.log(child);
        if(child.tagName==childTag.toUpperCase()) { arguments[1].push(child); }
    }
    return document.createHTMLCollection(arguments[1]); //document.createNodeList(arguments[1]);
}

HTMLElement.prototype.getChildsByClassName = function(childClassName) {
     if(!Array.isArray(arguments[1])) { arguments[1] = []; }
    for(let child of this.childNodes) {
        if(child.hasChildNodes()) { child.getChildsByClassName(childClassName, arguments[1]); /*let res = child.getChildsByTagName(childTag, arguments[1]); if(res!=null && res!=undefined) console.log(res);*/ }
        //console.log(child);
        let childInstance = child.className || "";
        if(childInstance.indexOf(childClassName)!=-1) { arguments[1].push(child); }
    }
    return document.createHTMLCollection(arguments[1]);
}

//Get Class position of element
HTMLElement.prototype.getClassPosition = function(class_num, parent=null) {
    class_num = class_num || 0;
    let classNodes = null;
    if(parent===null) classNodes = document.getElementsByClassName(this.classList[class_num]); else classNodes = parent.getChildsByClassName(this.classList[class_num]);
    for(let i = 0;i<classNodes.length;i++) {
        if(classNodes[i]==this) return i;
    }
    return undefined;
}

//Prepend HTML string
Element.prototype.prependHTML = function(html) {
     this.insertAdjacentHTML('beforeend', html);   
}

//Append HTML string
Element.prototype.appendHTML = function(html) {
    this.insertAdjacentHTML('afterend', html);
}

//Add event after ajax call or change html/text contents
Element.prototype.addEventAfterLoad = function(target, event, callback, capture=false) {
    if(document.getElementById(target)!=null) {
         document.getElementById(target).addEventListener(event, callback);
    }
    if(typeof MutationObserver!="undefined") {
         var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

       var observer = new MutationObserver(function(mutation) {
            mutations.forEach(function(mutation) {
               console.log(mutation); 
            });
        });
        let config = { attributes: false, childList: true, characterData: false}
        
        return observer.observe(this, config);
    } else {
        this.addEventListener("DOMSubtreeModified", function() { 
           if(document.getElementById(target)!=null) {
               if(event!=="ready") {
               document.getElementById(target).addEventListener(event, callback);
                } else {
                    
                }
           }
        }, capture);
    }
}

