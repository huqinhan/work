// JavaScript Document
//首页底部内容切换
+function($){
    var $friendLisa=$("#friend_lis").find("a");
    $friendLisa.each(function(index){
        var that=this;
        that.nums=index;
        $(this).click(function(){
            $friendLisa.each(function(a){
                var classStr=$(this).attr('class');
                if(classStr.indexOf("-hover")>0){
                    $(this).attr('class',classStr.replace("-hover",""));
                }
            });
            $(this).attr('class',$(this).attr('class').concat("-hover"));
            $(".home-friend-bg").fadeOut();
            $(".home-friend-bg").eq(that.nums).fadeIn();
        });
    });
}(jQuery);

//帮助页内容切换
+function($){
    var $helpInfo=$('.help-info');
    var $lishow=$(".lishow");
    var $licon=$(".join-info li");

    $('.help-tab').find('li').each(function(index){
        var that=this;
        that.nums=index;
        $helpInfo.eq(0).slideDown();
        $(this).click(function(){
            $('.help-tab').find('li').removeClass("li-hover");
            $(this).addClass("li-hover");
            $helpInfo.slideUp();
            $helpInfo.eq(that.nums).slideDown();

        });
    });

    $lishow.each(function(index){
        var that=this;
        that.num=index;
        $(".lishow").eq(0).find('.li-con').slideDown();
        $(this).click(function(){
            $lishow.find('.li-con').slideUp();
            $lishow.find('em').removeClass('box-rotate');
            $lishow.eq(that.num).find('.li-con').slideToggle();
            $lishow.eq(that.num).find('em').addClass('box-rotate');
        });

    });

    $licon.each(function(index){
        var that=this;
        that.num=index;
        $licon.eq(0).find('.li-con').slideDown();
        $licon.eq(0).find('em').addClass('box-rotate');
        $(this).click(function(){
            $licon.find('.li-con').slideUp();
            $licon.find('em').removeClass('box-rotate');
            $licon.eq(that.num).find('.li-con').slideToggle();
            $licon.eq(that.num).find('em').addClass('box-rotate');
        });

    });
}(jQuery);

//加入我们--图片滚动
+function($){
    $(".join-bg").slideDown();
    var $lis=$('.joinMove').find('li');
    var $as=$('.joinMoveZero').find('a');
    var $frilis=$('.friendMove').find('li');
    var $fris=$('.friendZero').find('a');

    var imgMoveing=function($moveObj,$zeroObj){
        var nums=$moveObj.length;
        var timer=1000;
        var intTimer=5000;
        var i=0;
        $moveObj.eq(0).css({left:'0%'});
        var fn=function(){
            $zeroObj.removeClass('hover');
            $moveObj.eq(i).css({left:'0%'});
            $moveObj.eq(i).animate({left:'100%'},timer);
            (i>nums-2)?i=0:i++;
            $zeroObj.eq(i).addClass('hover');
            $moveObj.eq(i).css({left:'-100%'});
            $moveObj.eq(i).animate({left:'0%'},timer);
        };
        if(nums>0){
            var time_img=setInterval(fn,intTimer);
        }
        $zeroObj.each(function(index){
            var that=this;
            that.mindex=index;
            $(this).click(function(){
                clearInterval(time_img);
                $zeroObj.removeClass('hover');
                $(this).addClass('hover');
                $moveObj.eq(i).css({left:'0%'});
                $moveObj.eq(i).animate({left:'100%'},timer);
                $moveObj.eq(that.mindex).css({left:'-100%'});
                $moveObj.eq(that.mindex).animate({left:'0%'},timer);
                i=that.mindex;
                time_img=setInterval(fn,intTimer);
            });
        })
    }
    imgMoveing($lis,$as);
    imgMoveing($frilis,$fris);

}(jQuery);

//加入我们--职位
+function($){
    var $jobUl=$('.join-job-box-right-box').find('ul');
    var $posit=$('#posit');
    var $upBtn=$('.join-up');
    var $downBtn=$('.join-down');
    var showLi=6; //能显示的li条数
    var moveH=60;  // li的高度
    var lis=$jobUl.find('li').length;
    var bgAttr='join-bg-';
    var colPosit=3;  //第三个为高亮显示的当前职位
    var radnum=1;

    var i= 0,j= 1,k=1;

    if(lis<=showLi){
        $upBtn.addClass('disblock');
        $downBtn.addClass('disblock');
        j=0;
        k=0;
    }
    if(i==0) $downBtn.addClass('disblock');
    if(j){
        $upBtn.click(function(){
            if(i<(lis-showLi)){
                i++;
                k=1;
                $downBtn.removeClass('disblock');
                $jobUl.animate({top:"-="+moveH});
                moveUp();
            }
            if(i==(lis-showLi)){
                j=0;
                $upBtn.addClass('disblock');
            }
        });
    }
    if(k){
        $downBtn.click(function(){
            if(i>0){
                i--;
                j=1;
                $upBtn.removeClass('disblock');
                $jobUl.animate({top:"+="+moveH});
                moveDown();
            }
            if(i==0){
                k=0
                $downBtn.addClass('disblock');
            }
        });
    }
    $jobUl.find('li').each(function(index){
        var that=this;
        that.mindex=index;
        $(this).click(function(){
            radnum=parseInt(6*Math.random())+1;
            console.log(radnum)
            $('.join-li-bg').fadeIn();
            $jobUl.find('li').removeClass();
            $(this).addClass(bgAttr+radnum);
            $('.join-info-box').attr('class','join-info-box');
            $('.join-info-box').addClass(bgAttr+radnum);
            $('.hr-info').hide();
            $('.hr-info').eq(that.mindex).show();

        });
    });
    function moveUp(){
        $('.join-li-bg').animate({top:'-=40px'},200).animate({top:"+=40px"},300);
    }
    function moveDown(){
        $('.join-li-bg').animate({top:'+=40px'},200).animate({top:"-=40px"},300);
    }
}(jQuery);

//导航
+function($){
    var $navBtn=$(".mobil-nav-btn");
    var $navLeft=$(".mobil-nav");
    var navWidth=$navLeft.innerWidth();
    var btnWidth=$navBtn.offset().left;
    var navHide=true;
    $navBtn.click(function(event){
        if(navHide){
            $navBtn.animate({left:navWidth-btnWidth},400);
            $navLeft.css("left","-100%").show();
            $navLeft.animate({left:0});
        }else{
            $navBtn.animate({left:btnWidth},200);
            $navLeft.animate({left:"-100%"});
        }
        navHide=!navHide;
    });
}(jQuery);

//关于我们切换
+function($){
    var $aboutUl=$(".about-ul li a");
    var $hzs=$(".hzs");
    var curIndex= 0,lsIndex=0;
    $aboutUl.each(function(index){
        var that=this;
        curIndex=$(this).attr("class").indexOf("-hover")>=0?index:curIndex;
        that.num=index;
        $hzs.eq(0).slideDown();
        $(this).click(function(){
            lsIndex=curIndex;
            $aboutUl.eq(lsIndex).attr("class",$aboutUl.eq(lsIndex).attr("class").replace("-hover",""));
            curIndex=that.num;
            $aboutUl.eq(curIndex).attr("class",$aboutUl.eq(curIndex).attr("class")+"-hover");
            $hzs.slideUp();
            $hzs.eq(that.num).slideToggle();
        });

    });
}(jQuery);


