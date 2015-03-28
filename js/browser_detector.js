//Источник - http://xiper.net/collect/js-plugins/browser-detect/browser-name-and-version

/*	    Набор функций для определения имени и версии браузера.
	    Функция browserDetectNav - определение браузера при помощи объекта Navigator
	    Функция browserDetectJS  - определение браузера при помощи JS объектов и св-в
	    Функция getBrowser   - делает вывод о браузере на основании обоих методов
	    Формат входящих и исходящих данный у всех функций одинаков.
	    Методы не зависимы друг от друга, можно использовать любой или вместе.
	    Входящие параметры:         chrAfterPoint - целое число,
	                        определяющее кол-во знаков после запятой в возвращаемой версии браузера.
	                        Если оставить пустым - вернет все знаки после запятой.
	    Возвращаемые параметры:     outputData - массив, где
	                    outputData[0] - имя браузера,
	                    outputData[1] - основная версия браузера (значение до запятой),
	                    outputData[2] - знаки версии после запятой (кол-во определяется входящим параметром)
	                        если возвращается "undefined" - браузер (или версия) не определен (неизвестный)
	                        если не возвращается версия (в некоторых случаях) - браузер "маскированый"	*/
	var chrAfterPoint;

	function browserDetectNav(chrAfterPoint){
	var
	    UA=window.navigator.userAgent,       // содержит переданный браузером юзерагент
	    //--------------------------------------------------------------------------------
	    OperaB = /Opera[ \/]+\w+\.\w+/i,     //
	    OperaV = /Version[ \/]+\w+\.\w+/i,   //
	    FirefoxB = /Firefox\/\w+\.\w+/i,     // шаблоны для распарсивания юзерагента
	    ChromeB = /Chrome\/\w+\.\w+/i,       //
	    SafariB = /Version\/\w+\.\w+/i,      //
	    IEB = /MSIE *\d+\.\w+/i,             //
	    SafariV = /Safari\/\w+\.\w+/i,       //
	    //--------------------------------------------------------------------------------
	    browser = new Array(),               //массив с данными о браузере
	    browserSplit = /[ \/\.]/i,           //шаблон для разбивки данных о браузере из строки
	    OperaV = UA.match(OperaV),
	    Firefox = UA.match(FirefoxB),
	    Chrome = UA.match(ChromeB),
	    Safari = UA.match(SafariB),
	    SafariV = UA.match(SafariV),
	    IE = UA.match(IEB),
	    Opera = UA.match(OperaB);
	    //----- Opera ----
	        if ((!Opera=="")&(!OperaV=="")) browser[0]=OperaV[0].replace(/Version/, "Opera")
	                else
	                    if (!Opera=="") browser[0]=Opera[0]
	                        else
	                            //----- IE -----
	                            if (!IE=="") browser[0] = IE[0]
	                                else
	                                    //----- Firefox ----
	                                    if (!Firefox=="") browser[0]=Firefox[0]
	                                        else
	                                            //----- Chrom ----
	                                            if (!Chrome=="") browser[0] = Chrome[0]
	                                                else
	                                                    //----- Safari ----
	                                                    if ((!Safari=="")&&(!SafariV=="")) browser[0] = Safari[0].replace("Version", "Safari");
	//------------ Разбивка версии -----------
	    var
	            outputData;                                      // возвращаемый функцией массив значений
	                                                             // [0] - имя браузера, [1] - целая часть версии
	                                                             // [2] - дробная часть версии
	    if (browser[0] != null) outputData = browser[0].split(browserSplit);
	    if ((chrAfterPoint==null)&&(outputData != null))
	        {
	            chrAfterPoint=outputData[2].length;
	            outputData[2] = outputData[2].substring(0, chrAfterPoint); // берем нужное ко-во знаков
	            return(outputData);
	        }
	            else return(false);
	}

	function browserDetectJS() {
	var
	    browser = new Array();
	//Opera
	    if (window.opera) {
	        browser[0] = "Opera";
	        browser[1] = window.opera.version();
	    }
	        else
	//Chrome
	        if (window.chrome) {
	            browser[0] = "Chrome";
	        }
	            else
	//Firefox
	            if (window.sidebar) {
	                browser[0] = "Firefox";
	            }
	                else
	//Safari
	                    if ((!window.external)&&(browser[0]!=="Opera")) {
	                        browser[0] = "Safari";
	                    }
	                        else
	//IE
	                        if (window.ActiveXObject) {
	                            browser[0] = "MSIE";
	                            if (window.navigator.userProfile) browser[1] = "6"
	                                else
	                                    if (window.Storage) browser[1] = "8"
	                                        else
	                                            if ((!window.Storage)&&(!window.navigator.userProfile)) browser[1] = "7"
	                                                else browser[1] = "Unknown";
	                        }
	    if (!browser) return(false)
	        else return(browser);
	}

	function getBrowser(chrAfterPoint) {
	var
	    browserNav = browserDetectNav(chrAfterPoint),    // хранит результат работы функции browserDetectNav
	    browserJS = browserDetectJS();                   // хранит результат работы функции browserDetectJS

	// сравниваем результаты отработки двух методов
	    if (browserNav[0] == browserJS[0]) return(browserNav)                //если одинаковый - возвращаем результат первого метода
	        else
	            if (browserNav[0] != browserJS[0]) return(browserJS) //если разный - возвращаем результат второго метода
	                else
	                    return(false);                       //в случае, если браузер не определен
	};

	function isItBrowser(browserCom, browserVer, detectMethod) {
	var browser;                                                      // контейнер для результатов обнаружения

	switch (detectMethod) {                                           // определяемся какой из методов использовать (3-й параметр)
	    case 1: browser = browserDetectNav(); break;
	    case 2: browser = browserDetectJS(); break;
	    default: browser = getBrowser();
	};
	    if ((browserCom == browser[0])&(browserVer == browser[1])) return(true)                                 // если переданы два параметра и они совпали - возвращаем true
	        else
	            if ((browserCom == browser[0])&((browserVer == null)||(browserVer == 0))) return(true)  // если передан один параметр и он совпал - возвращаем true
	                else return(false);
	};

	var result = getBrowser();
	var warning = "Обновите браузер! Сайт может отображаться некорректно.";
	if (result[0] =="MSIE" && parseInt(result[1])<10 ||
		result[0] =="Firefox" && parseInt(result[1])<24 ||
		result[0] =="Chrome" && parseInt(result[1])<24 ||
		result[0] =="Safari" && parseInt(result[1])<4 ||
		result[0] =="Opera" && parseInt(result[1])<12){
		alert (warning)}
