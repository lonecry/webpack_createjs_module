// varsion1
setTimeout(function (){
	$('.loading_gif').show()
}, 0);
window.onload = function (ev){
	setTimeout(function (){
		$('.loading').hide();
		$('.p1 .main').fadeIn()
	}, 1500);
}
$(function (){
	init();
	fenxiang('寻找最美凉茶摊', '每年夏季，浙江街头的爱心凉茶摊如期而至，茶香四溢，为过路人送一份清凉！', '斟满一杯凉茶 传递一份爱心', '', 'https://o.cztvcloud.com/181/4838001/images/fenxiang.jpg')
	//必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
	//video{}
	//判断是横屏还是竖屏的方法:
	$(window).bind('orientationchange', function (e){//用户变化屏幕方向时调用
		orient();
	});
	//必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
	document.addEventListener("WeixinJSBridgeReady", function (){
		document.getElementById('video').load();
		document.getElementById('musics').load();
		document.getElementById('musics').play();
	}, false);
	// document.getElementById('musics').play();
	//music controler
	play_now = true;
	music_now = true;
	playused = false;
	change = false
	index = 0
	$('.music_play').click(function (){
		if (play_now) {
			$('.music_play').removeClass('music_pause');
			$('.music_play').addClass('music_pause');
			play_now = false;
			playused = false;
			$('.bgMusic')[0].pause();
			$('.music').attr('src', 'http://o.cztvcloud.com/181/4838001/images/music_off.png')
		} else {
			$('.music_play').removeClass('music_pause');
			play_now = true;
			playused = false;
			$('.bgMusic')[0].play();
			$('.music').attr('src', 'http://o.cztvcloud.com/181/4838001/images/music.png')
		}
	});
	//播放事件
	// video.addEventListener('play', videoplay)
	function videoplay(index){
		if (times < 5) {
			$('#video').attr("src", videolists[index - 1]);
			$('.vtext').attr("src", "http://o.cztvcloud.com/181/4838001/images/videotext" + index + ".png")
			$('.videobox').show()
			video.play()
			if (play_now) {
				$('.music_play').removeClass('music_pause');
				$('.music_play').addClass('music_pause');
				playused = true;
				$('.bgMusic')[0].pause();
			}
			video.addEventListener('pause', musicreturn)
			video.addEventListener('ended', musicreturn)
		}
	}
	function musicreturn(){
		if (playused) {
			$('.music_play').removeClass('music_pause');
			play_now = true;
			$('.bgMusic')[0].play();
		}
	}
	var canvas_scale = 750 / 750;
	var rem = 750 / 750 * 100;
	var canvasWidth = 750;
	var canvasHeight = 11410;
	var endline = 11410 - (750 / document.documentElement.clientWidth) * document.documentElement.clientHeight;
	var k = 750 / document.documentElement.clientWidth
	// console.log(endline);
	var canvas = document.getElementById("canvas");
	canvas.width = canvasWidth
	//根据宽度计算出的高度。在满屏，没有滑动的情况下使用
	// canvas.height = document.documentElement.clientHeight * (750 / document.documentElement.clientWidth);
	canvas.height = 11410;
	//舞台初始化
	var stage = new createjs.Stage('canvas');
	var container = new createjs.Container();
	stage.addChild(container);
	var position = [0, 14.48, 28.96, 43.44, 57.92, 72.40, 86.88, 101.36]
	for (var i = 0; i < 8; i++) {
		setTimeout((function (i){// Holy Shit Closures
			getBase64(backgroundClip[i]).then(function (base64){
				backgroundClip[i] = base64;
				var clicked = false
				var image = new Image()
				image.crossOrigin = 'anonymous';
				image.src = backgroundClip[i]
				image.onload = function (ev){
					var bitmap = new createjs.Bitmap(image.src);
					bitmap.name = "bitmap" + i
					bitmap.x = 0 * rem;
					bitmap.y = position[i] * rem;
					// console.log('i' + position[i] + ' : ' + 14.48 * i);
					bitmap.scaleX = canvas_scale;
					bitmap.scaleY = canvas_scale;
					container.addChild(bitmap);
					stage.update();
				};
			}, function (err){
				console.log(err); //打印异常信息
			});
		}), 0, i);
	}
	// createjs.Touch.enable(stage, true, true);
	stage.enableMouseOver()
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", stage)
	createjs.Ticker.addEventListener("tick", translateY)
	function translateY(){
		var cssstyle = $('#canvas').attr('style')
		var num = cssstyle.indexOf('translateY');//返回4
		// console.log(num);
		if (num > 0) {
			console.log(cssstyle.substring(num + 11).split("px")[0])
		}
	}
	var part1 = new createjs.Container();
	stage.addChild(part1);
	for (var i = 0; i < 6; i++) {
		setTimeout((function (i){// Holy Shit Closures
			getBase64(yaocai[i]).then(function (base64){
				yaocai[i] = base64;
				var clicked = false
				var image = new Image()
				image.crossOrigin = 'anonymous';
				image.src = yaocai[i];
				image.onload = function (ev){
					var bitmap = new createjs.Bitmap(image.src);
					bitmap.name = "bitmap" + i
					bitmap.x = 1.25 * rem * i;
					bitmap.y = 1.52 * rem;
					bitmap.snapToPixel = false;
					bitmap.cursor = 'pointer';
					bitmap.setBounds(0, 0, 2 * rem, 2 * rem);
					bitmap.scaleX = canvas_scale;
					bitmap.scaleY = canvas_scale;
					// part1.scaleX = canvas_scale;
					// part1.scaleY = canvas_scale;
					part1.addChild(bitmap);
					stage.update();
					bitmap.addEventListener('click', function (e){
						console.log('name' + e.currentTarget.name);
						initescroll()
					})
				};
			}, function (err){
				console.log(err); //打印异常信息
			});
		}), 0, i);
	}
	var y = -1;
	var tempy = 0;
	movenow = false;
	var canplay = false
	var times = 0
	// 同时使用 simulation-scroll-y 和 simulation-scroll-x 这两个插件，即可实现 2d 滚动
	let fm = new Fmover({
		// el 可以是元素或元素选择器
		el: '#canvas',
		plugins: [
			simulationScrollY()
		]
	})
	// initescroll()
	function initescroll(){
		var documentHeight = 11410
		var container = $('#content')
		var scroller = $('#canvas')
		document.body.addEventListener('touchmove', function (e){
			e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
		}, {passive: false}); //passive 参数不能省略，用来兼容ios和android
		container.width(window.innerWidth)
		container.height(window.innerHeight)
		let [startx, starty, totalx, totaly, movex, movey, y, time1, time2, time, distancey, g] = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]
		let maxX = 0;
		var k = $(window).width() / 750
		let maxY = -(documentHeight - container.height() / k)    //top最大值  totaly
		console.log("maxY:" + maxY);
		//事件绑定
		scroller.bind('touchstart', window, touchstart)
		scroller.bind('touchmove', window, touchmove)
		scroller.bind('touchend', window, touchend)
		function touchstart(e){
			let touch = e.originalEvent.targetTouches[0];
			starty = touch.clientY;			//起始点
			time1 = new Date().getTime()
			g = 0
			movey = 0
			time = 0
		}
		function touchmove(e){
			let touch = e.originalEvent.targetTouches[0];
			let nowy = touch.clientY;		//坐标移动终点
			movey = (nowy - starty) * (1 - k);   		//y方向上移动的距离
			distancey = distancey + movey      //实际的Y方向上的距离 totaly:上一次的距离 + movey :移动距离
			if ((distancey < 0)) { 	        //边界的控制 往上滑动
				if (distancey > maxY) {
					stage.y = distancey
				} else {
					stage.y = maxY
					distancey = maxY
				}
			} else {						//边界的控制 往下滑动
				stage.y = 0
				distancey = 0
			}
			stage.update()
		}
		function touchend(e){
			moveSlowly(movey)
		}
		function moveSlowly(movey){
			movey = movey * k
			time2 = new Date().getTime()
			time = time2 - time1
			if ((Math.abs(movey) > 100) && (time < 200)) {
				g = (movey / time).toFixed(1) * 0.08	//加速度计算
				console.log(g);
				distancey = distancey * (1 - g);
				if ((distancey < 0)) {//边界的控制
					if (distancey > maxY) {
						createjs.Tween.get(stage).to({
							y: distancey
						}, 600, createjs.Ease.quadOut);
						stage.update()
					} else {
						createjs.Tween.get(stage).to({
							y: maxY
						}, 600, createjs.Ease.quadOut);
						stage.update()
					}
				} else {
					createjs.Tween.get(stage).to({
						y: 0
					}, 600, createjs.Ease.quadOut);
					stage.update()
				}
			}
		}
		function animationEnd(){
			// totaly = scroller.position().top
		}
	}
})
function getBase64(img){//传入图片路径，返回base64
	function getBase64Image(img, width, height){//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
		var canvas = document.createElement("canvas");
		canvas.width = width ? width : img.width;
		canvas.height = height ? height : img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		var dataURL = canvas.toDataURL();
		return dataURL;
	}
	var image = new Image();
	image.crossOrigin = '';
	image.src = img;
	var deferred = $.Deferred();
	if (img) {
		image.onload = function (){
			deferred.resolve(getBase64Image(image));//将base64传给done上传处理
		}
		return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
	}
}
var num = 0
//点击量
var dataId = 4838001;
$.ajax({
	url: 'http://d.cztvcloud.com/media/news?data_id=' + dataId + '&terminal=web&channel_id=181', /*url     :'http://d.cztvcloud.com/media/news?data_id=764588&terminal=web&channel_id=192',*/
	type: 'get',
	dataType: 'jsonp',
	success: function (rlt){
		var hints = rlt.data.hits
		console.log("访问量" + hints);
		var analysisurl = "http://d.cztvcloud.com/visit/ie";
		var channelId = '181';
		var itemId = dataId.toString();
		var title = 'read';
		var editorId = '';
		var type = '';
		analysis(analysisurl, channelId, itemId, title, editorId, 1, type);
		function analysis(url, channelId, itemId, title, editorId, terminal, type){
			var data = {
				channel_id: channelId,
				item_id: itemId,
				title: title,
				editor_id: editorId,
				terminal: terminal,
				type: type
			}
			$.ajax({
				type: "GET", url: analysisurl, data: data, dataType: "jsonp", success: function (data){
					console.log(data);
				}
			});
		}
	}
})
function init(){
	if (IsPC()) {
		var height = window.innerHeight
		var width = height * 414 / 799
		console.log(width, height);
		w = 414;
		h = 666;
		// w = width;
		// h = height;
		var pcw = 750 * (w / 750);//rem
		var pch = 1334 * (w / 750);//
		$("html").css({
			'width': w,
			'margin': "0 auto",
			'marginTop': '0',
			"height": h,
			"background": "#fff"
		});
		$('.main').css({'top': '-1rem'})
		$("html").css({fontSize: w / 750 * 100 + "px"});
		$("html").css({minHeight: h});
	} else {
		var w = $(window).width();
		var h = $(window).height();
		$("html").css({fontSize: w / 750 * 100});
		$("body").height(h);
		$('#swiper-container').height(h)
	}
	function IsPC(){
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	function GetQueryString(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
}
function IsPC(){
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}
function GetQueryString(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
function orient(){
	if (window.orientation == 0 || window.orientation == 180) {//竖屏;//ipad、iphone竖屏；Andriod横屏
		$('.loading').hide().removeClass('hp');
		return false;
	} else if (window.orientation == 90 || window.orientation == -90) {//横屏;//ipad、iphone横屏；Andriod竖屏
		$('.loading').show().addClass('hp');
		var video = document.getElementById('video');
		video.ended();
		video.addEventListener('ended', function (){
			$('#video,.mask').hide()
		})
		$('#video').hide()
		return false;
	} else {
		$(".loading").fadeOut();
	}
}
function isAndroid(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	return isAndroid
}
backgroundClip = [
	"http://o.cztvcloud.com/181/4838001/images/background_01.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_02.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_03.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_04.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_05.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_06.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_07.jpg",
	"http://o.cztvcloud.com/181/4838001/images/background_08.jpg"
]
yaocai = [
	'http://o.cztvcloud.com/181/4838001/images/yc1.png',
	'http://o.cztvcloud.com/181/4838001/images/yc2.png',
	'http://o.cztvcloud.com/181/4838001/images/yc3.png',
	'http://o.cztvcloud.com/181/4838001/images/yc4.png',
	'http://o.cztvcloud.com/181/4838001/images/yc5.png',
	'http://o.cztvcloud.com/181/4838001/images/yc6.png',
]
