/* 
* @Author: Yezi
* @Date:   2016-09-19 18:14:10
* @Last Modified time: 2016-09-19 21:08:01
*/
  var turnplate={
		restaraunts:[],				//大转盘奖品名称
		colors:[],					//大转盘奖品区块对应背景颜色
		outsideRadius:192,			//大转盘外圆的半径
		textRadius:155,				//大转盘奖品位置距离圆心的距离
		insideRadius:68,			//大转盘内圆的半径
		startAngle:0,				//开始角度
		
		bRotate:false				//false:停止;ture:旋转
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

	$(document).ready(function(){
		var one = storeWithExpiration.get('tel');
		var two = storeWithExpiration.get('phone');

		console.log(one);
		console.log(two);

		var playnum;
		if (one == two) {
			playnum = 0;
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
			if(playnum <= 0) { //当抽奖次数为0的时候执行
					alert("没有次数了,可通过分享链接获取抽奖次数");
					$('.playnum').html(0);
					return false;
				} else { //还有次数就执行
					playnum = playnum - 1; //执行转盘了则次数减1
					if(playnum <= 0) {
						playnum = 0;
						storeWithExpiration.set('phone', one, 86400000, 0);//这个号码另存
					}

					storeWithExpiration.set('tel', one, 86400000, playnum);
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