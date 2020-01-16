///////////////////////////////////////////////////////////////
////// Roudler Client Side (Non-Compiled) version 0.1  ///////
/////////////////////////////////////////////////////////////
Object.isObject = function(object) { return typeof object==="object" }
////////////// Configure //////////////////
var RoudlerConfig = {
    noscriptDesctruction:false,
    debuger:true,
    debugerPriority:0, //0 - normal console logs and others with data processing, 1 - console logs and other,  2- all without console info, 3 - only warnings and errors, 4 - only errors
    globalPath:"",
    globalPackadePath:"roudler-client/",
}
////////////// Init Roudler ///////////////
Roudler = (function() {
    //Object Declaration
    var _self = Object.create({}), mainscript = document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1];
    //Technical properties
    Object.defineProperty(_self, "version",{
        value:0.01,
        writable:false,
        enumerable:false,
        configurable:false
    });
    if(RoudlerConfig.debuger) console.log("%cRoudler Client-Side Debuger%c\nVersion: "+_self.version, "font-size:28px;font-weight:bolder;color:#333;text-align:center;");
    var supportedProtocol = false, protocolMode = "http", locationPrefix = location.protocol+"//"+location.hostname+location.port;
    if(location.protocol.indexOf("http")!=-1) supportedProtocol = true; else if(location.protocol.indexOf("https")!=-1) {
        supportedProtocol = true;
        protocolMode = "https";
    } else if(location.protocol.indexOf("file")!=-1) {
        supportedProtocol = true;
        protocolMode = "file";
        if(RoudlerConfig.globalPath=="") {
function getAbsolutePath(){var scrsrc = mainscript.getAttribute("src");if(scrsrc.indexOf(".")==0) {var tree = scrsrc.split("/"), j = 0;for(var i=0;i<tree.length;i++) {if(i==0 || tree[i].indexOf("..")) j--; else break;}return (location.href).split("/").splice(0, j*-1);} else return (location.href).substring(0, location.href.lastIndexOf("/")+1);}
RoudlerConfig.globalPath = getAbsolutePath();
        } 
        locationPrefix = RoudlerConfig.globalPath; //location.protocol+"///"+
        console.warn("Roudler scripts run in file protocol mode, part of features may won't work. To use full potential run insead http/https. For more options type Roudler.location, Roudler.srcipts or visit ");
    }
    if(!supportedProtocol) { console.error("Unsuported protcol for Roudler Client-Side, for more details visit "); return {}; }
    
    var roudlerModule = function(name="", srcn="", screl=null, loadedIn=0.0, des="") {
        this.name = name;
        this.src = srcn;
        this.element = screl;
        this.descriptor = des;

        //Datetime
        this.loadingTime = parseFloat(loadedIn);
        this.finishDate = new Date();
    }
    var roudlerPollyfill = function(srcn = "", supportedVersions={es:"*", js:"*"}, des="") {
        this.rc = srcn;
        this.description = des;
    }
    var roudlerConsoleEntry = function(contents, type="normal") { //
        this.contents = contents;
        if(type=="normal" || type=="info" || type=="warn" || type=="error") this.type =type;
        this.reportDate = new Date();
        this.scriptInfo = {script:_self.currentExecute()};
        if(type=="error" || type=="warn") this.solved = false;
        //if(typeof console.trace!="undefined") this.scriptInfo["trace"] = console.trace();
    }
    //Console Advanced Reporting
    var consoleLogsEntries = [], consoleLogContent = "";
    _self.console = {
        get:function(filter="all") { /*  logs:consoleLogsEntries,lastLog:consoleLogContent; */
            if(filter=="last") return consoleLogContent;
            var getter = [];
            if(typeof filter=="string") {
                if(filter=="all") {
                    return consoleLogsEntries;
                } else {
                    for(var i = 0;i<consoleLogsEntries.length;i++) {
                        if(consoleLogsEntries[i].type==filter) getter.push(consoleLogsEntries[i]);
                    }
                }
            } else if(Array.isArray(filter)) {
                for(var i = 0;i<_consoleLogsEntries.length;i++) {
                    if(filter.includes(consoleLogsEntries[i].type)) getter.push(consoleLogsEntries[i]);
                }
            } return getter;
        },
        clear:function(filter="all",withlast=true) {
            if(filter=="all") { consoleLogsEntries = []; return undefined; }
            var delind = [];
            for(var i=0;i<consoleLogsEntries.length;i++) {
                if(typeof filter=="string") {
                    if(consoleLogsEntries[i].type!=filter) delind.push(consoleLogsEntries[i]);   
                } else if(Array.isArray(filter)) {
                    if(!filter.includes(consoleLogsEntries[i].type)) delind.push(consoleLogsEntries[i]);
                }
            }
            consoleLogsEntries = delind;
            if(withlast && consoleLogContent!="") consoleLogContent = "";
        },
        print:function(filter="all") {
            if(filter=="last") { console.logr(consoleLogContent); return undefined; }
            for(var i = 0;i<consoleLogsEntries.length;i++) {
                if(typeof filter=="string") {
                if(filter=="all") {
                    switch(filter) {
                        case "error": console.errorr.apply(console, consoleLogsEntries[i].contents);break;
                        case "info": console.infor.apply(console, consoleLogsEntries[i].contents);break;
                        case "warn": console.warnr.apply(console, consoleLogsEntries[i].contents);break;
                        case "normal": default: console.logr.apply(console, consoleLogsEntries[i].contents);
                    }
                } else {
                    if(consoleLogsEntries[i].type==filter) {
                            switch(filter) {
                                case "error": console.errorr.apply(console,consoleLogsEntries[i].contents);break;
                                case "info": console.infor.apply(console,consoleLogsEntries[i].contents);break;
                                case "warn": console.warnr.apply(console,consoleLogsEntries[i].contents);break;
                                case "normal": default: console.logr.apply(console,consoleLogsEntries[i].contents);
                            }
                    }
                }
            } else if(Array.isArray(filter)) {
                    if(filter.includes(_self.console.logs[i].type)) {
                        switch(filter) {
                            case "error":
                                console.errorr(consoleLogsEntries[i].contents);
                            break;
                            case "info":
                                console.infor(consoleLogsEntries[i].contents);
                            break;
                            case "warn":
                                console.warnr(consoleLogsEntries[i].contents);
                            break;
                            case "normal":
                            default:
                                console.logr(consoleLogsEntries[i].contents);
                        }
                    }
            }
            }
        }
    }
    console.infor = console.info.bind(console); console.logr = console.log.bind(console); console.warnr = console.warn.bind(console); console.errorr = console.error.bind(console);
    window.console.info = function() { var parsedArgs = Array.prototype.slice.call(arguments); consoleLogContent = parsedArgs[parsedArgs.length-1]; consoleLogsEntries.push(new roudlerConsoleEntry(parsedArgs, "info")); if(RoudlerConfig.debuger && RoudlerConfig.debugerPriority<=1) console.infor.apply(console, arguments); }
    window.console.log = function() { var parsedArgs = Array.prototype.slice.call(arguments); consoleLogContent = parsedArgs[parsedArgs.length-1]; consoleLogsEntries.push(new roudlerConsoleEntry(parsedArgs)); if(RoudlerConfig.debuger && RoudlerConfig.debugerPriority<=2) console.logr.apply(console, arguments); }
    window.console.warn = function() { var parsedArgs = Array.prototype.slice.call(arguments); consoleLogContent = parsedArgs[parsedArgs.length-1]; consoleLogsEntries.push(new roudlerConsoleEntry(parsedArgs, "warn")); if(RoudlerConfig.debuger && RoudlerConfig.debugerPriority<=3) console.warnr.apply(console, arguments); }
    window.console.error = function() { var parsedArgs = Array.prototype.slice.call(arguments); consoleLogContent = parsedArgs[parsedArgs.length-1]; consoleLogsEntries.push(new roudlerConsoleEntry(parsedArgs, "error")); if(RoudlerConfig.debuger) console.errorr.apply(console, arguments); }
    //Global Private
    var roudlerModules = [], roudlerPollyfills = [], roudlerInjectedScripts = [];
    _self.location = Object.create({}, {
        mode:{
            writable: false,
            configurable: false,
            value:protocolMode
        },
        globalpath:{
            writable: true,
            configurable: true,
            value:locationPrefix
        }
    });
    var globalModules = ["roudler-client/roudler-elements/elements-native.js", "roudler-client/roudler-data/data-native.js", RoudlerConfig.globalPackadePath+"roudler-async/async-init.js", RoudlerConfig.globalPackadePath+"roudler-specification/specification-init.js"];
    var standardModules = {es6:[{type:"module",path:"roudler-client/roudler-elements/elements-init.js",file:RoudlerConfig.globalPackadePath+"roudler-elements/elements-init-old.js"},{type:"text/javascript",path:"roudler-client/roudler-animations/animations-init-old.js"}],es5:["roudler-client/roudler-elements/elements-init-old.js", "roudler-client/roudler-animations/animations-init-old.js"]};
    function checkES6() {try{if(typeof new Function("()=>{}")!="undefined") return true; else return false; } catch(e) { return false; }}
    //Attributes
    //Methods
    _self.currentExecute = function() {
    if(typeof document.currentScript=="undefined") {var scriptColl=document.getElementsByTagName("script");return scriptColl[scriptColl.length-1]} else return document.currentScript;
    }
    Object.defineProperty(_self, "mainScript",{
        value:mainscript, //_self.currentExecute()
        writable:false,
        enumerable:false,
        configurable:true
    });
    _self.pollyfills = function() {
        return [].concat(roudlerPollyfills);
    }
    _self.injectScript = function(srcn, type="text/javascript", al=undefined) {
        var startTime = performance.now(), scriptLoad = document.createElement("script");
        scriptLoad.type = type; 
        if(srcn.indexOf(".")==0) scriptLoad.src = srcn; else scriptLoad.src = _self.location.globalpath+"/"+srcn;
        //_self.mainScript.parentChild.appendChild();
        if(scriptLoad.readyState) {  // only required for IE <9
            scriptLoad.onreadystatechange = function() {
              if (scriptLoad.readyState==="loaded" || scriptLoad.readyState==="complete") {
                scriptLoad.onreadystatechange = null;
                var endTime = (performance.now() - startTime);
                if(typeof al=="function") al(sevt);
                console.log("%cScript from source "+srcn+" is loaded successfully", "color:green;");
              }
            };
          } else {  //Others
            scriptLoad.onload = function(sevt) {
                var endTime = (performance.now() - startTime);
                if(typeof al=="function") al(sevt, endTime);
                if(RoudlerConfig.debuger) console.log("%cScript from source "+srcn+" is loaded successfully in total time "+endTime+"ms", "color:green;");
            };
            scriptLoad.onerror = function(sevt) {
                if(RoudlerConfig.debuger) console.error("Cannot load script from source "+srcn);
            }
        }
        document.head.appendChild(scriptLoad);
    }
    //Importing modules
    _self.from = function(globalspace) {
        if(globalspace.indexOf("@roudler/")==0) {
            
        }
        return {
            import:function(modules) {
                if(Array.isArray(modules)) {
                    for(var module in modules) {

                    }
                } else if(typeof modules=="string") {
                    
                } else {}
            }
        }
    }
    _self.loadPollyfill = function(src) {

    }
    //PostProcess Actions
    if(RoudlerConfig.noscriptDesctruction) {var noscripts = Array.prototype.slice.call(document.getElementsByTagName("noscript")); for(var i=0;i<noscripts.length;i++) {noscripts[i].remove();} }
    if(mainscript.textContent.length>0) { var innerConfig = mainscript.textContent.split(";"); console.log(innerConfig);  mainscript.textContent = ""; }
    for(var modulename in globalModules) {_self.injectScript(globalModules[modulename], "text/javascript");}
    if(checkES6()) {
        for(let modulename in standardModules["es6"]) {
            if(typeof standardModules["es6"][modulename]=="object") {
                if((standardModules["es6"][modulename].type=="module" && _self.location.mode!="file") || standardModules["es6"][modulename].type!="module") _self.injectScript(standardModules["es6"][modulename].path, standardModules["es6"][modulename].type); else { if(typeof standardModules["es6"][modulename].file!="undefined") _self.injectScript(standardModules["es6"][modulename].file, "text/javascript"); }
            } else if(typeof standardModules["es6"][modulename]=="string") {
                if(_self.location.mode!="file") _self.injectScript(standardModules["es6"][modulename], "module");
            }
        }
    } else {
        for(var modulename in standardModules["es5"]) {
            _self.injectScript(standardModules["es5"][modulename], "text/javascript");
        }
    }

    return _self;
}());
String.prototype.format = function() {var matchSet = this.match(/\$\{(([SNFB]|)\d+)\}/g),matchProc,newStr=this.toString();
    if(matchSet!=null && Array.isArray(matchSet)) {
        var inputArr = Array.prototype.slice.call(arguments);
        for(var i=0;i<matchSet.length;i++) {
            matchProc = matchSet[i].replace("${", "").replace("}", "");
            if(isNaN(parseFloat(matchProc[0]))) {
                var ind = matchProc[0];
                matchProc = parseInt(matchProc.replace(ind, ""));
                switch(ind) {
                    case "S": if(typeof inputArr[matchProc]!="string") console.warn("Type of given param in index "+matchProc+" is not string"); break;
                    case "N": if(typeof inputArr[matchProc]!="number") console.warn("Type of given param in index "+matchProc+" is not number"); break;
                    case "F": if(typeof inputArr[matchProc]!="number") console.warn("Type of given param in index "+matchProc+" is not float"); break;
                }
            }
            newStr = newStr.replace(matchSet[i], inputArr[matchProc]);
        }
    }
    return newStr;
}