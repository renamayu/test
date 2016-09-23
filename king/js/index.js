Zepto(function ($) {
    var goTime = 0;
    var keyurl = window.location.href;
	var nextUrl2 = "http://119.29.8.160:8800/index2";
    var nextUrl1 = nextUrl2;
	
	//获取code
	var patt = new RegExp('http://([a-zA-Z_0-9]+)\.');
	var ret = keyurl.match(patt);
	var OssCode = ret[1];
	var referurl = nextUrl1 + "?refer=" + keyurl;
    // console.log(OssCode);
	// console.log(referurl);
	var baiduKey;

    function ajaxGoBaidu() {
        goTime++;
        $.ajax({
            type: "POST", 
            url: "http://share.520lnkm.cn/", 
            data:{ bcode:OssCode}, 
            success: function (msg) {
				console.log(msg);
                baiduKey = msg;
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?" + baiduKey;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (goTime < 30) {
                 // window.location.href = nextUrl1;
                }
            }
        })
        return baiduKey;
    }

ajaxGoBaidu();



})