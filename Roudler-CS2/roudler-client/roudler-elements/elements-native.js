/* Element Properties */
Element.prototype.ready = false;
HTMLButtonElement.prototype.clicked = false;
HTMLDivElement.prototype.moveable = false;

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

//Draggable
function setMoveable(element,parent=null,movContext=null,scrollableTop=true,scrollableBottom=true) {
    if(element==null) { console.error("element is null"); return false; }
    if(element.tagName!="DIV") { console.error("element is not container"); return false; }
    if(element.moveable) { console.error("element is now moveable"); return false; }
    var posSX = 0, posSY = 0, posEX = 0, posEY = 0;
    if(parent==null) parent = document.documentElement;
    if(movContext==null) movContext = element;
    //console.log(Math.max(document.documentElement.offsetTop, document.body.offsetTop, document.body.clientHeight));
    //if(element.style.position!="absolute" || element.style.position!="fixed") element.style.position = "absolute";
        element.onmousedown = function(evt) {
            evt = evt || window.event;
            evt.preventDefault();
            posSX = evt.clientX;
            posSY = evt.clientY;
            document.onmouseup = function(ev) {
                ev = ev || window.event;
                document.onmouseup = null;
                document.onmousemove = null;
                //document.exitPointerLock();
            }
            document.onmousemove = function(ev) {
                ev = ev || window.event;
                ev.preventDefault();
                var posFX = 0, posFY = 0;
                posEX = posSX - ev.clientX;posEY = posSY - ev.clientY;posSX = ev.clientX;posSY = ev.clientY;
                posFX = movContext.offsetLeft - posEX;
                posFY = movContext.offsetTop - posEY;
                console.log(element.clientHeight);
                if(Math.max(parent.offsetLeft, parent.clientWidth, parent.scrollWidth)>=posFX+movContext.clientWidth && Math.max(parent.offsetTop, parent.clientHeight, parent.scrollHeight)>=posFY+movContext.clientHeight && posFX>=0 && posFY>=0) { if(movContext.style.position!="absolute"||movContext.style.position!="fixed") movContext.style.position = "absolute"; movContext.style.left = posFX+"px"; movContext.style.top = posFY+"px"; }
                if(window.scrollY>posFY && posFY>0) { console.log(window.scrollY-Math.abs(posFY - window.scrollY)); window.scrollTo(window.scrollX, window.scrollY-Math.abs(posFY - window.scrollY)); }
                if(window.scrollY+Math.max(parent.offsetTop, parent.clientHeight)<posFY+movContext.clientHeight && posFY+movContext.clientHeight<parent.scrollHeight) { window.scrollTo(window.scrollX, window.scrollY+Math.abs((posFY+movContext.clientHeight) - (parent.clientHeight + window.scrollY))); console.log(window.scrollY+parent.clientHeight, posFY+movContext.clientHeight, Math.abs((posFY+movContext.clientHeight) - (parent.clientHeight + window.scrollY))); }
                //element.requestPointerLock();
            }
        }
        element.moveable = true;
    return true;
}

function unsetMoveable(element) {
    if(element!=null && element.tagName=="DIV") {
        if(element.onmousedown==null || typeof element.moveable!="boolean" || !element.moveable) return false;
        element.moveable = false;
        element.onmousedown = null;
    }
}
//RoudlerConfig.globalPackadePath+
function createSampleMoveable() {
    let serio = document.createElement("div");
    serio.id = "testSub";
    serio.style.width = "200px";
    serio.style.height = "200px";
    serio.style.background = "#fff";
    serio.style.position = "absolute";
    serio.style.top = "200px";
    serio.style.left = "200px";
    document.body.appendChild(serio);
    setMoveable(serio);
}

function createSampleModal() {
    let modalEl = document.createElement("html-modal");
    document.body.appendChild(modalEl);
    console.log(modalEl);
}