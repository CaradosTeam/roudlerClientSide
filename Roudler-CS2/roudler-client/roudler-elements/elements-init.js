///////////////////////////////////////////////////////////////
////// Roudler-Elements Module for Roudler Version 0.1 ///////
/////////////////////////////////////////////////////////////

//import * as elementsDefinitions from './namespaces.js'
import elementsDefinitions from './namespaces.js';

////////// Emiter ////////////
export var RoudlerElements = (function() {
    var _elements = Object.create({});
    let globalStylesElements = document.createElement("link");
    globalStylesElements.rel = "stylesheet";
    globalStylesElements.type = "text/css";
    globalStylesElements.href = Roudler.location.globalpath+"/"+RoudlerConfig.globalPackadePath+"roudler-elements/global-element-styles.css";
    document.head.appendChild(globalStylesElements);

    for(let def in elementsDefinitions) {
        let elType = (def).toLowerCase();
        elType = elType.indexOf("html")!=-1  ? "html-"+elType.replace("html", "") : "roudler-"+elType.replace("roudler", "");
        //console.log(def, elementsDefinitions[def], elType);
        customElements.define(elType, elementsDefinitions[def]);
    }

    return _elements;
}());

export default { RoudlerElements }