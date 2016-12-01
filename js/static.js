var name = "益加电子病历";
var application = "http://localhost:8080/emr";
/*********************************************************************** 
 * Title       : 包含其它 js 文件。 
 * Description : 将其它 Js 文件引入本文件中，方便管理、维护。 
 * Author      ： Livon 
 * Date        ：2010-11-16 
 ************************************************************************/
function include_js(path,callback) {
	var sobj = document.createElement('script');
	sobj.type = "text/javascript";
	sobj.src = path;
	if(sobj.readyState) { //IE
		sobj.onreadystatechange = function() {
			if(sobj.readyState == "loaded" || sobj.readyState == "complete") {
				sobj.onreadystatechange = null;
				callback();
			}
		};
	} else { //其他浏览器
		sobj.onload = function() {
			callback();
		};
	}
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(sobj);
}
/*********************************************************************** 
 * Title       : 包含其它 css 文件。 
 * Description : 将其它 css 文件引入本文件中，方便管理、维护。 
 * Author      ： Livon 
 * Date        ：2010-11-16 
 ************************************************************************/
function include_css(path) {
	var fileref = document.createElement("link")
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(fileref);
}
var way = "";
var path = getRootPath_web("pathName").replace("/", "").replace("/", "");
if(path != null && path.indexOf("/") > -1) {
	for(; path.indexOf("/") > -1;) {
		path = path.replace("/", "");
		way += "../";
	}
}

function getRootPath_web(type) {
	if(type == "curWwwPath") {
		//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
		return window.document.location.href;
	} else if(type == "pathName") {
		//获取主机地址之后的目录，如： /uimcardprj/share/meun.jsp
		return window.document.location.pathname;
	} else if(type == "pos") {
		return curWwwPath.indexOf(getRootPath_web("pathName"));
	} else if(type == "localhostPaht") {
		//获取主机地址，如： http://localhost:8083
		return curWwwPath.substring(0, getRootPath_web("pos"));
	} else if(type == "projectName") {
		//获取带"/"的项目名，如：/uimcardprj
		return getRootPath_web("pathName").substring(0, pathName.substr(1).indexOf('/') + 1);
	}
}

include_css(way + "css/alert/sweetalert.css");
$LAB.script(way + "js/alert/sweetalert.min.js").wait(function(){
	//重写alert
	window.alert = function(str) {
		//可以自己写样式
		swal(str + "");
	}
});
//重写ajax
(function($) {

	//备份jquery的ajax方法
	var _ajax = $.ajax;
	//重写jquery的ajax方法  
	$.myajax = function(opt) {
		//备份opt中error和success方法  
		var fn = {
			error: function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function(data, textStatus) {}
		}
		if(opt.error) {
			fn.error = opt.error;
		}
		if(opt.success) {
			fn.success = opt.success;
		}
		if(opt.url) {
			opt.url = fn.url = application + opt.url;
		}
		if(opt.urlweb) {
			opt.url = fn.url = opt.urlweb;
		}
		if((navigator.userAgent.indexOf('MSIE') >= 0) &&
			(navigator.userAgent.indexOf('Opera') < 0)) {
			//IE
			jQuery.support.cors = true; //ie跨域访问
			//opt.dataType = fn.dataType = "json";
		} else if(navigator.userAgent.indexOf('Firefox') >= 0) {
			//opt.dataType = fn.dataType = "json";
		} else if(navigator.userAgent.indexOf('Opera') >= 0) {
			//opt.dataType = fn.dataType = "json";
		} else {
			//opt.dataType = fn.dataType = "json";
		}
		//扩展增强处理  
		var _opt = $.extend(opt, {
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//错误方法增强处理  
				alert("未知错误！");
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success: function(data, textStatus) {
				//成功回调方法增强处理  
				if(data.meta.message == '/login_toLogin') {
					window.location.href = "login.html";
				} else {
					fn.success(data, textStatus);
				}
			}
		});
		_ajax(_opt);
	}
})(jQuery);