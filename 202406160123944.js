// 随机选择数组中的一个元素
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// 检查用户设备是否为安卓或 iOS
function isAndroidOrIOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android|iphone|ipad|ipod/.test(userAgent);
}

// 生成并显示随机图片
function displayRandomBanner(imageUrls, linkUrl) {
    if (!isAndroidOrIOS()) {
        // 如果不是安卓或 iOS 设备，则不显示图片
        return;
    }

    const randomImageUrl = getRandomElement(imageUrls);
    const bannerDiv = document.getElementById("banner");

    // 创建 <a> 元素
    const linkElement = document.createElement("a");
    linkElement.href = linkUrl;

    // 创建 <img> 元素
    const imgElement = document.createElement("img");
    imgElement.src = randomImageUrl;
    imgElement.style.width = "100%";
    imgElement.alt = "";

    // 将 <img> 元素添加到 <a> 元素中
    linkElement.appendChild(imgElement);

    // 将 <a> 元素添加到页面中
    bannerDiv.appendChild(linkElement);
}

// 图片 URL 数组
const imageUrls = [
    "https://p1.meituan.net/csc/afcc35ba50b03ac809e2ee2c5c94ec5218747.jpg",
    "https://p1.meituan.net/csc/afe5338b69986d44519c20276770155845377.gif",
    "https://p0.meituan.net/csc/4af1c4ce3cf8a6e44952012c21e224ee78139.gif",
    // 添加更多图片 URL
];

// 链接地址
const linkUrl = "https://www.huaqi.live/Cache/u.php";

// 在页面加载后显示随机图片
window.onload = function() {
    displayRandomBanner(imageUrls, linkUrl);
};
