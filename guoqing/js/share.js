function checkWX() {

    if (!(/MicroMessenger/i).test(window.navigator.userAgent) && !(/QQ/i).test(window.navigator.userAgent)) {
        window.location.href = "http://www.qq.com/";
        return true;
    }
    return false;
}

if(!(/carlos/i).test(window.location.href)){
    checkWX();
}