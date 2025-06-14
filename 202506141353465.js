let XMlayEr = {
    "decrypt": function (I1li1iIi, I1iiIIlI, iliIlI1) {
      let lIlIlIl1 = CryptoJS.AES.decrypt(I1li1iIi, CryptoJS.enc.Utf8.parse(I1iiIIlI), {
        "iv": CryptoJS.enc.Utf8.parse(iliIlI1),
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
      });
      return lIlIlIl1.toString(CryptoJS.enc.Utf8);
    },
    "error": function (liIl1II1) {
      $("#player").hide();
      $("#loading").hide();
      $("body").append("<div id=\"error\"><h1>" + liIl1II1 + "</h1></div>");
    },
    "AjaxData": function (I11iI1, I11il11) {
      $.ajaxSettings.timeout = "6000";
      $.ajaxSettings.async = true;
      $.post("https://api_play.huaqi.pro/huaqitv.js", I11iI1, function (I1I11li1) {
        I1I11li1.code == 200 ? I11il11(I1I11li1) : XMlayEr.error(I1I11li1.msg);
      }, "json").error(function (lI1Iii1I, lllli1ll, l1IIlll) {
        $.post("https://api_tihuan.huaqi.pro/huaqitv.js", I11iI1, function (Ilili11) {
          Ilili11.code == 200 ? I11il11(Ilili11) : XMlayEr.error(Ilili11.msg);
        }, "json").error(function (IiIi1lil, l11IiiI, l1iiiII1) {
          XMlayEr.error("接口请求失败,请尝试刷新重试");
        });
      });
    },
    "XMlayEr": function () {
      $.ajax({
        "type": "get",
        "url": "https://data.video.iqiyi.com/v.f4v",
        "success": function (II1Iii1i) {
          var IliIII = navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) != null ? 1 : 0,
            IliIiIII = new URLSearchParams(location.search),
            iIII1llI = IliIiIII.get("wap") ?? IliIII;
          XMlayEr.next0 = IliIiIII.get("next");
          var i1ilIiiI = II1Iii1i.t,
            i1i1lil1 = II1Iii1i.time,
            IlIlilIl = sign(hex_md5(i1i1lil1 + url));
          XMlayEr.AjaxData({
            "wap": iIII1llI,
            "url": url,
            "time": i1i1lil1,
            "key": IlIlilIl,
            "area": i1ilIiiI
          }, function (iliiI111) {
            aes_key = iliiI111.aes_key;
            aes_iv = iliiI111.aes_iv;
            XMlayEr.name = iliiI111.name;
            XMlayEr.type = iliiI111.type;
            XMlayEr.vurl = XMlayEr.decrypt(iliiI111.url, aes_key, aes_iv);
            XMlayEr.next = XMlayEr.decrypt(iliiI111.next, aes_key, aes_iv);
            XMlayEr.html = XMlayEr.decrypt(iliiI111.html, aes_key, aes_iv);
            XMlayEr.dmid = iliiI111.dmid;
            XMlayEr.ggdmapi = iliiI111.ggdmapi;
            XMlayEr.load();
            
            // 添加反馈按钮
            $(".art-video-player").append('<div class="feedback-btn" style="position:absolute;left:20px;top:20px;z-index:100;background:rgba(0,0,0,0.5);color:#fff;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:14px;">播放反馈</div>');
            
            // 添加反馈按钮点击事件
            $(".feedback-btn").click(function() {
              $.post("https://www.huaqi.live/feedback/", {
                url: url,
                vurl: XMlayEr.vurl,
                type: XMlayEr.type,
                name: XMlayEr.name
              }, function(res) {
                if(res.code == 200) {
                  XMlayEr.tips.msg("反馈已提交，感谢您的反馈！");
                } else {
                  XMlayEr.tips.msg("反馈提交失败，请稍后重试");
                }
              }, "json").error(function() {
                XMlayEr.tips.msg("反馈提交失败，请稍后重试");
              });
            });
          });
        },
        "error": function (I1l1lIil, IIl1I1ll, iil1l1II) {
          XMlayEr.error("请检查你的网络是否正常!");
        }
      });
    },
    "empty": function (lll1iiII) {
      return lll1iiII == null || lll1iiII === "";
    },
    "cookie": {
      "Set": function (lI1IIlII, iiI11lIi, iI1IIiIl = 7, ilIi1iII = "1") {
        if (ilIi1iII === "1") {
          localStorage.setItem(lI1IIlII, iiI11lIi);
        } else {
          let lill1Ii = new Date();
          lill1Ii.setTime(lill1Ii.getTime() + iI1IIiIl * 24 * 60 * 60 * 1000);
          document.cookie = lI1IIlII + "=" + encodeURIComponent(iiI11lIi) + ";path=/;expires=" + lill1Ii.toUTCString();
        }
      },
      "Get": function (i11IIi1, IIil1iil = "1") {
        if (IIil1iil === "1") return localStorage.getItem(i11IIi1);else {
          {
            let Ii11111l = document.cookie.match(new RegExp("(^| )" + i11IIi1 + "=([^;]*)(;|$)"));
            if (Ii11111l != null) {
              return decodeURIComponent(Ii11111l[2]);
            }
          }
        }
      },
      "Del": function (l11i1Il, l11IllIi = "1") {
        if (l11IllIi === "1") localStorage.removeItem(l11i1Il);else {
          {
            let I1I1iIll = new Date();
            I1I1iIll.setTime(I1I1iIll.getTime() - 1);
            let lIIlIili = this.Get(l11i1Il, 2);
            lIIlIili != null && (document.cookie = l11i1Il + "=" + encodeURIComponent(lIIlIili) + ";path=/;expires=" + I1I1iIll.toUTCString());
          }
        }
      }
    },
    "play": function () {
      let II1ilIli = {
        "container": "#player",
        "contextmenu": [],
        "autoplay": true,
        "icons": {
          "loading": "<div id=\"qloading\"></div>",
          "indicator": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\" width=\"18\" height=\"18\" preserveAspectRatio=\"xMidYMid meet\" style=\"width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);\"><defs><clipPath id=\"__lottie_element_602\"><rect width=\"18\" height=\"18\" x=\"0\" y=\"0\"></rect></clipPath></defs><g clip-path=\"url(#__lottie_element_602)\"><g transform=\"matrix(0.9883429408073425,-0.7275781631469727,0.6775955557823181,0.920446515083313,7.3224687576293945,-0.7606706619262695)\" opacity=\"1\" style=\"display: block;\"><g opacity=\"1\" transform=\"matrix(0.9937776327133179,-0.11138220876455307,0.11138220876455307,0.9937776327133179,-2.5239999294281006,1.3849999904632568)\"><path fill=\"rgb(51,51,51)\" fill-opacity=\"1\" d=\" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z\"></path></g></g><g transform=\"matrix(1.1436611413955688,0.7535901665687561,-0.6317168474197388,0.9587040543556213,16.0070743560791,2.902894973754883)\" opacity=\"1\" style=\"display: block;\"><g opacity=\"1\" transform=\"matrix(0.992861807346344,0.1192704513669014,-0.1192704513669014,0.992861807346344,-2.5239999294281006,1.3849999904632568)\"><path fill=\"rgb(51,51,51)\" fill-opacity=\"1\" d=\" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z\"></path></g></g><g transform=\"matrix(1,0,0,1,8.890999794006348,8.406000137329102)\" opacity=\"1\" style=\"display: block;\"><g opacity=\"1\" transform=\"matrix(1,0,0,1,0.09099999815225601,1.1009999513626099)\"><path fill=\"rgb(255,255,255)\" fill-opacity=\"1\" d=\" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z\"></path><path stroke-linecap=\"butt\" stroke-linejoin=\"miter\" fill-opacity=\"0\" stroke-miterlimit=\"4\" stroke=\"rgb(51,51,51)\" stroke-opacity=\"1\" stroke-width=\"1.5\" d=\" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z\"></path></g></g><g transform=\"matrix(1,0,0,1,8.89900016784668,8.083999633789062)\" opacity=\"1\" style=\"display: block;\"><g opacity=\"1\" transform=\"matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)\"><path fill=\"rgb(51,51,51)\" fill-opacity=\"1\" d=\" M0.875,-1.125 C0.875,-1.125 0.875,1.125 0.875,1.125 C0.875,1.607912540435791 0.48291251063346863,2 0,2 C0,2 0,2 0,2 C-0.48291251063346863,2 -0.875,1.607912540435791 -0.875,1.125 C-0.875,1.125 -0.875,-1.125 -0.875,-1.125 C-0.875,-1.607912540435791 -0.48291251063346863,-2 0,-2 C0,-2 0,-2 0,-2 C0.48291251063346863,-2 0.875,-1.607912540435791 0.875,-1.125z\"></path></g></g><g transform=\"matrix(1,0,0,1,14.008999824523926,8.083999633789062)\" opacity=\"1\" style=\"display: block;\"><g opacity=\"1\" transform=\"matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)\"><path fill=\"rgb(51,51,51)\" fill-opacity=\"1\" d=\" M0.8999999761581421,-1.100000023841858 C0.8999999761581421,-1.100000023841858 0.8999999761581421,1.100000023841858 0.8999999761581421,1.100000023841858 C0.8999999761581421,1.596709966659546 0.4967099726200104,2 0,2 C0,2 0,2 0,2 C-0.4967099726200104,2 -0.8999999761581421,1.596709966659546 -0.8999999761581421,1.100000023841858 C-0.8999999761581421,1.100000023841858 -0.8999999761581421,-1.100000023841858 -0.8999999761581421,-1.100000023841858 C-0.8999999761581421,-1.596709966659546 -0.4967099726200104,-2 0,-2 C0,-2 0,-2 0,-2 C0.4967099726200104,-2 0.8999999761581421,-1.596709966659546 0.8999999761581421,-1.100000023841858z\"></path></g></g></g></svg>",
          "state": "<svg t=\"1735985723837\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"18247\" width=\"80\" height=\"80\"><path d=\"M830.577778 227.555556H657.066667l74.903703-70.162963c11.377778-11.377778 11.377778-29.392593 0-39.822223-5.688889-5.688889-13.274074-8.533333-21.807407-8.533333-7.585185 0-15.17037 2.844444-21.807407 8.533333L570.785185 227.555556H456.059259L338.488889 117.57037c-5.688889-5.688889-13.274074-8.533333-21.807408-8.533333-7.585185 0-15.17037 2.844444-21.807407 8.533333-11.377778 11.377778-11.377778 29.392593 0 39.822223L369.777778 227.555556H193.422222C117.57037 227.555556 56.888889 295.822222 56.888889 381.155556v332.8c0 85.333333 60.681481 153.6 136.533333 153.6h42.666667c0 25.6 22.755556 47.407407 50.251852 47.407407s50.251852-20.859259 50.251852-47.407407h353.659259c0 25.6 22.755556 47.407407 50.251852 47.407407s50.251852-20.859259 50.251852-47.407407h38.874074c75.851852 0 136.533333-69.214815 136.533333-153.6V381.155556c0.948148-85.333333-59.733333-153.6-135.585185-153.6zM698.785185 574.577778L425.718519 733.866667c-22.755556 13.274074-41.718519 2.844444-41.718519-24.651852V389.688889c0-26.548148 18.962963-37.925926 41.718519-24.651852l273.066666 160.237037c22.755556 14.222222 22.755556 35.081481 0 49.303704z\" p-id=\"18248\" fill=\"#ffffff\"></path></svg>",
          "play": "<svg t=\"1735986127554\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"35346\" width=\"24\" height=\"24\"><path d=\"M829.696 584.405333c-3.626667 3.712-17.28 19.584-29.994667 32.597334-74.538667 82.133333-311.765333 216.533333-413.568 257.536-15.445333 6.613333-54.528 20.565333-75.434666 21.461333a123.733333 123.733333 0 0 1-57.301334-13.952 119.893333 119.893333 0 0 1-50.858666-57.856c-6.4-16.853333-16.426667-67.2-16.426667-68.096C176.213333 701.013333 170.666667 611.456 170.666667 512.512c0-94.293333 5.504-180.181333 13.653333-236.117333 0.938667-0.853333 10.922667-63.445333 21.802667-84.906667C226.176 152.32 265.258667 128 307.072 128h3.626667c27.264 0.938667 84.565333 25.258667 84.565333 26.197333 96.298667 41.088 329.002667 168.874667 405.376 253.824 0 0 21.504 21.802667 30.890667 35.413334 14.549333 19.626667 21.802667 43.861333 21.802666 68.096 0 27.093333-8.149333 52.309333-23.637333 72.832z\" fill=\"#ffffff\" p-id=\"35347\"></path></svg>",
          "volume": "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" data-pointer=\"none\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path fill=\"#fff\" fill-rule=\"evenodd\" stroke=\"#fff\" stroke-width=\"0.3\" d=\"M12.781 4.285A.75.75 0 0 1 14 4.871V19.13a.75.75 0 0 1-1.219.586l-4.24-3.393a3.75 3.75 0 0 0-2.343-.822H4.38c-.343 0-.583-.219-.628-.482A18.013 18.013 0 0 1 3.5 12c0-1.246.13-2.297.253-3.018.045-.263.285-.482.628-.482h1.817a3.75 3.75 0 0 0 2.342-.822l4.242-3.393Zm2.719.586c0-1.886-2.182-2.936-3.656-1.757l-4.24 3.393A2.25 2.25 0 0 1 6.197 7H4.38c-.996 0-1.925.671-2.106 1.728A19.516 19.516 0 0 0 2 12c0 1.347.14 2.485.275 3.272C2.456 16.328 3.385 17 4.38 17h1.817c.51 0 1.006.174 1.405.493l4.241 3.393c1.474 1.179 3.656.129 3.656-1.757V4.87Zm4.56.565a.75.75 0 0 1 1.057.084 10.002 10.002 0 0 1 0 12.96.75.75 0 0 1-1.141-.974 8.502 8.502 0 0 0 0-11.012.75.75 0 0 1 .084-1.058Zm-2.815 2.808a.75.75 0 0 1 1.05.147 6.003 6.003 0 0 1 0 7.216.75.75 0 1 1-1.198-.903 4.504 4.504 0 0 0 0-5.41.75.75 0 0 1 .148-1.05Z\" clip-rule=\"evenodd\"></path></svg>",
          "volumeClose": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" data-pointer=\"none\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path fill=\"#fff\" fill-rule=\"evenodd\" stroke=\"#fff\" stroke-width=\"0.3\" d=\"M12.781 4.285A.75.75 0 0 1 14 4.871V19.13a.75.75 0 0 1-1.219.586l-4.24-3.393a3.75 3.75 0 0 0-2.343-.822H4.38c-.343 0-.583-.219-.628-.482A18.013 18.013 0 0 1 3.5 12c0-1.246.13-2.297.253-3.018.045-.263.285-.482.628-.482h1.817a3.75 3.75 0 0 0 2.342-.822l4.242-3.393Zm2.719.586c0-1.886-2.182-2.936-3.656-1.757l-4.24 3.393A2.25 2.25 0 0 1 6.197 7H4.38c-.996 0-1.925.671-2.106 1.728A19.516 19.516 0 0 0 2 12c0 1.347.14 2.485.275 3.272C2.456 16.328 3.385 17 4.38 17h1.817c.51 0 1.006.174 1.405.493l4.241 3.393c1.474 1.179 3.656.129 3.656-1.757V4.87Zm7.78 5.16a.75.75 0 1 0-1.06-1.061l-1.97 1.97-1.97-1.97a.75.75 0 1 0-1.06 1.06L19.19 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06l1.97-1.97 1.97 1.97a.75.75 0 1 0 1.06-1.06L21.31 12l1.97-1.97Z\" clip-rule=\"evenodd\"></path></svg>",
          "setting": "<svg class=\"icon\" viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\"><path d=\"M17.404 4.557a3.5 3.5 0 0 1 3.031 1.75l3.516 6.09a3.5 3.5 0 0 1 0 3.5l-3.49 6.044a3.5 3.5 0 0 1-3.133  1.748l-6.88-.202a3.5 3.5 0 0 1-2.87-1.65l-3.664-5.892a3.5 3.5 0 0 1-.059-3.599l3.487-6.039a3.5 3.5 0 0 1 3.031-1.75Zm0 1.75h-7.031a1.75 1.75 0 0 0-1.516.875l-3.486 6.04a1.75 1.75 0 0 0 .03 1.799l3.664 5.892c.31.498.848.808 1.434.825l6.88.202a1.75 1.75 0 0 0 1.567-.874l3.49-6.045a1.75 1.75 0 0 0 0-1.75L18.92 7.182a1.75 1.75 0 0 0-1.516-.875Zm-6.437 5.962a3.5 3.5 0 1 1 6.063 3.5 3.5 3.5 0 0 1-6.063-3.5Zm3.907.234a1.75 1.75 0 1 0-1.75 3.031 1.75 1.75 0 0 0 1.75-3.03Z\" stroke-width=\".5\" fill-rule=\"evenodd\"></path></svg>",
          "fullscreenOn": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" data-pointer=\"none\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"#fff\" stroke=\"#fff\" stroke-width=\"0.3\" fill-rule=\"evenodd\" d=\"M6 4a2 2 0 0 0-2 2v6.5a1 1 0 0 0 2 0V6h6.5a1 1 0 1 0 0-2H6Zm14 7.5a1 1 0 1 0-2 0V18h-6.5a1 1 0 1 0 0 2H18a2 2 0 0 0 2-2v-6.5Z\" clip-rule=\"evenodd\"></path></svg>"
        }
      };
      II1ilIli.flip = true;
      II1ilIli.hotkey = true;
      II1ilIli.playbackRate = true;
      II1ilIli.aspectRatio = true;
      II1ilIli.screenshot = false;
      II1ilIli.pip = true;
      II1ilIli.fullscreen = true;
      II1ilIli.miniProgressBar = true;
      II1ilIli.fastForward = true;
      II1ilIli.airplay = true;
      II1ilIli.autoOrientation = true;
      let Iil1lIII = XMlayEr.vurl,
        IliII1lI = XMlayEr.type;
      II1ilIli.lang = "zh-cn";
      II1ilIli.theme = "#CC6633";
      II1ilIli.volume = Number(0.5);
      II1ilIli.setting = true;
      II1ilIli.url = Iil1lIII;
      if (IliII1lI === "flv") {
        II1ilIli.type = "flv";
        II1ilIli.customType = {
          "flv": function Iilii11I(IiI1I1lI, iIIIili, II1Il1) {
            {
              if (flvjs.isSupported()) {
                {
                  const i1lI11il = flvjs.createPlayer({
                    "type": "flv",
                    "url": iIIIili
                  });
                  i1lI11il.attachMediaElement(IiI1I1lI);
                  i1lI11il.load();
                  II1Il1.flv = i1lI11il;
                  II1Il1.once("url", () => i1lI11il.destroy());
                  II1Il1.once("destroy", () => i1lI11il.destroy());
                }
              } else II1Il1.notice.show = "Unsupported playback format: flv";
            }
          }
        };
      } else (IliII1lI === "m3u8" || IliII1lI === "hls") && (II1ilIli.type = "m3u8", II1ilIli.customType = {
        "m3u8": function iiiIIIl(iiil1IlI, iIll111, Il1l1iIl) {
          if (Hls.isSupported()) {
            {
              const IIi1IiiI = new Hls();
              IIi1IiiI.loadSource(iIll111);
              IIi1IiiI.attachMedia(iiil1IlI);
              Il1l1iIl.hls = IIi1IiiI;
              Il1l1iIl.once("url", () => IIi1IiiI.destroy());
              Il1l1iIl.once("destroy", () => IIi1IiiI.destroy());
            }
          } else {
            if (iiil1IlI.canPlayType("application/vnd.apple.mpegurl")) iiil1IlI.src = iIll111;else {
              Il1l1iIl.notice.show = "Unsupported playback format: m3u8";
            }
          }
        }
      });
      XMlayEr.void = new Artplayer(II1ilIli);
      $(document).on("click", ".yxq-vod-list", function () {
        var Ii1i1iI = $(".yxq-listbox");
        if (Ii1i1iI.length > 0) {
          $(".vodlist-of,.r-button").toggle();
          if ($(".yxq-stting").length > 0) {
            Ii1i1iI.removeClass("yxq-stting");
          } else {
            Ii1i1iI.addClass("yxq-stting");
          }
        } else Ii1i1iI.addClass("yxq-stting");
      });
    },
    "load": function () {
      XMlayEr.play();
      let lliiIl1 = "#CC6633",
        lii1111I = ".s-on svg circle,.s-on svg path{fill:" + lliiIl1 + "!important}.t-color{color:" + lliiIl1 + "}.t-bj{background-color:" + lliiIl1 + "}.ec-subtitle p{color: #fff; font-size: 1.6vw;background:#000c;}" + XMlayEr.header.logoCss() + "@media (max-width: 767px){.player-logo{width:100px}}";
      $("head").append("<style>" + lii1111I + "</style>");
      box.children().append("<div class=\"lock-box\"></div><div class=\"ec-danMa text\"><div class=\"ec-danMa-item ec-danMa-item--demo\"></div></div><div class=\"ec-subtitle\"></div><div class=\"header ease flex between\"><div class=\"player-title\"></div><div class=\"flex qoe-normal\" style=\"display:none\"><div class=\"kui-time\"></div><div class=\"batteryShape\"><div class=\"level\"><div class=\"percentage\"></div></div></div></div></div><div class=\"dm-box flex dm-wap\"><div class=\"dm-box-left flex\"><div class=\"dm-box-cc\" data-id=\"0\"></div><div class=\"dm-box-set\"></div><div class=\"dm-set-box ec-box\"><div id=\"dm_n1\" class=\"dm-set-list ds-set-show\">\n<div class=\"flex between\" data-id=\"1\"><div class=\"dm-set-label\">弹幕速度</div><div class=\"set-toggle flex\"><span>适中</span></div></div>\n<div class=\"flex between\" data-id=\"2\"><div class=\"dm-set-label\">字体大小</div><div class=\"set-toggle flex\"><span>默认</span></div></div>\n<div class=\"flex between\" data-id=\"3\"><div class=\"dm-set-label\">不透明度</div><div class=\"set-toggle flex\"><span>100%</span></div></div>\n<div class=\"flex between\"  data-id=\"4\"><div class=\"dm-set-label\">弹幕范围</div><div class=\"set-toggle flex\"><span>3/4</span></div></div></div></div></div>\n<div class=\"dm-input-box flex-auto\"><div class=\"dm-box-t\"><div class=\"dm-style-box ec-box\"><div class=\"dm-style-title\">弹幕方向</div><div class=\"content_dmP-1 flex\">\n<div class=\"item on-1\" data-type=\"right\">滚动<i></i></div><div class=\"item\" data-type=\"top\">顶部<i></i></div><div class=\"item\" data-type=\"bottom\">底部<i></i></div></div>\n<div class=\"dm-style-title\">弹幕颜色</div><div class=\"content_dmP-2 flex\"><div class=\"item on-1\">默认<i></i></div><div class=\"item\" data-color=\"#02CC92\" style=\"color:#02CC92;border-color:#02CC92;\">青草绿<i></i></div>\n<div class=\"item\" data-color=\"#03A5FF\"  style=\"color:#03A5FF;border-color:#03A5FF;\">香菇蓝<i></i></div><div class=\"item\" data-color=\"#FF893B\"  style=\"color:#FF893B;border-color:#FF893B;\">暖阳橙<i></i></div>\n<div class=\"item\" data-color=\"#FC265E\"  style=\"color:#FC265E;border-color:#FC265E;\">喜庆红<i></i></div><div class=\"item\" data-color=\"#BE8DF7\"  style=\"color:#BE8DF7;border-color:#BE8DF7;\">销魂紫<i></i></div>\n</div></div><img alt=\"弹幕颜色\" class=\"dm-box-t-img\" src=\"https://img.alicdn.com/imgextra/i2/O1CN01KdGeoZ25bCijuGQzn_!!6000000007544-2-tps-69-66.png\"></div><input class=\"dm-input\" type=\"text\" data-time=\"10\" autocomplete=\"off\" placeholder=\"来发个弹幕吧~\" maxlength=\"22\">\n<button class=\"dm-send t-bj\" data-balloon=\"发送\" data-balloon-pos=\"up\">发送</button></div></div><div class=\"player-list-off off\"></div><div class=\"ec-box player-list\"><div class=\"new-check\"><div class=\"new-body\"></div></div></div><div class=\"ec-remember\"></div><div class=\"broadside seat1\"></div>");
      $(".art-controls-right").prepend("<div class=\"art-control dm-bnt hint--rounded hint--top\" data-index=\"20\" aria-label=\"发弹幕\"><i class=\"art-icon\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M833.94335938 148.30859375H190.05664062c-39.28710938 0-71.19140625 31.90429688-71.19140624 71.19140625V689.5390625c0 39.28710938 31.90429688 71.19140625 71.19140625 71.19140625h169.45312499l131.13281251 107.05078125c6.50390625 5.2734375 14.32617188 7.91015625 22.23632812 7.91015625 7.82226563 0 15.73242188-2.63671875 22.1484375-7.91015625l131.8359375-107.05078125h166.9921875c39.28710938 0 71.19140625-31.90429688 71.19140625-71.19140625V219.5c0.08789063-39.28710938-31.90429688-71.19140625-71.10351563-71.19140625z m0.87890624 541.23046875c0 0.43945313-0.43945313 0.87890625-0.87890625 0.87890625H654.47070313c-8.0859375 0-15.90820313 2.8125-22.14843751 7.91015625L512.96679688 795.18359375 394.31445312 698.328125c-6.24023438-5.09765625-14.15039063-7.91015625-22.23632812-7.91015625H190.05664062c-0.43945313 0-0.87890625-0.43945313-0.87890624-0.87890625V219.5c0-0.43945313 0.43945313-0.87890625 0.87890625-0.87890625h643.79882812c0.43945313 0 0.87890625 0.43945313 0.87890625 0.87890625V689.5390625z\"></path><path d=\"M345.09570312 455.3984375m-43.94531249 0a43.9453125 43.9453125 0 1 0 87.89062499 0 43.9453125 43.9453125 0 1 0-87.890625 0Z\"></path><path d=\"M512.96679688 455.3984375m-43.9453125 0a43.9453125 43.9453125 0 1 0 87.89062499 0 43.9453125 43.9453125 0 1 0-87.890625 0Z\"></path><path d=\"M681.01367188 455.3984375m-43.94531251 0a43.9453125 43.9453125 0 1 0 87.89062501 0 43.9453125 43.9453125 0 1 0-87.890625 0Z\"></path></svg></i></div><div class=\"art-control content-bnt hint--rounded hint--top\" data-index=\"20\" aria-label=\"字幕开关\"><i class=\"art-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z\"></path></svg></i></div>");
      XMlayEr.LoadAnimation();
      XMlayEr.header.Init();
      $(".content-bnt").remove();
      XMlayEr.danMu.Init();
      XMlayEr.list.html();
      XMlayEr.list.next();
      XMlayEr.list.autoNext();
      XMlayEr.broadside();
      XMlayEr.void.on("video:timeupdate", function () {
        let iIilIi1l = XMlayEr.void.currentTime;
        XMlayEr.cookie.Set(url, iIilIi1l, 7, 2);
      });
      XMlayEr.void.on("video:ended", function () {
        XMlayEr.cookie.Del(url, 2);
      });
    },
    "tips": {
      "removeMsg": function () {
        $(".pop-msg").remove();
      },
      "msg": function (l1ilii, li1iIIiI) {
        let l1llIllI = li1iIIiI || 3000;
        $(".pop-msg").length > 0 && XMlayEr.tips.removeMsg();
        box.children().append("<div class=\"pop-msg vague4\"><div class=\"pop-content\"></div></div>");
        $(".pop-msg .pop-content").html(l1ilii);
        setTimeout(XMlayEr.tips.removeMsg, l1llIllI);
      }
    },
    "header": {
      "Init": function () {
        this.marquee();
        this.title(XMlayEr.name);
        this.time();
        this.qfe();
      },
      "logoCss": function () {
        switch (1) {
          case "1":
            return ".player-logo{left: 20px;top: 20px;width: 15%;}";
          case "2":
            return ".player-logo{right: 20px;top: 20px;width: 15%;}";
          case "3":
            return ".player-logo{left: 20px;bottom: 80px;width: 15%;}";
          default:
            return ".player-logo{right: 20px;bottom: 80px;width: 15%;}";
        }
      },
      "marquee": function () {
        box.children().append("<div class=\"bullet-screen\" style=\"animation: bullet 10s linear infinite;color:#E50916</div>");
        setTimeout(function () {
          $(".bullet-screen").remove();
        }, 60000);
        XMlayEr.void.on("pause", function () {
          $(".bullet-screen").css("animation-play-state", "paused");
        });
        XMlayEr.void.on("play", function () {
          $(".bullet-screen").css("animation-play-state", "running");
        });
      },
      "time": function () {
        let iI1111lI = new Date(),
          i1IlIIi1 = iI1111lI.getHours() < 10 ? "0" + iI1111lI.getHours() : iI1111lI.getHours(),
          i1liiil1 = iI1111lI.getMinutes() < 10 ? "0" + iI1111lI.getMinutes() : iI1111lI.getMinutes();
        $(".kui-time").text(i1IlIIi1 + ":" + i1liiil1);
        setTimeout(function () {
          XMlayEr.header.time();
        }, 1000);
        $(".header .qoe-normal").show();
      },
      "qfe": function () {
        try {
          navigator.getBattery().then(function (iliillIl) {
            {
              let I1lI1iii = iliillIl.level * 100 + "%",
                Iilllll = $(".percentage");
              I1lI1iii === "10%" ? Iilllll.css({
                "background-color": "red",
                "width": I1lI1iii
              }) : Iilllll.css("width", I1lI1iii);
              $(".batteryShape").show();
              iliillIl.addEventListener("levelchange", function () {
                this.qfe();
              });
            }
          });
        } catch (IIIlili1) {
          console.log("该浏览器不支持电量显示");
        }
      },
      "title": function (IIl1I1Il) {
        $(".player-title").text(IIl1I1Il);
        XMlayEr.header.onShowNameTipsMouseenter();
      },
      "onShowNameTipsMouseenter": function () {
        let IIIIilil = document.querySelector(".player-title");
        if (IIIIilil.scrollWidth > IIIIilil.offsetWidth) {
          {
            function iIi1I11i() {
              IIIIilil.innerHTML = IIIIilil.innerHTML.slice(1) + IIIIilil.innerHTML[0];
            }
            setInterval(iIi1I11i, 200);
          }
        }
      }
    },
    "subtitle": {
      "hide": false,
      "Init": function (l1i1II1) {
        const Ii1IliII = document.getElementsByTagName("video"),
          IIll1iIi = document.createElement("track");
        $(".content-bnt").click(function () {
          {
            $(".ec-subtitle").toggle();
            if (XMlayEr.subtitle.hide === false) $(this).css("opacity", "0.6"), XMlayEr.subtitle.hide = true;else {
              $(this).css("opacity", "");
              XMlayEr.subtitle.hide = false;
            }
          }
        });
        IIll1iIi.default = true;
        IIll1iIi.kind = "metadata";
        Ii1IliII[0].appendChild(IIll1iIi);
        fetch(l1i1II1.url).then(i1liiiIi => i1liiiIi.arrayBuffer()).then(iI1i1I11 => {
          const i1l1i1li = new TextDecoder(l1i1II1.encoding).decode(iI1i1I11);
          switch (l1i1II1.type || this.getExt(l1i1II1.url)) {
            case "srt":
              return this.text.vttToBlob(this.text.srtToVtt(i1l1i1li));
            case "ass":
              return this.text.vttToBlob(this.text.assToVtt(i1l1i1li));
            case "vtt":
              return this.text.vttToBlob(i1l1i1li);
            default:
              return l1i1II1.url;
          }
        }).then(li1IlllI => {
          IIll1iIi.default = true;
          IIll1iIi.kind = "metadata";
          IIll1iIi.src = li1IlllI.toString();
          IIll1iIi.track.mode = "hidden";
          IIll1iIi.addEventListener("cuechange", this.text.update);
        }).catch(i1iIlIiI => {
          XMlayEr.tips.msg("字幕加载失败!!!");
          throw i1iIlIiI;
        });
      },
      "text": {
        "fixSrt": function (II1iiill) {
          return II1iiill.replace(/(\d\d:\d\d:\d\d)[,.](\d+)/g, (IlI1lilI, Il11i11l, llliii1l) => {
            {
              let il1iilll = llliii1l.slice(0, 3);
              llliii1l.length === 1 && (il1iilll = llliii1l + "00");
              llliii1l.length === 2 && (il1iilll = llliii1l + "0");
              return Il11i11l + "," + il1iilll;
            }
          });
        },
        "srtToVtt": function (iliIIIIi) {
          return "WEBVTT \r\n\r\n".concat(this.fixSrt(iliIIIIi).replace(/\{\\([ibu])\}/g, "</$1>").replace(/\{\\([ibu])1\}/g, "<$1>").replace(/\{([ibu])\}/g, "<$1>").replace(/\{\/([ibu])\}/g, "</$1>").replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2").replace(/{[\s\S]*?}/g, "").concat("\r\n\r\n"));
        },
        "vttToBlob": function (li111i) {
          return URL.createObjectURL(new Blob([li111i], {
            "type": "text/vtt"
          }));
        },
        "assToVtt": function (lll1li11) {
          const li1i1li = new RegExp("Dialogue:\\s\\d,(\\d+:\\d\\d:\\d\\d.\\d\\d),(\\d+:\\d\\d:\\d\\d.\\d\\d),([^,]*),([^,]*),(?:[^,]*,){4}([\\s\\S]*)$", "i");
          function IlIii1i1(I1l1i1i = "") {
            return I1l1i1i.split(/[:.]/).map((IiilliII, i1iiI1Ii, Ii1l1l1l) => {
              if (i1iiI1Ii === Ii1l1l1l.length - 1) {
                if (IiilliII.length === 1) {
                  return "." + IiilliII + "00";
                }
                if (IiilliII.length === 2) return "." + IiilliII + "0";
              } else {
                if (IiilliII.length === 1) return (i1iiI1Ii === 0 ? "0" : ":0") + IiilliII;
              }
              return i1iiI1Ii === 0 ? IiilliII : i1iiI1Ii === Ii1l1l1l.length - 1 ? "." + IiilliII : ":" + IiilliII;
            }).join("");
          }
          return "WEBVTT\n\n" + lll1li11.split(/\r?\n/).map(I11iIi1I => {
            const l111iI1I = I11iIi1I.match(li1i1li);
            if (!l111iI1I) return null;
            return {
              "start": IlIii1i1(l111iI1I[1].trim()),
              "end": IlIii1i1(l111iI1I[2].trim()),
              "text": l111iI1I[5].replace(/{[\s\S]*?}/g, "").replace(/(\\N)/g, "\n").trim().split(/\r?\n/).map(llIlli1l => llIlli1l.trim()).join("\n")
            };
          }).filter(l1l1ll1I => l1l1ll1I).map((Il111iII, ii111I1) => {
            if (Il111iII) return ii111I1 + 1 + "\n" + Il111iII.start + " --> " + Il111iII.end + "\n" + Il111iII.text;
            return "";
          }).filter(IllIIi1I => IllIIi1I.trim()).join("\n\n");
        },
        "update": function () {
          const Ii1iill1 = document.getElementsByTagName("video"),
            Iili1lIl = Ii1iill1[0].textTracks[0].activeCues[0],
            i1liil11 = document.querySelector(".ec-subtitle");
          i1liil11.innerHTML = "";
          Iili1lIl && (i1liil11.innerHTML = Iili1lIl.text.split(/\r?\n/).map(iliIIiIl => "<p>" + function (i1I1i111) {
            return i1I1i111.replace(/[&<>'"]/g, lliIIlII => ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              "'": "&#39;",
              "\"": "&quot;"
            })[lliIIlII] || lliIIlII);
          }(iliIIiIl) + "</p>").join(""));
        }
      },
      "getExt": function (IIiIlII) {
        return IIiIlII.includes("?") ? n(IIiIlII.split("?")[0]) : IIiIlII.includes("#") ? n(IIiIlII.split("#")[0]) : IIiIlII.trim().toLowerCase().split(".").pop();
      }
    },
    "danMu": {
      "dm_api": [],
      "dan": [],
      "time": "",
      "danTunnel": {
        "right": {},
        "top": {},
        "bottom": {}
      },
      "container": null,
      "paused": true,
      "off": false,
      "showing": true,
      "speedRate": 0.4,
      "unlimited": false,
      "height": 15,
      "opacity": 1,
      "danIndex": 0,
      "Init": function () {
        let i11iI1l1 = $(".dm-box");
        this.off = true;
        this.api();
        this.container = document.querySelector(".ec-danMa");
        let Il1lII11 = getComputedStyle(document.getElementsByClassName("ec-danMa")[0], null)["font-size"],
          IiIIIIll = Il1lII11.slice(0, -2);
        this.height = Number(IiIIIIll) + 6;
        for (let I1Ill1II = [], i1Ii1IiI = 0; i1Ii1IiI < this.dm_api.length; ++i1Ii1IiI) this.apiBackend.read(this.dm_api[i1Ii1IiI][2], function (li1I1ili) {
          return function (lll111l, ilI111ii) {
            lll111l ? (lll111l.response, I1Ill1II[li1I1ili] = []) : (I1Ill1II[li1I1ili] = ilI111ii ? ilI111ii.map(function (li1l1Ii) {
              return {
                "time": li1l1Ii[0],
                "type": li1l1Ii[1],
                "color": li1l1Ii[2],
                "author": li1l1Ii[3],
                "text": li1l1Ii[4].indexOf("777ys") != -1 ? "68yy.com 全网影视在线看🎬" : li1l1Ii[4],
                "size": li1l1Ii[7]
              };
            }) : [], I1Ill1II[li1I1ili] = I1Ill1II[li1I1ili], XMlayEr.danMu.readAllEndpoints(I1Ill1II));
          };
        }(i1Ii1IiI));
        this.content();
        false && $(".dm-input").attr({
          "disabled": true,
          "placeholder": "请先登录~"
        });
        XMlayEr.void.on("play", function () {
          XMlayEr.danMu.paused = false;
          $(".ec-danMa").addClass("dm-show");
        });
        XMlayEr.void.on("pause", function () {
          XMlayEr.danMu.paused = true;
          $(".ec-danMa").removeClass("dm-show");
        });
        switch ("1") {
          case "0":
            i11iI1l1.hide();
            break;
          case "2":
            i11iI1l1.hide();
            XMlayEr.void.on("fullscreen", function (IIi111I1) {
              if (IIi111I1) i11iI1l1.show();else {
                i11iI1l1.hide();
              }
            });
            break;
        }
        XMlayEr.void.on("seek", function () {
          XMlayEr.danMu.seek();
        });
      },
      "api": function () {
        let i1iIliI1 = XMlayEr.dmid,
          I1II1llI = XMlayEr.ggdmapi ? "#1$" + XMlayEr.ggdmapi : "",
          I1i1Ilii = "0$https://dmku.hls.one/?ac=dm" + I1II1llI,
          llIII11I = I1i1Ilii.split("#"),
          I1iii1iI = [];
        for (let IilIIIli = 0; IilIIIli < llIII11I.length; IilIIIli++) {
          let i1ii1i1I = llIII11I[IilIIIli].split("$"),
            iI1l11i1 = "",
            lIllIlli = "";
          switch (i1ii1i1I["0"]) {
            case "1":
              lIllIlli = i1iIliI1;
              break;
            default:
              lIllIlli = i1iIliI1;
              iI1l11i1 = "&id=" + lIllIlli;
              break;
          }
          I1iii1iI[IilIIIli] = [i1ii1i1I["0"], i1ii1i1I["1"], i1ii1i1I["1"] + iI1l11i1, lIllIlli];
        }
        this.dm_api = I1iii1iI;
      },
      "apiBackend": {
        "read": function (i11ilIlI, Ii1i1l1i) {
          this.api(i11ilIlI, null, function (iIlil1ii, IIlIll1I) {
            Ii1i1l1i(null, IIlIll1I.danmuku);
          }, function (IIlIl1li, Ili1I1) {
            Ii1i1l1i({
              "status": IIlIl1li.status,
              "response": Ili1I1
            });
          }, function (I1Iiili) {
            Ii1i1l1i({
              "status": I1Iiili.status,
              "response": null
            });
          });
        },
        "send": function (I1iilII1, Ii1lIli) {
          this.api(XMlayEr.danMu.dm_api[0][1], I1iilII1, function () {
            console.log("发送弹幕成功");
            XMlayEr.tips.msg("您的弹幕已送达");
            Ii1lIli(I1iilII1);
          }, function (lI11iil, i1il1Il1) {
            XMlayEr.tips.msg(i1il1Il1.msg);
          }, function (i1IIii1) {
            console.log("Request was unsuccessful: " + i1IIii1.status);
          });
        },
        "api": function (Ilil1I11, l1lllli, IIlI1lli, Il1I1lil, ill1Iill) {
          let II1iilli = new XMLHttpRequest();
          II1iilli.onreadystatechange = function () {
            {
              if (4 === II1iilli.readyState) {
                {
                  if (II1iilli.status >= 200 && II1iilli.status < 300 || 304 === II1iilli.status) {
                    let I1IllIII = JSON.parse(II1iilli.responseText);
                    return 23 !== I1IllIII.code ? Il1I1lil(II1iilli, I1IllIII) : IIlI1lli(II1iilli, I1IllIII);
                  }
                  ill1Iill(II1iilli);
                }
              }
            }
          };
          II1iilli.open(null !== l1lllli ? "POST" : "GET", Ilil1I11, true);
          II1iilli.send(null !== l1lllli ? JSON.stringify(l1lllli) : null);
        }
      },
      "readAllEndpoints": function (illliII1) {
        let il11iiil = this;
        il11iiil.dan = [].concat.apply([], illliII1).sort(function (l11Iilll, iil1lIl) {
          return l11Iilll.time - iil1lIl.time;
        });
        window.requestAnimationFrame(function () {
          il11iiil.frame();
        });
      },
      "frame": function () {
        if (this.dan.length && !XMlayEr.danMu.paused && this.showing) {
          {
            let llII11lI = this.dan[this.danIndex];
            const llIliili = [];
            while (llII11lI && XMlayEr.void.video.currentTime > parseFloat(llII11lI.time)) {
              llIliili.push(llII11lI);
              llII11lI = this.dan[++this.danIndex];
            }
            this.draw(llIliili);
          }
        }
        window.requestAnimationFrame(() => {
          this.frame();
        });
      },
      "number2Color": function (IiilIlIl) {
        return "#" + ("00000" + IiilIlIl.toString()).slice(-6);
      },
      "number2Type": function (ll1lIlIl) {
        switch (ll1lIlIl) {
          case 0:
          case "right":
            return "right";
          case 1:
          case "top":
            return "top";
          case 2:
          case "bottom":
            return "bottom";
          default:
            return "right";
        }
      },
      "_measure": function (Iiiii1i) {
        if (!this.context) {
          {
            const Ilii11Il = getComputedStyle(this.container.getElementsByClassName("ec-danMa-item")[0], null);
            this.context = document.createElement("canvas").getContext("2d");
            this.context.font = Ilii11Il.getPropertyValue("font");
          }
        }
        return this.context.measureText(Iiiii1i).width;
      },
      "_danAnimation": function (IIIIII1l) {
        const IIII1lli = this.speedRate || 1,
          ll11iIII = !!XMlayEr.void.fullscreen,
          Iil1l1Ii = {
            "top": (ll11iIII ? 6 : 4) / IIII1lli + "s",
            "right": (ll11iIII ? 8 : 5) / IIII1lli + "s",
            "bottom": (ll11iIII ? 6 : 4) / IIII1lli + "s"
          };
        return Iil1l1Ii[IIIIII1l];
      },
      "seek": function () {
        if (!this.off) return;
        this.clear();
        for (let IiI111ll = 0; IiI111ll < this.dan.length; IiI111ll++) {
          if (this.dan[IiI111ll].time >= XMlayEr.void.video.currentTime) {
            {
              this.danIndex = IiI111ll;
              break;
            }
          }
          this.danIndex = this.dan.length;
        }
      },
      "clear": function () {
        this.danTunnel = {
          "right": {},
          "top": {},
          "bottom": {}
        };
        this.danIndex = 0;
        this.container.innerHTML = "<div class=\"ec-danMa-item ec-danMa-item--demo\"></div>";
      },
      "draw": function (iiIilIil) {
        if (this.showing) {
          {
            const l11ili1 = this.height,
              I1l11lll = this.container.offsetWidth,
              IiIill = this.container.offsetHeight,
              llliiiil = parseInt(IiIill) / parseInt(l11ili1),
              ii1l1l1I = ill11liI => {
                const lIiIii1i = ill11liI.offsetWidth || parseInt(ill11liI.style.width),
                  II1II1lI = ill11liI.getBoundingClientRect().right || this.container.getBoundingClientRect().right + lIiIii1i;
                return this.container.getBoundingClientRect().right - II1II1lI;
              },
              iiIlIii = lll1iIll => (I1l11lll + lll1iIll) / 5,
              iIi1I1l = (iiiliI1, Illl111I, Ii1liIIl) => {
                const llIl1I1l = I1l11lll / iiIlIii(Ii1liIIl);
                for (let iiIlIIli = 0; this.unlimited || iiIlIIli < llliiiil; iiIlIIli++) {
                  const iliillI = this.danTunnel[Illl111I][iiIlIIli + ""];
                  if (iliillI && iliillI.length) {
                    if (Illl111I !== "right") {
                      continue;
                    }
                    for (let IIliiil = 0; IIliiil < iliillI.length; IIliiil++) {
                      const I1iil1li = ii1l1l1I(iliillI[IIliiil]) - 10;
                      if (I1iil1li <= I1l11lll - llIl1I1l * iiIlIii(parseInt(iliillI[IIliiil].style.width)) || I1iil1li <= 0) break;
                      if (IIliiil === iliillI.length - 1) {
                        this.danTunnel[Illl111I][iiIlIIli + ""].push(iiiliI1);
                        iiiliI1.addEventListener("animationend", () => {
                          this.danTunnel[Illl111I][iiIlIIli + ""].splice(0, 1);
                        });
                        return iiIlIIli % llliiiil;
                      }
                    }
                  } else return this.danTunnel[Illl111I][iiIlIIli + ""] = [iiiliI1], iiiliI1.addEventListener("animationend", () => {
                    this.danTunnel[Illl111I][iiIlIIli + ""].splice(0, 1);
                  }), iiIlIIli % llliiiil;
                }
                return -1;
              };
            Object.prototype.toString.call(iiIilIil) !== "[object Array]" && (iiIilIil = [iiIilIil]);
            const IIliiII1 = document.createDocumentFragment();
            for (let Illil1lI = 0; Illil1lI < iiIilIil.length; Illil1lI++) {
              {
                iiIilIil[Illil1lI].type = this.number2Type(iiIilIil[Illil1lI].type);
                !iiIilIil[Illil1lI].color && (iiIilIil[Illil1lI].color = 16777215);
                const iI111il = document.createElement("div");
                iI111il.classList.add("ec-danMa-item");
                iI111il.classList.add("ec-danMa-" + iiIilIil[Illil1lI].type);
                if (iiIilIil[Illil1lI].border) iI111il.innerHTML = "<span style=\"border:" + iiIilIil[Illil1lI].border + "\">" + iiIilIil[Illil1lI].text + "</span>";else {
                  iI111il.innerHTML = iiIilIil[Illil1lI].text;
                }
                iI111il.style.opacity = this.opacity;
                iI111il.style.color = this.number2Color(iiIilIil[Illil1lI].color);
                iI111il.addEventListener("animationend", () => {
                  this.container.removeChild(iI111il);
                });
                const IllII1ll = this._measure(iiIilIil[Illil1lI].text);
                let l1li111l;
                switch (iiIilIil[Illil1lI].type) {
                  case "right":
                    l1li111l = iIi1I1l(iI111il, iiIilIil[Illil1lI].type, IllII1ll);
                    l1li111l >= 0 && (iI111il.style.width = IllII1ll + 1 + "px", iI111il.style.top = l11ili1 * l1li111l + "px");
                    break;
                  case "top":
                    l1li111l = iIi1I1l(iI111il, iiIilIil[Illil1lI].type);
                    l1li111l >= 0 && (iI111il.style.top = l11ili1 * l1li111l + "px");
                    break;
                  case "bottom":
                    l1li111l = iIi1I1l(iI111il, iiIilIil[Illil1lI].type);
                    l1li111l >= 0 && (iI111il.style.bottom = l11ili1 * l1li111l + "px");
                    break;
                  default:
                    XMlayEr.tips.msg("Can't handled danMa type: " + iiIilIil[Illil1lI].type);
                }
                if (l1li111l >= 0) {
                  iI111il.classList.add("ec-danMa-move");
                  iI111il.style.animationDuration = this._danAnimation(iiIilIil[Illil1lI].type);
                  IIliiII1.appendChild(iI111il);
                }
              }
            }
            this.container.appendChild(IIliiII1);
            return IIliiII1;
          }
        }
      },
      "htmlEncode": function (lI11ll1) {
        return lI11ll1.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2f;");
      },
      "hide": function () {
        this.showing = false;
        this.clear();
      },
      "show": function () {
        this.seek();
        this.showing = true;
      },
      "send": function (l1ll1Ili) {
        var I1i11ll = document.referrer;
        I1i11ll == "" && (I1i11ll = document.URL);
        const II1liiI = {
          "text": l1ll1Ili.text,
          "color": l1ll1Ili.color,
          "type": l1ll1Ili.type,
          "time": XMlayEr.void.video.currentTime,
          "player": XMlayEr.danMu.dm_api[0][3],
          "size": "32px",
          "referer": I1i11ll
        };
        this.apiBackend.send(II1liiI, function (lI1II1il) {
          XMlayEr.danMu.dan.splice(this.danIndex, 0, lI1II1il);
          XMlayEr.danMu.danIndex++;
          const i1Iiil1i = {
            "text": XMlayEr.danMu.htmlEncode(lI1II1il.text),
            "color": lI1II1il.color,
            "type": lI1II1il.type,
            "border": "2px solid #24a5ff"
          };
          XMlayEr.danMu.draw(i1Iiil1i);
          let Illlli11 = $(".dm-input");
          Illlli11.val("");
          let I1lIl1Il = setInterval(function () {
            let iiIIi1i1 = Number(Illlli11.data("time")) - 1;
            Illlli11.data("time", iiIIi1i1).attr("placeholder", iiIIi1i1 + "s后解除冻结").attr("disabled", true);
            iiIIi1i1 <= 0 && (Illlli11.data("time", 10).attr("placeholder", "来发个弹幕吧~").attr("disabled", false), clearInterval(I1lIl1Il));
          }, 1000);
        });
      },
      "getFontSize": function (IiI111) {
        const i1l1II11 = function (l1i1iii, IIIiilIl, IllliIlI) {
            return Math.max(Math.min(l1i1iii, Math.max(IIIiilIl, IllliIlI)), Math.min(IIIiilIl, IllliIlI));
          },
          li1l1l1 = document.getElementById("player").clientWidth;
        if (typeof IiI111 === "number") return i1l1II11(IiI111, 12, li1l1l1);
        if (typeof IiI111 === "string" && IiI111.endsWith("%")) {
          const lI1lI1i1 = parseFloat(IiI111) / 100;
          return i1l1II11(li1l1l1 * lI1lI1i1, 12, li1l1l1);
        }
        return IiI111;
      },
      "set": function (illll1II, iIIIlIlI, i1iiii) {
        i1iiii && XMlayEr.cookie.Set("d_set" + illll1II, [illll1II, iIIIlIlI, i1iiii], 7);
        switch (illll1II) {
          case 1:
            {
              this.speedRate = iIIIlIlI;
              break;
            }
          case 2:
            {
              let iIIliili = this.getFontSize(iIIIlIlI);
              $(".ec-danMa").css("font-size", iIIliili);
              this.height = iIIliili + 5;
              break;
            }
          case 3:
            {
              this.opacity = iIIIlIlI;
              break;
            }
          case 4:
            {
              $(".ec-danMa").css("bottom", iIIIlIlI);
              break;
            }
          default:
            break;
        }
      },
      "content": function () {
        $(".dm-bnt").click(function () {
          $(".art-bottom").hide();
          $(".dm-box").removeClass("dm-wap");
          $(".player-list-off").addClass("dm-off").removeClass("off");
          $(".dm-off").click(function () {
            $(".art-bottom").show();
            $(".dm-box").addClass("dm-wap");
            $(".player-list-off").removeClass("dm-off").addClass("off");
          });
        });
        $(".art-bottom,.dm-box-cc").click(function () {
          $(".dm-set-box,.dm-style-box").removeClass("ec-show");
        });
        let ilIIiI1l = $(".dm-box-cc"),
          ill1lil = XMlayEr.cookie.Get("dm-box-cc"),
          Ii11il = XMlayEr.cookie.Get("content_dmP-1"),
          IiI1illi = XMlayEr.cookie.Get("content_dmP-2"),
          IIIlIlll = $(".content_dmP-1 .item"),
          iIilIIll = $(".content_dmP-2 .item"),
          Ii1iiI11 = function (iiIIll1, li11i1II, lliill) {
            (iiIIll1 !== undefined || iiIIll1 !== "") && li11i1II.eq(iiIIll1).addClass("on-1").siblings().removeClass("on-1");
            li11i1II.click(function () {
              $(this).addClass("on-1").siblings().removeClass("on-1");
              XMlayEr.cookie.Set(lliill, $("." + lliill + " .item").index(this), 7);
            });
          };
        Ii1iiI11(Ii11il, IIIlIlll, "content_dmP-1");
        Ii1iiI11(IiI1illi, iIilIIll, "content_dmP-2");
        $(".dm-box-t-img").click(function () {
          $(".dm-set-box").removeClass("ec-show");
          $(".dm-style-box").toggleClass("ec-show");
        });
        let il1lIll = function () {
          let I11i1l = $(".content_dmP-2 .on-1").data("color"),
            Il11IilI = $(".content_dmP-1 .on-1").data("type"),
            lilIl1ii = $(".dm-input").val();
          if (XMlayEr.empty(lilIl1ii)) XMlayEr.tips.msg("要输入弹幕内容啊喂");else lilIl1ii.length > 22 ? XMlayEr.tips.msg("弹幕内容长度最大30位!!!") : XMlayEr.danMu.send({
            "text": lilIl1ii,
            "color": I11i1l,
            "type": Il11IilI
          });
        };
        $(".dm-input").keydown(function (lIIliIl1) {
          lIIliIl1.keyCode === 13 && il1lIll();
        });
        $(".dm-send").click(function () {
          il1lIll();
        });
        if (ill1lil === "1") {
          XMlayEr.danMu.hide();
          ilIIiI1l.addClass("dm-box-cc2").data("id", "1");
        }
        ilIIiI1l.click(function () {
          $(this).data("id") === "1" ? (XMlayEr.danMu.show(), XMlayEr.cookie.Del("dm-box-cc"), $(this).removeClass("dm-box-cc2").data("id", "0")) : (XMlayEr.danMu.hide(), XMlayEr.cookie.Set("dm-box-cc", "1", 7), $(this).addClass("dm-box-cc2").data("id", "1"));
        });
        let ili1i1i1 = [["弹幕速度", "极慢", "较慢", "适中", "极快", "较快"], ["字体大小", "默认", "极小", "较小", "适中", "较大", "极大"], ["不透明度", "100%", "75%", "50%", "25%", "0%"], ["弹幕范围", "1/4", "半屏", "3/4"]],
          l1Ilili = [["", "0.5", "0.8", "1", "1.5", "2"], ["", XMlayEr.danMu.height, "1%", "2%", "3%", "4%", "5%"], ["", "1", "0.75", "0.5", "0.25", "0"], ["", "60%", "45%", "10%"]];
        $(".set-toggle").append("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z\"></path></svg>");
        let li1iiI1 = "",
          i1Il1i = null;
        for (let l1i1Iii = 0; l1i1Iii < ili1i1i1.length; l1i1Iii++) {
          {
            let i1ii1lli = "";
            for (let Il11i111 = 0; Il11i111 < ili1i1i1[l1i1Iii].length; Il11i111++) {
              if (Il11i111 === 0) i1ii1lli = i1ii1lli + "<div class=\"flex between br\"><span class=\"dm-set-label flex\"><i><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z\"></path></svg></i>" + ili1i1i1[l1i1Iii][Il11i111] + "</span></div>";else {
                i1ii1lli = i1ii1lli + "<div class=\"flex between dm-n2\" data-time=\"" + l1Ilili[l1i1Iii][Il11i111] + "\"><span class=\"dm-set-label flex\"><i></i>" + ili1i1i1[l1i1Iii][Il11i111] + "</span></div>";
              }
            }
            li1iiI1 = li1iiI1 + "<div class=\"dm-set-list\">" + i1ii1lli + "</div>";
            let iII1lllI = XMlayEr.cookie.Get("d_set" + (l1i1Iii + 1));
            if (iII1lllI) {
              let l1lIl1Ii = iII1lllI.split(",");
              XMlayEr.danMu.set(Number(l1lIl1Ii[0]), l1lIl1Ii[1]);
              $(".dm-set-box .dm-set-list").eq(0).children().eq(l1i1Iii).find("span").text(l1lIl1Ii[2]);
            }
          }
        }
        $(".dm-set-box").append(li1iiI1);
        $(".dm-box-set").click(function () {
          $(".dm-style-box").removeClass("ec-show");
          $(".dm-set-box").toggleClass("ec-show");
        });
        $("#dm_n1 .between").click(function () {
          {
            let I11II1l1 = $(this).data("id");
            $(".dm-set-box .dm-set-list").eq(I11II1l1).addClass("ds-set-show").siblings().removeClass("ds-set-show");
            i1Il1i = I11II1l1;
          }
        });
        $(".dm-set-box .br").click(function () {
          $(".dm-set-box .dm-set-list").eq(0).addClass("ds-set-show").siblings().removeClass("ds-set-show");
        });
        $(".dm-n2").click(function () {
          let lIIii11l = $(this).text(),
            Illl1lli = $(".dm-set-box .dm-set-list");
          Illl1lli.eq(0).children().eq(i1Il1i - 1).find("span").text(lIIii11l);
          Illl1lli.eq(0).addClass("ds-set-show").siblings().removeClass("ds-set-show");
          let i111Ilil = $(this).data("time");
          lIIii11l !== "默认" ? XMlayEr.danMu.set(i1Il1i, i111Ilil, lIIii11l) : XMlayEr.cookie.Del("d_set2");
        });
      }
    },
    "list": {
      "html": function () {
        if (XMlayEr.html) {
          {
            let IIi1ili = "<div class=\"art-control yxq-vod-list\" data-index=\"50\"><i class=\"art-icon hint--rounded hint--top\" aria-label=\"选集\"><svg t=\"1697209271632\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12264\" width=\"18\" height=\"18\"><path d=\"M62 152h105.356v105.356h-105.356v-105.356zM263.937 152h698.063v105.356h-698.063v-105.356zM62 459.237h105.356v105.356h-105.356v-105.356zM263.937 459.237h698.063v105.356h-698.063v-105.356zM62 766.644h105.356v105.356h-105.356v-105.356zM263.937 766.644h698.063v105.356h-698.063v-105.356z\" p-id=\"12265\" fill=\"#ffffff\"></path></svg></i></div>";
            $(".art-control-playAndPause").after(IIi1ili);
            $(".yxq-vod-list").click(function () {
              XMlayEr.VodList.initial();
            });
          }
        }
      },
      "next": function () {
        if (XMlayEr.next0 || XMlayEr.next) {
          let lIlillIl = "<div class=\"art-control ec-next\" data-index=\"40\"><i class=\"art-icon hint--rounded hint--top\" aria-label=\"下一集\"><svg t=\"1697202769049\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4237\" width=\"41\" height=\"41\"><path d=\"M853.333333 204.8h-68.266666c-20.48 0-34.133333 13.653333-34.133334 34.133333v546.133334c0 17.066667 17.066667 34.133333 34.133334 34.133333h68.266666c20.48 0 34.133333-13.653333 34.133334-34.133333V238.933333c0-20.48-17.066667-34.133333-34.133334-34.133333zM614.4 467.626667L256 235.52C208.213333 204.8 170.666667 228.693333 170.666667 283.306667v484.693333c0 58.026667 37.546667 78.506667 85.333333 47.786667l358.4-238.933334c47.786667-30.72 47.786667-78.506667 0-109.226666z\" fill=\"#ffffff\" p-id=\"4238\"></path></svg></i></div>";
          $(".art-control-playAndPause").after(lIlillIl);
          $(".ec-next").click(function () {
            XMlayEr.next0 ? top.location.href = XMlayEr.next0 : self.location.href = XMlayEr.next;
          });
        }
      },
      "autoNext": function () {
        XMlayEr.void.on("video:ended", function () {
          if (!!XMlayEr.next0 || !!XMlayEr.next) {
            box.children().append("<div class=\"pop-msg vague2 again\"><div class=\"again-icon\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1007.4674 42.036669c-12.751909-12.751909-38.255728-12.751909-51.007638 0l-95.63932 95.63932c-57.383592-57.383592-133.895048-95.63932-210.406505-121.143139C376.247886-53.602651 95.70588 105.796216 19.194424 373.586313c-76.511456 274.166051 82.887411 554.708057 350.677507 631.219513 274.166051 76.511456 554.708057-82.887411 631.219514-350.677507 12.751909-38.255728-12.751909-76.511456-51.007638-89.263366s-76.511456 12.751909-89.263365 51.007637c-25.503819 89.263366-89.263366 165.774822-165.774822 216.78246-172.150776 102.015275-395.30919 38.255728-497.324465-133.895049-82.887411-140.271003-63.759547-312.421779 44.631683-433.564918 133.895048-146.646958 369.805371-159.398867 516.452329-19.127864l-114.767184 114.767184c-6.375955 6.375955-6.375955 12.751909-6.375955 19.127864 0 19.127864 19.127864 38.255728 38.255728 38.255728h312.42178c12.751909 0 31.879773-12.751909 31.879773-31.879773V67.540488c0-6.375955-6.375955-12.751909-12.751909-25.503819z\"></path></svg></div><div class=\"pop-content\"><span id=\"count2\">5</span>s后自动播放下一集</div></div>");
            $(".pause-ad").remove();
            let Il11iII1 = setTimeout(function () {
              XMlayEr.next0 ? top.location.href = XMlayEr.next0 : self.location.href = XMlayEr.next;
            }, 5000);
            $(".again").click(function () {
              clearTimeout(Il11iII1);
              $(".again").remove();
              XMlayEr.void.play();
            });
            XMlayEr.void.on("play", function () {
              clearTimeout(Il11iII1);
              $(".again").remove();
            });
          }
        });
      }
    },
    "broadside": function () {
      let lIllil1 = $(".broadside");
      lIllil1.append("<div class=\"ec-lock\" data-id=\"1\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320h64c0-70.4 57.6-128 128-128s128 57.6 128 128v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z\"></path></svg></div>");
      let Ii1i1Ili = $(".ec-lock");
      Ii1i1Ili.click(function () {
        if (Number(Ii1i1Ili.data("id")) === 1) Ii1i1Ili.html("<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z m128-288H384V320c0-70.4 57.6-128 128-128s128 57.6 128 128v128z\"></path></svg>").data("id", "2"), box.addClass("lock-hide");else {
          Ii1i1Ili.html("<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320h64c0-70.4 57.6-128 128-128s128 57.6 128 128v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z\"></path></svg>").data("id", "1");
          box.removeClass("lock-hide");
        }
      });
      lIllil1.append("<div class=\"ec-change\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-0.4-12.6 6.1l-0.2 64c-118.6 0.5-235.8 53.4-314.6 154.2-69.6 89.2-95.7 198.6-81.1 302.4h74.9c-0.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8zM880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H396V494h440v326z\"></path></svg></div>");
      let lI1il1II = 0,
        I11llli = $("video");
      $(".ec-change").click(function () {
        switch (lI1il1II) {
          case 0:
            I11llli.addClass("along1");
            ++lI1il1II;
            break;
          case 1:
            I11llli.removeClass("along1");
            ++lI1il1II;
            I11llli.addClass("along2");
            break;
          case 2:
            I11llli.removeClass("along2");
            ++lI1il1II;
            I11llli.addClass("along3");
            break;
          case 3:
            I11llli.removeClass("along3");
            lI1il1II = 0;
            break;
        }
      });
      lIllil1.append("<div class=\"ec-pip\" data-id=\"1\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M849.5 174.5a37.50000029 37.50000029 0 0 1 37.50000029 37.50000029v262.49999942h-75.00000058V249.49999971H212.00000029v525.00000058h225v74.99999971H174.5a37.50000029 37.50000029 0 0 1-37.50000029-37.50000029V212.00000029a37.50000029 37.50000029 0 0 1 37.50000029-37.50000029h675z m0 375.00000029a37.50000029 37.50000029 0 0 1 37.50000029 37.49999942v225a37.50000029 37.50000029 0 0 1-37.50000029 37.50000029h-299.99999971a37.50000029 37.50000029 0 0 1-37.50000029-37.50000029v-225a37.50000029 37.50000029 0 0 1 37.50000029-37.49999942h299.99999971z\"></path></svg></div>");
      let iIiiIi = $("video")[0];
      $(".ec-pip").click(async () => {
        try {
          if (document.pictureInPictureEnabled && !iIiiIi.disablePictureInPicture) document.pictureInPictureElement ? await document.exitPictureInPicture() : await iIiiIi.requestPictureInPicture();else {
            if (iIiiIi.webkitSupportsPresentationMode && typeof iIiiIi.webkitSetPresentationMode === "function") {
              iIiiIi.webkitSetPresentationMode(iIiiIi.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
            } else $(".ec-pip").hide();
          }
        } catch (IiiilI) {
          {
            $(".ec-pip").hide();
            throw IiiilI;
          }
        }
      });
    },
    "secondToTime": function (IiIil1II) {
      const iiIiiIl1 = IllIl11l => IllIl11l < 10 ? "0" + IllIl11l : String(IllIl11l),
        IliIiI11 = Math.floor(IiIil1II / 3600),
        IiI11lIl = Math.floor((IiIil1II - IliIiI11 * 3600) / 60),
        ii1I1il1 = Math.floor(IiIil1II - IliIiI11 * 3600 - IiI11lIl * 60);
      return (IliIiI11 > 0 ? [IliIiI11, IiI11lIl, ii1I1il1] : [IiI11lIl, ii1I1il1]).map(iiIiiIl1).join(":");
    },
    "VodList": {
      "initial": () => {
        if ($(".yxq-listbox").length < 1) {
          let lili1i = $(".art-video-player");
          lili1i.prepend("<div class=\"vodlist-of danmu-hide\" style=\"display: none;\"></div><div class=\"yxq-listbox\"><div class=\"anthology-wrap\"></div></div></div>");
        }
        $(document).on("click", ".vodlist-of", function () {
          XMlayEr.VodList.Off();
        });
        if ($(".normal-title-wrap").length < 1) {
          {
            let l1I1ilii = $(".anthology-wrap");
            if (XMlayEr.html != "") l1I1ilii.html(XMlayEr.html);else {
              l1I1ilii.html("<div class=\"yxq-show\">没获取到选集内容</div>");
            }
          }
        }
      },
      "Off": () => {
        $(".vodlist-of,.r-button").hide();
        $(".yxq-listbox").removeClass("yxq-stting");
      },
      "Tab": () => {
        $(".yxq-list").toggle();
        XMlayEr.VodList.TabList();
      },
      "TabList": () => {
        $(".yxq-list a").click(function () {
          $(this).addClass("yxq-this").siblings().removeClass("yxq-this");
          let Il1lIII1 = $(".yxq-list a").index(this),
            iIlIi1 = $(".scroll-area .yxq-selset-list").eq(Il1lIII1);
          iIlIi1.addClass("yxq-show").siblings().removeClass("yxq-show");
          $(".yxq-list").hide();
        });
      },
      "Next": Il1lill1 => {
        console.log(Il1lill1);
        self.location.href = Il1lill1;
      }
    },
    "LoadAnimation": function () {
      $("#loading").hide();
      XMlayEr.void.play();
      let IiiiIi1 = Number(XMlayEr.cookie.Get(url, 2)),
        IIill1II = XMlayEr.secondToTime(IiiiIi1);
      if (IIill1II !== "00:00" && IIill1II !== "NaN:NaN") {
        $(".ec-remember").html("<i class=\"art-icon art-icon-close s-on\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m571.733 512 268.8-268.8c17.067-17.067 17.067-42.667 0-59.733-17.066-17.067-42.666-17.067-59.733 0L512 452.267l-268.8-268.8c-17.067-17.067-42.667-17.067-59.733 0-17.067 17.066-17.067 42.666 0 59.733l268.8 268.8-268.8 268.8c-17.067 17.067-17.067 42.667 0 59.733 8.533 8.534 19.2 12.8 29.866 12.8s21.334-4.266 29.867-12.8l268.8-268.8 268.8 268.8c8.533 8.534 19.2 12.8 29.867 12.8s21.333-4.266 29.866-12.8c17.067-17.066 17.067-42.666 0-59.733L571.733 512z\"></path></svg></i>上次看到<em>" + IIill1II + "</em><span class=\"t-color\">继续上次播放</span>").show();
        $(".ec-remember span").click(function () {
          $(".ec-remember").html("<p></p>").hide();
          XMlayEr.void.currentTime = IiiiIi1;
        });
        $(".ec-remember svg").click(function () {
          $(".ec-remember").html("<p></p>").hide();
        });
        let I11l1II1 = setTimeout(function () {
          $(".ec-remember").html("<p></p>").hide();
          clearTimeout(I11l1II1);
        }, 6000);
      }
    }
  };
  var OriginTitile = document.title,
    titleTime;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "o(╥﹏╥)o你去哪了？快回来！- " + OriginTitile;
      clearTimeout(titleTime);
    } else document.title = "๑乛◡乛๑亲爱的，欢迎回来~• - " + OriginTitile, titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 1500);
  });