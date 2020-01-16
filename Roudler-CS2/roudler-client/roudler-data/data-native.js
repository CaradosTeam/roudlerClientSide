//Roudler Data Functions Stack
Date.prototype.formatISO = function() {
    if(typeof Date.prototype.toISOString!="undefined") return this.toISOString().split('T')[0]; else {
        month = '' + (this.getMonth() + 1),
        day = '' + this.getDate(),
        year = this.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    } 
}