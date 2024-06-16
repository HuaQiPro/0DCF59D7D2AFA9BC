if (localStorage.getItem('theme') == null)
    $('body').addClass('theme-dark');
$('body').addClass(localStorage.getItem('theme'));
function wordToByteArray(wordArray) {
    var byteArray = [], word, i, j;
    for (i = 0; i < wordArray.length; ++i) {
        word = wordArray[i];
        for (j = 3; j >= 0; --j) {
            byteArray.push((word >> 8 * j) & 0xFF);
        }
    }
    return byteArray;
}
function arrayToInt(bs, start) {
    start = start || 0;
    const bytes = bs.subarray(start, start+4);
    let n = 0;
    for (const byte of bytes.values()) {
        n = (n<<8)|byte;
    }
    return n;
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function urlencode (str) {
    str = (str + '').toString();

    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

const ObjType = {
    isObject(obj) {
        return getObjType(obj) === "Object";
    },
    isArray(obj) {
        return getObjType(obj) === "Array";
    },
    isString(obj) {
        return getObjType(obj) === "String";
    },
    isNumber(obj) {
        return getObjType(obj) === "Number";
    },
    isBoolean(obj) {
        return getObjType(obj) === "Boolean";
    },
    isSymbol(obj) {
        return getObjType(obj) === "Symbol";
    },
    isFunction(obj) {
        return getObjType(obj) === "Function";
    },
    isNull(obj) {
        return getObjType(obj) === "Null";
    },
    isUndefined(obj) {
        return getObjType(obj) === "Undefined";
    },
    isFormData(obj) {
        return getObjType(obj) === "FormData";
    },
    isFile(obj) {
        return getObjType(obj) === "File";
    }
};

function deepEqual(obj, obj2) {
    obj = deepTrim(obj);
    obj2 = deepTrim(obj2);
    return _deepEqual(obj, obj2);
    function _deepEqual(obj, obj2) {
        if (getObjType(obj) !== getObjType(obj2)) {
            return false;
        }
        if (ObjType.isObject(obj)) {
            const keys1 = Object.keys(obj);
            const keys2 = Object.keys(obj2);
            if (keys1.length !== keys2.length) {
                return false;
            }
            return keys1.every(key => {
                return _deepEqual(obj[key], obj2[key]);
            });
        } else if (ObjType.isArray(obj)) {
            if (obj.length !== obj2.length) {
                return false;
            }
            return obj.every((item, i) => {
                return _deepEqual(obj[i], obj2[i]);
            });
        } else if (ObjType.isFormData(obj)) {
            const arr1 = [...obj];
            const arr2 = [...obj2];
            if (arr1.length !== arr2.length) {
                return false;
            }
            return arr1.every((kv, idx) => {
                const [k1, v1] = arr1[idx];
                const [k2, v2] = arr2[idx];
                if (k1 !== k2) {
                    return false;
                }
                if (getObjType(v1) !== getObjType(v2)) {
                    return false;
                }
                if (ObjType.isFile(v1)) {
                    const keys = ["name", "size", "type"];
                    return keys.every(key => {
                        return v1[key] === v2[key];
                    });
                } else {
                    return v1 === v2;
                }
            });
        } else {
            return obj === obj2;
        }
    }
}

function deepTrim(data) {
    return _deepTrim(data);
    function _deepTrim(data) {
        if (ObjType.isFormData(data)) {
            const formData = new FormData();
            const iterator = data.entries();
            const items = [];
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { value, done } = iterator.next();
                if (done) {
                    break;
                }
                const name = value[0];
                let val = value[1];
                if (ObjType.isString(val)) {
                    val = val.trim();
                }
                items.push([name, val]);
            }
            items.forEach(item => {
                const [name, val] = item;
                formData.append(name, val);
            });
            return formData;
        } else if (ObjType.isObject(data) || ObjType.isArray(data)) {
            const obj = ObjType.isObject(data) ? {} : [];
            for (const i in data) {
                obj[i] = _deepTrim(data[i]);
            }
            return obj;
        } else if (ObjType.isString(data)) {
            return data.trim();
        } else {
            return data;
        }
    }
}

function getObjType(obj) {
    const typeStr = Object.prototype.toString.call(obj);
    return typeStr.replace(/\[object (\w+)\]/, "$1");
}

$(document).ready(function (){
    $('.hide-theme-light').click(function(){
        $('body').removeClass('theme-dark');
        localStorage.setItem('theme','theme-light');
    });
    $('.hide-theme-dark').click(function(){
        $('body').addClass('theme-dark');
        localStorage.setItem('theme','theme-dark');
    });
    $('#keyword').bind('keyup', function(event) {
        if (event.keyCode == "13") {
            var keyword = urlencode($('#keyword').val().trim());
            if (keyword.trim() == '') {
                $.toast({
                    text: '搜索内容不能为空！',
                    position: 'top-center',
                    icon: 'error',
                    loader: false,
                });
                return ;
            }
            window.location.href = '/search.php?searchword=' + keyword;
        }
    });

    if(localStorage.getItem("recente")){
        var json=JSON.parse(localStorage.getItem("recente"));
        var list="";
        for(i=0;i<json.length;i++){
            list += '<a href="' + json[i].vod_url + '" class="dropdown-item text-muted">' + json[i].vod_name + '----' +  json[i].vod_part + '<span class="badge ms-auto" onclick="$(this).parent().remove();removeHistory(\''+json[i].vod_name+'\');return false;">×</span></a>';
        }
        $("#history").append(list);
    } else {
        $("#history").append('<a href="javascript:void(0)" class="dropdown-item">暂无观看记录</a>');
    }

});
function removeHistory(vod_name) {
    var recente=localStorage.getItem("recente");
    var len=0;
    if(recente){
        recente = eval("("+recente+")");
        len=recente.length;
        var hasRecord = false;
        var json="[";
        $(recente).each(function(i){
            if(this.vod_name!=vod_name){
                hasRecord = true;
                json+="{\"vod_name\":\""+this.vod_name+"\",\"vod_url\":\""+this.vod_url+"\",\"vod_part\":\""+this.vod_part+"\"}";
                if(i!=len-1)
                    json+=",";
            }
        })
        json+="]";
        if (!hasRecord) {
            localStorage.removeItem("recente");
            $("#history").append('<a href="javascript:void(0)" class="dropdown-item">暂无观看记录</a>');
        } else {
            localStorage.setItem("recente", json);
        }
    }
}

function initAd(ad) {
    if (!ad.playAd) {
        $('#ad-index').remove();
        $('body').remove('.ayx');
        return;
    }
    if ($('#ad-index').length > 0) {
        $('#ad-index').html('');
        $('#ad-index').html('<b style="position:absolute;right:10px;top:0px;width:33px;height:33px;text-align:center" onclick="$(this).parent().remove();"><img src="/images/close.png"/></b> <a target="_blank" class="ayx cursor-pointer"> <img class="d-block w-100" src="' + ad.indexAd.pic +'" referrerPolicy="no-referrer"></a>');
    }
    if ($('#ad-index').length > 0 || $('.player').length > 0 || $('#download-list').length > 0) {
        $('body').remove('.ayx');
        if (!IsPC()) {
            $('body').append('<div class="ayx" style="position: fixed;bottom: -10px;right:0;z-index:999;width:150px"><b style="position:absolute;right:0;top:0px;width:33px;height:33px;text-align:center" onclick="$(this).parent().remove();"><img src="/images/close.png"/></b><a  href="javascript:void(0)" rel="nofollow" target="_new"><img src="'+ ad.floatAd.pic+'" width="100%"/></a></div>');
        } else {
            //$('#index-pic').attr('style', 'width:107%;margin-left:-30px;margin-top:0px');
            if ($('#download-list').length <= 0 || $('.player').length < 0) {
                $('body').append('<div class="ayx" style="position: fixed;bottom: -10px;right:0;z-index:999;width:250px"><b style="position:absolute;right:0;top:0px;width:33px;height:33px;text-align:center" onclick="$(this).parent().remove();"><img src="/images/close.png"/></b><a  href="javascript:void(0)" rel="nofollow" target="_new"><img src="' + ad.floatAd.pic + '" width="100%"/></a></div>');
            }
        }
    }
    if ($('.player').length > 0 && !(legal != 1 && !localStorage.getItem('member'))) {
        $('.player').html('');
        $('.player').html('<div>' +
            '<center><a class="ayx cursor-pointer" target="_new" style="display:block;"><img width="100%" src="' + ad.playAd.pic +'"></a></center>' +
            '<span id="count-down" style="padding: 10px 15px;border-radius: 0; top:0;right:0;width:150px;text-align: center">倒计时0s</span>\n' +
            '</div>');
        window.adInited = true;
    }
    if ($('.ayx').length > 0) {
        $('.ayx').click(function () {
            window.open(ad.playAd.link);
        });
    }
}


function n() {
    for (var t = 0, e = new Array(256), r = 0; 256 !== r; ++r)
        t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = r) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1,
            e[r] = t;
    return "undefined" != typeof Int32Array ? new Int32Array(e) : e
}

function getS(t) {
    for (var e, r, o = -1, i = 0, a = t.length; i < a;)
        (e = t.charCodeAt(i++)) < 128 ? o = o >>> 8 ^ n[255 & (o ^ e)] : e < 2048 ? o = (o = o >>> 8 ^ n[255 & (o ^ (192 | e >> 6 & 31))]) >>> 8 ^ n[255 & (o ^ (128 | 63 & e))] : e >= 55296 && e < 57344 ? (e = 64 + (1023 & e),
            r = 1023 & t.charCodeAt(i++),
            o = (o = (o = (o = o >>> 8 ^ n[255 & (o ^ (240 | e >> 8 & 7))]) >>> 8 ^ n[255 & (o ^ (128 | e >> 2 & 63))]) >>> 8 ^ n[255 & (o ^ (128 | r >> 6 & 15 | (3 & e) << 4))]) >>> 8 ^ n[255 & (o ^ (128 | 63 & r))]) : o = (o = (o = o >>> 8 ^ n[255 & (o ^ (224 | e >> 12 & 15))]) >>> 8 ^ n[255 & (o ^ (128 | e >> 6 & 63))]) >>> 8 ^ n[255 & (o ^ (128 | 63 & e))];
    return -1 ^ o
}