let XMlayEr = {
  "decrypt": function (encryptedData, aesKey, aesIv) {
    let decryptedData = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(aesKey), {
      "iv": CryptoJS.enc.Utf8.parse(aesIv),
      "mode": CryptoJS.mode.CBC,
      "padding": CryptoJS.pad.Pkcs7
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
  },
  "error": function (errorMessage) {
    $("#player").hide();
    $("#loading").hide();
    $("body").append("<div id=\"error\"><h1>" + errorMessage + "</h1></div>");
  },
  "AjaxData": function (requestData, callback) {
    $.ajaxSettings.timeout = "6000";
    $.ajaxSettings.async = true;
    $.post("https://api_play.huaqi.pro/huaqitv.js", requestData, function (response) {
      response.code == 200 ? callback(response) : XMlayEr.error(response.msg);
    }, "json").error(function (error, status, errorObj) {
      $.post("https://api_tihuan.huaqi.pro/huaqitv.js", requestData, function (fallbackResponse) {
        fallbackResponse.code == 200 ? callback(fallbackResponse) : XMlayEr.error(fallbackResponse.msg);
      }, "json").error(function (fallbackError, fallbackStatus, fallbackErrorObj) {
        XMlayEr.error("接口请求失败,请尝试刷新重试");
      });
    });
  },
  "XMlayEr": function () {
    $.ajax({
      "type": "get",
      "url": "https://data.video.iqiyi.com/v.f4v",
      "success": function (ajaxResponse) {
        var isMobile = navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) != null ? 1 : 0,
          urlParams = new URLSearchParams(location.search),
          wapParam = urlParams.get("wap") ?? isMobile;
        XMlayEr.next0 = urlParams.get("next");
        var timeParam = ajaxResponse.t,
          timestamp = ajaxResponse.time,
          signature = sign(hex_md5(timestamp + url));
        XMlayEr.AjaxData({
          "wap": wapParam,
          "url": url,
          "time": timestamp,
          "key": signature,
          "area": timeParam
        }, function (response) {
          aes_key = response.aes_key;
          aes_iv = response.aes_iv;
          XMlayEr.name = response.name;
          XMlayEr.type = response.type;
          XMlayEr.vurl = XMlayEr.decrypt(response.url, aes_key, aes_iv);
          XMlayEr.next = XMlayEr.decrypt(response.next, aes_key, aes_iv);
          XMlayEr.html = XMlayEr.decrypt(response.html, aes_key, aes_iv);
          XMlayEr.dmid = response.dmid;
          XMlayEr.ggdmapi = response.ggdmapi;
          XMlayEr.load();
        });
      },
      "error": function (error, status, errorObj) {
        XMlayEr.error("请检查你的网络是否正常!");
      }
    });
  },
  "empty": function (value) {
    return value == null || value === "";
  },
  "cookie": {
    "Set": function (cookieName, cookieValue, expireDays = 7, storageType = "1") {
      if (storageType === "1") {
        localStorage.setItem(cookieName, cookieValue);
      } else {
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + expireDays * 24 * 60 * 60 * 1000);
        document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";path=/;expires=" + expireDate.toUTCString();
      }
    },
    "Get": function (getKey, storageTypeGet = "1") {
      if (storageTypeGet === "1") return localStorage.getItem(getKey);else {
        {
          let cookieMatch = document.cookie.match(new RegExp("(^| )" + getKey + "=([^;]*)(;|$)"));
          if (cookieMatch != null) {
            return decodeURIComponent(cookieMatch[2]);
          }
        }
      }
    },
    "Del": function (deleteKey, storageTypeDel = "1") {
      if (storageTypeDel === "1") localStorage.removeItem(deleteKey);else {
        {
          let expireDate = new Date();
          expireDate.setTime(expireDate.getTime() - 1);
          let cookieValue = this.Get(deleteKey, 2);
          cookieValue != null && (document.cookie = deleteKey + "=" + encodeURIComponent(cookieValue) + ";path=/;expires=" + expireDate.toUTCString());
        }
      }
    }
  },
  "play": function () {
    let playerConfig = {
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
    playerConfig.flip = true;
    playerConfig.hotkey = true;
    playerConfig.playbackRate = true;
    playerConfig.aspectRatio = true;
    playerConfig.screenshot = false;
    playerConfig.pip = true;
    playerConfig.fullscreen = true;
    playerConfig.miniProgressBar = true;
    playerConfig.fastForward = true;
    playerConfig.airplay = true;
    playerConfig.autoOrientation = true;
    let videoUrl = XMlayEr.vurl,
      videoType = XMlayEr.type;
    playerConfig.lang = "zh-cn";
    playerConfig.theme = "#CC6633";
    playerConfig.volume = Number(0.5);
    playerConfig.setting = true;
    playerConfig.url = videoUrl;
    if (videoType === "flv") {
      playerConfig.type = "flv";
      playerConfig.customType = {
        "flv": function flvHandler(video, url, player) {
          {
            if (flvjs.isSupported()) {
              {
                const flvPlayer = flvjs.createPlayer({
                  "type": "flv",
                  "url": url
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
                player.flv = flvPlayer;
                player.once("url", () => flvPlayer.destroy());
                player.once("destroy", () => flvPlayer.destroy());
              }
            } else player.notice.show = "Unsupported playback format: flv";
          }
        }
      };
    } else (videoType === "m3u8" || videoType === "hls") && (playerConfig.type = "m3u8", playerConfig.customType = {
      "m3u8": function hlsHandler(video, url, player) {
        if (Hls.isSupported()) {
          {
            const hlsPlayer = new Hls();
            hlsPlayer.loadSource(url);
            hlsPlayer.attachMedia(video);
            player.hls = hlsPlayer;
            player.once("url", () => hlsPlayer.destroy());
            player.once("destroy", () => hlsPlayer.destroy());
          }
        } else {
          if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = url;else {
            player.notice.show = "Unsupported playback format: m3u8";
          }
        }
      }
    });
    XMlayEr.void = new Artplayer(playerConfig);
    $(document).on("click", ".yxq-vod-list", function () {
      var listBox = $(".yxq-listbox");
      if (listBox.length > 0) {
        $(".vodlist-of,.r-button").toggle();
        if ($(".yxq-stting").length > 0) {
          listBox.removeClass("yxq-stting");
        } else {
          listBox.addClass("yxq-stting");
        }
      } else listBox.addClass("yxq-stting");
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
    "msg": function (message, duration) {
      let timeout = duration || 3000;
      $(".pop-msg").length > 0 && XMlayEr.tips.removeMsg();
      box.children().append("<div class=\"pop-msg vague4\"><div class=\"pop-content\"></div></div>");
      $(".pop-msg .pop-content").html(message);
      setTimeout(XMlayEr.tips.removeMsg, timeout);
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
      let currentDate = new Date(),
        hours = currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours(),
        minutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
      $(".kui-time").text(hours + ":" + minutes);
      setTimeout(function () {
        XMlayEr.header.time();
      }, 1000);
      $(".header .qoe-normal").show();
    },
    "qfe": function () {
      try {
        navigator.getBattery().then(function (battery) {
          {
            let batteryLevel = battery.level * 100 + "%",
              percentageElement = $(".percentage");
            batteryLevel === "10%" ? percentageElement.css({
              "background-color": "red",
              "width": batteryLevel
            }) : percentageElement.css("width", batteryLevel);
            $(".batteryShape").show();
            battery.addEventListener("levelchange", function () {
              this.qfe();
            });
          }
        });
      } catch (error) {
        console.log("该浏览器不支持电量显示");
      }
    },
    "title": function (title) {
      $(".player-title").text(title);
      XMlayEr.header.onShowNameTipsMouseenter();
    },
    "onShowNameTipsMouseenter": function () {
      let titleElement = document.querySelector(".player-title");
      if (titleElement.scrollWidth > titleElement.offsetWidth) {
        {
          function scrollText() {
            titleElement.innerHTML = titleElement.innerHTML.slice(1) + titleElement.innerHTML[0];
          }
          setInterval(scrollText, 200);
        }
      }
    }
  },
  "subtitle": {
    "hide": false,
    "Init": function (subtitleConfig) {
      const videoElements = document.getElementsByTagName("video"),
        trackElement = document.createElement("track");
      $(".content-bnt").click(function () {
        {
          $(".ec-subtitle").toggle();
          if (XMlayEr.subtitle.hide === false) $(this).css("opacity", "0.6"), XMlayEr.subtitle.hide = true;else {
            $(this).css("opacity", "");
            XMlayEr.subtitle.hide = false;
          }
        }
      });
      trackElement.default = true;
      trackElement.kind = "metadata";
      videoElements[0].appendChild(trackElement);
      fetch(subtitleConfig.url).then(response => response.arrayBuffer()).then(buffer => {
        const decodedText = new TextDecoder(subtitleConfig.encoding).decode(buffer);
        switch (subtitleConfig.type || this.getExt(subtitleConfig.url)) {
          case "srt":
            return this.text.vttToBlob(this.text.srtToVtt(decodedText));
          case "ass":
            return this.text.vttToBlob(this.text.assToVtt(decodedText));
          case "vtt":
            return this.text.vttToBlob(decodedText);
          default:
            return subtitleConfig.url;
        }
      }).then(blobUrl => {
        trackElement.default = true;
        trackElement.kind = "metadata";
        trackElement.src = blobUrl.toString();
        trackElement.track.mode = "hidden";
        trackElement.addEventListener("cuechange", this.text.update);
      }).catch(error => {
        XMlayEr.tips.msg("字幕加载失败!!!");
        throw error;
      });
    },
    "text": {
      "fixSrt": function (srtText) {
        return srtText.replace(/(\d\d:\d\d:\d\d)[,.](\d+)/g, (match, time, milliseconds) => {
          {
            let fixedMs = milliseconds.slice(0, 3);
            milliseconds.length === 1 && (fixedMs = milliseconds + "00");
            milliseconds.length === 2 && (fixedMs = milliseconds + "0");
            return time + "," + fixedMs;
          }
        });
      },
      "srtToVtt": function (srtContent) {
        return "WEBVTT \r\n\r\n".concat(this.fixSrt(srtContent).replace(/\{\\([ibu])\}/g, "</$1>").replace(/\{\\([ibu])1\}/g, "<$1>").replace(/\{([ibu])\}/g, "<$1>").replace(/\{\/([ibu])\}/g, "</$1>").replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2").replace(/{[\s\S]*?}/g, "").concat("\r\n\r\n"));
      },
      "vttToBlob": function (vttContent) {
        return URL.createObjectURL(new Blob([vttContent], {
          "type": "text/vtt"
        }));
      },
      "assToVtt": function (assContent) {
        const dialogueRegex = new RegExp("Dialogue:\\s\\d,(\\d+:\\d\\d:\\d\\d.\\d\\d),(\\d+:\\d\\d:\\d\\d.\\d\\d),([^,]*),([^,]*),(?:[^,]*,){4}([\\s\\S]*)$", "i");
        function formatTime(timeStr = "") {
          return timeStr.split(/[:.]/).map((part, index, array) => {
            if (index === array.length - 1) {
              if (part.length === 1) {
                return "." + part + "00";
              }
              if (part.length === 2) return "." + part + "0";
            } else {
              if (part.length === 1) return (index === 0 ? "0" : ":0") + part;
            }
            return index === 0 ? part : index === array.length - 1 ? "." + part : ":" + part;
          }).join("");
        }
        return "WEBVTT\n\n" + assContent.split(/\r?\n/).map(line => {
          const match = line.match(dialogueRegex);
          if (!match) return null;
          return {
            "start": formatTime(match[1].trim()),
            "end": formatTime(match[2].trim()),
            "text": match[5].replace(/{[\s\S]*?}/g, "").replace(/(\\N)/g, "\n").trim().split(/\r?\n/).map(textLine => textLine.trim()).join("\n")
          };
        }).filter(item => item).map((item, index) => {
          if (item) return index + 1 + "\n" + item.start + " --> " + item.end + "\n" + item.text;
          return "";
        }).filter(line => line.trim()).join("\n\n");
      },
      "update": function () {
        const videoElements = document.getElementsByTagName("video"),
          activeCue = videoElements[0].textTracks[0].activeCues[0],
          subtitleElement = document.querySelector(".ec-subtitle");
        subtitleElement.innerHTML = "";
        activeCue && (subtitleElement.innerHTML = activeCue.text.split(/\r?\n/).map(textLine => "<p>" + function (htmlText) {
          return htmlText.replace(/[&<>'"]/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            "\"": "&quot;"
          })[char] || char);
        }(textLine) + "</p>").join(""));
      }
    },
    "getExt": function (url) {
      return url.includes("?") ? n(url.split("?")[0]) : url.includes("#") ? n(url.split("#")[0]) : url.trim().toLowerCase().split(".").pop();
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
    "Init": function() {
    // ==================== 1. 初始化弹幕容器和核心状态 ====================
    this.container = document.querySelector(".ec-danMa");
    this.dm_api = [];
    this.dan = [];
    this.danTunnel = { right: {}, top: {}, bottom: {} };
    this.paused = true;
    this.showing = true;

    // 设置弹幕容器默认显示（实际受播放状态控制）
    $(".ec-danMa").addClass("dm-show");

    // ==================== 2. 绑定播放器事件 ====================
    const player = XMlayEr.void;
    const danMu = this;

    player.on("play", function() {
        danMu.paused = false;
        $(".ec-danMa").addClass("dm-show");
    });

    player.on("pause", function() {
        danMu.paused = true;
        $(".ec-danMa").removeClass("dm-show");
    });

    // ==================== 3. 修复 dm-box-cc 和 dm-box-set 按钮 ====================
    // 3.1 弹幕开关按钮 (dm-box-cc)
    $(document).off("click", ".dm-box-cc").on("click", ".dm-box-cc", function() {
        const isHidden = $(this).data("id") === "1";
        if (isHidden) {
            danMu.show();
            $(this).removeClass("dm-box-cc2").data("id", "0");
            XMlayEr.cookie.Del("dm-box-cc");
        } else {
            danMu.hide();
            $(this).addClass("dm-box-cc2").data("id", "1");
            XMlayEr.cookie.Set("dm-box-cc", "1", 7);
        }
    });

    // 3.2 弹幕设置按钮 (dm-box-set)
    $(document).off("click", ".dm-box-set").on("click", ".dm-box-set", function(e) {
        e.stopPropagation(); // 防止事件冒泡
        $(".dm-style-box").removeClass("ec-show");
        $(".dm-set-box").toggleClass("ec-show");
    });

    // 点击其他区域关闭设置面板
    $(document).on("click", function() {
        $(".dm-set-box, .dm-style-box").removeClass("ec-show");
    });

    // 阻止设置面板内部点击事件冒泡
    $(".dm-set-box, .dm-style-box").on("click", function(e) {
        e.stopPropagation();
    });

    // ==================== 4. 加载弹幕数据 ====================
    this.api();
    let fontSize = getComputedStyle(this.container, null).fontSize;
    this.height = parseInt(fontSize) + 6;

    for (let i = 0; i < this.dm_api.length; i++) {
        this.apiBackend.read(this.dm_api[i][2], (function(index) {
            return function(error, response) {
                if (error) return;
                let danmuData = response ? response.map(item => ({
                    time: item[0],
                    type: item[1],
                    color: item[2],
                    text: item[4]
                })) : [];
                XMlayEr.danMu.dan = XMlayEr.danMu.dan.concat(danmuData)
                    .sort((a, b) => a.time - b.time);
            };
        })(i));
    }

    // ==================== 5. 初始化默认按钮状态 ====================
    // 恢复弹幕开关状态
    if (XMlayEr.cookie.Get("dm-box-cc") === "1") {
        $(".dm-box-cc").addClass("dm-box-cc2").data("id", "1");
        this.hide();
    }

    // ==================== 6. 调试输出 ====================
    console.log("[弹幕系统] 初始化完成", {
        container: this.container,
        buttons: {
            toggle: $(".dm-box-cc").length,
            settings: $(".dm-box-set").length
        }
    });
},

    "api": function () {
      let dmid = XMlayEr.dmid,
        ggdmapi = XMlayEr.ggdmapi ? "#1$" + XMlayEr.ggdmapi : "",
        apiString = "0$https://danmu.huaqi.pro/?ac=dm" + ggdmapi,
        apiParts = apiString.split("#"),
        apiArray = [];
      for (let i = 0; i < apiParts.length; i++) {
        let part = apiParts[i].split("$"),
          idParam = "",
          dmidValue = "";
        switch (part["0"]) {
          case "1":
            dmidValue = dmid;
            break;
          default:
            dmidValue = dmid;
            idParam = "&id=" + dmidValue;
            break;
        }
        apiArray[i] = [part["0"], part["1"], part["1"] + idParam, dmidValue];
      }
      this.dm_api = apiArray;
    },
    "apiBackend": {
      "read": function (url, callback) {
        this.api(url, null, function (xhr, response) {
          callback(null, response.danmuku);
        }, function (xhr, error) {
          callback({
            "status": xhr.status,
            "response": error
          });
        }, function (xhr) {
          callback({
            "status": xhr.status,
            "response": null
          });
        });
      },
      "send": function (data, callback) {
        this.api(XMlayEr.danMu.dm_api[0][1], data, function () {
          console.log("发送弹幕成功");
          XMlayEr.tips.msg("您的弹幕已送达");
          callback(data);
        }, function (xhr, error) {
          XMlayEr.tips.msg(error.msg);
        }, function (xhr) {
          console.log("Request was unsuccessful: " + xhr.status);
        });
      },
      "api": function (url, data, successCallback, errorCallback, failureCallback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          {
            if (4 === xhr.readyState) {
              {
                if (xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status) {
                  let response = JSON.parse(xhr.responseText);
                  return 23 !== response.code ? errorCallback(xhr, response) : successCallback(xhr, response);
                }
                failureCallback(xhr);
              }
            }
          }
        };
        xhr.open(null !== data ? "POST" : "GET", url, true);
        xhr.send(null !== data ? JSON.stringify(data) : null);
      }
    },
    "readAllEndpoints": function (endpointsData) {
      let self = this;
      self.dan = [].concat.apply([], endpointsData).sort(function (a, b) {
        return a.time - b.time;
      });
      window.requestAnimationFrame(function () {
        self.frame();
      });
    },
    "frame": function () {
      if (this.dan.length && !XMlayEr.danMu.paused && this.showing) {
        {
          let currentDan = this.dan[this.danIndex];
          const danToDraw = [];
          while (currentDan && XMlayEr.void.video.currentTime > parseFloat(currentDan.time)) {
            danToDraw.push(currentDan);
            currentDan = this.dan[++this.danIndex];
          }
          this.draw(danToDraw);
        }
      }
      window.requestAnimationFrame(() => {
        this.frame();
      });
    },
    "number2Color": function (colorNumber) {
      return "#" + ("00000" + colorNumber.toString()).slice(-6);
    },
    "number2Type": function (typeNumber) {
      switch (typeNumber) {
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
    "_measure": function (text) {
      if (!this.context) {
        {
          const style = getComputedStyle(this.container.getElementsByClassName("ec-danMa-item")[0], null);
          this.context = document.createElement("canvas").getContext("2d");
          this.context.font = style.getPropertyValue("font");
        }
      }
      return this.context.measureText(text).width;
    },
    "_danAnimation": function (danType) {
      const speedRate = this.speedRate || 1,
        isFullscreen = !!XMlayEr.void.fullscreen,
        animationTimes = {
          "top": (isFullscreen ? 6 : 4) / speedRate + "s",
          "right": (isFullscreen ? 8 : 5) / speedRate + "s",
          "bottom": (isFullscreen ? 6 : 4) / speedRate + "s"
        };
      return animationTimes[danType];
    },
    "seek": function () {
      if (!this.off) return;
      this.clear();
      for (let i = 0; i < this.dan.length; i++) {
        if (this.dan[i].time >= XMlayEr.void.video.currentTime) {
          {
            this.danIndex = i;
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
    "draw": function (danmuItems) {
      if (this.showing) {
        {
          const height = this.height,
            containerWidth = this.container.offsetWidth,
            containerHeight = this.container.offsetHeight,
            maxLines = parseInt(containerHeight) / parseInt(height),
            getRightPosition = element => {
              const elementWidth = element.offsetWidth || parseInt(element.style.width),
                elementRight = element.getBoundingClientRect().right || this.container.getBoundingClientRect().right + elementWidth;
              return this.container.getBoundingClientRect().right - elementRight;
            },
            getSpeed = width => (containerWidth + width) / 5,
            findPosition = (element, type, textWidth) => {
              const speed = containerWidth / getSpeed(textWidth);
              for (let line = 0; this.unlimited || line < maxLines; line++) {
                const lineElements = this.danTunnel[type][line + ""];
                if (lineElements && lineElements.length) {
                  if (type !== "right") {
                    continue;
                  }
                  for (let j = 0; j < lineElements.length; j++) {
                    const rightPos = getRightPosition(lineElements[j]) - 10;
                    if (rightPos <= containerWidth - speed * getSpeed(parseInt(lineElements[j].style.width)) || rightPos <= 0) break;
                    if (j === lineElements.length - 1) {
                      this.danTunnel[type][line + ""].push(element);
                      element.addEventListener("animationend", () => {
                        this.danTunnel[type][line + ""].splice(0, 1);
                      });
                      return line % maxLines;
                    }
                  }
                } else return this.danTunnel[type][line + ""] = [element], element.addEventListener("animationend", () => {
                  this.danTunnel[type][line + ""].splice(0, 1);
                }), line % maxLines;
              }
              return -1;
            };
          Object.prototype.toString.call(danmuItems) !== "[object Array]" && (danmuItems = [danmuItems]);
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < danmuItems.length; i++) {
            {
              danmuItems[i].type = this.number2Type(danmuItems[i].type);
              !danmuItems[i].color && (danmuItems[i].color = 16777215);
              const danmuElement = document.createElement("div");
              danmuElement.classList.add("ec-danMa-item");
              danmuElement.classList.add("ec-danMa-" + danmuItems[i].type);
              if (danmuItems[i].border) danmuElement.innerHTML = "<span style=\"border:" + danmuItems[i].border + "\">" + danmuItems[i].text + "</span>";else {
                danmuElement.innerHTML = danmuItems[i].text;
              }
              danmuElement.style.opacity = this.opacity;
              danmuElement.style.color = this.number2Color(danmuItems[i].color);
              danmuElement.addEventListener("animationend", () => {
                this.container.removeChild(danmuElement);
              });
              const textWidth = this._measure(danmuItems[i].text);
              let position;
              switch (danmuItems[i].type) {
                case "right":
                  position = findPosition(danmuElement, danmuItems[i].type, textWidth);
                  position >= 0 && (danmuElement.style.width = textWidth + 1 + "px", danmuElement.style.top = height * position + "px");
                  break;
                case "top":
                  position = findPosition(danmuElement, danmuItems[i].type);
                  position >= 0 && (danmuElement.style.top = height * position + "px");
                  break;
                case "bottom":
                  position = findPosition(danmuElement, danmuItems[i].type);
                  position >= 0 && (danmuElement.style.bottom = height * position + "px");
                  break;
                default:
                  XMlayEr.tips.msg("Can't handled danMa type: " + danmuItems[i].type);
              }
              if (position >= 0) {
                danmuElement.classList.add("ec-danMa-move");
                danmuElement.style.animationDuration = this._danAnimation(danmuItems[i].type);
                fragment.appendChild(danmuElement);
              }
            }
          }
          this.container.appendChild(fragment);
          return fragment;
        }
      }
    },
    "htmlEncode": function (text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2f;");
    },
    "hide": function () {
      this.showing = false;
      this.clear();
    },
    "show": function () {
      this.seek();
      this.showing = true;
    },
    "send": function (danmuData) {
      var referrer = document.referrer;
      referrer == "" && (referrer = document.URL);
      const sendData = {
        "text": danmuData.text,
        "color": danmuData.color,
        "type": danmuData.type,
        "time": XMlayEr.void.video.currentTime,
        "player": XMlayEr.danMu.dm_api[0][3],
        "size": "32px",
        "referer": referrer
      };
      this.apiBackend.send(sendData, function (response) {
        XMlayEr.danMu.dan.splice(this.danIndex, 0, response);
        XMlayEr.danMu.danIndex++;
        const drawData = {
          "text": XMlayEr.danMu.htmlEncode(response.text),
          "color": response.color,
          "type": response.type,
          "border": "2px solid #24a5ff"
        };
        XMlayEr.danMu.draw(drawData);
        let inputElement = $(".dm-input");
        inputElement.val("");
        let countdownTimer = setInterval(function () {
          let remainingTime = Number(inputElement.data("time")) - 1;
          inputElement.data("time", remainingTime).attr("placeholder", remainingTime + "s后解除冻结").attr("disabled", true);
          remainingTime <= 0 && (inputElement.data("time", 10).attr("placeholder", "来发个弹幕吧~").attr("disabled", false), clearInterval(countdownTimer));
        }, 1000);
      });
    },
    "getFontSize": function (fontSize) {
      const clamp = function (value, min, max) {
          return Math.max(Math.min(value, Math.max(min, max)), Math.min(min, max));
        },
        playerWidth = document.getElementById("player").clientWidth;
      if (typeof fontSize === "number") return clamp(fontSize, 12, playerWidth);
      if (typeof fontSize === "string" && fontSize.endsWith("%")) {
        const percentage = parseFloat(fontSize) / 100;
        return clamp(playerWidth * percentage, 12, playerWidth);
      }
      return fontSize;
    },
    "set": function (settingType, value, displayText) {
      displayText && XMlayEr.cookie.Set("d_set" + settingType, [settingType, value, displayText], 7);
      switch (settingType) {
        case 1:
          {
            this.speedRate = value;
            break;
          }
        case 2:
          {
            let fontSize = this.getFontSize(value);
            $(".ec-danMa").css("font-size", fontSize);
            this.height = fontSize + 5;
            break;
          }
        case 3:
          {
            this.opacity = value;
            break;
          }
        case 4:
          {
            $(".ec-danMa").css("bottom", value);
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
      let danmuToggle = $(".dm-box-cc"),
        danmuHidden = XMlayEr.cookie.Get("dm-box-cc"),
        directionSetting = XMlayEr.cookie.Get("content_dmP-1"),
        colorSetting = XMlayEr.cookie.Get("content_dmP-2"),
        directionItems = $(".content_dmP-1 .item"),
        colorItems = $(".content_dmP-2 .item"),
        setupItems = function (setting, items, cookieKey) {
          (setting !== undefined || setting !== "") && items.eq(setting).addClass("on-1").siblings().removeClass("on-1");
          items.click(function () {
            $(this).addClass("on-1").siblings().removeClass("on-1");
            XMlayEr.cookie.Set(cookieKey, $("." + cookieKey + " .item").index(this), 7);
          });
        };
      setupItems(directionSetting, directionItems, "content_dmP-1");
      setupItems(colorSetting, colorItems, "content_dmP-2");
      $(".dm-box-t-img").click(function () {
        $(".dm-set-box").removeClass("ec-show");
        $(".dm-style-box").toggleClass("ec-show");
      });
      let sendDanmu = function () {
        let selectedColor = $(".content_dmP-2 .on-1").data("color"),
          selectedType = $(".content_dmP-1 .on-1").data("type"),
          inputText = $(".dm-input").val();
        if (XMlayEr.empty(inputText)) XMlayEr.tips.msg("要输入弹幕内容啊喂");else inputText.length > 22 ? XMlayEr.tips.msg("弹幕内容长度最大30位!!!") : XMlayEr.danMu.send({
          "text": inputText,
          "color": selectedColor,
          "type": selectedType
        });
      };
      $(".dm-input").keydown(function (event) {
        event.keyCode === 13 && sendDanmu();
      });
      $(".dm-send").click(function () {
        sendDanmu();
      });
      if (danmuHidden === "1") {
        XMlayEr.danMu.hide();
        danmuToggle.addClass("dm-box-cc2").data("id", "1");
      }
      danmuToggle.click(function () {
        $(this).data("id") === "1" ? (XMlayEr.danMu.show(), XMlayEr.cookie.Del("dm-box-cc"), $(this).removeClass("dm-box-cc2").data("id", "0")) : (XMlayEr.danMu.hide(), XMlayEr.cookie.Set("dm-box-cc", "1", 7), $(this).addClass("dm-box-cc2").data("id", "1"));
      });
      let settingLabels = [["弹幕速度", "极慢", "较慢", "适中", "极快", "较快"], ["字体大小", "默认", "极小", "较小", "适中", "较大", "极大"], ["不透明度", "100%", "75%", "50%", "25%", "0%"], ["弹幕范围", "1/4", "半屏", "3/4"]],
        settingValues = [["", "0.5", "0.8", "1", "1.5", "2"], ["", XMlayEr.danMu.height, "1%", "2%", "3%", "4%", "5%"], ["", "1", "0.75", "0.5", "0.25", "0"], ["", "60%", "45%", "10%"]];
      $(".set-toggle").append("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z\"></path></svg>");
      let settingHtml = "",
        currentSetting = null;
      for (let i = 0; i < settingLabels.length; i++) {
        {
          let groupHtml = "";
          for (let j = 0; j < settingLabels[i].length; j++) {
            if (j === 0) groupHtml = groupHtml + "<div class=\"flex between br\"><span class=\"dm-set-label flex\"><i><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z\"></path></svg></i>" + settingLabels[i][j] + "</span></div>";else {
              groupHtml = groupHtml + "<div class=\"flex between dm-n2\" data-time=\"" + settingValues[i][j] + "\"><span class=\"dm-set-label flex\"><i></i>" + settingLabels[i][j] + "</span></div>";
            }
          }
          settingHtml = settingHtml + "<div class=\"dm-set-list\">" + groupHtml + "</div>";
          let savedSetting = XMlayEr.cookie.Get("d_set" + (i + 1));
          if (savedSetting) {
            let settingParts = savedSetting.split(",");
            XMlayEr.danMu.set(Number(settingParts[0]), settingParts[1]);
            $(".dm-set-box .dm-set-list").eq(0).children().eq(i).find("span").text(settingParts[2]);
          }
        }
      }
      $(".dm-set-box").append(settingHtml);
      $(".dm-box-set").click(function () {
        $(".dm-style-box").removeClass("ec-show");
        $(".dm-set-box").toggleClass("ec-show");
      });
      $("#dm_n1 .between").click(function () {
        {
          let settingId = $(this).data("id");
          $(".dm-set-box .dm-set-list").eq(settingId).addClass("ds-set-show").siblings().removeClass("ds-set-show");
          currentSetting = settingId;
        }
      });
      $(".dm-set-box .br").click(function () {
        $(".dm-set-box .dm-set-list").eq(0).addClass("ds-set-show").siblings().removeClass("ds-set-show");
      });
      $(".dm-n2").click(function () {
        let selectedText = $(this).text(),
          settingLists = $(".dm-set-box .dm-set-list");
        settingLists.eq(0).children().eq(currentSetting - 1).find("span").text(selectedText);
        settingLists.eq(0).addClass("ds-set-show").siblings().removeClass("ds-set-show");
        let settingValue = $(this).data("time");
        selectedText !== "默认" ? XMlayEr.danMu.set(currentSetting, settingValue, selectedText) : XMlayEr.cookie.Del("d_set2");
      });
    }
  },
  "list": {
    "html": function () {
      if (XMlayEr.html) {
        {
          let listButton = "<div class=\"art-control yxq-vod-list\" data-index=\"50\"><i class=\"art-icon hint--rounded hint--top\" aria-label=\"选集\"><svg t=\"1697209271632\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12264\" width=\"18\" height=\"18\"><path d=\"M62 152h105.356v105.356h-105.356v-105.356zM263.937 152h698.063v105.356h-698.063v-105.356zM62 459.237h105.356v105.356h-105.356v-105.356zM263.937 459.237h698.063v105.356h-698.063v-105.356zM62 766.644h105.356v105.356h-105.356v-105.356zM263.937 766.644h698.063v105.356h-698.063v-105.356z\" p-id=\"12265\" fill=\"#ffffff\"></path></svg></i></div>";
          $(".art-control-playAndPause").after(listButton);
          $(".yxq-vod-list").click(function () {
            XMlayEr.VodList.initial();
          });
        }
      }
    },
    "next": function () {
      if (XMlayEr.next0 || XMlayEr.next) {
        let nextButton = "<div class=\"art-control ec-next\" data-index=\"40\"><i class=\"art-icon hint--rounded hint--top\" aria-label=\"下一集\"><svg t=\"1697202769049\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4237\" width=\"41\" height=\"41\"><path d=\"M853.333333 204.8h-68.266666c-20.48 0-34.133333 13.653333-34.133334 34.133333v546.133334c0 17.066667 17.066667 34.133333 34.133334 34.133333h68.266666c20.48 0 34.133333-13.653333 34.133334-34.133333V238.933333c0-20.48-17.066667-34.133333-34.133334-34.133333zM614.4 467.626667L256 235.52C208.213333 204.8 170.666667 228.693333 170.666667 283.306667v484.693333c0 58.026667 37.546667 78.506667 85.333333 47.786667l358.4-238.933334c47.786667-30.72 47.786667-78.506667 0-109.226666z\" fill=\"#ffffff\" p-id=\"4238\"></path></svg></i></div>";
        $(".art-control-playAndPause").after(nextButton);
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
          let autoNextTimer = setTimeout(function () {
            XMlayEr.next0 ? top.location.href = XMlayEr.next0 : self.location.href = XMlayEr.next;
          }, 5000);
          $(".again").click(function () {
            clearTimeout(autoNextTimer);
            $(".again").remove();
            
            // 智能播放处理
            const smartPlayAgain = async () => {
              try {
                if (XMlayEr.void && XMlayEr.void.video && XMlayEr.void.video.paused) {
                  await XMlayEr.void.play();
                }
              } catch (error) {
                console.log('autoNext播放请求失败:', error.message);
                // 不抛出错误，只记录
              }
            };
            smartPlayAgain();
          });
          XMlayEr.void.on("play", function () {
            clearTimeout(autoNextTimer);
            $(".again").remove();
          });
        }
      });
    }
  },
  "broadside": function () {
    let broadsideContainer = $(".broadside");
    broadsideContainer.append("<div class=\"ec-lock\" data-id=\"1\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320h64c0-70.4 57.6-128 128-128s128 57.6 128 128v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z\"></path></svg></div>");
    let lockButton = $(".ec-lock");
    lockButton.click(function () {
      if (Number(lockButton.data("id")) === 1) lockButton.html("<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z m128-288H384V320c0-70.4 57.6-128 128-128s128 57.6 128 128v128z\"></path></svg>").data("id", "2"), box.addClass("lock-hide");else {
        lockButton.html("<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320h64c0-70.4 57.6-128 128-128s128 57.6 128 128v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z\"></path></svg>").data("id", "1");
        box.removeClass("lock-hide");
      }
    });
    broadsideContainer.append("<div class=\"ec-change\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-0.4-12.6 6.1l-0.2 64c-118.6 0.5-235.8 53.4-314.6 154.2-69.6 89.2-95.7 198.6-81.1 302.4h74.9c-0.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8zM880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H396V494h440v326z\"></path></svg></div>");
    let aspectRatioState = 0,
      videoElement = $("video");
    $(".ec-change").click(function () {
      switch (aspectRatioState) {
        case 0:
          videoElement.addClass("along1");
          ++aspectRatioState;
          break;
        case 1:
          videoElement.removeClass("along1");
          ++aspectRatioState;
          videoElement.addClass("along2");
          break;
        case 2:
          videoElement.removeClass("along2");
          ++aspectRatioState;
          videoElement.addClass("along3");
          break;
        case 3:
          videoElement.removeClass("along3");
          aspectRatioState = 0;
          break;
      }
    });
    broadsideContainer.append("<div class=\"ec-pip\" data-id=\"1\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M849.5 174.5a37.50000029 37.50000029 0 0 1 37.50000029 37.50000029v262.49999942h-75.00000058V249.49999971H212.00000029v525.00000058h225v74.99999971H174.5a37.50000029 37.50000029 0 0 1-37.50000029-37.50000029V212.00000029a37.50000029 37.50000029 0 0 1 37.50000029-37.50000029h675z m0 375.00000029a37.50000029 37.50000029 0 0 1 37.50000029 37.49999942v225a37.50000029 37.50000029 0 0 1-37.50000029 37.50000029h-299.99999971a37.50000029 37.50000029 0 0 1-37.50000029-37.50000029v-225a37.50000029 37.50000029 0 0 1 37.50000029-37.49999942h299.99999971z\"></path></svg></div>");
    let video = $("video")[0];
    $(".ec-pip").click(async () => {
      try {
        if (document.pictureInPictureEnabled && !video.disablePictureInPicture) document.pictureInPictureElement ? await document.exitPictureInPicture() : await video.requestPictureInPicture();else {
          if (video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function") {
            video.webkitSetPresentationMode(video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
          } else $(".ec-pip").hide();
        }
      } catch (error) {
        {
          $(".ec-pip").hide();
          throw error;
        }
      }
    });
  },
  "secondToTime": function (seconds) {
    const padZero = num => num < 10 ? "0" + num : String(num),
      hours = Math.floor(seconds / 3600),
      minutes = Math.floor((seconds - hours * 3600) / 60),
      secs = Math.floor(seconds - hours * 3600 - minutes * 60);
    return (hours > 0 ? [hours, minutes, secs] : [minutes, secs]).map(padZero).join(":");
  },
  "VodList": {
    "initial": () => {
      if ($(".yxq-listbox").length < 1) {
        let playerContainer = $(".art-video-player");
        playerContainer.prepend("<div class=\"vodlist-of danmu-hide\" style=\"display: none;\"></div><div class=\"yxq-listbox\"><div class=\"anthology-wrap\"></div></div></div>");
      }
      $(document).on("click", ".vodlist-of", function () {
        XMlayEr.VodList.Off();
      });
      if ($(".normal-title-wrap").length < 1) {
        {
          let anthologyContainer = $(".anthology-wrap");
          if (XMlayEr.html != "") anthologyContainer.html(XMlayEr.html);else {
            anthologyContainer.html("<div class=\"yxq-show\">没获取到选集内容</div>");
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
        let listIndex = $(".yxq-list a").index(this),
          contentList = $(".scroll-area .yxq-selset-list").eq(listIndex);
        contentList.addClass("yxq-show").siblings().removeClass("yxq-show");
        $(".yxq-list").hide();
      });
    },
    "Next": url => {
      console.log(url);
      self.location.href = url;
    }
  },
  "LoadAnimation": function () {
    $("#loading").hide();
    
    // 智能处理播放请求，避免重复播放
    const smartPlay = async () => {
      try {
        if (XMlayEr.void && XMlayEr.void.video) {
          // 检查视频是否已经在播放或暂停状态
          if (XMlayEr.void.video.paused && XMlayEr.void.video.readyState >= 2) {
            // 只有在视频暂停且准备就绪时才尝试播放
            await XMlayEr.void.play();
          } else if (XMlayEr.void.video.readyState < 2) {
            // 如果视频还没准备好，等待canplay事件
            XMlayEr.void.video.addEventListener('canplay', async () => {
              try {
                if (XMlayEr.void.video.paused) {
                  await XMlayEr.void.play();
                }
              } catch (playError) {
                console.log('播放请求失败:', playError.message);
                // 不抛出错误，只记录
              }
            }, { once: true });
          }
        }
      } catch (error) {
        console.log('播放请求被中断:', error.message);
        // 不抛出错误，只记录
      }
    };
    
    // 延迟一点执行，让播放器有时间初始化
    setTimeout(smartPlay, 100);
    
    let savedTime = Number(XMlayEr.cookie.Get(url, 2)),
      timeString = XMlayEr.secondToTime(savedTime);
    if (timeString !== "00:00" && timeString !== "NaN:NaN") {
      $(".ec-remember").html("<i class=\"art-icon art-icon-close s-on\"><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m571.733 512 268.8-268.8c17.067-17.067 17.067-42.667 0-59.733-17.066-17.067-42.666-17.067-59.733 0L512 452.267l-268.8-268.8c-17.067-17.067-42.667-17.067-59.733 0-17.067 17.066-17.067 42.666 0 59.733l268.8 268.8-268.8 268.8c-17.067 17.067-17.067 42.667 0 59.733 8.533 8.534 19.2 12.8 29.866 12.8s21.334-4.266 29.867-12.8l268.8-268.8 268.8 268.8c8.533 8.534 19.2 12.8 29.867 12.8s21.333-4.266 29.866-12.8c17.067-17.066 17.067-42.666 0-59.733L571.733 512z\"></path></svg></i>上次看到<em>" + timeString + "</em><span class=\"t-color\">继续上次播放</span>").show();
      $(".ec-remember span").click(function () {
        $(".ec-remember").html("<p></p>").hide();
        XMlayEr.void.currentTime = savedTime;
      });
      $(".ec-remember svg").click(function () {
        $(".ec-remember").html("<p></p>").hide();
      });
      let autoHideTimer = setTimeout(function () {
        $(".ec-remember").html("<p></p>").hide();
        clearTimeout(autoHideTimer);
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