
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+86400000*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});


var stui = {


	'common': {//公共基础
		'history': function() {
			if($("#stui_history").length){
				if($.cookie("recente")){
				    var json=eval("("+$.cookie("recente")+")");
				    var list="";
				    for(i=0;i<json.length;i++){
					
				        list = list + "<a class='fed-part-rows' href='"+json[i].vod_url+"'><span class='fed-part-eone fed-col-xs9'>"+json[i].vod_name+"</span><span class='fed-part-eone fed-text-muted fed-text-right fed-col-xs3'>"+json[i].vod_part+"</span></a>";
				    }
				    $("#stui_history").append(list);
				}
				else
		            $("#stui_history").append("<a class='fed-part-rows' href='javascript:;'>暂无观看记录</a>");
			   
			    $(".historyclean").on("click",function(){
			    	$.cookie("recente",null,{expires:-1,path: '/'});
			    });
			}
		}
	}	
};

if(window.console&&window.console.log){  
	console.log('\u4f50\u4f50\u7f51\uff08\u007a\u0075\u006f\u007a\u002e\u006e\u0065\u0074\uff09\u4eff\u5236\u4f5c\u54c1');  
	console.log('\u4f5c\u8005\uff1a\u4f50\u4f50\uff0c\u0051\u0051\uff1a\u0039\u0039\u0037\u0037\u0032\u0036\u0036\u0030\u0030');  
	console.log("%c\u4f50\u4f50\u4eff\u5236\u8bf7\u5c0a\u91cd\u52b3\u52a8\u6210\u679c\uff0c\u52ff\u5012\u5356\u5206\u4eab\uff0c\u8c22\u8c22\uff01","color:red");  
}

$(document).ready(function() {	
	stui.common.history();
});
