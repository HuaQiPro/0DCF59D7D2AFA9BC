!function(h){"use strict";function t(e){function t(){i.creat()}var i=this;i.index=++g.index,i.config.maxWidth=m(f).width()-30,i.config=m.extend({},i.config,c.config,e),document.body?t():setTimeout(function(){t()},30)}var m,f,e,n=h.layui&&layui.define,c={getPath:(e=document.currentScript?document.currentScript.src:function(){for(var e,t=document.scripts,i=t.length-1,n=i;0<n;n--)if("interactive"===t[n].readyState){e=t[n].src;break}return e||t[i].src}(),(h.LAYUI_GLOBAL||{}).layer_dir||e.substring(0,e.lastIndexOf("/")+1)),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"],getStyle:function(e,t){e=e.currentStyle||h.getComputedStyle(e,null);return e[e.getPropertyValue?"getPropertyValue":"getAttribute"](t)},link:function(e,n,t){var i,a,o,s,r,l;g.path&&(i=document.getElementsByTagName("head")[0],a=document.createElement("link"),o=((t="string"==typeof n?n:t)||e).replace(/\.|\//g,""),s="layuicss-"+o,r="creating",l=0,a.rel="stylesheet",a.href=g.path+e,a.id=s,document.getElementById(s)||i.appendChild(a),"function"==typeof n&&function e(t){var i=document.getElementById(s);return 100<++l?h.console&&console.error(o+".css: Invalid"):void(1989===parseInt(c.getStyle(i,"width"))?(t===r&&i.removeAttribute("lay-status"),i.getAttribute("lay-status")===r?setTimeout(e,100):n()):(i.setAttribute("lay-status",r),setTimeout(function(){e(r)},100)))}())}},g={v:"3.5.1",ie:(e=navigator.userAgent.toLowerCase(),!!(h.ActiveXObject||"ActiveXObject"in h)&&((e.match(/msie\s(\d+)/)||[])[1]||"11")),index:h.layer&&h.layer.v?1e5:0,path:c.getPath,config:function(e,t){return g.cache=c.config=m.extend({},c.config,e=e||{}),g.path=c.config.path||g.path,"string"==typeof e.extend&&(e.extend=[e.extend]),c.config.path&&g.ready(),e.extend&&(n?layui.addcss("modules/layer/"+e.extend):c.link("theme/"+e.extend)),this},ready:function(e){var t="layer",i=(n?"modules/layer/":"theme/")+"default/layer.css?v="+g.v;return n?layui.addcss(i,e,t):c.link(i,e,t),this},alert:function(e,t,i){var n="function"==typeof t;return g.open(m.extend({content:e,yes:i=n?t:i},n?{}:t))},confirm:function(e,t,i,n){var a="function"==typeof t;return a&&(n=i,i=t),g.open(m.extend({content:e,btn:c.btn,yes:i,btn2:n},a?{}:t))},msg:function(e,t,i){var n="function"==typeof t,a=c.config.skin,o=(a?a+" "+a+"-msg":"")||"layui-layer-msg",a=d.anim.length-1;return n&&(i=t),g.open(m.extend({content:e,time:3e3,shade:!1,skin:o,title:!1,closeBtn:!1,btn:!1,resize:!1,end:i},n&&!c.config.skin?{skin:o+" layui-layer-hui",anim:a}:(-1!==(t=t||{}).icon&&(void 0!==t.icon||c.config.skin)||(t.skin=o+" "+(t.skin||"layui-layer-hui")),t)))},load:function(e,t){return g.open(m.extend({type:3,icon:e||0,resize:!1,shade:.01},t))},tips:function(e,t,i){return g.open(m.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:260},i))}};t.pt=t.prototype;var d=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];d.anim=["layer-anim-00","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],d.SHADE="layui-layer-shade",d.MOVE="layui-layer-move",t.pt.config={type:0,shade:.3,fixed:!0,move:d[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,minStack:!0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},t.pt.vessel=function(e,t){var i=this.index,n=this.config,a=n.zIndex+i,o="object"==typeof n.title,s=n.maxmin&&(1===n.type||2===n.type),o=n.title?'<div class="layui-layer-title" style="'+(o?n.title[1]:"")+'">'+(o?n.title[0]:n.title)+"</div>":"";return n.zIndex=a,t([n.shade?'<div class="'+d.SHADE+'" id="'+d.SHADE+i+'" times="'+i+'" style="z-index:'+(a-1)+'; "></div>':"",'<div class="'+d[0]+" layui-layer-"+c.type[n.type]+(0!=n.type&&2!=n.type||n.shade?"":" layui-layer-border")+" "+(n.skin||"")+'" id="'+d[0]+i+'" type="'+c.type[n.type]+'" times="'+i+'" showtime="'+n.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+a+"; width:"+n.area[0]+";height:"+n.area[1]+";position:"+(n.fixed?"fixed;":"absolute;")+'">'+(e&&2!=n.type?"":o)+'<div id="'+(n.id||"")+'" class="layui-layer-content'+(0==n.type&&-1!==n.icon?" layui-layer-padding":"")+(3==n.type?" layui-layer-loading"+n.icon:"")+'">'+(0==n.type&&-1!==n.icon?'<i class="layui-layer-ico layui-layer-ico'+n.icon+'"></i>':"")+((1!=n.type||!e)&&n.content||"")+'</div><span class="layui-layer-setwin">'+(s=s?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"",n.closeBtn&&(s+='<a class="layui-layer-ico '+d[7]+" "+d[7]+(n.title?n.closeBtn:4==n.type?"1":"2")+'" href="javascript:;"></a>'),s)+"</span>"+(n.btn?function(){var e="";"string"==typeof n.btn&&(n.btn=[n.btn]);for(var t=0,i=n.btn.length;t<i;t++)e+='<a class="'+d[6]+t+'">'+n.btn[t]+"</a>";return'<div class="'+d[6]+" layui-layer-btn-"+(n.btnAlign||"")+'">'+e+"</div>"}():"")+(n.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],o,m('<div class="'+d.MOVE+'" id="'+d.MOVE+'"></div>')),this},t.pt.creat=function(){var e,n=this,a=n.config,o=n.index,s="object"==typeof(l=a.content),r=m("body");if(!a.id||!m("#"+a.id)[0]){switch("string"==typeof a.area&&(a.area="auto"===a.area?["",""]:[a.area,""]),a.shift&&(a.anim=a.shift),6==g.ie&&(a.fixed=!1),a.type){case 0:a.btn="btn"in a?a.btn:c.btn[0],g.closeAll("dialog");break;case 2:var l=a.content=s?a.content:[a.content||"","auto"];a.content='<iframe scrolling="'+(a.content[1]||"auto")+'" allowtransparency="true" id="'+d[4]+o+'" name="'+d[4]+o+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+a.content[0]+'"></iframe>';break;case 3:delete a.title,delete a.closeBtn,-1===a.icon&&a.icon,g.closeAll("loading");break;case 4:s||(a.content=[a.content,"body"]),a.follow=a.content[1],a.content=a.content[0]+'<i class="layui-layer-TipsG"></i>',delete a.title,a.tips="object"==typeof a.tips?a.tips:[a.tips,!0],a.tipsMore||g.closeAll("tips")}n.vessel(s,function(e,t,i){r.append(e[0]),s?2==a.type||4==a.type?m("body").append(e[1]):l.parents("."+d[0])[0]||(l.data("display",l.css("display")).show().addClass("layui-layer-wrap").wrap(e[1]),m("#"+d[0]+o).find("."+d[5]).before(t)):r.append(e[1]),m("#"+d.MOVE)[0]||r.append(c.moveElem=i),n.layero=m("#"+d[0]+o),n.shadeo=m("#"+d.SHADE+o),a.scrollbar||d.html.css("overflow","hidden").attr("layer-full",o)}).auto(o),n.shadeo.css({"background-color":a.shade[1]||"#000",opacity:a.shade[0]||a.shade}),2==a.type&&6==g.ie&&n.layero.find("iframe").attr("src",l[0]),4==a.type?n.tips():(n.offset(),parseInt(c.getStyle(document.getElementById(d.MOVE),"z-index"))||(n.layero.css("visibility","hidden"),g.ready(function(){n.offset(),n.layero.css("visibility","visible")}))),a.fixed&&f.on("resize",function(){n.offset(),(/^\d+%$/.test(a.area[0])||/^\d+%$/.test(a.area[1]))&&n.auto(o),4==a.type&&n.tips()}),a.time<=0||setTimeout(function(){g.close(n.index)},a.time),n.move().callback(),d.anim[a.anim]&&(e="layer-anim "+d.anim[a.anim],n.layero.addClass(e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){m(this).removeClass(e)})),a.isOutAnim&&n.layero.data("isOutAnim",!0)}},t.pt.auto=function(e){var t=this.config,i=m("#"+d[0]+e);""===t.area[0]&&0<t.maxWidth&&(g.ie&&g.ie<8&&t.btn&&i.width(i.innerWidth()),i.outerWidth()>t.maxWidth&&i.width(t.maxWidth));var n=[i.innerWidth(),i.innerHeight()],a=i.find(d[1]).outerHeight()||0,o=i.find("."+d[6]).outerHeight()||0,e=function(e){(e=i.find(e)).height(n[1]-a-o-2*(0|parseFloat(e.css("padding-top"))))};return 2===t.type?e("iframe"):""===t.area[1]?0<t.maxHeight&&i.outerHeight()>t.maxHeight?(n[1]=t.maxHeight,e("."+d[5])):t.fixed&&n[1]>=f.height()&&(n[1]=f.height(),e("."+d[5])):e("."+d[5]),this},t.pt.offset=function(){var e=this,t=e.config,i=e.layero,n=[i.outerWidth(),i.outerHeight()],a="object"==typeof t.offset;e.offsetTop=(f.height()-n[1])/2,e.offsetLeft=(f.width()-n[0])/2,a?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=f.width()-n[0]:"b"===t.offset?e.offsetTop=f.height()-n[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=f.height()-n[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=f.width()-n[0]):"rb"===t.offset?(e.offsetTop=f.height()-n[1],e.offsetLeft=f.width()-n[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?f.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?f.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=f.scrollTop(),e.offsetLeft+=f.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=f.height()-(i.find(d[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},t.pt.tips=function(){var e=this.config,t=this.layero,i=[t.outerWidth(),t.outerHeight()],n=m(e.follow),a={width:(n=!n[0]?m("body"):n).outerWidth(),height:n.outerHeight(),top:n.offset().top,left:n.offset().left},o=t.find(".layui-layer-TipsG"),n=e.tips[0];e.tips[1]||o.remove(),a.autoLeft=function(){0<a.left+i[0]-f.width()?(a.tipLeft=a.left+a.width-i[0],o.css({right:12,left:"auto"})):a.tipLeft=a.left},a.where=[function(){a.autoLeft(),a.tipTop=a.top-i[1]-10,o.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",e.tips[1])},function(){a.tipLeft=a.left+a.width+10,a.tipTop=a.top,o.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",e.tips[1])},function(){a.autoLeft(),a.tipTop=a.top+a.height+10,o.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",e.tips[1])},function(){a.tipLeft=a.left-i[0]-10,a.tipTop=a.top,o.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",e.tips[1])}],a.where[n-1](),1===n?a.top-(f.scrollTop()+i[1]+16)<0&&a.where[2]():2===n?0<f.width()-(a.left+a.width+i[0]+16)||a.where[3]():3===n?0<a.top-f.scrollTop()+a.height+i[1]+16-f.height()&&a.where[0]():4===n&&0<i[0]+16-a.left&&a.where[1](),t.find("."+d[5]).css({"background-color":e.tips[1],"padding-right":e.closeBtn?"30px":""}),t.css({left:a.tipLeft-(e.fixed?f.scrollLeft():0),top:a.tipTop-(e.fixed?f.scrollTop():0)})},t.pt.move=function(){var o=this,s=o.config,e=m(document),r=o.layero,t=r.find(s.move),i=r.find(".layui-layer-resize"),l={};return s.move&&t.css("cursor","move"),t.on("mousedown",function(e){e.preventDefault(),s.move&&(l.moveStart=!0,l.offset=[e.clientX-parseFloat(r.css("left")),e.clientY-parseFloat(r.css("top"))],c.moveElem.css("cursor","move").show())}),i.on("mousedown",function(e){e.preventDefault(),l.resizeStart=!0,l.offset=[e.clientX,e.clientY],l.area=[r.outerWidth(),r.outerHeight()],c.moveElem.css("cursor","se-resize").show()}),e.on("mousemove",function(e){var t,i,n,a;l.moveStart&&(n=e.clientX-l.offset[0],a=e.clientY-l.offset[1],i="fixed"===r.css("position"),e.preventDefault(),l.stX=i?0:f.scrollLeft(),l.stY=i?0:f.scrollTop(),s.moveOut||(t=f.width()-r.outerWidth()+l.stX,i=f.height()-r.outerHeight()+l.stY,t<(n=n<l.stX?l.stX:n)&&(n=t),i<(a=a<l.stY?l.stY:a)&&(a=i)),r.css({left:n,top:a})),s.resize&&l.resizeStart&&(n=e.clientX-l.offset[0],a=e.clientY-l.offset[1],e.preventDefault(),g.style(o.index,{width:l.area[0]+n,height:l.area[1]+a}),l.isResize=!0,s.resizing&&s.resizing(r))}).on("mouseup",function(e){l.moveStart&&(delete l.moveStart,c.moveElem.hide(),s.moveEnd&&s.moveEnd(r)),l.resizeStart&&(delete l.resizeStart,c.moveElem.hide())}),o},t.pt.callback=function(){var t=this,i=t.layero,n=t.config;t.openLayer(),n.success&&(2==n.type?i.find("iframe").on("load",function(){n.success(i,t.index)}):n.success(i,t.index)),6==g.ie&&t.IE6(i),i.find("."+d[6]).children("a").on("click",function(){var e=m(this).index();0===e?n.yes?n.yes(t.index,i):n.btn1?n.btn1(t.index,i):g.close(t.index):!1===(n["btn"+(e+1)]&&n["btn"+(e+1)](t.index,i))||g.close(t.index)}),i.find("."+d[7]).on("click",function(){!1===(n.cancel&&n.cancel(t.index,i))||g.close(t.index)}),n.shadeClose&&t.shadeo.on("click",function(){g.close(t.index)}),i.find(".layui-layer-min").on("click",function(){!1===(n.min&&n.min(i,t.index))||g.min(t.index,n)}),i.find(".layui-layer-max").on("click",function(){m(this).hasClass("layui-layer-maxmin")?(g.restore(t.index),n.restore&&n.restore(i,t.index)):(g.full(t.index,n),setTimeout(function(){n.full&&n.full(i,t.index)},100))}),n.end&&(c.end[t.index]=n.end)},c.reselect=function(){m.each(m("select"),function(e,t){var i=m(this);i.parents("."+d[0])[0]||1==i.attr("layer")&&m("."+d[0]).length<1&&i.removeAttr("layer").show(),i=null})},t.pt.IE6=function(e){m("select").each(function(e,t){var i=m(this);i.parents("."+d[0])[0]||"none"===i.css("display")||i.attr({layer:"1"}).hide(),i=null})},t.pt.openLayer=function(){g.zIndex=this.config.zIndex,g.setTop=function(e){return g.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",function(){g.zIndex++,e.css("z-index",g.zIndex+1)}),g.zIndex}},c.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},c.rescollbar=function(e){d.html.attr("layer-full")==e&&(d.html[0].style.removeProperty?d.html[0].style.removeProperty("overflow"):d.html[0].style.removeAttribute("overflow"),d.html.removeAttr("layer-full"))},(h.layer=g).getChildFrame=function(e,t){return t=t||m("."+d[4]).attr("times"),m("#"+d[0]+t).find("iframe").contents().find(e)},g.getFrameIndex=function(e){return m("#"+e).parents("."+d[4]).attr("times")},g.iframeAuto=function(e){var t,i,n;e&&(t=g.getChildFrame("html",e).outerHeight(),n=(i=m("#"+d[0]+e)).find(d[1]).outerHeight()||0,e=i.find("."+d[6]).outerHeight()||0,i.css({height:t+n+e}),i.find("iframe").css({height:t}))},g.iframeSrc=function(e,t){m("#"+d[0]+e).find("iframe").attr("src",t)},g.style=function(e,t,i){var n=m("#"+d[0]+e),a=n.find(".layui-layer-content"),o=n.attr("type"),s=n.find(d[1]).outerHeight()||0,e=n.find("."+d[6]).outerHeight()||0;n.attr("minLeft"),o!==c.type[3]&&o!==c.type[4]&&(i||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-s-e<=64&&(t.height=64+s+e)),n.css(t),e=n.find("."+d[6]).outerHeight(),o===c.type[2]?n.find("iframe").css({height:parseFloat(t.height)-s-e}):a.css({height:parseFloat(t.height)-s-e-parseFloat(a.css("padding-top"))-parseFloat(a.css("padding-bottom"))}))},g.min=function(e,t){t=t||{};var i=m("#"+d[0]+e),n=m("#"+d.SHADE+e),a=i.find(d[1]).outerHeight()||0,o=i.attr("minLeft")||181*c.minIndex+"px",s=i.css("position"),r={width:180,height:a,position:"fixed",overflow:"hidden"};c.record(i),c.minLeft[0]&&(o=c.minLeft[0],c.minLeft.shift()),t.minStack&&(r.left=o,r.top=f.height()-a,i.attr("minLeft")||c.minIndex++,i.attr("minLeft",o)),i.attr("position",s),g.style(e,r,!0),i.find(".layui-layer-min").hide(),"page"===i.attr("type")&&i.find(d[4]).hide(),c.rescollbar(e),n.hide()},g.restore=function(e){var t=m("#"+d[0]+e),i=m("#"+d.SHADE+e),n=t.attr("area").split(",");t.attr("type"),g.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(d[4]).show(),c.rescollbar(e),i.show()},g.full=function(t){var i=m("#"+d[0]+t);c.record(i),d.html.attr("layer-full")||d.html.css("overflow","hidden").attr("layer-full",t),clearTimeout(void 0),setTimeout(function(){var e="fixed"===i.css("position");g.style(t,{top:e?0:f.scrollTop(),left:e?0:f.scrollLeft(),width:f.width(),height:f.height()},!0),i.find(".layui-layer-min").hide()},100)},g.title=function(e,t){m("#"+d[0]+(t||g.index)).find(d[1]).html(e)},g.close=function(n,a){var o,e,s=m("#"+d[0]+n),r=s.attr("type");s[0]&&(o="layui-layer-wrap",e=function(){if(r===c.type[1]&&"object"===s.attr("conType")){s.children(":not(."+d[5]+")").remove();for(var e=s.find("."+o),t=0;t<2;t++)e.unwrap();e.css("display",e.data("display")).removeClass(o)}else{if(r===c.type[2])try{var i=m("#"+d[4]+n)[0];i.contentWindow.document.write(""),i.contentWindow.close(),s.find("."+d[5])[0].removeChild(i)}catch(e){}s[0].innerHTML="",s.remove()}"function"==typeof c.end[n]&&c.end[n](),delete c.end[n],"function"==typeof a&&a()},s.data("isOutAnim")&&s.addClass("layer-anim layer-anim-close"),m("#layui-layer-moves, #"+d.SHADE+n).remove(),6==g.ie&&c.reselect(),c.rescollbar(n),s.attr("minLeft")&&(c.minIndex--,c.minLeft.push(s.attr("minLeft"))),g.ie&&g.ie<10||!s.data("isOutAnim")?e():setTimeout(function(){e()},200))},g.closeAll=function(i,n){"function"==typeof i&&(n=i,i=null);var a=m("."+d[0]);m.each(a,function(e){var t=m(this);(i?t.attr("type")===i:1)&&g.close(t.attr("times"),e===a.length-1?n:null)}),0===a.length&&"function"==typeof n&&n()};function x(e){return i.skin?" "+i.skin+" "+i.skin+"-"+e:""}var i=g.cache||{};g.prompt=function(i,n){var e,t="";"function"==typeof(i=i||{})&&(n=i),i.area&&(t='style="width: '+(e=i.area)[0]+"; height: "+e[1]+';"',delete i.area);var a,t=2==i.formType?'<textarea class="layui-layer-input"'+t+"></textarea>":'<input type="'+(1==i.formType?"password":"text")+'" class="layui-layer-input">',o=i.success;return delete i.success,g.open(m.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:t,skin:"layui-layer-prompt"+x("prompt"),maxWidth:f.width(),success:function(e){(a=e.find(".layui-layer-input")).val(i.value||"").focus(),"function"==typeof o&&o(e)},resize:!1,yes:function(e){var t=a.val();""===t?a.focus():t.length>(i.maxlength||500)?g.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(i.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",a,{tips:1}):n&&n(t,e,a)}},i))},g.tab=function(n){var a=(n=n||{}).tab||{},o="layui-this",s=n.success;return delete n.success,g.open(m.extend({type:1,skin:"layui-layer-tab"+x("tab"),resize:!1,title:function(){var e=a.length,t=1,i="";if(0<e)for(i='<span class="'+o+'">'+a[0].title+"</span>";t<e;t++)i+="<span>"+a[t].title+"</span>";return i}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=a.length,t=1,i="";if(0<e)for(i='<li class="layui-layer-tabli '+o+'">'+(a[0].content||"no content")+"</li>";t<e;t++)i+='<li class="layui-layer-tabli">'+(a[t].content||"no  content")+"</li>";return i}()+"</ul>",success:function(e){var t=e.find(".layui-layer-title").children(),i=e.find(".layui-layer-tabmain").children();t.on("mousedown",function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;var t=m(this),e=t.index();t.addClass(o).siblings().removeClass(o),i.eq(e).show().siblings().hide(),"function"==typeof n.change&&n.change(e)}),"function"==typeof s&&s(e)}},n))},g.photos=function(i,e,n){var t,a,o,s,r={};if((i=i||{}).photos){var l=!("string"==typeof i.photos||i.photos instanceof m),f=l?i.photos:{},c=f.data||[],d=f.start||0;r.imgIndex=1+(0|d),i.img=i.img||"img";var u=i.success;if(delete i.success,l){if(0===c.length)return g.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var y=m(i.photos),p=function(){c=[],y.find(i.img).each(function(e){var t=m(this);t.attr("layer-index",e),c.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(p(),0===c.length)return;if(e||y.on("click",i.img,function(){p();var e=m(this).attr("layer-index");g.photos(m.extend(i,{photos:{start:e,data:c,tab:i.tab},full:i.full}),!0)}),!e)return}r.imgprev=function(e){r.imgIndex--,r.imgIndex<1&&(r.imgIndex=c.length),r.tabimg(e)},r.imgnext=function(e,t){r.imgIndex++,r.imgIndex>c.length&&(r.imgIndex=1,t)||r.tabimg(e)},r.keyup=function(e){var t;r.end||(t=e.keyCode,e.preventDefault(),37===t?r.imgprev(!0):39===t?r.imgnext(!0):27===t&&g.close(r.index))},r.tabimg=function(e){if(!(c.length<=1))return f.start=r.imgIndex-1,g.close(r.index),g.photos(i,!0,e)},r.event=function(){r.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),r.imgprev(!0)}),r.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),r.imgnext(!0)}),m(document).on("keyup",r.keyup)},r.loadi=g.load(1,{shade:!("shade"in i)&&.9,scrollbar:!1}),t=c[d].src,a=function(e){var t;g.close(r.loadi),n&&(i.anim=-1),r.index=g.open(m.extend({type:1,id:"layui-layer-photos",area:(t=[e.width,e.height],e=[m(h).width()-100,m(h).height()-100],!i.full&&(t[0]>e[0]||t[1]>e[1])&&((e=[t[0]/e[0],t[1]/e[1]])[1]<e[0]?(t[0]=t[0]/e[0],t[1]=t[1]/e[0]):e[0]<e[1]&&(t[0]=t[0]/e[1],t[1]=t[1]/e[1])),[t[0]+"px",t[1]+"px"]),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,anim:5,isOutAnim:!1,skin:"layui-layer-photos"+x("photos"),content:'<div class="layui-layer-phimg"><img src="'+c[d].src+'" alt="'+(c[d].alt||"")+'" layer-pid="'+c[d].pid+'">'+(1<c.length?'<div class="layui-layer-imgsee"><span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span><div class="layui-layer-imgbar" style="display:'+(n?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(c[d].alt||"")+"</a><em>"+r.imgIndex+" / "+c.length+"</em></span></div></div>":"")+"</div>",success:function(e,t){r.bigimg=e.find(".layui-layer-phimg"),r.imgsee=e.find(".layui-layer-imgbar"),r.event(e),i.tab&&i.tab(c[d],e),"function"==typeof u&&u(e)},end:function(){r.end=!0,m(document).off("keyup",r.keyup)}},i))},o=function(){g.close(r.loadi),g.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){1<c.length&&r.imgnext(!0,!0)}})},(s=new Image).src=t,s.complete?a(s):(s.onload=function(){s.onload=null,a(s)},s.onerror=function(e){s.onerror=null,o(e)})}},c.run=function(e){f=(m=e)(h),d.html=m("html"),g.open=function(e){return new t(e).index}},h.layui&&layui.define?(g.ready(),layui.define("jquery",function(e){g.path=layui.cache.dir,c.run(layui.$),e("layer",h.layer=g)})):"function"==typeof define&&define.amd?define(["jquery"],function(){return c.run(h.jQuery),g}):(g.ready(),c.run(h.jQuery))}(window);