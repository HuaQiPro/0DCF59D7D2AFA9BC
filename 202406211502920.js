var zuoz={

    'Image':{
        'Lazyload':{
            'Show': function(){
                try { $("img.lazy").lazyload(); }catch(e){};
            },
            'Box': function($id){
                $("img.lazy").lazyload({
                    container: $("#"+$id)
                });
            }
        }
    },
    
    
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
 
        'Style':{
           'Init':function(){
                let style = zuoz.Cookie.Get('mx_style');
                let currentBgColor = $("#cssFile").attr('href').match(/\w+.css$/g)[0].split('.')[0]
                if(style != null){
                    this.Css();
                }else {
                    zuoz.Cookie.Set('mx_style',currentBgColor);
                }
                if(currentBgColor == '202406211445209') {
                    $('#changeAppearance').html("切换浅色外观")
                }else {
                    $('#changeAppearance').html("切换深色外观")
                }
                this.Switch();
            },
            'Set' : function(e){
                zuoz.Cookie.Set('mx_style',e);
            },
            'Switch' :function(){
                let style = zuoz.Cookie.Get('mx_style')
                if(style == '202406211445209') {
                    $('#changeAppearance').html("切换浅色外观")
                }else if(style== '202406211425003') {
                    $('#changeAppearance').html("切换深色外观")
                }
                $('.icon-rijian').click(function(){
                    $('.icon-yejian').toggle()
                    $('.icon-rijian').toggle()
                    let id = $(this).attr('data-id');
                    $('#changeAppearance').html("切换深色外观")
                    zuoz.Style.Set(id);
                    zuoz.Style.Css();
                })
                $('.icon-yejian').click(function(){
                    $('.icon-yejian').toggle()
                    $('.icon-rijian').toggle()
                    let id = $(this).attr('data-id');
                     $('#changeAppearance').html("切换浅色外观")
                    zuoz.Style.Set(id);
                    zuoz.Style.Css();
                })
            },
            'Css':function(){
                $("#cssFile").attr('href','https://www.huaqi.ru/Redirect/HuaQiPro/0DCF59D7D2AFA9BC/'+zuoz.Cookie.Get('mx_style')+'.css');
            }
        }
}

$(function(){
    zuoz.Image.Lazyload.Show();
    zuoz.Style.Init();
});

