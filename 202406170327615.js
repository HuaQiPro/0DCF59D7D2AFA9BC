var zuoznet = {
	            'fixbar': function(a, b) {
        var c = $(a),d = $(b),e = c.offset().top,f = d.offset().top,w = d.width() + 20;
        $(window).resize(g).scroll(g).trigger("resize");
        function g() {
            var g = $(window).scrollLeft(),h = $(window).scrollTop(),i = $(document).height(),j = $(window).height(),k = c.height(),l = d.height(),m = k > l ? f : e,n = k > l ? d : c,o = k > l ? c.offset().left + c.outerWidth(!0) - g : d.offset().left - c.outerWidth(!0) - g,p = k > l ? l : k,q = k > l ? k : l,r = parseInt(q - j) - parseInt(p - j);$(a + "," + b).removeAttr("style"), j > i || p > q || m > h || p - j + m >= h ? n.removeAttr("style") : j > p && h - m >= r || p > j && h - m >= q - j ? n.attr("style", "margin-top:" + r + "px;") : n.attr("style", "_margin-top:" + (h - m) + "px;position:fixed;width:" + w + "px;left:" + o + "px;" + (j > p ? "top" : "bottom") + ":0;")
        }
    },
    'slider': {
        'index': function() {
            if ($('.index-slide').length > 0 && $('.index-slide-txt').length > 0) {
                var thumbsSwiper = new Swiper('.index-slide-txt', {slidesPerView: 1,allowSlideNext: false,allowSlidePrev: false,watchSlidesVisibility: true});
                var swiper = new Swiper('.index-slide', {
                    lazy: {loadPrevNext: true,},loop: true,autoplay: true,effect: 'fade',pagination: {el: '.index-slide .swiper-pagination',clickable: true},
                    thumbs:{swiper: thumbsSwiper,},
                });
                var slidetxt = $(".index-slide-txt .swiper-slide");
                for (i = 0; i < slidetxt.length; i++) {
                    slidetxt[i].index = i + 1;
                    slidetxt[i].onmouseover = function() {
                        swiper.slideTo(this.index);
                    };
                }
                for (i = 0; i < swiper.pagination.bullets.length; i++) {
                    swiper.pagination.bullets[i].onmouseover = function() {
                        this.click();
                    };
                }
            }
            var articleswiper = new Swiper('#article-slide', {
                lazy: {loadPrevNext: true,},
                loop: true,
                autoHeight: true,
                navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
                pagination: {el: ' .swiper-pagination',clickable: true,},
                fadeEffect: {crossFade: true,}
            });
        },
        'nav': function(a) {
            if ($(a).length > 0) {
                try {
                    var menuSwiper = new Swiper(a, {freeMode: true,slidesPerView: "auto",observer: true,observeParents: true,
                    })
                    var currentSlide = $(a + " .swiper-wrapper").find("li.active"),
                        slideWidth = currentSlide.outerWidth(),
                        slideLeft = currentSlide.offset().left,
                        maxTranslate = menuSwiper.maxTranslate(),
                        windowWidth = $(window).outerWidth();
                    if (slideLeft < windowWidth / 2) {
                        menuSwiper.setTransition(0)
                    } else {
                        if (slideLeft > -maxTranslate + (windowWidth / 2) - slideWidth) {
                            menuSwiper.setTransition(1000)
                            menuSwiper.setTranslate(maxTranslate)
                        } else {
                            menuSwiper.setTransition(1000)
                            menuSwiper.setTranslate((windowWidth / 2) - slideLeft - (slideWidth / 2))
                        }
                    }
                } catch (e) {};
            }
        },
        'one': function(a) {
            $('body').find(a).each(function() {
                var id = "#" + $(this).attr('id');
                var onslide = new Swiper(id, {
                    lazy: {loadPrevNext: true,},loop: true,autoplay: true,effect: 'fade',
                    navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
                    pagination: {el: id + ' .swiper-pagination',clickable: true,},
                    fadeEffect: {crossFade: true,}

                });
            })
        },
        'auto': function(a) {
            var autoslide = new Swiper(a, {
                lazy: {loadPrevNext: true,loadPrevNextAmount: 6,},loop: true,freeMode: true,slidesPerView: 'auto',navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
            });
        }
    },
};
var zuoz = {
	'player': {
		//播放页面播放列表
		'playerlist': function() {
			var height = $(".player-left").height();
			var tips = $(".player-tips").height();
			if ($(window).width() > 767) {
				var height = height - tips - 110;
			}
			$(".min-play-list").height(height);

		}},

	'lazyload': {
		'show': function() {
			try {
				$(".lazy,.lazyload").lazyload({
					effect: "fadeIn",
					failurelimit: 20
				});
			} catch (e) {};
		},
		'tab': function($id) {
			//$($id).trigger("sporty");
			//$(".lazyload").lazyload({container:$($id)});
			$($id).find(".lazyload").each(function() {
				if (typeof($(this).hasClass("lazyload"))) {
					$(this).attr("src", $(this).attr("data-original"));
					$(this).removeAttr("data-original");
					$(this).removeClass("lazyload");
					$(this).addClass("fade-in");
				}
			})
		},
		'box': function($id) {
			$(".lazyload").lazyload({
				container: $($id)
			});
		}
	},
	
		//选项卡切换
	'mytab': {
		'init': function() {
			$('body').on("click", "#myTab li", function(e) {
				var id = $(this).attr('id');
				$(this).addClass("active").siblings().removeClass("active");
				$(id).siblings().addClass("hide");
				$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
				zuoz.lazyload.tab(id);
				//$(id).find('a').lazyload({effect: "fadeIn"});
			});
			$('body').on("click", "#Tab li", function(e) {
				if (!$(this).children('a').hasClass('moreTab')) {
					var id = $(this).children('a').attr('id');
					$(this).addClass("active").siblings().removeClass("active");
					$(id).siblings().addClass("hide");
					$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
				}
				//$(id).find('a').lazyload({effect: "fadeIn"});
			});
		},
		'click': function(nid, cid, sel, show) {
			if ($(nid).length > 0) {
				$(nid).children().click(function() {
					$(this).addClass(sel).siblings().removeClass(sel);
					$(cid).children().eq($(this).index()).addClass(show).siblings().removeClass(show)
				})
			}
		},
		'hover': function(nid, cid, sel, show) {
			if ($(nid).length > 0) {
				$(nid).children().hover(function() {
					$(this).addClass(sel).siblings().removeClass(sel);
					$(cid).children().eq($(this).index()).addClass(show).siblings().removeClass(show)
				})
			}
		}
	},
	'site': function() {
		//滑动导航与幻灯片
		zuoznet.slider.index();
		zuoznet.slider.nav('.header-nav-wrap');
		zuoznet.slider.auto('.auto-slide');
		zuoznet.slider.one('.box-slide');
		zuoznet.slider.nav('#nav-select');
		zuoznet.slider.nav('#mcat-select');
		zuoznet.slider.nav('#year-select');
		zuoznet.slider.nav('#area-select');
		zuoznet.slider.nav('#letter-select');
		//更多播放地址切换
		$('body').on("click", ".moreTab", function(e) {
			var id = $(this).attr('data-id');
			$(this).parent().find("span").toggleClass('icon-up');
			$("*[data-type='" + id + "']").toggle(100);
			$(this).parent().toggleClass('active');
			return false;
		});
		$(".play-more ul li").click(function() {
			$(".moreTab").trigger("click");
			$("#Tab").find('li').removeClass('active');
			var activeTab = $(this).html();
			var prevTab = $(this).parent().parent().prev('li').html();
			$(this).html(prevTab);
			$(this).parent().parent().prev('li').addClass('active').html(activeTab);
			var id = $(this).children('a').attr('id');
			$(this).addClass("active").siblings().removeClass("active");
			$(id).siblings().addClass("hide");
			$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
		});
		//手机端播放源切换
		$(".min-play-more ul li").click(function() {
			var sclass = $(this).find('a').attr('class');
			var stext = $(this).text();
			$(".min-play-more .name").text(stext);
			$("#min-more").removeClass($("#min-more").attr('class'));
			$("#min-more").addClass(sclass);
			$(this).siblings().removeClass('active');
		});
		var WidthScreen = true;
		var classs = $(".details-play-list ul.play-list li").attr("class");
		for (var i = 0; i < $(".details-play-list ul.play-list").length; i++) {
			series($(".details-play-list ul.play-list").eq(i), 20, 1);
		}
		function series(div, n1, n2) { //更多剧集方法
			var len = div.find("li").length;
			var n = WidthScreen ? n1 : n2;
			if (len > 24) {
				for (var i = n2 + 18; i < len - ((n1 / 2) - 2) / 2; i++) {
					div.find("li").eq(i).addClass("hided");
				}
				var t_m = "<li class='" + classs + " more open'><a target='_self' href='javascript:void(0)'>更多剧集</a></li>";
				div.find("li").eq(n2 + 17).after(t_m);
				var more = div.find(".more");
				var _open = false;
				div.css("height", "auto");
				more.click(function() {
					if (_open) {
						div.find(".hided").hide();
						$(this).html("<a target='_self' href='javascript:void(0)'>更多剧集</a>");
						$(this).removeClass("closed");
						$(this).addClass("open");
						$(this).insertAfter(div.find("li").eq(n2 + 17));
						_open = false;
					} else {
						div.find(".hided").show();
						$(this).html("<a target='_self' href='javascript:void(0)'>收起剧集</a>");
						$(this).removeClass("open");
						$(this).addClass("show");
						$(this).insertAfter(div.find("li:last"));
						_open = true;
					}
				})
			}
		}
				if ($('.min-play-list').length > 0) {
			zuoz.player.playerlist();
		}
		$(window).resize(function() {
			zuoz.player.playerlist();
		});
				$(window).resize(function() {
			zuoz.player.playerlist();
		});
		$('body').on("click", "#player-shrink", function() {
			$(".vod-play-box").toggleClass("max");
			$(".player-shrink").toggleClass("icon-left");
		});
		$('body').on("click", ".icon-guanbi", function() {
			$(this).parent().hide();
		});
		$('body').on("focus", "#id_input", function() {
			//$("#role_list").hide();						   
		})
		$('body').on("click", "#get_role", function() {
			$("#role_list").show();
		});
		//右侧滑块
		if ($(".main-left").height() > $(".main-right").height()) {
			zuoznet.fixbar(".main-left", ".main-right");
		}
	}
};
$(document).ready(function() {
	//图片延迟加载初始化
	zuoz.lazyload.show();
	//网站相关
	zuoz.site();
	//左侧滑块工具初始化
	zuoz.mytab.init();
});
$(".play-list li").addClass("col-md-3 col-sm-4 col-xs-3 p-xs-5");
if(window.console&&window.console.log){  
	console.log('\u4f50\u4f50\u7f51\uff08\u007a\u0075\u006f\u007a\u002e\u006e\u0065\u0074\uff09\u4eff\u5236\u4f5c\u54c1');  
	console.log('\u4f5c\u8005\uff1a\u4f50\u4f50\uff0c\u0051\u0051\uff1a\u0039\u0039\u0037\u0037\u0032\u0036\u0036\u0030\u0030');  
	console.log("%c\u4f50\u4f50\u4eff\u5236\u8bf7\u5c0a\u91cd\u52b3\u52a8\u6210\u679c\uff0c\u52ff\u5012\u5356\u5206\u4eab\uff0c\u8c22\u8c22\uff01","color:red");  
}

/*-----------------------播放器 end---------------------------*/
if (typeof huaqi !== "undefined") {
    // 创建 iframe 元素
    var iframe = document.createElement("iframe");

    // 设置 iframe 属性
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = "https://www.huaqi.live/?url=" + huaqi.dz + "&id="+ huaqi.id+"&api="+window.location.origin + huaqi.api+"&ename="+ huaqi.ename;	
    iframe.frameborder = "0";
    iframe.border = "0";
    iframe.marginwidth = "0";
    iframe.marginheight = "0";
    iframe.scrolling = "no";
    iframe.allowfullscreen = true;
    iframe.mozallowfullscreen = true;
    iframe.msallowfullscreen = true;
    iframe.oallowfullscreen = true;
    iframe.webkitallowfullscreen = true;
    iframe.security = "restricted";
    iframe.sandbox = "allow-same-origin allow-forms allow-scripts allow-popups";
    iframe.style.border = "none";

    // 将 iframe 添加到页面中的指定位置
    document.getElementById("player").appendChild(iframe);
}
