// ==UserScript==
// @name         neptun-sli
// @namespace    peetftp.ddns.net
// @version      1.1.1
// @description  Neptun kiegészítők
// @author       Kyle
// @match        https://neptun1.uni-bge.hu/hallgato/*
// @match        https://neptun2.uni-bge.hu/hallgato/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/peetertoth/neptun-sli/master/neptun-sli.user.js
// @downloadURL  https://raw.githubusercontent.com/peetertoth/neptun-sli/master/neptun-sli.user.js
// @require		 https://raw.githubusercontent.com/peetertoth/neptun-sli/feature-change-to-modular/module-extract-class-informations.js
// ==/UserScript==

/////////////////////
//Globális változók//
/////////////////////
/*Kurzus figyelés*/
key_ktantargy = "k_tantargy";
key_kkurzus = "k_kurzus";
key_kfigyeles = "k_figyeles";
/*Jegy figyelés*/
key_jtargykod = "j_targykod";
key_jfigyeles = "j_figyeles";

/*LOG msg*/
log_kurzus = '[KURZUS]';
log_jegy = '[JEGY]';
/*Lebegő div állapota*/
key_lebego = 'lebegodiv';
key_log = 'logtartalma';
key_log_date = 'logidopontja';

soundCoin = document.createElement('audio');
soundAirHorn = document.createElement('audio');

soundCoin.src = 'https://raw.githubusercontent.com/peetertoth/neptun-sli/master/res/coin.mp3';
soundAirHorn.src = 'https://raw.githubusercontent.com/peetertoth/neptun-sli/master/res/airh.mp3';

soundCoin.preload = 'auto';
soundAirHorn.preload = 'auto';

divNyitva = 'position:fixed; top:30px; right:3px; width:400px; height:160px; background-color:#778899; border-radius:10px';
divZarva = 'position:fixed; top:30px; right:-375px; width:400px; height:160px; background-color:#778899; border-radius:10px';

///////////////////////////
//Lebegő menü kialakítása//
///////////////////////////

lebegoDIV = document.createElement('div');
if (getCookie(key_lebego) == 'true')
	lebegoDIV.setAttribute('style', divNyitva);
else
	lebegoDIV.setAttribute('style', divZarva);
document.body.appendChild(lebegoDIV);

belso1 = document.createElement('div');
belso1.setAttribute('style', 'position:absolute; left:5px; top:5px; width:15px; height:150px; background-color:#4169E1; border-radius:10px');
lebegoDIV.appendChild(belso1);

belso1.onclick = function () {
	if (lebegoDIV.getAttribute('style') == divNyitva) {
		lebegoDIV.setAttribute('style', divZarva);
		setCookie(key_lebego, 'false');
	} else {
		lebegoDIV.setAttribute('style', divNyitva);
		setCookie(key_lebego, 'true');
	}
};

belso1.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	if (confirm("Törölni szeretnéd a log tartalmát?")) {
		console.log(getTime() + " Log törlése");
		setCookie(key_log, '');
		setCookie(key_log_date, '');
		pLog.innerText = '';
	}
});

belso2 = document.createElement('div');
belso2.setAttribute('style', 'position:absolute; left:25px; top:5px; width:370px; height:150px; background-color:#4169E1; border-radius:10px');
lebegoDIV.appendChild(belso2);

tabla = document.createElement('table');
	tabla.setAttribute('style', 'width:100%');
tablaBody = document.createElement('tbody');
/*Menü első sora*/
tablaSora0 = document.createElement('tr');
tablaEleme00 = document.createElement('td');
	tablaEleme00.align = "center";
	tablaEleme00.innerText = "Inaktív kurzus figyelés";
	tablaEleme00.setAttribute('style', 'font-size: 120%; color:white');
tablaEleme01 = document.createElement('td');
tablaEleme01.align = "center";
	btnTantargy = document.createElement('button');
	btnTantargy.innerText = 'Tantárgy';
	btnTantargy.setAttribute('title', getCookie(key_ktantargy));
	btnTantargy.setAttribute('style', 'width:100%; border-radius:10px');
	btnTantargy.onclick = function () {
		setCookie(key_ktantargy, prompt('Tantárgy pontos neve? (alapértelmezetten az előző)', getCookie(key_ktantargy)));
		btnTantargy.setAttribute('title', getCookie(key_ktantargy));
	};
	btnKurzus = document.createElement('button');
	btnKurzus.innerText = 'Kurzus';
	btnKurzus.setAttribute('title', getCookie(key_kkurzus));
	btnKurzus.setAttribute('style', 'width:100%; border-radius:10px');
	btnKurzus.onclick = function () {
		setCookie(key_kkurzus, prompt('Kurzus pontos neve? (alapértelmezetten az előző)', getCookie(key_kkurzus)));
		btnKurzus.setAttribute('title', getCookie(key_kkurzus));
	};
tablaEleme02 = document.createElement('td');
tablaEleme02.align = "center";
	btnKfigyeles = document.createElement('button');
	btnKfigyeles.innerText = 'Figyelés: ' + (getCookie(key_kfigyeles) == 'true' ? 'ON' : 'OFF');
	btnKfigyeles.setAttribute('style', 'width:99px; height:37px; border-radius:10px');
	btnKfigyeles.onclick = function () {
		if (getCookie(key_kfigyeles) == 'true') {
			setCookie(key_kfigyeles, 'false');
			btnKfigyeles.innerText = 'Figyelés: OFF';
		}
		else {
			setCookie(key_kfigyeles, 'true');
			btnKfigyeles.innerText = 'Figyelés: ON';
		}
	};
belso2.appendChild(tabla);
tabla.appendChild(tablaBody);
tablaBody.appendChild(tablaSora0);
tablaSora0.appendChild(tablaEleme00);
tablaSora0.appendChild(tablaEleme01);
	tablaEleme01.appendChild(btnTantargy);
	tablaEleme01.appendChild(btnKurzus);
tablaSora0.appendChild(tablaEleme02);
	tablaEleme02.appendChild(btnKfigyeles);
/*Menü második sora*/
tablaSora1 = document.createElement('tr');
tablaEleme10 = document.createElement('td');
	tablaEleme10.align = "center";
	tablaEleme10.innerText = "Tárgykód szerint jegy figyelés";
	tablaEleme10.setAttribute('style', 'font-size:120%; color:white');
tablaEleme11 = document.createElement('td');
	btnTargykod = document.createElement('button');
	btnTargykod.innerText = 'Tárgykód';
	btnTargykod.setAttribute('title', getCookie(key_jtargykod));
	btnTargykod.setAttribute('style', 'width:100%; height:37px; border-radius:10px');
	btnTargykod.onclick = function () {
		setCookie(key_jtargykod, prompt('Tantárgy kódja? (alapértelmezetten az előző)', getCookie(key_jtargykod)));
		btnTargykod.setAttribute('title', getCookie(key_jtargykod));
	};
tablaEleme12 = document.createElement('td');
	btnJfigyeles = document.createElement('button');
	btnJfigyeles.innerText = 'Figyelés: ' + (getCookie(key_jfigyeles) == 'true' ? 'ON' : 'OFF');
	btnJfigyeles.setAttribute('style', 'width:100%; height:37px; border-radius:10px');
	btnJfigyeles.onclick = function () {
		if (getCookie(key_jfigyeles) == 'true') {
			setCookie(key_jfigyeles, 'false');
			btnJfigyeles.innerText = 'Figyelés: OFF';
		}
		else {
			setCookie(key_jfigyeles, 'true');
			btnJfigyeles.innerText = 'Figyelés: ON';
		}
	};
tablaBody.appendChild(tablaSora1);
tablaSora1.appendChild(tablaEleme10);
tablaSora1.appendChild(tablaEleme11);
	tablaEleme11.appendChild(btnTargykod);
tablaSora1.appendChild(tablaEleme12);
	tablaEleme12.appendChild(btnJfigyeles);
/*Menü harmadik sora*/
tablaSora2 = document.createElement('tr');
tablaEleme20 = document.createElement('td');
tablaEleme20.setAttribute('colspan', '3');
	pLog = document.createElement('p');
	pLog.setAttribute('style', 'align: center; overflow:auto; width:95%; height:52px; margin:8px; background-color:#6495ED');
	pLog.innerText = getCookie(key_log);
tablaBody.appendChild(tablaSora2);
tablaSora2.appendChild(tablaEleme20);
	tablaEleme20.appendChild(pLog);
	
/////////////////////////////////
//VÉGE: Lebegő menü kialakítása//
/////////////////////////////////

var logoutCheck = function() {
    try {
        if (document.getElementById('upTraining_lblRemainingTime').textContent[1] < 4) {
            window.location.reload();
        }
    } catch (err) {
        setInterval(function(){soundAirHorn.play();}, 15000);
    }
};

targytalalat = false;
listazva = false;

nRandom = getRandomNumber(20);
nCount = 0;

var a = function() {
    if (getCookie(key_kfigyeles) == 'true') {
		console.log(log_kurzus + ' ON');

        var ekurzus = findElement(getCookie(key_kkurzus));
		if (ekurzus !== null) {
			if (ekurzus.classList[0] == "link_disabled") {
				$('div.ui-dialog-titlebar-buttonpane button').click();
				if (nRandom == nCount) {
					window.location.reload();
				} else {
					addLogMessage(log_kurzus +'nRandom:' + nRandom + ';nCount:' + nCount);
					nCount++;
				}
			} else {
				btnKfigyeles.click();
				createStopButton();
			}
		} else {
			console.log(log_kurzus + " kurzusSora");

			if (targytalalat)
				addLogMessage(log_kurzus + " Nincs találta a kurzus kódjára!");

			var etargy = findElement(getCookie(key_ktantargy));
			if (etargy !== null && !targytalalat) {
				targytalalat = true;
				etargy.children[0].click();
			} else {
				console.log(log_kurzus + " targySora");
				if (listazva && etargy === null)
					addLogMessage(log_kurzus + " Nincs találat a tárgy nevére!");

				if ($('#upFilter_footerbutton input').length && !listazva) {
					listazva = true;
					$('#upFilter_footerbutton input').click();
				} else {
					console.log(log_kurzus + ' listazasGomb');
					if (!listazva)
						addLogMessage(log_kurzus + ' Nincs listázás gomb! Lehet nem megfelelő oldalon vagyunk.');
				}
			}
		}
	} else if (getCookie(key_jfigyeles) == 'true') {
		console.log(log_jegy + ' ON');

		var eTargykod = findElement(getCookie(key_jtargykod));
		if (eTargykod !== null) {
			if (eTargykod.parentElement.children[8].innerText !== '') {
				//VAN Jegy
				btnJfigyeles.click();

				createStopButton();
			} else {
				console.log(log_jegy + ' Nincs jegy');
				//addLogMessage(log_jegy + ' Nincs jegy');
				if (nRandom == nCount) {
					window.location.reload();
				} else {
					addLogMessage(log_jegy +'nRandom:' + nRandom + ';nCount:' + nCount);
					nCount++;
				}
			}
		} else {
			addLogMessage(log_jegy + ' Nincs találat a tantárgy kódjára!');
		}
	} else {
		targytalalat = false;
		listazva = false;
	}
};

setInterval(a, 10*1000);
setInterval(logoutCheck, 5*1000);


//Függvények

function findElement(elem) {
    list = document.getElementsByTagName('td');
    for (var i = 0; i < list.length; i++) {
        if (list[i].textContent == elem) {
            return list[i];
        }
    }
}

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

function createStopButton() {
	aSound = setInterval(function(){soundCoin.play();}, 800);

	elem = document.createElement('button');
	elem.setAttribute('style', 'text-align:center');
	elem.setAttribute('onclick', 'document.body.removeChild(elem);clearInterval(aSound);');
	elem.setAttribute('class', 'ui-dialog');
	elem.innerText = "STOP";
	elem.setAttribute('style', 'position: fixed;top:1%; left:45%; font-size:500%');

	document.body.appendChild(elem);
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

document.onkeydown = KeyPress;