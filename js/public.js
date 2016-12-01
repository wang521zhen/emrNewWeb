//所有文件都依赖此js,本js一般不需要修改，如有添加公共js引入，加入$LAB就好
var way = "";
var path = getRootPath_web("pathName").replace("/", "").replace("/", "");
if(path != null && path.indexOf("/") > -1) {
	for(; path.indexOf("/") > -1;) {
		path = path.replace("/", "");
		way += "../";
	}
}
//寻找对应路径
include_css(way + "css/alert/sweetalert.css");
$LAB.script(way+"js/jquery.min.js").wait()
	.script(way+"js/alert/sweetalert.min.js").wait()
	.script(way+"js/static.js").wait();
	
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