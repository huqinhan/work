// JavaScript Document
$(function(){
	var printW=$(window).width();
	var printH=$(window).height();
	var bili=printW/1190;
	var setIntNum;
	$('.page-con').css('height',printH);
	$(".page").eq(0).fadeIn();
	var mIndex=0;
	//点击事件
	$(".pageShow li").each(function(index){
		var that=this;
		that.nums=index;
		$(this).click(function(){
			if(mIndex!=that.nums){
				$(".page").eq(mIndex).slideUp();
				$(".page").eq(that.nums).slideDown();
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
				 console.log(mIndex)
				if (delta==-1) {
					mIndex=mIndex>4?0:mIndex+1;
				}else{
					mIndex=mIndex<1?5:mIndex-1;
				}
				$(".page").eq(oldmIndex).slideUp(1000);
				$(".page").eq(mIndex).slideDown(1000,function(){scrolling=false;});

				oldmIndex=mIndex;
				$(".pageShow li").each(function(){
					$(this).removeClass('active');
				})
				$(".pageShow li").eq(mIndex).addClass('active');
			}
	});
})