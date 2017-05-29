/**
 * Created by feipingpeng on 16/2/16.
 */
//首页图片滚动效果
+function($){
    //该函数依赖touch.js
    function ad_scroll(obj){
        var move_x=$(obj).outerWidth();  //获取滚动区域的大小
        var obj_ul=$(obj).find('ul');
        var obj_li=$(obj).find('li');
        var obj_p=$(obj).find('.ad-zero');
        var li_num=obj_li.length;        //获取图片内容的个数
        var on_off=1;                    //初始转态
        var time_run=4000;               //滚动时间

        //设置li的宽度初始值
        obj_li.css("width",move_x);
        obj_p.css("width",move_x);

        //设置构建当前图片位置原点
        obj_li.each(function(index){
            index==0?obj_p.append("<span class='active'></span>"):obj_p.append("<span></span>");
        });

        var obj_span=obj_p.find('span');
        var active=0;                   //当前图片位置
        function get_active(act_num){
            obj_span.each(function(){
                $(this).removeClass('active');
            });
            obj_span.eq(act_num).addClass('active');
        }

        //获取当前图片位置

        //图片自动循环滚动
        function move_act(){
            if(on_off){
                obj_ul.append(obj_li.eq(0).clone());
                on_off=0;
            }
            if(parseInt(obj_ul.css("left"))>-li_num * move_x){
                active<li_num-1?active++:active=0;
                obj_ul.animate({left:"-="+move_x});
            }else{
                obj_ul.css("left",0);
                active++;
                obj_ul.animate({left:"-="+move_x});
            }
            get_active(active);
        }
        var s=setInterval(move_act,time_run);

        //图片触摸滚动
        touch.on(obj_ul, 'swipeleft', function(ev){
            preimg(obj_ul);
            clearInterval(s);
            s=setInterval(move_act,time_run);
        });

        touch.on(obj_ul, 'swiperight', function(ev){
            nextimg(obj_ul);
            clearInterval(s);
            s=setInterval(move_act,time_run);
        });

        function preimg(obj){
            if(parseInt(obj.css("left"))==-(li_num) * move_x){
                obj.css("left",0);
            }
            if(parseInt(obj.css("left"))>-(li_num-1) * move_x){
                active<li_num-1?active++:active=0;
                obj.animate({left:'-='+move_x});
                get_active(active);
            }
        };

        function nextimg(obj){
            if(parseInt(obj.css("left"))<0){
                active>0?active--:active=li_num-1;
                obj.animate({left:'+='+move_x});
                get_active(active);
            }
        };

    }
    ad_scroll(".system-ad");

}(jQuery)