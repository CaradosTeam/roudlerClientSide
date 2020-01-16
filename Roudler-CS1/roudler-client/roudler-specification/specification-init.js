/* Specyfication library by grano22 */

Specification = new function() {
	this.checkBrowser = function() {
		var bav, bua, ban, bfv, bmv;
		bav = navigator.appVersion;
		bua = navigator.userAgent;
		ban = navigator.appName;
		bfv = navigator.appVersion;
		bmv = parseInt(navigator.appVersion, 10);

		var bvc, bvo;

		if((bvc = bav.toLowerCase().indexOf("opera"))!=-1) {
			ban = "Opera";
			bfv = bav.substring(bvc+6);
			if((bvc=bav.indexOf("Version"))!=-1) bfv = bav.substring(bvc+8);
		} else if((bvc = bav.toLowerCase().indexOf("edge"))!=-1) {
			ban = "Microsoft Edge";
			bvf = bav.substring(bvc+7);
		} else if((bvc = bav.toLowerCase().indexOf("msie"))!=-1) {
			ban = "Microsoft Internet Explorer";
			bvf = bav.substring(bvc+5);
		} else if((bvc = bav.toLowerCase().indexOf("chrome"))!=-1) {
			ban = "Chrome";
			bvf = bav.substring(bvc+7);
		} else if((bvc = bav.toLowerCase().indexOf("safari"))!=-1) {
			ban = "Safari";
			bvf = bav.substring(bvc+8);
			if((bvc=bav.indexOf("Version"))!=-1) bfv = bav.substring(bvc+8);
		} else if((bvc = bav.toLowerCase().indexOf("firefox"))) {
			ban = "Firefox";
			bvf = bav.substring(bvc+8);
		} else if ( (bvc = bav.lastIndexOf(' ')+1) < (bvo = bav.lastIndexOf('/')) ) {
		    ban = bav.substring(bvc,bvo);
		    bvf = bav.substring(bvo+1);
		    if (ban.toLowerCase()==ban.toUpperCase()) {
		       ban = navigator.appName;
		    }
		}

		if ((ix= bvf.indexOf(";"))!=-1) bvf = bvf.substring(0,ix);
		if ((ix= bvf.indexOf(" "))!=-1) bvf = bvf.substring(0,ix);

		bmv = parseInt(''+bfv,10);
		if (isNaN(bmv)) {
		    bfv  = ''+parseFloat(navigator.appVersion); 
		    bmv = parseInt(navigator.appVersion,10);
		}

		return {name:ban,fullVersion:bvf,majorVersion:bmv};


	}

	this.OSinfo = function() {
		var OSname = "Unknown Ooperation System", OSarchitecture = "Unknown Architecture", OSversion = "Unknown OS version", OSkernel = "Unknown OS kernel";
		var navInfo = navigator.appVersion, subNav = ""; //navigator.appVersion, subNav;

		subNav = navInfo.substring(navInfo.indexOf("(")+1, navInfo.indexOf(";")).split(" ");

		//navInfo = navInfo.trim();

		if (navigator.appVersion.indexOf("Windows")!=-1 || navigator.oscpu.indexOf("Windows")!=-1) { OSname="Windows"; OSversion = subNav[2]; OSkernel = subNav[1];  } /* OSversion =  navInfo.substring(navInfo.indexOf("Windows")+14, navInfo.indexOf(";")); subNav = navInfo.substring(); OSkernel = navInfo.substring(navInfo.indexOf("Windows")+8, navInfo.indexOf(" ")); */
		else if (navigator.appVersion.indexOf("Mac")!=-1 || navigator.oscpu.indexOf("Mac")!=-1) OSname="MacOS";
		else if (navigator.appVersion.indexOf("Linux")!=-1 || navigator.oscpu.indexOf("Linux")!=-1) OSname="Linux";
		else if (navigator.appVersion.indexOf("X11")!=-1) OSname="UNIX";
		if (navigator.appVersion.indexOf("x32")!=-1) OSarchitecture="x32"; 
		else if (navigator.appVersion.indexOf("x64")!=-1) OSarchitecture="x64";
		else if (navigator.appVersion.indexOf("ARM")!=-1) OSarchitecture="ARM";
		return {name:OSname,architecture:OSarchitecture,version:OSversion,kernal:OSkernel}
	}

	this.testHTML5features = function() {
		var canvas = null, iframe = null, audio = null, video = null;
		//Canvas Support
		if(HTMLCanvasElement!==undefined && HTMLCanvasElement.__proto__===HTMLElement) canvas = {};

		return {canvas:canvas};
	}

	this.documentInfo = function() {

	}

	this.javascriptInfo = function(startver=1.0, endver=1.9, p=0.1) {
		for(let i = startver;i<=endver;i+=p) {
			let tmpscr = document.createElement("script"), j = i.toFixed(1);
			tmpscr.textContent = 'if(typeof Specification!="undefined") Specification.jsVer = '+j+';';
			tmpscr.setAttribute("language", "Javascript"+j);
			document.body.appendChild(tmpscr);
			tmpscr.remove();
		}
	}
	this.ecmascriptInfo = function() {

	}
	this.supportES6 = (function() {
		try {
		    new Function("(a = 0) => a");
		    return true;
  		}
  		catch (err) {
   			 return  false;
		}
	}())
	this.supportHTML5 = (function() {
		return document.createElement('canvas').getContext != undefined; //document.doctype
	}())
	//Unsecified
	this.jsVer = undefined;

	this.CSS = {

	}

}

//@_jscript_version