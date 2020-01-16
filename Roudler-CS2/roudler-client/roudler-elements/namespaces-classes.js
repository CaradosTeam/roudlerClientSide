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

export default { HTMLSectionTag, RoudlerPlatformTag }