randomizePassword = function(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+.,[]\"\'<>ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", pass = "";
    for (let x = 0;x<length;x++) {
        let i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}