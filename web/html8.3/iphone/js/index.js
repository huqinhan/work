(function(){

function showPage1(){
		//$(".phoneBg").animate({'left':0,'top':0,'opacity':1},1000);
		var mwidth=$('.phoneBg').width();
		if(mwidth<=330){
			$('.phoneImg').css({'left':((mwidth/330)*16),'top':((mwidth/330)*40)});
			$('.phoneImgBox').css({'width':(mwidth/330)*283,'height':(mwidth/330)*504});
			$('#img1 img').attr('width',(mwidth/330)*283);
		}else{
			$('.phoneImg').css({'left':((mwidth-330)/2+16)});
		}
		var imgNums=$("#img1 img").length;
		var timer=3000;
		var xunh=1;
		$('.phoneImgBox').attr('width',(mwidth/330)*283);
		function imgRun(){
			if(xunh>=1&&xunh<imgNums){
			var lastPage = ".imgRun_"+xunh,
				nowPage = ".imgRun_"+(xunh+1);
				xunh++
			}else{
				xunh=1;
				lastPage = ".imgRun_"+imgNums,
				nowPage = ".imgRun_"+1;
			}
				var classAttr=['pt-page-moveToLeft','pt-page-moveFromRight','pt-page-moveToRight','pt-page-moveFromLeft']
				$(nowPage).removeClass("none");
				$(lastPage).removeClass(classAttr.join(' '));
				$(nowPage).removeClass(classAttr.join(' '));
				
				$(lastPage).addClass('pt-page-moveToLeft');
				$(nowPage).addClass('pt-page-moveFromRight');
		}
		setInterval(imgRun,timer);
	}
showPage1();
var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);
$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	
	if (last.row != 5) { 
		now.row = last.row+1; now.col = 1;
		 pageMove(towards.up);
	 }	
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	
	if (last.row!=1) { 
		now.row = last.row-1; now.col = 1; 
		
		pageMove(towards.down);
	}	
})

$(document).swipeLeft(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<3 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}	
})

$(document).swipeRight(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<3 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}	
})

function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			$(".pageShow li").each(function(){
				$(this).removeClass('active');
			})
			$(".pageShow li").eq(last.row).addClass('active');
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			$(".pageShow li").each(function(){
				$(this).removeClass('active');
			})
			$(".pageShow li").eq(now.row-1).addClass('active');
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("none");
	var classAttr=['pt-page-moveToTop','pt-page-moveFromBottom','pt-page-moveToBottom','pt-page-moveFromTop']
		$(lastPage).removeClass(classAttr.join(' '));
		$(nowPage).removeClass(classAttr.join(' '));
		
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).addClass("none");
		$(nowPage).addClass('page-current');
		
		isAnimating = false;
	},600);
}
$(".pageShow li").each(function(index){
		var that=this;
		that.nums=index;
		$(this).on("tap",function(){
			var leftclass='';
			var rightclass='';
			var ss=now.row-1;
			
			if((now.row-1)<that.nums){
				outclass='pt-page-moveToTop';
				inclass='pt-page-moveFromBottom';
			}else if((now.row-1) > that.nums){
				outclass='pt-page-moveToBottom';
				inclass='pt-page-moveFromTop';
			}
			var classAttr=['pt-page-moveToTop','pt-page-moveFromBottom','pt-page-moveToBottom','pt-page-moveFromTop']
				$(".page").eq(now.row-1).removeClass(classAttr.join(' '));
				$(".page").eq(that.nums).removeClass(classAttr.join(' '));

				$(".page").eq(that.nums).removeClass('none')
				$(".page").eq(now.row-1).addClass(outclass);
				$(".page").eq(that.nums).addClass(inclass);
				
				last.row=that.nums;
				if((now.row-1)<that.nums){
					if(now.row!=5) now.row++;
				}else if((now.row-1) > that.nums){
					if(now.row!=1) now.row--;
				}
				
				$(".pageShow li").each(function(){
					$(this).removeClass('active');
				})
				$(this).addClass('active');
		})
	})

})();