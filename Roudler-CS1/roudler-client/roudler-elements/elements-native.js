DragOverDt = function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

/* Element Operations Layer */
HTMLCollection.prototype.each = function(callback) {
    if(typeof callback!="function") { console.error("Argument 1 must be function"); return false; }
    for(let i=0;i<this.length;i++) {
        callback(this[i], this);
    }
}

NodeList.prototype.each = function(callback) {
    if(typeof callback!="function") { console.error("Argument 1 must be function"); return false; }
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
        if(child.hasChildNodes()) { if(typeof child.getChildsByClassName=="function") child.getChildsByClassName(childClassName, arguments[1]); /*let res = child.getChildsByTagName(childTag, arguments[1]); if(res!=null && res!=undefined) console.log(res);*/ }
        //console.log(child);
        let childInstance = child.className || "";
        if(typeof childInstance=="string" && childInstance.indexOf(childClassName)!=-1) { arguments[1].push(child); }
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
    if(typeof window.MutationObserver!="undefined" || typeof window.WebKitMutationObserver!="undefined" || typeof window.MozMutationObserver!="undefined") {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        var observer = new MutationObserver(function(mutations) {
            if(document.getElementById(target)!=null) {
            mutations.forEach(function(mutation) {
                //console.log(mutation); 
                //or mutation.addedNodes.each
                document.getElementById(target).addEventListener(event, callback);
            });
        }

        });
        let config = { attributes: false, childList: true, characterData: false, subtree: true};
        
        observer.observe(this, config);
        return observer;
    } else {
        try {
            var eventHandler = this.addEventListener("DOMSubtreeModified", function() { 
            if(document.getElementById(target)!=null) {
                    if(event!=="ready") {
                        document.getElementById(target).addEventListener(event, callback);
                    } else {
                        throw "Event is not ready";
                    }
            }
            }, capture);
            return eventHandler;
        } catch(error) {
            console.warn(error);
        }
    }
}

//Event after load for elements group
Element.prototype.addEventAfterLoadEach = function(target, event, callback, capture=false) {
    //if(typeof target=="string") { } else if(target instanceof HTMLCollection || target instanceof NodeList) {} else { return false; }
    if(document.getElementsByClassName(target)!=null) {
        document.getElementsByClassName(target).each(function(el) { el.addEventListener(event, callback); });
   }
   if(typeof window.MutationObserver!="undefined" || typeof window.WebKitMutationObserver!="undefined" || typeof window.MozMutationObserver!="undefined") {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

      var observer = new MutationObserver(function(mutations) {
           if(document.getElementsByClassName(target)!=null) {
           mutations.forEach(function(mutation) {
              //console.log(mutation); 
                    document.getElementsByClassName(target).each(function(el) {
                        console.log("works");
                        el.addEventListener(event, callback);
                    });
              
           });
           }
       });
       let config = { attributes: false, childList: true, characterData: false, subtree: true};
       
       observer.observe(this, config);
       return observer;
   } else {
       try {
           this.addEventListener("DOMSubtreeModified", function() { 
           if(document.getElementsByClassName(target)!=null) {
                document.getElementsByClassName(target).each(function(el) {
                    el.addEventListener(event, callback);
                });
            }
            }, capture);
       } catch(error) {
           console.warn(error);
       }
   }
}

//Event for element update
/*Element.prototype.addEventAfterElementLoad = function(event, callback, capture=false) {
    if(typeof window.MutationObserver!="undefined" || typeof window.WebKitMutationObserver!="undefined" || typeof window.MozMutationObserver!="undefined") {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    } else {
        this.addEventListener("DOMSubtreeModified", function() { 

        }, capture);
    }
}*/

//Remove element
Element.prototype.removeEventAfterLoad = function(obj) {
    if(obj.__proto__==MutationObserver.prototype) obj.disconnect(); else this.removeEventListener(obj);
}