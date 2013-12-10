// JavaScript Document

	// e.g <script src='this.path'>, scriptSrc = this.path
	var scriptSrc = "";
	var isLoad;
	var jqueryLanguageSwitcherJsFileName = "jqueryLanguageSwitcher.js"
	$("script").each(function(index, element) {
		var isFind = $(this).attr("src");
		console.log("Checking script = "+isFind);
		isFind = isFind.indexOf("/"+jqueryLanguageSwitcherJsFileName);
		if ( isFind != -1){
			scriptSrc = $(this).attr("src");
			console.log("Jquery Language Switcher "+jqueryLanguageSwitcherJsFileName+" linked.");
			return false;
		}
    });
	
	var parentFolder = "../";
	var parentFolderLength = parentFolder.length;
	var languageFolderPath = "languages/"; // <== root/languages/
	
	console.log("javasciptPath = "+scriptSrc);
	console.log("javasciptPath.length = "+scriptSrc.length);
	
	var nestedAmount = 0;
	//nestedAmount = findNestedAmount(scriptSrc, 0);
	
	if(scriptSrc.length>1)
	for(i=0; i<scriptSrc.length; i++){
		var isLocalAtParentFolder = scriptSrc.indexOf(parentFolder, i);
		//alert(isLocalAtParentFolder);
		if( isLocalAtParentFolder != -1 ){
			nestedAmount++;
			i = i-1+parentFolderLength;
		}else{
			break;
		}
	}
	
	//alert(nestedAmount);
	
	console.log("nestedAmount = "+nestedAmount);
	
	
/*
function findNestedAmount(javasciptPath, startIndex){
	var repeatTime = 0;
	
		alert("javasciptPath.charAt(startIndex)!=\"\" = "+javasciptPath.charAt(startIndex)!="");
	if( javasciptPath.charAt(startIndex)!="" ){
		var isLocalAtParentFolder = 0;
		isLocalAtParentFolder = javasciptPath.indexOf(parentFolder, startIndex);
		console.log("startIndex = "+startIndex);
		console.log("isLocalAtParentFolder = "+isLocalAtParentFolder);
		if ( isLocalAtParentFolder == -1 ){
			return 0;
		}else{
			repeatTime+=1;
			return repeatTime+(javasciptPath, isLocalAtParentFolder+parentFolderLength)
		}
	}
	return 0;
}
alert(nestedAmount);
*/
	
$(function(){
	if(scriptSrc==""){
		console.log("File "+jqueryLanguageSwitcherJsFileName+"have not import, stop initialization");
		return;
	}
	
	// e.g keithbox.serveehttp.com/index.html then isAbsolutePath = true
	var isAbsolutePath = false;
		
		// get the current page name, e.g fyp.servehttp.com/test.html --> /test.html
		var pathname = window.location.pathname;
			
		// get the domainName, e.g fyp.servehttp.com/test.html --> fyp.servehttp.com
		var hostName = window.location.hostname
		
		// get the protocol, e.g http://fyp.servehttp.com/test.html --> http:
		var protocol = window.location.protocol+"//";
		var domainName = protocol+hostName;
		
		console.log("scriptSrc = "+scriptSrc);
		console.log("pathname = "+pathname);
		console.log("hostName = "+hostName);
		console.log("protocol = "+protocol);
		console.log("domainName = protocol + hostName = "+domainName);
					
		var href = window.location.href
		var host = window.location.host
		console.log("href = "+href);
		console.log("host = "+host);
		// get the pathname last digit
		/*
		if(pathname.substr(pathname.length-1, pathname.length) == "/"){
			var langfolder = href+"index";
			isAbsolutePath = true;
		}else{
			var langfolder = href+"/";
		}
		*/
		
		// get the current filename
		var href = window.location.href;
		var currentFilename = "index";
		var currentFileNameWithoutExtension = "";
		var hrefBetweenRootAndCurrentFilename = href.split("/");
		//var fileExtension = ".html";
		var langfolder = href;
		var isIndex = true;
		var ruleLocation = "";
	
		// get the pathname last digit
		if(pathname.substr(pathname.length-1, pathname.length) != "/"){
			var index = href.lastIndexOf("/") + 1;
			currentFilename = href.substr(index);
			currentFileNameWithoutExtension = currentFilename.substr(0, currentFilename.lastIndexOf(".") );
			
			langfolder = langfolder.substr(0, index);
			isIndex = false;
		}else{
			hrefBetweenRootAndCurrentFilename.pop();
		}
		console.log("currentFilename = "+currentFilename);
		console.log("currentFileNameWithoutExtension = "+currentFileNameWithoutExtension);
		if(nestedAmount >=1 ){
			//langfolder += "/";
			for(i=1; i<=nestedAmount; nestedAmount--){
				langfolder += parentFolder;
			}
		}else{
			// cut the filename, if keithbox.servehttp.com/index.html
			langfolder = langfolder.replace(currentFilename, "");
		}
		langfolder += languageFolderPath;
		
		if(nestedAmount >=1 ){
			for(i=1; i<=nestedAmount; nestedAmount--){
				langfolder += hrefBetweenRootAndCurrentFilename.pop()+"/";
			}
			if (isIndex){
				langfolder += "index/";
			}
		}else{
			if (isIndex){
				langfolder += "index/";
			}
			langfolder += currentFileNameWithoutExtension+"/";
		}
		/*
		if(langfolder.substr(langfolder.length-1, langfolder.length) != "/")
			ruleLocation = langfolder+"/rule.js";
		else{
			if (isIndex){
				ruleLocation = langfolder+"index/rule.js";
			}else{
				ruleLocation = langfolder+"rule.js";
			}
		}*/
		ruleLocation = langfolder+"rule.js";
		
		// handle *.com/index.html => *.com/languages/index.html//lang.eng.js 
		//langfolder = langfolder.replace(".html", "");
		//langfolder = langfolder.replace(".php", "");
		
		/*
		if (hostName=="localhost" || hostName=="127.0.0.1"){
			langfolder = langfolder.replace("http://localhost/MySite/KeithBox3.2", "http://localhost/MySite/KeithBox3.2/languages");
		}else{
			langfolder = langfolder.replace(host, host+"/languages");
		}
		*/
		
		//langfolder = langfolder.replace("//", "/");
		//langLocation = langfolder.replace("//", "/");
		//ruleLocation = langfolder.replace("//", "/");
		
		console.log("langfolder = "+langfolder);
		console.log("ruleLocation = "+ruleLocation);
		
		// if language bar hidden/display:none
		// stop all the following Initialization
		var isStopInitialization = false;
		var languageBarContainer = $("#radio");
		var languageBarContainerID = "#radio"
		if(languageBarContainer.length) {
			/* code if found */
			if(languageBarContainer.is(":hidden") || languageBarContainer.css("display") == "none" || languageBarContainer.css("visibility") == "hidden")
				isStopInitialization = true; 
		} else {
			/* code if not found */
			isStopInitialization = true; 
		}
		if(isStopInitialization){
			console.log("Language Button Container "+languageBarContainerID+" hidden, stop initialization");
			return;
		}
		getRuleFile(ruleLocation);
		//getLanguageFile(langLocation);
	
	$('.languageSelect').change(function() {
		var button = $(this);
		var selectLanguage = button.val();
		var isDefault = button.hasClass("default");
		
			console.log("'"+selectLanguage+"' button click on "+pathname);
			
		// if default language clicked
		if(isDefault){
			console.log("default button '"+selectLanguage+"' click on "+pathname);
			rollback();
		}else{
			/*
			var langLocation = langfolder.replace("rule.js", "");
			langLocation = langLocation+"/lang." + selectLanguage + ".js";
			*/
			langLocation = langfolder+"/lang." + selectLanguage + ".js";
			
			console.log("langLocation = "+langLocation);
			getLanguageFile(langLocation);
		}
	});

	//language buttin when click
	$(".languageSelect2").click(function(){
		/*
		alert($(this).hasClass("default"));
		if($(this).hasClass("default")){
		
		$.each(rule, function(index, ruleValue){
			if($(ruleValue.selector).length >= 1){ // no matched element in page then do nothing
				if($(ruleValue.selector).length > 1){ // more than one matched element
					$.each($(ruleValue.selector), function(targetElementObject, targetElementValue){
						//$(this).text(data[ruleValue.selector][targetElementObject]);
						alert(backupLanguage[".fun_name"])
						changeValue(this, ruleValue.method, ruleValue.arguments, backupLanguage[ruleValue.selector][targetElementObject]);
					});
				}else if($(ruleValue.selector).length == 1){ // only one matched element
					changeValue(ruleValue.selector, ruleValue.method, ruleValue.arguments, backupLanguage[ruleValue.selector]);
				}
			}
		});
		}else{
		*/
		// get the name of language what button user press
		//}
	})
	
	// default display chinese
	//$(".languageSelect[value='cht']").trigger('click');
	var rule;
function getRuleFile(ruleLocation){
	//ruleLocation = ruleLocation.replace("localhost/localhost/", "localhost/");
	ruleLocation = "languages/index/rule.js";
	$.ajax({
			type: "GET",
			url: ruleLocation,
			dataType: "json"
	}).done(function(data, status, xhr) {
		rule = data;
		backupPageLanguage(data);
	}).error(function(data, status, xhr) {
		// language packs not found, use english as default
		console.log("========================================");
		console.log("Language switching rule not found: "+path);
		console.log("Language switching Action Stop!");
	});
};

var backupLanguage;
var backupLanguageJson;
function backupPageLanguage(ruleJson){
	backupLanguage = "{";
	// backup language according to the rule.js
	$.each(ruleJson, function(index, ruleValue){
			var selector = $(ruleValue.selector);
		backupLanguage +="\""+ruleValue.selector+"\":";
		if(selector.length >= 1){ // no matched element do nothing
			if (selector.length > 1){ // more than one matched element (data[0][value.selector])
				backupLanguage += "[";

					$.each(selector, function(targetElementIndex, targetElementValue){
						backupLanguage += "\""+backupValue(this, ruleValue.method, ruleValue.arguments)+"\",";
					});
					backupLanguage += "]";
					backupLanguage = backupLanguage.replace(",]", "]");
			} else if (selector.length == 1){  // only one matched element
				backupLanguage += "\"";
				backupLanguage += backupValue(selector, ruleValue.method, ruleValue.arguments);
				backupLanguage += "\"";
			}
		}else{
		}
		backupLanguage += ",";
	});
	backupLanguage += "}";
	backupLanguage = backupLanguage.replace(",}", "}");
	console.log("========================================");
	console.log(backupLanguage);
	
	backupLanguageJson = $.parseJSON(backupLanguage);
}

function backupValue(targetElement, method, argument){
	var value;
	if(method == "text" || method == "" || method == null){
		value = $(targetElement).text();
	}else if(method == "attr"){
		value = $(targetElement).attr(argument);
	}else if(method == "dialog"){
		value = $(targetElement).dialog("option", "title" );
	}
	return value+"";
}

function rollback(){
	//var backupLanguageJson = $.parseJSON('{"#header_title h2":"KeithBox - 主目錄",".fun_name":["Plants vs. Zombies Adventures","Little Fighter","Zelda","10大常用軟件"],"#author_said h4":"站長的話","#update_log h4":"更新日誌","#text":"伺服器開放時間","#author_said p":[		"!NEWS!~~網內加入Facebook即時留言，可以留下你的寶貴意見、與其它人作交流或討論了。","站內大部份檔案轉移到Dropbox, Google Drive, Sky Drive, Facebook",		"請善用Facebook 群組接收最新資訊,如因特發因素網站突然暫停服務,Facebook是站長唯一能對外公佈消息的地方"],"#full_timetable":"KeithBox3.2 上線時間表",	"#full_timetable p":["基於凌晨至清晨時段瀏覽量極低，以上時段伺服器將會關閉休息，減省不必要的資源浪費。","為響應環保，伺服器每天最少下線6小時，稍作休息。",	"期間任何人均不能瀏覽本站，不便之處，僅此致歉。"],"#opening_hours p":"凌晨至清晨是網站的休息時段"}');
	$.each(rule, function(index, ruleValue){
		if($(ruleValue.selector).length>=1){
			console.log("========================================");
			if($(ruleValue.selector).length>1){
				$.each($(ruleValue.selector), function(selectorIndex, selectorValue){
					console.log("ruleValue.selector: "+ruleValue.selector+", selectorIndex: "+selectorIndex);
					changeValue(this, ruleValue.method, ruleValue.arguments, backupLanguageJson[ruleValue.selector][selectorIndex]);
				});
			}else if($(ruleValue.selector).length == 1){
				changeValue(ruleValue.selector, ruleValue.method, ruleValue.arguments, backupLanguageJson[ruleValue.selector]);
			}
		}
	});
}

function getLanguageFile(path){
	$.ajax({
			type: "GET",
			url: path,
		dataType: "json"
	}).done(function(data, status, xhr) {
		// copy backupLanguage
		var replaceByThisLanguage = backupLanguage;
		//alert(data[0])
		$.each(rule, function(index, ruleValue){
			if($(ruleValue.selector).length >= 1){ // no matched element in page then do nothing
				if($(ruleValue.selector).length > 1){ // more than one matched element
					$.each($(ruleValue.selector), function(targetElementObject, targetElementValue){
						//$(this).text(data[ruleValue.selector][targetElementObject]);
						changeValue(this, ruleValue.method, ruleValue.arguments, data[ruleValue.selector][targetElementObject]);
					});
				}else if($(ruleValue.selector).length == 1){ // only one matched element
					changeValue(ruleValue.selector, ruleValue.method, ruleValue.arguments, data[ruleValue.selector]);
				}
			}
		});
		
		//alert(rule[0]["selector"])
		/*
		// start loop the json
		$.each(replaceByThisLanguage, function(index, ruleValue){
		console.log("rule index "+index+": { selector: " + ruleValue.selector +
				", method: " + ruleValue.method +
				", arguments: " + ruleValue.arguments
				+" }");
			var selector = $(ruleValue.selector);
			console.log("selector: \""+selector+"\" "+selector.length+" match(s)");
			if($(ruleValue.selector).length >= 1){ // no matched element do nothing
				if ($(ruleValue.selector).length > 1){ // more than one matched element (data[0][value.selector])
					$.each($(ruleValue.selector), function(targetElementObject, targetElementValue){
						//$(this).text(data[ruleValue.selector][targetElementObject]);
						changeValue(this, ruleValue.method, ruleValue.arguments, data[ruleValue.selector][targetElementObject]);
					});
				} else if ($(ruleValue.selector).length == 1){ // only one matched element
					//$(ruleValue.selector).text(data[ruleValue.selector]);
					changeValue(ruleValue.selector, ruleValue.method, ruleValue.arguments, data[ruleValue.selector]);
				}
			}
		});
		
		$.each(data, function(index2, value2){
			console.log("index: "+index2+", value: "+value2);
		});
		*/
	}).error(function(data, status, xhr) {
		// language packs not found, use english as default
		console.log("========================================");
		console.log("Language Pack connect error: "+path);
		console.log("error data: "+data);
		console.log("error status: "+status);
		console.log("error xhr: "+xhr);
	});
};
	
function changeValue(targetElement, method, argument, value){
	// change text if not the same
	if(method == "text" || method == "" || method == null){
		if($(targetElement).text()!=value){
			$(targetElement).fadeOut(function() {
				$(this)[method](value).fadeIn();
			});
		}
	}else if(method == "attr"){
		if( $(targetElement).attr(argument) != value){
			$(targetElement).attr(argument, value);
		}
	}else if(method == "dialog"){
		$(targetElement).dialog("option", "title", value );
	}
}

});