<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>正在加载中...</title>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable
=no" />
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
‍

<script language="javascript" type="text/javascript"> 
$(document).ready(function(){ alert(111);
  $("#mainiframe",parent.document.body).attr("src","http://www.jb51.net ") ;
    //   $("#mainiframe").load(function(){ 
    //   $(this).height(0); //用于每次刷新时控制IFRAME高度初始化 
    //   var height = $(this).contents().height() + 10; alert(height);
    //   $(this).height( height < 500 ? 500 : height ); 
    // }); 
}); 
</script> 

</head> 
<body>
<!-- <script>
  window.location.replace("http://watch.icou.gq/");
</script> -->
<!-- <iframe src="http://watch.icou.gq/" id="iframepage"  scrolling="no" frameborder="0" onLoad="iFrameHeight()"></iframe> -->
<iframe src="http://watch.icou.gq/"" id="mainiframe" name="mainiframe" width="100%" height="100%"  frameborder="0"  marginwidth="0" marginheight="0"></iframe> 
</body>
</html>