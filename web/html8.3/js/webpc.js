// JavaScript Document
$(function(){
	var printW=$(window).width();
	var printH=$(window).height();
	var bili=printW/1190;
	var setIntNum;

	//第一屏幕
	function showPage(){
		$(".phoneBg").animate({'left':0,'top':0,'opacity':1},1000);
		var imgW=$("#img0").width();
		var imgNums=$("#img1 img").length;
		var timer=3000;
		var xunh=0;
		function imgRun(){
			if(xunh<imgNums-1){
				xunh++;
			}else{
				$(".add1").remove();
				$("#img1").prepend("<img src='"+$("#img1 img").eq(imgNums-1).attr('src')+"' class='add1'/>")
				$("#img1").css('left','0px');
				xunh=0;
			}	$("#img1").animate({'left':'-='+imgW},1000);
		}
		setIntNum=setInterval(imgRun,timer);
	}

	//第二屏幕
	function showPage1(){
		var textH=$(".text-1").innerHeight();
		var imgH=$(".img-1").innerHeight();
		$(".text-1").animate({'right':0,'top':(printH-textH)/2,'opacity':1},1000);
		$(".img-1").delay(1000);
		$(".img-1").animate({'left':0,'top':(printH-imgH)/2,'opacity':1},1000);
	}

	//第三屏幕
	function showPage2(){
		var textH=$(".text-2").innerHeight();
		var imgH=$(".img-2").innerHeight();
		$(".text-2").animate({'left':0,'top':(printH-textH)/2,'opacity':1},1000);
		$(".img-2").delay(1000);
		$(".img-2").animate({'right':0,'top':(printH-imgH)/2,'opacity':1},1000);
	}

	//第四屏幕
	function showPage3(){
		var textH=$(".text-3").innerHeight();
		var imgH=$(".img-3").innerHeight();
		$(".text-3").animate({'right':0,'top':(printH-textH)/2,'opacity':1},1000);
		$(".img-3").delay(1000);
		$(".img-3").animate({'left':0,'top':(printH-imgH)/2,'opacity':1},1000);
	}

	//第五屏幕
	function showPage4(){
		var textH=$(".text-4").innerHeight();
		var imgH=$(".img-4").innerHeight();
		$(".text-4").animate({'left':0,'top':(printH-textH)/2,'opacity':1},1000);
		$(".img-4").delay(1000);
		$(".img-4").animate({'right':0,'top':(printH-imgH)/2,'opacity':1},1000);
	}


	var attr=[showPage,showPage1,showPage2,showPage3,showPage4];
	var mIndex=0;
	$(".page").eq(mIndex).load('page'+mIndex+'.html',function(){
		showPage();
	});

	//点击事件
	$(".pageShow li").each(function(index){
		var that=this;
		that.nums=index;
		$(this).click(function(){

			if(mIndex!=that.nums){
				$(".page").eq(mIndex).slideUp();
				clearInterval(setIntNum);
				$(".page").eq(that.nums).slideDown();
				$(".page").eq(that.nums).load('page'+that.nums+'.html',function(){
					attr[that.nums]();
				});
				mIndex=that.nums;
				$(".pageShow li").each(function(){
					$(this).removeClass('active');
				})
				$(this).addClass('active');
			}
		})
	})

	//滚轮事件
	var oldmIndex=0;
	var scrolling=false;
	 $('html').mousewheel(function(event, delta, deltaX, deltaY) {
			 event.preventDefault();
	 		 if(scrolling==false){
				 scrolling=true;
				if (delta==-1) {
					mIndex=mIndex>3?0:mIndex+1;
				}else{
					mIndex=mIndex<1?4:mIndex-1;
				}
				$(".page").eq(oldmIndex).slideUp(1000);
				clearInterval(setIntNum);
				$(".page").eq(mIndex).slideDown(1000,function(){scrolling=false;});
				$(".page").eq(mIndex).load('page'+mIndex+'.html',function(){
					attr[mIndex]();
				});
				oldmIndex=mIndex;
				$(".pageShow li").each(function(){
					$(this).removeClass('active');
				})
				$(".pageShow li").eq(mIndex).addClass('active');
			}
	});
})