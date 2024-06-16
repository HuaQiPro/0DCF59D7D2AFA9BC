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
    iframe.sandbox = "allow-same-origin allow-forms allow-scripts";
    iframe.style.border = "none";

    // 将 iframe 添加到页面中的指定位置
    document.getElementById("player").appendChild(iframe);
}
