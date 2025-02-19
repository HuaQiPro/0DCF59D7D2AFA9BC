// 倒序 demo：$.reverseChild('.book_list ul', 'li');
(function ($) {
    $.extend({
        reverseChild: function (obj, child) {
            var childObj = $(obj).find(child);
            var total = childObj.length;

            childObj.each(function (i) {
                $(obj).append(childObj.eq((total - 1) - i));
            });

        }
    });
})(jQuery);



/*mobile事件扩展*/
(function() {
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                    event.originalEvent.touches[ 0 ] :
                    event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function(event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();
/*mobile事件扩展*/


/*Cookie s*/
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/*Cookie e*/

/*倒序调用*/
function reverse_oder(e){
    if($(e).html()=='倒序'){
        $(e).html('顺序');
    }else {
        $(e).html('倒序');
    }
    $.reverseChild('.book_list2 ul', 'li');
    //$.pagination('.book_list2 ul li', '.book_list_m ul',1,40);
}

function change_font_size(e,classname){
    $(e).parent().find("a").removeClass("active");
    $(e).addClass("active");
    $("article").removeClass().addClass(classname);
    $("#inner").removeClass().addClass(classname);
    window.localStorage.setItem('font_size_class',classname);

    //$(".inner").addClass(font_size_class);
}

/*开关灯*/
function change_light(e){
    if($(".single").hasClass("gd")){
        $(".single").removeClass("gd");
        $("#outer").removeClass("gd");
        $(e).html('关灯');
        window.localStorage.setItem('light','关灯');
    }else{
        $(".single").addClass("gd");
        $("#outer").addClass("gd");
        $(e).html('开灯');
        window.localStorage.setItem('light','开灯');
    }

}


//禁止滚动条滚动
function unScroll() {
    var top = $(document).scrollTop();
    $(document).on('scroll.unable',function (e) {
        $(document).scrollTop(top);
    })
}
//移除禁止滚动条滚动
function removeUnScroll() {
    $(document).unbind("scroll.unable");
}
