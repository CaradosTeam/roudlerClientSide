/////////////////////////////////////////////////
//////// Notifications Roudler Module v.1 //////
///////////////////////////////////////////////
Roudler.NotificationConfig = {

}
Roudler.Push = function() {
    var _self = Object.create({});
    _self.request = function() {

    }
    return _self;
}
Roudler.PushNotification = function(title, des, imgsrc) {
    this.title = title;
    this.body = des;
    this.image = imgsrc;

    this.show = function() {

    }
    this.hide = function() {

    }
}
Roudler.Notification = (function() {
    var localMemory = {lastTitle:""};
    var _self = Object.create({});
    _self.changeTitle = function(content) {
        if(typeof content!="string") return false;
        localMemory.lastTitle = docuemnt.title;
        document.title = content;}
    _self.sound = function(src=undefined) {
        var sound = new Audio(src);

    }
    _self.create = function(dataorobj, sound, title) {
        if(typeof window.Notification!="undefined") {
            if(Notification.permission==='granted') {
                Notification.requestPermission((status)=>{
                    var notNode = new Notification(dataorobj.title, {
                        body:dataorobj.description,
                        icon:dataorobj.icon

                    });
                    notNode.addEventListener("push", function() {

                    });
                });
            } else if(Notification.permission==='denied') {

            }
        }
    }

    return _self;
});