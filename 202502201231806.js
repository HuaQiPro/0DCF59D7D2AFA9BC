if(getCookie('read_tooltip')==null){
    // $('#fullscreenread').tooltip('show');
    // setCookie('read_tooltip',1)
 }else{
     //$('#fullscreenread').tooltip('hide');
 }

 /*本地缓存*/
 var font_size_class = window.localStorage.getItem('font_size_class');
 if (font_size_class != null) {
     $("#" + font_size_class).parent().find('a').removeClass("active");
     $("#" + font_size_class).addClass("active");
     $("article").removeClass().addClass(font_size_class);
     $("#inner").removeClass().addClass(font_size_class);
 } else {
     $("#inner").removeClass().addClass("font_middle");
 }
 /*本地缓存*/
 var light = window.localStorage.getItem('light');
 if (light != null) {
     if (light == '关灯') {
         $(".single").removeClass("gd");
         $("#outer").removeClass("gd");
         $("#light").html('关灯');
     } else {
         $(".single").addClass("gd");
         $("#outer").addClass("gd");
         $("#light").html('开灯');
     }
 }

 /*-----------------全屏幕阅读--------------*/
 function full_screen_read() {
     unScroll();
     var b ='<span style="color: chocolate;">你已经进入全屏模式<br>向左滑下一页，向右滑上一页，向上滑下一屏，向下滑上一屏，双击屏幕退出</span><br>'
     var a= '<p style="color: chocolate;">本章已结束，向左滑动进入下一章</p>'
     var textall=$("article").html()
     $("#outer").find("#inner").html(b+textall+a);
     $("#outer").show();
 }

 /*-----------------下--------------*/
 $('#outer').on('swipedown', function () {
     var h = $("#outer").scrollTop() - $("#outer").height();
     if (h > 0) {
         $("#outer").animate({scrollTop: h + "px"}, 500);
     } else {
         $("#outer").animate({scrollTop: "0px"}, 500);
     }
 });

 /*-----------------上--------------*/
 $('#outer').on('swipeup', function () {
     var h = $("#outer").scrollTop() + $("#outer").height();
     if (h < $("#inner").height()) {
         $("#outer").animate({scrollTop: h + "px"}, 500);
     }
 });

 /*-----------------左--------------*/
 $('#outer').on('swipeleft', function () {
     //window.location.href = $("#prev").attr('href');
     window.location.href = $("#next").attr('data');
    
 });

 /*-----------------右--------------*/
 $('#outer').on('swiperight', function () {
    // window.location.href = $("#next").attr('href');
    window.location.href = $("#prev").attr('data');
 });

 /*-----------------双击兼容--------------*/
 var touchtime = 0;
 $("#outer").on("click", function () {
     if (touchtime == 0) {
         touchtime = new Date().getTime();
     } else {
         if (((new Date().getTime()) - touchtime) < 800) {
             removeUnScroll();
             $(this).hide();
         } else {
             touchtime = new Date().getTime();
         }
     }
 });
 /*-----------转换------------*/
 var lr_change_out = window.localStorage.getItem('lr_change');
 if(lr_change_out!= null){
     lr_change_do();
 }

 function lr_change() {
     lr_change_do();
     var lr_change = window.localStorage.getItem('lr_change');
     if(lr_change!= null){
         window.localStorage.removeItem('lr_change');
     }else{
         window.localStorage.setItem('lr_change',1);
     }
 }
 
 function lr_change_do(){
     var pre=$("#prev").html();
     var pre_data=$("#prev").attr("data");
     var pre_href=$("#prev").attr("href");
     
     var next=$("#next").html();
     var next_data=$("#next").attr("data");
     var next_href=$("#next").attr("href");

     $("#prev").html(next);
     $("#prev").attr("data",next_data);
     $("#prev").attr("href",next_href);

     $("#prev1").html(next);
     $("#prev1").attr("data",next_data);
     $("#prev1").attr("href",next_href);

     $("#next").html(pre);
     $("#next").attr("data",pre_data);
     $("#next").attr("href",pre_href);

     $("#next1").html(pre);
     $("#next1").attr("data",pre_data);
     $("#next1").attr("href",pre_href);
 }
 document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    document.getElementById('prev').click();
  } else if (event.key === 'ArrowRight') {
    document.getElementById('next').click();
  }
});