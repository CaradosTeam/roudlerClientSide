/* Element Properties */
Element.prototype.ready = false;
HTMLButtonElement.prototype.clicked = false;

/* Animations Layer */
Animation = function() {
    
}

function setAnimationLoop(from, how, callback, time=2000, starttime=0) { /* , starttime=0 if(from=starttime) callback(); else  */
    console.log(from);
    if(from>=how) callback(from, how); else { callback(from, how); setTimeout(function() { setAnimationLoop(from+1, how, callback, time, starttime); }, time); };
}

//build animation from frames using css [{action:"CSS Native", frameDuration:"time per s/duration js", frameRepeat:number,framename:"in addition"}]
Element.prototype.animation = function(arr, animFrameTime, blockclickduring=true) {
    
    let el = this;
    
    if(typeof el.animationmemory!="object") { el.animationmemory = {}; el.animationmemory.ready = true; }
    
    
    if(el.animationmemory.ready) {
    if(Array.isArray(arr)) {
        
    let i = 0;
     /*el.readyToAnimate = false;*/ 
    //if(blockclickduring)
    setAnimationLoop(1, arr.length, function(how, much) {
            
            el.style.transition = "all "+arr[i]['frameDuration']+"s";
             //el.style.transition = "all 4s";
            console.log(how);
            console.log(much);
            let css= [];
            let property = [];
            let properties = arr[i]['action'].split(";");
            for(let j=0;j<properties.length;j++) {
             // for(let k=0;k<properties.length;k++) {
                  property[j] = properties[j].split(":");
             // }
            }
            for(let k=0;k<property.length;k++) {
                css[k] = '"'+property[k][0]+'":"'+property[k][1]+'"';
            }
            css = css.join(",").replace(/-[^w]/g, function(v) { return v.replace("-", "").toUpperCase()});
            css = JSON.parse("{"+css+"}");
            //console.log(css);
           //  setTimeout(function() {
            for(let cssprop in css) {
                el.style[cssprop] = css[cssprop];
                //alert(cssprop);
            }
        
        i++;
        if(i==arr.length) setTimeout(function() { el.animationmemory.ready = true; }, animFrameTime);
        
    }, animFrameTime, 1);
    
    } else { console.log("Write array as argument"); return false; }
    } else alert("Element nie gotowy do animacji");
}

Element.prototype.animate = function(mode, speed=5000, makeUndisplay=true) {
    switch(speed) {
        case "fast":
            speed = 2500;
        break;
        case "normal":
            speed = 5000;
        break;
        case "slow":
            speed = 10000;
        break;
    }
    
    let el = this;
    if(typeof el.animationmemory!="object") { el.animationmemory = {r:0}; el.animationmemory.ready = true; }
    console.log(el.animationmemory.ready);
    if(el.animationmemory.ready) {
    switch(mode) {
        case "fadeOut":
        el.style.opacity = 1;
        el.style.transition = "all "+(speed/50000)+"s";
        setAnimationLoop(1, 5, function(how, much) {
            el.style.opacity -= .2; 
            if(makeUndisplay && how==much) setTimeout(function() { el.style.display="none" }, speed/50);
        }, speed/50);
        break;
        case "fadeIn":
        el.style.opacity = 0; 
        el.style.display="block";
        el.style.transition = "all "+(speed/50000)+"s";
        setAnimationLoop(1, 5, function() {
            el.style.opacity = (el.style.opacity*1)+.2; 
        }, speed/50);
        break;
         case "dropOut":
       // if(el.offsetHeight==(el.animationmemory.r*4)) {
        el.animationmemory.ready = false;
        el.style.transition = "all "+(speed/50000)+"s";
        el.style.height = el.offsetHeight+"px";
        el.style.visibility = "hidden";
        let r = parseInt(el.style.height.replace("px", ""))/4; 
        el.animationmemory.r = r;
        setAnimationLoop(1, 4, function(how, much) {
            el.style.height = (parseInt(el.style.height.replace("px", "") - r))+"px"; 
            if(how==much) setTimeout(function() { if(makeUndisplay) el.style.display="none"; el.style.visibility = ""; el.animationmemory.ready = true;  }, speed/50);
        }, speed/50);
       // }
        break;
         case "dropIn": 
        if(el.offsetHeight==0) { //(el.animationmemory.r*4)==
        if(el.style.display=="none" || el.style.display=="") el.style.display="block";
        if(el.animationmemory.r==0) el.animationmemory.r = parseInt(el.offsetHeight/4);
        el.animationmemory.ready = false;
        el.style.visibility = "hidden";
        el.style.opacity = 1;
        el.style.transition = "all "+(speed/50000)+"s";
        console.log(el.animationmemory);
        setAnimationLoop(1, 4, function(how, much) {
            el.style.height = (parseInt(el.style.height.replace("px", "")) + el.animationmemory.r)+"px";
            if(how==much) { setTimeout(function() { el.animationmemory.ready = true; }, speed/50); el.style.visibility = ""; el.style.height = ""; }
            console.log(el.style.height);
        }, speed/50);
        }
        break;
         case "dropRightOut": 
       // if(el.offsetHeight==(el.animationmemory.rW*4)) {
       if(el.style.display=="none") el.style.display="block";
        el.animationmemory.ready = false;
         el.style.transition = "all "+(speed/50000)+"s";
        el.style.width = el.offsetWidth+"px";
        let rW = parseInt(el.style.width.replace("px", ""))/4; 
        console.log(rW);
        el.animationmemory.rW = rW;
        setAnimationLoop(1, 4, function(how, much) {
            el.style.width = (parseInt(el.style.width.replace("px", "") - rW))+"px"; 
             if(how==much) setTimeout(function() { if(makeUndisplay) el.style.display="none"; el.animationmemory.ready = true; }, speed/50);
        }, speed/50);
       // }
        break;
        case "dropRightIn": 
        if(el.offsetWidth==0) { //(el.animationmemory.rW*2)
        if(el.style.display=="none") el.style.display="block";
        el.animationmemory.ready = false;
        el.style.transition = "all "+(speed/50000)+"s";
        setAnimationLoop(1, 4, function(how, much) {
            el.style.width = (parseInt(el.style.width.replace("px", "")) + el.animationmemory.rW)+"px"; 
            if(how==much) setTimeout(function() { el.animationmemory.ready = true; }, speed/50);
            console.log(el.style.width);
        }, speed/50);
        }
        break;
    }
    }
}

HTMLProgressElement.prototype.setAnimation = function(from, to, sec=2000, cb=false) {
    this.value = from;
    this.max = to;
    let progress = this;
    setAnimationLoop(from, to, function(how, much) {
        progress.value++;
        if(how==much) { if(cb) cb(); return "max"; }
    }, sec);
}

Element.prototype.setProgressAnimation = function(from, to, sec=2000, cb=false) {
    this.style.width = from;
    this.style.maxWidth = to;
    let progress = this;
    setAnimationLoop(from, to, function(how, much) {
        progress.width++;
        if(how==much) { if(cb) cb(); return "max"; }
    }, sec);
}

Element.prototype.setProgressAnimationNative = function(from, to, sec=2000, cb=false) {
    if(this.tagName.toLowerCase()==="progress" && typeof HTMLProgressElement!="undefined") this.setAnimation(from, to, sec, cb); else this.setProgressAnimation(from, to, sec, cb);
}

function generateProgressBar(from, to, id) {
    if(typeof HTMLProgressElement!="undefined") {
        var progressbar = document.createElement("progress"); //'<progress id="'+idNode+'" value="'+from+'" max="'+to+'" >';
        progressbar.value = from;
        progressbar.max = to;
    } else {
        var progressbar =  document.createElement("div"); //'<div id="'+idNode+'" class="progress">';
        progressbar.class = "progress";
        progressbar.style.width = from;
        progressbar.style.maxWidth = to;
    }
    if(typeof id!="undefined") progressbar.id = id;
    return progressbar;
}

/* Drag'n'drop events */
function cancelDefaultBehavior(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

/* Performance */
console.__proto__.functionPerformance = function(fn) {
    var tfirst, tend; 
    tfirst = performance.now()
    fn();
    tend = performance.now();
    console.log("Function execution time: "+(tend - tfirst));
}