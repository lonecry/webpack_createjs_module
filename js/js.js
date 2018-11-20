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
	document.getElementById('musics').play();
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
	var video = document.getElementById('video')
	video.addEventListener('pause', function (){
		console.log('video paused');
	})
	//视频关闭
	$('.back').click(function (){
		$('.videobox').hide();
		video.pause()
		musicreturn()
	})
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
	// $('#canvas').css({'width': window.innerWidth})
	// $('#canvas').css({'height': window.innerHeight})
	var canvasWidth = 750;
	var canvasHeight = 11410;
	var endline = 11410 - (750 / document.documentElement.clientWidth) * document.documentElement.clientHeight;
	var k = 750 / document.documentElement.clientWidth
	// console.log(endline);
	var canvas = document.getElementById("canvas");
	canvas.width = canvasWidth
	canvas.height = document.documentElement.clientHeight * (750 / document.documentElement.clientWidth);
	//create stage
	var stage = new createjs.Stage('canvas');
	// stageBreakHandler();
	//大背景
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
	createjs.Touch.enable(stage);
	stage.enableMouseOver()
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage)
	// createjs.Ticker.addEventListener("tick", stageBreakHandler)
	createjs.Ticker.addEventListener("tick", scroll)
	function stageBreakHandler(event){
		if (stageWidth != document.documentElement.clientWidth || stageHeight != document.documentElement.clientHeight) {
			stageWidth = 750;
			stageHeight = 1206;
			canvas.style.width = 750 + 'px';
			canvas.style.height = 1334 * 1 + 'px';
		}
		stage.update();
	}
	var y = -1;
	var tempy = 0;
	movenow = false;
	var canplay = false
	var times = 0,
		dyk = 1
	function wetherScroll(){
		stage.y = -4 * rem;
		var canvas = document.querySelector("#canvas");
		//信号量
		var y = -4 * rem;
		var startX, startY, dx, dy, endup, enddw;
		endup = true, enddw = false
		canvas.addEventListener("touchstart", function (event){
			canplay = true;
			// console.log(canplay);
			times = 0
			event.preventDefault();
			var thefinger = event.touches[0];
			startX = thefinger.clientX;
			startY = thefinger.clientY;
		}, true);
		canvas.addEventListener("touchmove", function (event){
			times++
			movenow = true;
			stage.mouseEnabled = false
			event.preventDefault();
			var thefinger = event.touches[0];
			dy = thefinger.clientY - startY;
			var distance = (y + dy * k)//负数
			dyk = dy * k
			if (dy > 0) {//手指往下滑
				if ((y + dyk) >= 0) {//到底了
					y = 0
					stage.y = 0;
					tempy = stage.y
					stage.update();
				} else {
					stage.y = y + dyk
					tempy = stage.y
					stage.update();
				}
			} else {//手指往上滑
				if (-(y + dyk) > endline) {	//到底了
					stage.y = -endline;
					tempy = stage.y
					stage.update();
				} else {
					stage.y = y + dyk;
					tempy = stage.y
					stage.update();
				}
			}
		}, true);
		//触摸结束
		canvas.addEventListener("touchend", function (event){
			event.preventDefault();
			if (canplay) {
				movenow = false;
				stage.mouseEnabled = true
				if (dy >= 0) {//手指往下滑
					if ((y + dyk) >= 0) {//到底了
						y = 0
					} else {
						y += dyk;
					}
				} else {//手指往上滑
					if (-(y + dyk) >= endline) {	//到底了
						y = -endline
					} else {
						y += dyk;
					}
				}
				stage.update();
			}
		}, true);
	}
	// wetherScroll()/**/
	//part1
	// stage.enableMouseOver()
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
					bitmap.addEventListener('click', startanimation)
				};
			}, function (err){
				console.log(err); //打印异常信息
			});
		}), 0, i);
	}
	function startanimation(){
		clicked = true;
		var end = false
		// var bitmapname = bitmap.name;
		for (var nameIndex = 0; nameIndex < 6; nameIndex++) {
			createjs.Tween.get(part1.getChildByName("bitmap" + nameIndex)).to({
				alpha: 0,
				x: 3.80 * rem,
				y: 4 * rem
			}, 500).call(function (){
				if (!end) {
					end = true
					console.log('over 1')
					createjs.Tween.get(part1).to({
						y: 0,
					}, 2500, createjs.Ease.quadOut);
					createjs.Tween.get(part2).to({
						y: 4 * rem,
					}, 2500, createjs.Ease.quadOut);
					createjs.Tween.get(part1_tea_hand).to({
						y: 0 * rem,
					}, 2500, createjs.Ease.quadOut);
				}
			})
		}
		// 茶壶动画
		animation.gotoAndPlay("start");
		//文字动画
		createjs.Tween.get(part1_text.getChildByName("t0")).wait(1000).to({
			alpha: 1,
			x: 0,
			y: 7.2 * rem
		}, 600, createjs.Ease.quadOut);
		createjs.Tween.get(part1_text.getChildByName("t1")).wait(1400).to({
			alpha: 1,
			x: 0,
			y: 7.2 * rem
		}, 600, createjs.Ease.quadOut);
		createjs.Tween.get(part1_text.getChildByName("t2")).wait(1800).to({
			alpha: 1,
			x: 0,
			y: 7.2 * rem
		}, 600, createjs.Ease.quadOut);
		createjs.Tween.get(part1_text.getChildByName("t3")).wait(2200).to({
			alpha: 1,
			x: 0,
			y: 7.2 * rem
		}, 600, createjs.Ease.quadOut);
		//地图动画
		createjs.Tween.get(mapbgc.getChildByName("mapbg")).wait(2500).to({
			alpha: 1,
		}, 500, createjs.Ease.quadOut);
		createjs.Tween.get(peoplec.getChildByName("people")).wait(3000).to({
			alpha: 1,
		}, 600, createjs.Ease.quadOut);
		createjs.Tween.get(mpicnc.getChildByName("mapicon")).wait(3500).to({
			alpha: 1,
			y: 9.66 * rem
		}, 600, createjs.Ease.quadOut);
		stage.removeChild(part1_tea_hand);
		stage.update();
		//调用updata更新
		createjs.Tween.get(stage).to({
			y: -4 * rem,
		}, 3000, createjs.Ease.quadOut).call(function (){
			console.log('over')
			part2arrow.getChildByName("arrow").alpha = 1;
			part2arrow.getChildByName("arrowhand").alpha = 1;
			createjs.Tween.get(part2arrow.getChildByName("arrowhand"), {loop: true}).to({
				y: 6.1 * rem
			}, 500)
			wetherScroll()
			// initescroll()
		})
		stage.update();
	}
	//part1-teapot
	var datainstance = {//创建一个动画实例
		"images": ["http://o.cztvcloud.com/181/4838001/images/test.png"],
		"frames": {
			"width": 270,            //每个图的高度为292，宽度为165，一共有64张图
			"height": 214,
			"count": 18
		},
		"animations": {
			start: {
				frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17],
				next: "",
				speed: 0.15
			},
			stop: {
				frames: [17],
				next: "stop",
				speed: 1
			},
			// "start": [0, 0, 'run', 0.1],
			// "run": [0, 18],                  //0帧到25帧是跳
		}
	}
	var spriteSheet = new createjs.SpriteSheet(datainstance);
	var animation = new createjs.Sprite(spriteSheet);
	animation.gotoAndStop("stop");
	/*
	*part2
	*/
	var part2 = new createjs.Container();
	part2.x = 2.5 * rem;
	part2.y = 4 * rem;
	part2.scaleX = canvas_scale
	part2.scaleY = canvas_scale
	stage.addChild(part2);
	part2.addChild(animation)
	//part1-tea-hand
	var part1_tea_hand = new createjs.Container();
	stage.addChild(part1_tea_hand);
	getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
		var image = new Image()
		image.crossOrigin = 'anonymous';
		image.src = base64;
		image.onload = function (ev){
			var w = image.width;
			var scale = canvas_scale
			var bitmap = new createjs.Bitmap(image.src);
			bitmap.name = "hand"
			bitmap.x = 3.3 * rem;
			bitmap.y = 2.2 * rem;
			bitmap.scaleX = canvas_scale;
			bitmap.scaleY = canvas_scale;
			part1_tea_hand.addChild(bitmap);
			createjs.Tween.get(part1_tea_hand.getChildByName("hand"), {loop: true}).to({
				alpha: 0.2,
			}, 300).to({
				alpha: 1,
			}, 300)
			stage.update();
			bitmap.addEventListener('click', startanimation)
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//高度初始化
	part1.y = 3 * rem
	part2.y = 7 * rem
	part1_tea_hand.y = 3 * rem
	//高度初始化
	//arrow
	var part2arrow = new createjs.Container();
	stage.addChild(part2arrow)
	getBase64("http://o.cztvcloud.com/181/4838001/images/arrow.png").then(function (base64){
		var image = new Image()
		image.crossOrigin = 'anonymous';
		image.src = base64;
		image.onload = function (ev){
			var w = image.width;
			var scale = canvas_scale
			var arrowbp = new createjs.Bitmap(image.src);
			arrowbp.name = "arrow"
			arrowbp.alpha = 0;
			arrowbp.x = 3.52 * rem;
			arrowbp.y = 6 * rem;
			arrowbp.scaleX = canvas_scale;
			arrowbp.scaleY = canvas_scale;
			part2arrow.addChild(arrowbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
		var image = new Image()
		image.crossOrigin = 'anonymous';
		image.src = base64;
		image.onload = function (ev){
			var w = image.width;
			var scale = canvas_scale
			var arrowhand = new createjs.Bitmap(image.src);
			arrowhand.name = "arrowhand"
			arrowhand.alpha = 0;
			arrowhand.x = 4 * rem;
			arrowhand.y = 6.6 * rem;
			arrowhand.scaleX = canvas_scale;
			arrowhand.scaleY = canvas_scale;
			part2arrow.addChild(arrowhand);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	var part1_text = new createjs.Container();
	stage.addChild(part1_text);
	for (var i = 0; i < 4; i++) {
		setTimeout((function (i){// Holy Shit Closures
			var clicked = false
			getBase64(textblock1[i]).then(function (base64){
				textblock1[i] = base64;
				var image = new Image()
				image.crossOrigin = 'anonymous';
				image.src = textblock1[i]
				image.onload = function (ev){
					var bitmap = new createjs.Bitmap(image.src);
					bitmap.name = "t" + i;
					bitmap.alpha = 0;
					bitmap.x = 0;
					bitmap.y = 7.9 * rem;
					bitmap.scaleX = canvas_scale;
					bitmap.scaleY = canvas_scale;
					part1_text.addChild(bitmap);
					stage.update();
				};
			}, function (err){
				console.log(err); //打印异常信息
			});
		}), 0, i);
	}
	var mapbgc = new createjs.Container();
	stage.addChild(mapbgc);
	stage.setChildIndex(mapbgc, 10);
	getBase64("http://o.cztvcloud.com/181/4838001/images/mapbg.png").then(function (base64){
		var mapbg = new Image()
		mapbg.crossOrigin = 'anonymous';
		mapbg.src = base64;
		mapbg.onload = function (ev){
			var mapbp = new createjs.Bitmap(mapbg.src);
			mapbp.name = 'mapbg';
			mapbp.alpha = 0;
			mapbp.x = 0;
			mapbp.y = 9.7 * rem;
			mapbp.index = 1;
			mapbp.scaleX = canvas_scale;
			mapbp.scaleY = canvas_scale;
			mapbgc.addChild(mapbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	var peoplec = new createjs.Container();
	stage.addChild(peoplec);
	stage.setChildIndex(peoplec, 20);
	getBase64("http://o.cztvcloud.com/181/4838001/images/people.png").then(function (base64){
		var people = new Image()
		people.crossOrigin = 'anonymous';
		people.src = base64
		people.onload = function (ev){
			var peoplebp = new createjs.Bitmap(people.src);
			peoplebp.name = 'people';
			peoplebp.alpha = 0;
			peoplebp.x = 0;
			peoplebp.y = 9.7 * rem;
			peoplebp.index = 2;
			peoplebp.scaleX = canvas_scale;
			peoplebp.scaleY = canvas_scale;
			peoplec.addChild(peoplebp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	var mpicnc = new createjs.Container();
	stage.addChild(mpicnc);
	stage.setChildIndex(mpicnc, 30);
	getBase64("http://o.cztvcloud.com/181/4838001/images/mapicon.png").then(function (base64){
		var mapicon = new Image()
		mapicon.crossOrigin = 'anonymous';
		mapicon.src = base64;
		mapicon.onload = function (ev){
			var mapiconbp = new createjs.Bitmap(mapicon.src);
			mapiconbp.name = "mapicon";
			mapiconbp.alpha = 0;
			mapiconbp.x = 0;
			mapiconbp.index = 3;
			mapiconbp.y = 9.8 * rem;
			mapiconbp.scaleX = canvas_scale;
			mapiconbp.scaleY = canvas_scale;
			mpicnc.addChild(mapiconbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	var mrgu = new createjs.Container();
	stage.addChild(mrgu);
	getBase64("http://o.cztvcloud.com/181/4838001/images/text2.png").then(function (base64){
		var mrgutext = new Image()
		mrgutext.crossOrigin = 'anonymous';
		mrgutext.src = base64;
		mrgutext.onload = function (ev){
			var mrgbp = new createjs.Bitmap(mrgutext.src);
			mrgbp.name = "mrgutext";
			mrgbp.alpha = 0;
			mrgbp.x = 4 * rem;
			mrgbp.y = 14.87 * rem;
			mrgbp.scaleX = canvas_scale;
			mrgbp.scaleY = canvas_scale;
			mrgu.addChild(mrgbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/chalu.png").then(function (base64){
		var chalu = new Image()
		chalu.crossOrigin = 'anonymous';
		chalu.src = base64;
		chalu.onload = function (ev){
			var chalubp = new createjs.Bitmap(chalu.src);
			chalubp.name = "guchalu";
			chalubp.alpha = 0;
			chalubp.x = -1 * rem;
			chalubp.y = 23.23 * rem;
			chalubp.scaleX = canvas_scale;
			chalubp.scaleY = canvas_scale;
			chalubp.addEventListener('click', function (){
				console.log('茶壶 video1')
				videoplay(1)
			}, false)
			mrgu.addChild(chalubp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/text3.png").then(function (base64){
		var chalutext = new Image()
		chalutext.crossOrigin = 'anonymous';
		chalutext.src = base64;
		chalutext.onload = function (ev){
			var chalutextbp = new createjs.Bitmap(chalutext.src);
			chalutextbp.name = "chalutextbp";
			chalutextbp.alpha = 0;
			chalutextbp.x = -1 * rem;
			chalutextbp.y = 28.22 * rem;
			chalutextbp.scaleX = canvas_scale;
			chalutextbp.scaleY = canvas_scale;
			mrgu.addChild(chalutextbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//shaoshuiSheet
	getBase64("http://o.cztvcloud.com/181/4838001/images/shaoshui.png").then(function (base64){
		var shaoshuiSheet = {
			"images": [base64],
			"frames": {
				"width": 486,
				"height": 494,
				"count": 6
			},
			"animations": {
				start: {
					frames: [0, 1, 2, 3, 4, 5],
					next: 'start',
					speed: 0.08,
				},
			}
		}
		var shaoshui = new createjs.SpriteSheet(shaoshuiSheet);
		var am_shaoshui = new createjs.Sprite(shaoshui, 'start');
		am_shaoshui.x = -1.2 * rem;
		am_shaoshui.y = 26 * rem;
		am_shaoshui.scaleX = canvas_scale;
		am_shaoshui.scaleY = canvas_scale;
		part2.addChild(am_shaoshui)
		stage.update()
	}, function (err){
		console.log(err); //打印异常信息
	});
	//daye
	getBase64("http://o.cztvcloud.com/181/4838001/images/daye.png").then(function (base64){
		var dayeSheet = {
			"images": [base64],
			"frames": {
				"width": 462,
				"height": 451,
				"count": 23
			},
			"animations": {
				"start": [0, 22, 'start', 0.2]
			}
		}
		var dayeSheetSprite = new createjs.SpriteSheet(dayeSheet);
		var am_daye = new createjs.Sprite(dayeSheetSprite, 'start');
		am_daye.x = 1.5 * rem;
		am_daye.y = 15 * rem;
		am_daye.scaleX = canvas_scale;
		am_daye.scaleY = canvas_scale;
		am_daye.gotoAndPlay("start");
		part2.addChild(am_daye);
		stage.addChild(part2)
		stage.update()
	}, function (err){
		console.log(err); //打印异常信息
	});
	//part3
	var part3 = new createjs.Container();
	stage.addChild(part3);
	getBase64("http://o.cztvcloud.com/181/4838001/images/text4.png").then(function (base64){
		var text4 = new Image()
		text4.crossOrigin = 'anonymous';
		text4.src = base64;
		text4.onload = function (ev){
			var text4bp = new createjs.Bitmap(text4.src);
			text4bp.name = "text4bp";
			text4bp.alpha = 0;
			text4bp.x = -2 * rem;
			text4bp.y = 35.842 * rem;
			text4bp.scaleX = canvas_scale;
			text4bp.scaleY = canvas_scale;
			part3.addChild(text4bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/text5.png").then(function (base64){
		var text5 = new Image()
		text5.crossOrigin = 'anonymous';
		text5.src = base64;
		text5.onload = function (ev){
			var text5bp = new createjs.Bitmap(text5.src);
			text5bp.name = "text5bp";
			text5bp.alpha = 0;
			text5bp.x = 5 * rem;
			text5bp.y = 40.98 * rem;
			text5bp.scaleX = canvas_scale;
			text5bp.scaleY = canvas_scale;
			part3.addChild(text5bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p31.png").then(function (base64){
		var p31 = new Image()
		p31.crossOrigin = 'anonymous';
		p31.src = base64;
		p31.onload = function (ev){
			var p31bp = new createjs.Bitmap(p31.src);
			p31bp.name = 'p31bp';
			p31bp.alpha = 0;
			p31bp.x = 2.5 * rem;
			p31bp.y = 40.55 * rem;
			p31bp.scaleX = canvas_scale;
			p31bp.scaleY = canvas_scale;
			part3.addChild(p31bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p32.png").then(function (base64){
		var p32 = new Image()
		p32.crossOrigin = 'anonymous';
		p32.src = base64;
		p32.onload = function (ev){
			var p32bp = new createjs.Bitmap(p32.src);
			p32bp.name = "p32bp";
			p32bp.alpha = 0;
			p32bp.x = -3 * rem;
			p32bp.y = 40.55 * rem;
			p32bp.scaleX = canvas_scale;
			p32bp.scaleY = canvas_scale;
			part3.addChild(p32bp);
			part3.addEventListener('click', function (){
				console.log('第二个老头, video1')
				videoplay(2)
			})
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p33.png").then(function (base64){
		var p33 = new Image()
		p33.crossOrigin = 'anonymous';
		p33.src = base64;
		p33.onload = function (ev){
			var p33bp = new createjs.Bitmap(p33.src);
			p33bp.name = "p33bp";
			p33bp.alpha = 0;
			p33bp.x = 1 * rem;
			p33bp.y = 40.55 * rem;
			p33bp.scaleX = canvas_scale;
			p33bp.scaleY = canvas_scale;
			part3.addChild(p33bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//part4
	var part4 = new createjs.Container();
	stage.addChild(part4);
	getBase64("http://o.cztvcloud.com/181/4838001/images/p41.png").then(function (base64){
		var p41 = new Image()
		p41.crossOrigin = 'anonymous';
		p41.src = base64;
		p41.onload = function (ev){
			var p41bp = new createjs.Bitmap(p41.src);
			p41bp.name = "p41bp";
			p41bp.alpha = 0;
			p41bp.x = -2.2 * rem;
			p41bp.y = 55.58 * rem;
			p41bp.scaleX = canvas_scale;
			p41bp.scaleY = canvas_scale;
			part4.addChild(p41bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p42.png").then(function (base64){
		var p42 = new Image()
		p42.crossOrigin = 'anonymous';
		p42.src = base64;
		p42.onload = function (ev){
			var p42bp = new createjs.Bitmap(p42.src);
			p42bp.name = "p42bp";
			p42bp.alpha = 0;
			p42bp.x = 2 * rem;
			p42bp.y = 55.58 * rem;
			p42bp.scaleX = canvas_scale;
			p42bp.scaleY = canvas_scale;
			part4.addChild(p42bp);
			stage.update();
			p42bp.addEventListener('click', function (){
				console.log('消防队员, video3')
				videoplay(3)
			})
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p43.png").then(function (base64){
		var p43 = new Image()
		p43.crossOrigin = 'anonymous';
		p43.src = base64;
		p43.onload = function (ev){
			var p43bp = new createjs.Bitmap(p43.src);
			p43bp.name = "p43bp";
			p43bp.alpha = 0;
			p43bp.x = 0;
			p43bp.y = 58.5 * rem;
			p43bp.scaleX = canvas_scale;
			p43bp.scaleY = canvas_scale;
			part4.addChild(p43bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	/*
		 part5
	*/
	var part5 = new createjs.Container();
	stage.addChild(part5);
	getBase64("http://o.cztvcloud.com/181/4838001/images/p51.png").then(function (base64){
		var p51 = new Image()
		p51.crossOrigin = 'anonymous';
		p51.src = base64;
		p51.onload = function (ev){
			var p51bp = new createjs.Bitmap(p51.src);
			p51bp.name = "p51bp";
			p51bp.alpha = 0;
			p51bp.x = 1 * rem;
			p51bp.y = 70.50 * rem;
			p51bp.scaleX = canvas_scale;
			p51bp.scaleY = canvas_scale;
			part5.addChild(p51bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p52.png").then(function (base64){
		var p52 = new Image()
		p52.crossOrigin = 'anonymous';
		p52.src = base64;
		p52.onload = function (ev){
			var p52bp = new createjs.Bitmap(p52.src);
			p52bp.name = "p52bp";
			p52bp.alpha = 0;
			p52bp.x = 4 * rem;
			p52bp.y = 70.50 * rem;
			p52bp.scaleX = canvas_scale;
			p52bp.scaleY = canvas_scale;
			part5.addChild(p52bp);
			stage.update();
			p52bp.addEventListener('click', function (){
				console.log('第四个老大爷, video3')
				// videoplay(4)
			})
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p53.png").then(function (base64){
		var p53 = new Image()
		p53.crossOrigin = 'anonymous';
		p53.src = base64;
		p53.onload = function (ev){
			var p53bp = new createjs.Bitmap(p53.src);
			p53bp.name = "p53bp";
			p53bp.alpha = 0;
			p53bp.x = 0.16 * rem;
			p53bp.y = 72.40 * rem;
			p53bp.scaleX = canvas_scale;
			p53bp.scaleY = canvas_scale;
			part5.addChild(p53bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p5text1.png").then(function (base64){
		var p5text1 = new Image()
		p5text1.crossOrigin = 'anonymous';
		p5text1.src = base64;
		p5text1.onload = function (ev){
			var p5text1bp = new createjs.Bitmap(p5text1.src);
			p5text1bp.name = "p5text1bp";
			p5text1bp.alpha = 0;
			p5text1bp.x = 2.53 * rem;
			p5text1bp.y = 74.48 * rem;
			p5text1bp.scaleX = canvas_scale;
			p5text1bp.scaleY = canvas_scale;
			part5.addChild(p5text1bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	/*
		part6
	*/
	var part6 = new createjs.Container();
	stage.addChild(part6);
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t1.png").then(function (base64){
		var p6t1 = new Image()
		p6t1.crossOrigin = 'anonymous';
		p6t1.src = base64;
		p6t1.onload = function (ev){
			var p6t1bp = new createjs.Bitmap(p6t1.src);
			p6t1bp.name = "p6t1bp";
			p6t1bp.alpha = 0;
			p6t1bp.x = 0;
			p6t1bp.y = 80 * rem;
			p6t1bp.scaleX = canvas_scale;
			p6t1bp.scaleY = canvas_scale;
			part6.addChild(p6t1bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t2.png").then(function (base64){
		var p6t2 = new Image()
		p6t2.crossOrigin = 'anonymous';
		p6t2.src = base64;
		p6t2.onload = function (ev){
			var p6t2bp = new createjs.Bitmap(p6t2.src);
			p6t2bp.name = "p6t2bp";
			p6t2bp.alpha = 0;
			p6t2bp.x = 0;
			p6t2bp.y = 80 * rem;
			p6t2bp.scaleX = canvas_scale;
			p6t2bp.scaleY = canvas_scale;
			part6.addChild(p6t2bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t3.png").then(function (base64){
		var p6t3 = new Image()
		p6t3.crossOrigin = 'anonymous';
		p6t3.src = base64;
		p6t3.onload = function (ev){
			var p6t3bp = new createjs.Bitmap(p6t3.src);
			p6t3bp.name = "p6t3bp";
			p6t3bp.alpha = 0;
			p6t3bp.x = 0;
			p6t3bp.y = 80 * rem;
			p6t3bp.scaleX = canvas_scale;
			p6t3bp.scaleY = canvas_scale;
			part6.addChild(p6t3bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t3_2.png").then(function (base64){
		var p6t3_2 = new Image()
		p6t3_2.crossOrigin = 'anonymous';
		p6t3_2.src = base64;
		p6t3_2.onload = function (ev){
			var p6t3_2bp = new createjs.Bitmap(p6t3_2.src);
			p6t3_2bp.name = "p6t3_2bp";
			p6t3_2bp.alpha = 0;
			p6t3_2bp.x = 0;
			p6t3_2bp.y = 80 * rem;
			p6t3_2bp.scaleX = canvas_scale;
			p6t3_2bp.scaleY = canvas_scale;
			part6.addChild(p6t3_2bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t4.png").then(function (base64){
		var p6t4 = new Image()
		p6t4.crossOrigin = 'anonymous';
		p6t4.src = base64;
		p6t4.onload = function (ev){
			var p6t4bp = new createjs.Bitmap(p6t4.src);
			p6t4bp.name = "p6t4bp";
			p6t4bp.alpha = 1;
			p6t4bp.x = 0;
			p6t4bp.y = 83.44 * rem;
			p6t4bp.scaleX = canvas_scale;
			p6t4bp.scaleY = canvas_scale;
			part6.addChild(p6t4bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t5.png").then(function (base64){
		var p6t5 = new createjs.Container();
		stage.addChild(p6t5);
		var p6t5 = new Image()
		p6t5.crossOrigin = 'anonymous';
		p6t5.src = base64;
		p6t5.onload = function (ev){
			var p6t5bp = new createjs.Bitmap(p6t5.src);
			p6t5bp.name = "p6t5bp";
			p6t5bp.alpha = 1;
			p6t5bp.x = 0;
			p6t5bp.y = 87.30 * rem;
			p6t5bp.scaleX = canvas_scale;
			p6t5bp.scaleY = canvas_scale;
			part6.addChild(p6t5bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t6.png").then(function (base64){
		var p6t6 = new Image()
		p6t6.crossOrigin = 'anonymous';
		p6t6.src = base64;
		p6t6.onload = function (ev){
			var p6t6bp = new createjs.Bitmap(p6t6.src);
			p6t6bp.name = "p6t6bp";
			p6t6bp.alpha = 1;
			p6t6bp.x = 0;
			p6t6bp.y = 90.75 * rem;
			p6t6bp.scaleX = canvas_scale;
			p6t6bp.scaleY = canvas_scale;
			part6.addChild(p6t6bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/p6t7.png").then(function (base64){
		var p6t7 = new Image()
		p6t7.crossOrigin = 'anonymous';
		p6t7.src = base64;
		p6t7.onload = function (ev){
			var p6t7bp = new createjs.Bitmap(p6t7.src);
			p6t7bp.name = "p6t7bp";
			p6t7bp.alpha = 0;
			p6t7bp.x = 0;
			p6t7bp.y = 96 * rem;
			p6t7bp.scaleX = canvas_scale;
			p6t7bp.scaleY = canvas_scale;
			part6.addChild(p6t7bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/gif-1.png").then(function (base64){
		//part6gif1
		var part6gif1 = {//创建一个动画实例
			"images": [base64],
			"frames": {
				"width": 400,            //每个图的高度为292，宽度为165，一共有64张图
				"height": 320,
				"count": 5
			},
			"animations": {
				"start": [0, 4, 'start', 0.01],
			}
		}
		var sppart6gif1 = new createjs.SpriteSheet(part6gif1);
		var am_p6_gif1 = new createjs.Sprite(sppart6gif1);
		am_p6_gif1.gotoAndPlay("start");
		am_p6_gif1.regX = 200;
		am_p6_gif1.regY = 160;
		am_p6_gif1.x = 5.8 * rem;
		am_p6_gif1.y = 89 * rem;
		am_p6_gif1.scaleX = canvas_scale * 1.5;
		am_p6_gif1.scaleY = canvas_scale * 1.5;
		part6.addChild(am_p6_gif1)
		stage.update()
	}, function (err){
		console.log(err); //打印异常信息
	});
	//part6gif2
	getBase64("http://o.cztvcloud.com/181/4838001/images/gif-3.png").then(function (base64){
		var part6gif3 = {//创建一个动画实例
			"images": [base64],
			"frames": {
				"width": 474,             //每个图的高度为292，宽度为165，一共有64张图
				"height": 303,
				"count": 19
			},
			"animations": {
				start: {
					frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17, 18],
					next: "stop",
					speed: 0.08
				},
				stop: {
					frames: [18],
					next: "start",
					speed: 0.08
				},
			}
		}
		var sppart6gif3 = new createjs.SpriteSheet(part6gif3);
		var am_p6_gif3 = new createjs.Sprite(sppart6gif3);
		am_p6_gif3.gotoAndPlay("start");
		am_p6_gif3.regX = 237;
		am_p6_gif3.regY = 151;
		am_p6_gif3.x = 1.7 * rem;
		am_p6_gif3.y = 85 * rem;
		am_p6_gif3.scaleX = canvas_scale * 1.1;
		am_p6_gif3.scaleY = canvas_scale * 1.1;
		part6.addChild(am_p6_gif3)
		stage.update()
	}, function (err){
		console.log(err); //打印异常信息
	});
	//part6gif3
	getBase64("http://o.cztvcloud.com/181/4838001/images/gif2.png").then(function (base64){
		var part6gif3 = {//创建一个动画实例
			"images": [base64],
			"frames": {
				"width": 474,            //每个图的高度为292，宽度为165，一共有64张图
				"height": 303,
				"count": 19,
			},
			"animations": {
				start: {
					frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17, 18],
					next: "stop",
					speed: 0.08
				},
				stop: {
					frames: [18],
					next: "start",
					speed: 0.08
				},
			}
		}
		var sppart6gif2 = new createjs.SpriteSheet(part6gif3);
		var am_p6_gif2 = new createjs.Sprite(sppart6gif2);
		am_p6_gif2.gotoAndPlay("start");
		am_p6_gif2.regX = 237;
		am_p6_gif2.regY = 151;
		am_p6_gif2.x = 1.7 * rem;
		am_p6_gif2.y = 92 * rem;
		am_p6_gif2.scaleX = canvas_scale * 1.3;
		am_p6_gif2.scaleY = canvas_scale * 1.3;
		part6.addChild(am_p6_gif2)
		stage.update()
	}, function (err){
		console.log(err); //打印异常信息
	});
	//tea2
	getBase64("http://o.cztvcloud.com/181/4838001/images/test.png").then(function (base64){
		var tea2sp = {//创建一个动画实例
			"images": [base64],
			"frames": {
				"width": 270,            //每个图的高度为292，宽度为165，一共有64张图
				"height": 214,
				"count": 18
			},
			"animations": {
				start: {
					frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17],
					next: "stop",
					speed: 0.25
				},
				stop: {
					frames: [17],
					next: "stop",
					speed: 1
				},
				// "start": [0, 0, 'run', 0.1],
				// "run": [0, 18],                  //0帧到25帧是跳
			}
		}
		var spriteSheet2 = new createjs.SpriteSheet(tea2sp);
		var am_sp2 = new createjs.Sprite(spriteSheet2);
		am_sp2.gotoAndPlay("stop");
		am_sp2.scale = canvas_scale
		am_sp2.x = 3.0 * rem;
		am_sp2.y = 101.35 * rem;
		var texted = false
		am_sp2.addEventListener('click', function (){
			am_sp2.gotoAndPlay('start')
			//添加文字
			if (!texted) {
				var size = 0.47 * rem + 'px blod 宋体';
				var txt = new createjs.Text("", size, "#b9361e");
				txt.name = 'zhuli',
					txt.alpha = 0,
					txt.x = 4.6 * rem;                   //改变txt  X的坐标（在canvas中距离 左侧 的坐标）
				txt.y = 100 * rem;                   //改变txt  Y的坐标（在canvas中距离 顶部 的坐标）
				txt.text = "你是第" + num + "位助力者";           		  //改变txt的文本内容
				txt.textAlign = "center";   		  //水平居中
				txt.textBaseline = "middle";		  //垂直居中
				part6.addChild(txt);                  //完成之后需要添加到stage中才能正常显示
				createjs.Tween.get(part6.getChildByName("zhuli")).to({
					alpha: 1,
					x: 2.6 * rem
				}, 300)
				stage.update();                       //调用updata更新
				texted = true
			}
		})
		part6.addChild(am_sp2)
	}, function (err){
		console.log(err); //打印异常信息
	});
	/*
	*  part7
	*/
	var part7 = new createjs.Container();
	stage.addChild(part7);
	getBase64("http://o.cztvcloud.com/181/4838001/images/p7.png").then(function (base64){
		var p7 = new Image()
		p7.crossOrigin = 'anonymous';
		p7.src = base64;
		p7.onload = function (ev){
			var p7bp = new createjs.Bitmap(p7.src);
			p7bp.name = "p7bp";
			p7bp.alpha = 0;
			p7bp.x = 1.03 * rem;
			p7bp.y = 107 * rem;
			p7bp.scaleX = canvas_scale;
			p7bp.scaleY = canvas_scale;
			part7.addChild(p7bp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/fxbtn.jpg").then(function (base64){
		var fxbtn = new Image()
		fxbtn.crossOrigin = 'anonymous';
		fxbtn.src = base64;
		fxbtn.onload = function (ev){
			var fxbtnbp = new createjs.Bitmap(fxbtn.src);
			fxbtnbp.name = "fxbtnbp";
			fxbtnbp.alpha = 0;
			fxbtnbp.x = 3.195 * rem;
			fxbtnbp.y = 114 * rem;
			fxbtnbp.scaleX = canvas_scale;
			fxbtnbp.scaleY = canvas_scale;
			part7.addChild(fxbtnbp);
			fxbtnbp.addEventListener('click', function (){
				$('.sharebox').fadeIn()
			})
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	getBase64("http://o.cztvcloud.com/181/4838001/images/logo.png").then(function (base64){
		var logo = new Image()
		logo.crossOrigin = 'anonymous';
		logo.src = base64;
		logo.onload = function (ev){
			var logobp = new createjs.Bitmap(logo.src);
			logobp.name = "logobp";
			logobp.alpha = 0;
			logobp.x = 2.665 * rem;
			logobp.y = 115 * rem;
			logobp.scaleX = canvas_scale;
			logobp.scaleY = canvas_scale;
			part7.addChild(logobp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//红日亭手势
	// getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
	// 	var hrimagehand = new Image()
	// 	hrimagehand.crossOrigin = 'anonymous';
	// 	hrimagehand.src = base64;
	// 	hrimagehand.onload = function (ev){
	// 		var hrimagehandbp = new createjs.Bitmap(hrimagehand.src);
	// 		hrimagehandbp.name = "handhr"
	// 		hrimagehandbp.alpha = 0;
	// 		hrimagehandbp.x = 5 * rem;
	// 		hrimagehandbp.y = 72.5 * rem;
	// 		hrimagehandbp.scaleX = canvas_scale;
	// 		hrimagehandbp.scaleY = canvas_scale;
	// 		part7.addChild(hrimagehandbp);
	// 		stage.update();
	// 	};
	// }, function (err){
	// 	console.log(err); //打印异常信息
	// });
	//最后的手势
	getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
		var imagehand = new Image()
		imagehand.crossOrigin = 'anonymous';
		imagehand.src = base64;
		imagehand.onload = function (ev){
			var imagehandbp = new createjs.Bitmap(imagehand.src);
			imagehandbp.name = "hand2"
			imagehandbp.x = 5 * rem;
			imagehandbp.y = 102.5 * rem;
			imagehandbp.scaleX = canvas_scale;
			imagehandbp.scaleY = canvas_scale;
			part7.addChild(imagehandbp);
			createjs.Tween.get(part7.getChildByName("hand2"), {loop: true}).to({
				alpha: 0.2,
			}, 300).to({
				alpha: 1,
			}, 300)
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//最后的手势add1
	getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
		var add1imagehand = new Image()
		add1imagehand.crossOrigin = 'anonymous';
		add1imagehand.src = base64;
		add1imagehand.onload = function (ev){
			var add1imagehandbp = new createjs.Bitmap(add1imagehand.src);
			add1imagehandbp.name = "add1hand"
			add1imagehandbp.alpha = 0;
			add1imagehandbp.x = 3.8 * rem;
			add1imagehandbp.y = 25 * rem;
			add1imagehandbp.scaleX = canvas_scale;
			add1imagehandbp.scaleY = canvas_scale;
			part7.addChild(add1imagehandbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//最后的手势add2
	getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
		var add2imagehand = new Image()
		add2imagehand.crossOrigin = 'anonymous';
		add2imagehand.src = base64;
		add2imagehand.onload = function (ev){
			var add2imagehandbp = new createjs.Bitmap(add2imagehand.src);
			add2imagehandbp.name = "add2hand"
			add2imagehandbp.alpha = 0;
			add2imagehandbp.x = 3.5 * rem;
			add2imagehandbp.y = 43.5 * rem;
			add2imagehandbp.scaleX = canvas_scale;
			add2imagehandbp.scaleY = canvas_scale;
			part7.addChild(add2imagehandbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	//最后的手势add3
	getBase64("http://o.cztvcloud.com/181/4838001/images/hand.png").then(function (base64){
		var add3imagehand = new Image()
		add3imagehand.crossOrigin = 'anonymous';
		add3imagehand.src = base64;
		add3imagehand.onload = function (ev){
			var add3imagehandbp = new createjs.Bitmap(add3imagehand.src);
			add3imagehandbp.name = "add3hand"
			add3imagehandbp.alpha = 0;
			add3imagehandbp.x = 4.6 * rem;
			add3imagehandbp.y = 57.7 * rem;
			add3imagehandbp.scaleX = canvas_scale;
			add3imagehandbp.scaleY = canvas_scale;
			part7.addChild(add3imagehandbp);
			stage.update();
		};
	}, function (err){
		console.log(err); //打印异常信息
	});
	/*
	*事件监听
	*事件监听
	*事件监听
	*/
	var slide = 0;
	var kadian1 = [-Math.floor(12 * rem), true, -18 * rem]
	var kadian2 = [-Math.floor(14 * rem), true, -18 * rem]
	var kadian3 = [-Math.floor(32 * rem), true, -38 * rem]
	var kadian4 = [-Math.floor(50 * rem), true, -58 * rem]
	var kadian5 = [-Math.floor(64.5 * rem), true, -70 * rem]
	var kadian6 = [-Math.floor(70.5 * rem), true, -77 * rem]
	var kadian7 = [-Math.floor(90.5 * rem), true, -92 * rem]
	var kadian8 = [-Math.floor(92 * rem), true, -110 * rem]
	function scroll(){
		// console.log(tempy, kadian1[0]);
		if (kadian1[1]) {
			if ((tempy < kadian1[0]) && (tempy > kadian1[2])) {
				kadian1[1] = false;
				createjs.Tween.get(mrgu.getChildByName("mrgutext")).to({
					alpha: 1,
					x: 3.41 * rem,
				}, 450, createjs.Ease.quadOut);
			}
		}
		else if (kadian2[1]) {
			if ((tempy < kadian2[0]) && (tempy > kadian2[2])) {
				kadian2[1] = false;
				createjs.Tween.get(mrgu.getChildByName("guchalu")).to({
					alpha: 1,
					x: 0,
				}, 450).call(function (){
					createjs.Tween.get(part7.getChildByName("add1hand"), {loop: true}).to({
						alpha: 1,
					}, 250).to({
						alpha: 0,
					}, 250)
				})
				createjs.Tween.get(mrgu.getChildByName("chalutextbp")).wait(500).to({
					alpha: 1,
					x: 0,
				}, 450)
			}
		}
		else if (kadian3[1]) {
			if ((tempy < kadian3[0]) && (tempy > kadian3[2])) {
				kadian3[1] = false;
				createjs.Tween.get(part3.getChildByName("text4bp")).to({
					alpha: 1,
					x: 0,
				}, 450)
				createjs.Tween.get(part3.getChildByName("text5bp")).wait(1000).to({
					alpha: 1,
					x: 3.42 * rem,
				}, 450)
				createjs.Tween.get(part3.getChildByName("p31bp")).wait(1000).to({
					alpha: 1,
					x: -0.2 * rem,
				}, 450)
				createjs.Tween.get(part3.getChildByName("p32bp")).wait(1400).to({
					alpha: 1,
					x: 0
				}, 450).call(function (){
					createjs.Tween.get(part7.getChildByName("add2hand"), {loop: true}).to({
						alpha: 1,
					}, 250).to({
						alpha: 0,
					}, 250)
				})
				createjs.Tween.get(part3.getChildByName("p33bp")).wait(1300).to({
					alpha: 1,
					x: 0,
				}, 450)
			}
		}
		else if (kadian4[1]) {
			if ((tempy < kadian4[0]) && (tempy > kadian4[2])) {
				kadian4[1] = false;
				createjs.Tween.get(part4.getChildByName("p41bp")).to({
					alpha: 1,
					x: 0,
				}, 450)
				createjs.Tween.get(part4.getChildByName("p42bp")).to({
					alpha: 1,
					x: 0,
				}, 450).call(function (){
					createjs.Tween.get(part7.getChildByName("add3hand"), {loop: true}).to({
						alpha: 1,
					}, 250).to({
						alpha: 0,
					}, 250)
				})
				createjs.Tween.get(part4.getChildByName("p43bp")).wait(1000).to({
					alpha: 1,
					x: 0,
					y: 59.4 * rem,
				}, 450)
			}
		} else if (kadian5[1]) {
			if ((tempy < kadian5[0]) && (tempy > kadian5[2])) {
				kadian5[1] = false;
				createjs.Tween.get(part5.getChildByName("p51bp")).to({
					alpha: 1,
					x: 2.95 * rem,
				}, 450)
				createjs.Tween.get(part5.getChildByName("p52bp")).to({
					alpha: 1,
					x: 2.95 * rem,
				}, 450).call(function (){
					// createjs.Tween.get(part7.getChildByName("handhr"), {loop: true}).to({
					// 	alpha: 0.2,
					// }, 300).to({
					// 	alpha: 1,
					// }, 300)
				})
				createjs.Tween.get(part5.getChildByName("p53bp")).wait(1000).to({
					alpha: 1,
					x: 1.16 * rem
				}, 450)
				createjs.Tween.get(part5.getChildByName("p5text1bp")).wait(1000).to({
					alpha: 1,
				}, 450)
			}
		} else if (kadian6[1]) {
			if ((tempy < kadian6[0]) && (tempy > kadian6[2])) {
				kadian6[1] = false;
				createjs.Tween.get(part6.getChildByName("p6t1bp")).to({
					alpha: 1,
					y: 79.87 * rem,
				}, 450, createjs.Ease.quadOut);
				createjs.Tween.get(part6.getChildByName("p6t2bp")).wait(200).to({
					alpha: 1,
					y: 79.87 * rem,
				}, 450, createjs.Ease.quadOut);
				createjs.Tween.get(part6.getChildByName("p6t3bp")).wait(400).to({
					alpha: 1,
					y: 79.87 * rem,
				}, 450, createjs.Ease.quadOut);
				createjs.Tween.get(part6.getChildByName("p6t3_2bp")).wait(600).to({
					alpha: 1,
					y: 79.87 * rem,
				}, 450, createjs.Ease.quadOut);
			}
		} else if (kadian7[1]) {
			if ((tempy < kadian7[0]) && (tempy > kadian7[2])) {
				kadian7[1] = false;
				createjs.Tween.get(part6.getChildByName("p6t7bp")).to({
					alpha: 1,
					y: 94.86 * rem,
				}, 450, createjs.Ease.quadOut);
			}
		} else if (kadian8[1]) {
			if ((tempy < kadian8[0]) && (tempy > kadian8[2])) {
				kadian8[1] = false;
				createjs.Tween.get(part7.getChildByName("p7bp")).to({
					alpha: 1,
					y: 106.55 * rem,
				}, 600, createjs.Ease.quadOut);
				createjs.Tween.get(part7.getChildByName("fxbtnbp")).to({
					alpha: 1,
					y: 112.1 * rem,
				}, 450, createjs.Ease.quadOut);
				createjs.Tween.get(part7.getChildByName("logobp")).to({
					alpha: 1,
					y: 113.3 * rem,
				}, 450, createjs.Ease.quadOut);
			}
		}
	}
	// stage.scaleX = window.innerWidth / 750;
	// stage.scaleY = window.innerWidth / 750;
	function initescroll(){
		var container = $('#canvas')
		var scroller = $('#canvas')
		document.body.addEventListener('touchmove', function (e){
			e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
		}, {passive: false}); //passive 参数不能省略，用来兼容ios和android
		container.width(window.innerWidth)
		container.height(window.innerHeight)
		// 初始化
		let [startx, starty, totalx, totaly, movex, movey, y, time1, time2, time, distancey, g] = [0]
		let maxX = 0;
		let maxY = -(11410 - container.height()) //top最大值  totaly
		//事件绑定
		scroller.bind('touchstart', window, touchstart)
		scroller.bind('touchmove', window, touchmove)
		scroller.bind('touchend', window, touchend)
		function touchstart(e){
			// console.log(e.originalEvent);
			let touch = e.originalEvent.targetTouches[0];
			starty = touch.clientY;
			time1 = new Date().getTime()
			distancey = totaly
			scroller.stop(true, false)
			animationEnd()
			g = 0
			movey = 0
			time = 0
		}
		function touchmove(e){
			let touch = e.originalEvent.targetTouches[0];
			let nowy = touch.clientY;
			movey = nowy - starty;//y方向上移动的距离
			distancey = totaly + movey
			if ((distancey < 0)) {//边界的控制
				if (totaly + movey > maxY) {
					y = distancey
				} else {
					y = maxY
				}
			} else {
				y = 0
			}
			// scroller.css('top', y)
			stage.y = y;
			stage.update()
		}
		function touchend(e){
			if ((distancey < 0)) {//边界的控制
				if (totaly + movey > maxY) {
					totaly = distancey
					stage.y = totaly
				} else {
					totaly = maxY
					stage.y = totaly
				}
			} else {
				totaly = 0
				stage.y = totaly
			}
			moveSlowly(movey)
		}
		function moveSlowly(movey){
			// console.log(movey);
			time2 = new Date().getTime()
			time = time2 - time1
			if ((Math.abs(movey) > 200) && (time < 200)) {
				g = (movey / time).toFixed(1)	//加速度计算
				totaly = totaly * (1 - g * 0.3);
				if ((totaly < 0)) {//边界的控制
					if (totaly > maxY) {
						createjs.Tween.get(stage).to({
							y: totaly
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
			totaly = scroller.position().top
		}
	}
})
var videolists = [
	'http://v3.cztv.com/cztv/vod/2018/07/14/21b6ad0fe99646d4aad6ca7fc16d3688/h264_1500k_mp4.mp4',
	'http://v3.cztv.com/cztv/vod/2018/08/17/2d978b5d0d1b4d7fa2563e8d0e1b899e/9a0741062f2f44e583b9d53d972ad35b_H264_1500K_MP4.mp4',
	'http://v3.cztv.com/cztv/vod/2018/08/17/4ceb1eaf653a40b599afe6242894040a/c0ab43b76b6243cca9293471be9023fb_H264_1500K_MP4.mp4',
	'http://v3.cztv.com/cztv/vod/2018/08/16/74b2711ea4334f58bc5212f05e953eb7/4446cb336f1d49dd986554f3c3cc4706_H264_1500K_MP4.mp4',
]
var num = 0
//点击量
$.ajax({
	url: 'http://d.cztvcloud.com/media/news?data_id=4838001&terminal=web&channel_id=181', /*url     :'http://d.cztvcloud.com/media/news?data_id=764588&terminal=web&channel_id=192',*/
	type: 'get',
	dataType: 'jsonp',
	success: function (rlt){
		var hints = rlt.data.hits
		num = 2 * parseInt(hints)
		var analysisurl = "http://d.cztvcloud.com/visit/ie";
		var channelId = '181';
		var itemId = '4838001';
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
				type: "GET", url: url, data: data, dataType: "jsonp", success: function (data){
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
var imgSrc = "https://img.alicdn.com/bao/uploaded/TB1qimQIpXXXXXbXFXXSutbFXXX.jpg";
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
var yaocai = [
	'http://o.cztvcloud.com/181/4838001/images/yc1.png',
	'http://o.cztvcloud.com/181/4838001/images/yc2.png',
	'http://o.cztvcloud.com/181/4838001/images/yc3.png',
	'http://o.cztvcloud.com/181/4838001/images/yc4.png',
	'http://o.cztvcloud.com/181/4838001/images/yc5.png',
	'http://o.cztvcloud.com/181/4838001/images/yc6.png',
]
var textblock1 = [
	'http://o.cztvcloud.com/181/4838001/images/t1.png',
	'http://o.cztvcloud.com/181/4838001/images/t2.png',
	'http://o.cztvcloud.com/181/4838001/images/t3.png',
	'http://o.cztvcloud.com/181/4838001/images/t4.png',
]
/*
 * Created by Sun Wen on 2018/9/10.
 */
/*
 * Created by Sun Wen on 2018/9/3.
 */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
*/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing,
	{
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d){
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d){
			return c * (t /= d) * t + b;
		},
		easeOutQuad: function (x, t, b, c, d){
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d){
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic: function (x, t, b, c, d){
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d){
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart: function (x, t, b, c, d){
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d){
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint: function (x, t, b, c, d){
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d){
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d){
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d){
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d){
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d){
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d){
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d){
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d){
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function (x, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s){
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s){
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s){
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d){
			return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d){
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d){
			if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	});
