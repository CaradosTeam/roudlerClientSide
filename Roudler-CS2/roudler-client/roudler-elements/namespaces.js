/////////////// HTMLSectionTag - Semantic ////////////////
export class HTMLSectionTag extends HTMLElement {
    //static tagName = "a-tag";

    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        //shadowRoot.host = document.createElement("a");
        //SubComponents
        let link = document.createElement("a"), innerText = document.createTextNode("");
        link.rel = "tag";
        shadowRoot.appendChild(link);
        //defaultStyle = document.createElement("style");
        link.appendChild(innerText);
        this.subComponents = {link:link, innerText:innerText};
    }

    connectedCallback() {
        let shadowRoot = this.attachShadow({mode: 'open'});

        
    }

    disconnectedCallback() {

    }

    //Configure Element
    options(obj) {
        return this;
    }

    setContent(text) {

    }

    //Convert to final
    combine() {
        return this.subComponents.link;
    }
}

////////////// Custom - HTMLSectionTag //////////////////
export class RoudlerPlatformTag extends /*HTMLSectionTag*/ HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        //shadowRoot.host = document.createElement("a");
        //SubComponents
        let link = document.createElement("a"), innerContent = document.createElement("span"), innerText = document.createTextNode("Defult Platorm");
        let icon = document.createElement("img"), closeBtn = document.createElement("span");
        link.rel = "tag";
        link.className = "platformTag";
        innerContent.appendChild(innerText);
        link.appendChild(innerContent);
        closeBtn.innerHTML = "&times";
        closeBtn.setAttribute("aria-label", "Close");
        closeBtn.className = "deleteOSPlatform";
        closeBtn.onclick = ev=>{
            link.remove();
        }
        link.appendChild(closeBtn);
        shadowRoot.appendChild(link);
        //defaultStyle = document.createElement("style");
        this.subComponents = {link:link, innerContent:innerContent,innerText:innerText, closeBtn:closeBtn, icon:icon};
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    //Configure Element
    options(obj) {
        if(typeof obj.form!="undefined") this.subComponents.link.setAttribute("form", obj.form);
        if(typeof obj.name!="undefined") this.subComponents.link.setAttribute("name", obj.name);
        if(typeof obj.content!="undefined") this.subComponents.innerText.nodeValue = obj.content;
        if(typeof obj.icon=="object") {
            if(this.subComponents.icon.childNodes[0] instanceof HTMLImageElement) this.subComponents.icon.childNodes[0].remove();
            this.subComponents.icon.src = obj.icon.src || "";
            this.subComponents.icon.width = obj.icon.width || "32px";
            this.subComponents.icon.height = obj.icon.height || "32px";
            this.subComponents.link.insertBefore(this.subComponents.icon, this.subComponents.link.firstChild);
        }
        return this;
    }

    setContent(text) {
        this.subComponents.innerText.nodeValue = text;
    }

    //Convert to final
    combine() {
        return this.subComponents.link;
    }
}

/*export class RoudlerPlatformTag extends /.*HTMLSectionTag*./ HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});

    }

}*/

//Moveable Element
export class HTMLMoveableElement extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        let movContainer = document.createElement("div");

        //Drag Events
        setMoveable(movContainer);
        shadowRoot.appendChild(movContainer);
    }


}

//Modals
const modalDefaultStyles = `
div.modalContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    top:0; left:0;

    background: rgba(0,0,0,0.6);
}

div.modal {
    display: block;
    max-width: 500px;
    min-width: 200px;
    /*min-height: 100px;*/
    max-height: 800px;
    background: #BBB;
    box-shadow: 0 0 8px 2px #000;
    font-size: 0;
}

div.modalHeader {
    cursor: grab;
    padding: 10px;
    width: calc(100% - 20px);
    display: inline-block;
    background: #777;
    position: relative;
    font-size: 16px;
    line-height: 20px;
}

div.modalHeader[in-move] {
    cursor: move;
}

div.modalHeader #modalCloseBtn {
    font-size: 21px;
    font-weight: bolder;
    float: right;
}

div.modalHeader #modalCloseBtn:hover {
    color: #b57f7f;
    font-weight: normal;
    cursor: pointer;
}

div.modalBody {
    display: inline-block;
    width: calc(100% - 40px);
    padding: 20px;
    position: relative;
    margin: 0;
    font-size: 1.2em;
}

div.modalFooter {
    display: inline-block;
    width: calc(100% - 40px);
    padding: 20px;
    position: relative;
    font-size: 13px;

    background: #999;
}
`;

export class HTMLModal extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});

        let ds = document.createElement("style");
        ds.type = "text/css";
        ds.textContent = modalDefaultStyles;

        let modalContainer = document.createElement("div"), modal = document.createElement("div"), modalHeader = document.createElement("div"), modalBody = document.createElement("div"), modalFooter = document.createElement("div");
        let closeBtn = document.createElement("span"), headerContent = document.createElement("span");
        modalContainer.appendChild(ds);
        modalContainer.className = "modalContainer";
        closeBtn.id = "modalCloseBtn";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = ev=>modalContainer.remove();
        headerContent.appendChild(document.createTextNode("Untitled"));
        modal.className = "modal";
        modalHeader.className = "modalHeader";
        modalBody.className = "modalBody";
        modalFooter.className = "modalFooter";
        modalHeader.appendChild(headerContent);
        modalHeader.appendChild(closeBtn);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modal.appendChild(modalFooter);
        modalContainer.appendChild(modal);
        shadowRoot.appendChild(modalContainer);
        this.subComponents = {title:headerContent.childNodes[0],body:modalBody};
        console.log(shadowRoot);
        modalHeader.ondblclick = ev=>{if(modal.style.position!="relative"||modal.style.position!="")modal.removeAttribute("style");}//modal.style.position = "relative";
        setMoveable(modalHeader, modalContainer, modal);
    }

    setLayout() {

    }
}

export default { HTMLSectionTag, RoudlerPlatformTag, HTMLMoveableElement, HTMLModal }