/*-----------------------播放器 end---------------------------*/
if (typeof huaqi !== "undefined") {
    // 创建 iframe 元素
    var iframe = document.createElement("iframe");

    // 设置 iframe 属性
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "600px");
    iframe.setAttribute("src", "https://www.huaqi.live/?url=" + encodeURIComponent(huaqi.dz) + "&id=" + huaqi.id + "&api=" + encodeURIComponent(window.location.origin + huaqi.api) + "&ename=" + encodeURIComponent(huaqi.ename));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("border", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("mozallowfullscreen", "true");
    iframe.setAttribute("msallowfullscreen", "true");
    iframe.setAttribute("oallowfullscreen", "true");
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.setAttribute("security", "restricted");
    iframe.setAttribute("sandbox", "allow-same-origin allow-forms allow-scripts allow-popups");
    iframe.style.border = "none";

    // 将 iframe 添加到页面中的指定位置
    document.getElementById("player").appendChild(iframe);
}
