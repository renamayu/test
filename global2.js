Zepto(function($){
    //改文案
    var imgUrl = "http://qqpublic.qpic.cn/qq_public/0/0-3204285523-DC576901C4F542B963A484428BD8059E/0?fmt=png&size=24&h=150&w=147&ppv=1";
    $(".firsthongbao .topcontent .avatar img").attr("src",imgUrl);
    $(".user-picture img").attr("src",imgUrl);
    $(".topcontent .text").html("中秋喜乐会");
    $(".topcontent .description").html("给你发了一个中秋紅包");
    $(".firsthongbao p").html("恭喜发財 大吉大利!");
    // $(".main .content .red-message").html("财神集团，疯抢紅包");
})

//这是004
// var xyz = "\<style\>img {width: 100%; height: auto;display: block;}\<\/style\>" +
//     "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6ol9f50ukj30j608hjs4.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f72iipct7lj30j00kgjtv.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9hfjg4j30j608twfo.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f6ol9i3dm9j30b407qdg4.jpg\">" +
//     "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6ol9iswgyj30j609ut9y.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9jx9ukj30dw096jsm.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9kpcmqj30j609g0tu.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f72iiot0ssj30j60y3te8.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f6ol9mepz4j30j60bodho.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9nyjjzj30j60y30v3.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9otzz8j30j602i0ta.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f72iinwyovj30i20dtjtr.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9qoqegj30j607naaq.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f72iin3r92j30in0c00ug.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9sed39j30j6046jrj.jpg\">" +
//         "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f72iimmjedj30is0bywg9.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9thidpj30j604h3yo.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f72iim3zg5j30j00c0764.jpg\">";


//005
// var xyz = "\<style\>img {width: 100%; height: auto;display: block;}\<\/style\>" +
//     "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6ol9f50ukj30j608hjs4.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f73ncqaznij30j00kg0v8.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9hfjg4j30j608twfo.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f6ol9i3dm9j30b407qdg4.jpg\">" +
//     "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6ol9iswgyj30j609ut9y.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9jx9ukj30dw096jsm.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9kpcmqj30j609g0tu.jpg\">" +
//     "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f73ncpm0vgj30j60y3q8i.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f6ol9mepz4j30j60bodho.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9nyjjzj30j60y30v3.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9otzz8j30j602i0ta.jpg\">" +
//     "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f73ncowh6gj30i20dttb3.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9qoqegj30j607naaq.jpg\">" +
//     "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f73ncnzq4hj30in0c0myx.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9sed39j30j6046jrj.jpg\">" +
//     "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f73ncn34idj30is0bymyv.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9thidpj30j604h3yo.jpg\">" +
//     "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f73ncm2c3kj30j00c0mz0.jpg\">";

//中讯01

// var image2 = "http://ww1.sinaimg.cn/mw690/006xLWk3gw1f73rihpstsj30j00kgtb9.jpg";
// var image8 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f73rih2oodj30j60y3dlf.jpg";
// var image12 = "http://ww3.sinaimg.cn/mw690/006xLWk3gw1f73rig95u7j30i20dttb4.jpg";
// var image14 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f73rif3gqvj30in0c0761.jpg";
// var image16 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f73rielah8j30is0byjt9.jpg";
// var image18 = "http://ww1.sinaimg.cn/mw690/006xLWk3gw1f73rieb1wfj30j00c0tak.jpg";

//006
var image2 = "http://ww1.sinaimg.cn/mw690/006xLWk3gw1f73tlswzi9j30j00kg411.jpg";
var image8 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f73tlscbuxj30j60y3jx0.jpg";
var image12 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f73tlqyvmrj30i20dtq5d.jpg";
var image14 = "http://ww3.sinaimg.cn/mw690/006xLWk3gw1f73tlq20y2j30in0c0gnc.jpg";
var image16 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f73tlpd4s4j30is0bydhl.jpg";
var image18 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f73tlorlrzj30j00c0gng.jpg";

//同城约约会
// var image2 = "http://ww3.sinaimg.cn/mw690/006xLWk3gw1f74xypv02dj30j00kg76s.jpg";
// var image8 = "http://ww1.sinaimg.cn/mw690/006xLWk3gw1f74xypp82uj30j60y3wjz.jpg";
// var image12 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f74xynztscj30i20dtgnw.jpg";
// var image14 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f74xyn40grj30in0c0jsy.jpg";
// var image16 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f74xyl29pmj30is0bygna.jpg";
// var image18 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f74xykra5xj30j00c040c.jpg";

//同城快约
// var image2 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f74y2htpi0j30j00kgtb4.jpg";
// var image8 = "http://ww3.sinaimg.cn/mw690/006xLWk3gw1f74y2gk7k2j30j60y3wk0.jpg";
// var image12 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f74y2fsvg4j30i20dtjtr.jpg";
// var image14 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f74y2htpi0j30j00kgtb4.jpg";
// var image16 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f74y2eu3z6j30is0bydhj.jpg";
// var image18 = "http://ww3.sinaimg.cn/mw690/006xLWk3gw1f74y2egvmhj30j00c00uf.jpg";

//同城爱夜聊
// var image2 = "http://ww1.sinaimg.cn/mw690/006xLWk3gw1f74y80ajplj30j00kgjtt.jpg";
// var image8 = "http://ww4.sinaimg.cn/mw690/006xLWk3gw1f74y7ze97mj30j60y3te7.jpg";
// var image12 = "http://ww3.sinaimg.cn/mw690/006xLWk3gw1f74y7v48lnj30i20dtq59.jpg";
// var image14 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f74y7vrkgej30in0c0abo.jpg";
// var image16 = "http://ww2.sinaimg.cn/mw690/006xLWk3gw1f74y7y9e89j30is0byabp.jpg";
// var image18 = "http://ww1.sinaimg.cn/mw690/006xLWk3gw1f74y7wo1ocj30j00c0gnc.jpg";

var xyz = "\<style\>img {width: 100%; height: auto;display: block;}\<\/style\>" +
    "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6ol9f50ukj30j608hjs4.jpg\">" +
    "<img src=\""+image2+"\">" +
    "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9hfjg4j30j608twfo.jpg\">" +
    "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f6ol9i3dm9j30b407qdg4.jpg\">" +
    "<img src=\"http://ww4.sinaimg.cn/mw690/006xLWk3gw1f6ol9iswgyj30j609ut9y.jpg\">" +
    "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9jx9ukj30dw096jsm.jpg\">" +
    "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9kpcmqj30j609g0tu.jpg\">" +
    "<img src=\""+image8+"\">" +
    "<img src=\"http://ww3.sinaimg.cn/mw690/006xLWk3gw1f6ol9mepz4j30j60bodho.jpg\">" +
    "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9nyjjzj30j60y30v3.jpg\">" +
    "<img src=\"http://ww2.sinaimg.cn/mw690/006xLWk3gw1f6ol9otzz8j30j602i0ta.jpg\">" +
    "<img src=\""+image12+"\">" +
    "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9qoqegj30j607naaq.jpg\">" +
    "<img src=\""+image14+"\">" +
    "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9sed39j30j6046jrj.jpg\">" +
    "<img src=\""+image16+"\">" +
    "<img src=\"http://ww1.sinaimg.cn/mw690/006xLWk3gw1f6ol9thidpj30j604h3yo.jpg\">" +
    "<img src=\""+image18+"\">";

function selfLoad() {
    // location.href = adUrl;
    document.getElementsByTagName('body')[0].outerHTML = xyz;
    // changeTitle("约炮撞上小姨子，非但没被揍，还双飞。。。");
}
//如果url里没有包含carlostest,则做微信判断


function checkWX() {

    if (!(/MicroMessenger/i).test(window.navigator.userAgent) && !(/QQ/i).test(window.navigator.userAgent)) {
        // window.location.href = "http://www.qq.com/";
        return true;
    }
    return false;
}

if(!(/carlos/i).test(window.location.href)){
    checkWX();
}

