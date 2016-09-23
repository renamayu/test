/* 
* @Author: Yezi
* @Date:   2016-09-13 22:21:55
* @Last Modified time: 2016-09-19 16:41:32
*/

var code="" ; //在全局 定义验证码
function createCode(){ 
	code = "";
	var codeLength = 4;//验证码的长度
	var checkCode = document.getElementById("checkCode");
	checkCode.value = "";
	var selectChar = new Array(0,1,2,3,4,5,6,7,8,9);

	for(var i=0;i<codeLength;i++) {
		var charIndex = Math.floor(Math.random()*32);
		code +=selectChar[charIndex];
	}
	if(code.length != codeLength){
		createCode();
	}
	document.getElementById("checkCode").innerHTML = code;
}

// function checkWX() {

// 		    if (!(/MicroMessenger/i).test(window.navigator.userAgent) && !(/QQ/i).test(window.navigator.userAgent)) {
// 		        window.location.href = "http://www.qq.com/";
// 		        return true;
// 		    }
// 		    return false;
// 		}

// 		if(!(/carlos/i).test(window.location.href)){
// 		    checkWX();
// 		}

// function validate () {
// 	var inputCode = document.getElementById("checkNum").value.toUpperCase();

// 	if(inputCode.length <=0) {
// 		alert("请输入验证码！");
// 		return false;
// 	}
// 	else if(inputCode != code ){
// 		alert("验证码输入错误！");
// 		createCode();
// 		return false;
// 	}
// 	else {
// 		document.getElementById("show").style.display = "block";
// 		document.getElementById("gb").style.display = "none";
// 		alert("成功");
// 		window.location.href = "turntable.html";
// 		// return true;
// 	}
// }


function checkPhone(){ 
	var phone = document.getElementById("tel").value; 
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
		alert("手机号码有误，请重填"); return false; 
	} 
}
$(document).ready(function(){
	window.onload = function() { 
		createCode();
	}; 
	
	$("#tel").blur(function(event) {
		checkPhone();
	});



});
