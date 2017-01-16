function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0)
            return unescape(c.substring(name.length,c.length));
    }
    return null;
}

function setCookie(key, value) {
    document.cookie = key + "=" + escape(value);
}

function getTime() {
	d = new Date();
	return '[' + ((d.getHours()+'').length == 1 ? '0'+d.getHours() : d.getHours()) + ':' + ((d.getMinutes()+'').length == 1 ? '0'+d.getMinutes() : d.getMinutes()) + ']';
}

function getDate() {
	d = new Date();
	return d.getFullYear() + '.' + d.getMonth()+1 + '.' + d.getDate();
}

function addLogMessage(msg) {
	if (getDate() != getCookie(key_log_date)) {
		pLog.innerText = '###' + getDate() + '###' + '\n' + pLog.innerText;
		setCookie(key_log_date, getDate());
	}
	pLog.innerText = getTime() + ' ' + msg + '\n' + pLog.innerText;
	setCookie(key_log, pLog.innerText);
}

function getRandomNumber(top) {
	var aNum = Math.random() * 1000;
	return Math.floor(aNum%top);
}
