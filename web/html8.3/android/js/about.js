/*
* @Author: anchen
* @Date:   2015-08-06 10:29:12
* @Last Modified by:   anchen
* @Last Modified time: 2015-08-06 11:22:25
*/

'use strict';
$(function(){
    $(".aboutConL a").each(function(index){
        var that=this;
        that.nums=index;
        $(this).click(function(){
            for(var i=0;i<$(".aboutConL a").length;i++){
                $(".aboutConL a").eq(i).removeClass("ahove");
               if(!$(".aboutText").eq(i).hasClass("none")) {
                    $(".aboutText").eq(i).addClass("none");
                }
            }
            $(".aboutText").eq(that.nums).removeClass("none");
            $(this).addClass("ahove");
        })
    });
})