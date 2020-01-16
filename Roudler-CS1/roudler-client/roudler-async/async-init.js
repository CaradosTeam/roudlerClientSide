AJAXrequest = function(method, action, async, params=undefined) {
    if(window.XMLHttpRequest) {
        var xhttp = new XMLHttpRequest();
    } else {
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xhttp.open(method, action, async);
    if(method=="POST"||method.toLowerCase()=="post") {
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    } else xhttp.send();
   
    //Properties
    this.response = "";
    
    //Methods
    this.onreadystatechange = function(callback) {
        xhttp.onreadystatechange = function() {
            if(this.readyState==4&&this.status==200) {
                callback(this.response);
            } else {
                callback(this);
            }
        }
    },
    this.onload = function(callback) {
        var request = this; 
         xhttp.onload = function() {
            if(this.readyState==4&&this.status==200) {
                this.response = xhttp.response;
                callback(this);
            } else {
                callback(this);
            }
        }
        
        return request;
    }
    
     
}

AJAX = function(method, action, async, params=undefined) {
    return new AJAXrequest(method, action, async, params);
}

Request = function(method, url, params="", type="") {
    this.error = false;

    if(window.XMLHttpRequest !== undefined) var ajax = new XMLHttpRequest(); else var ajax = new ActiveXObject("Microsoft.XMLHTTP");
    ajax.open(method, url, true);
    ajax.responseType=type;
    if(type=="blob") {
        ajax.onreadystatechange = function() {
            oldResolve();
        }
    }
    this.then = function(oldResolve) {
        if(!this.error) {
            
        }
    }
    this.catch = function() {
        if(this.error) {
           
        }    
    }
}

//Make Request
makeRequest = function(method, url, params="", type="") {
    if(typeof Promise!="undefined") {
        return new Promise(function (resolve, reject) {
            var ajax = new XMLHttpRequest();
            ajax.open(method, url, true);
            ajax.responseType=type;
            console.log(ajax);
            if(type=="blob") {
            ajax.onreadystatechange = function() {
                resolve({
                    responseURL:  ajax.responseURL,
                    responseType: ajax.responseType
                        
                });
            }
            } else {
            ajax.onload = function(){
                if((this.status>=200&&this.status<300)) { ///*this.readyState==4&&*/
                    resolve({
                        response: ajax.response,
                        responseText: ajax.responseText,
                        responseType: ajax.responseType
                    });
                } else {
                  reject({
                      status: this.status,
                      statusText: ajax.statusText
                  });
                }
            }
            }
            ajax.onerror = function() {
                reject({
                    status: this.status,
                    statusText: ajax.statusText,
                    responseError: ajax.response
                })
            }
           if(method=="POST" && params instanceof FormData) { ajax.send(params); } else if(method=="POST" && params!=="") { ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); let urlParams = ""; console.log(params); if(Object.isObject(params)) { for(let urlParamName in params) { urlParams += urlParamName+"="+params[urlParamName]+"&"; } urlParams.substr(0, urlParams.length - 1); } else if(typeof params=="string") { urlParams = params; } ajax.send(urlParams); } else ajax.send();

        });
    } else {
        return new Request();
    }
}

makeRequestWithProgress = function(onProgress, method, url, params="", type="") {
    //makeRequest(method, url, params, type);
    if(typeof Promise!="undefined") {
        return new Promise(function (resolve, reject) {
            var ajax = new XMLHttpRequest();
            ajax.open(method, url, true);
            ajax.responseType=type;
            //console.log(ajax);
            ajax.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                   var loaded = evt.loaded;
                   var total = evt.total;
                   var percentComplete =  loaded / total;
                   onProgress(percentComplete, loaded, total);
                }
            }, false);
            if(type=="blob") {
            ajax.onreadystatechange = function() {
                resolve({
                    responseURL:  ajax.responseURL,
                    responseType: ajax.responseType
                        
                });
            }
            } else {
            ajax.onload = function(){
                if((this.status>=200&&this.status<300)) { ///*this.readyState==4&&*/
                    resolve({
                        response: ajax.response,
                        responseText: ajax.responseText,
                        responseType: ajax.responseType
                    });
                } else {
                  reject({
                      status: this.status,
                      statusText: ajax.statusText
                  });
                }
            }
            }
            ajax.onerror = function() {
                reject({
                    status: this.status,
                    statusText: ajax.statusText,
                    responseError: ajax.response
                })
            }
           if(method=="POST" && params!=="") { ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); let urlParams = ""; console.log(params); if(Object.isObject(params)) { for(let urlParamName in params) { urlParams += urlParamName+"="+params[urlParamName]+"&"; } urlParams.substr(0, urlParams.length - 1); } else if(typeof params=="string") { urlParams = params; } ajax.send(urlParams); } else ajax.send();

        });
    } else {
        return new Request();
    }
   
}

getJSONData = function(url, cb) {
    if(fetch!==undefined) fetch(url).then(function(promiseInfo) { return promiseInfo.json(); }).then(function(res) { cb(res); }).catch(function(err) { cb(err); }); else makeRequest("GET", url, "", "json").then(function(res) { cb(res); }).catch(function(err) { cb(err); });
}