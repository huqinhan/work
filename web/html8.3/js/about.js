// JavaScript Document
$(function(){
	 //关于我们
	$(".aboutBlank").height($(".aboutConR").innerHeight());
	$(".aboutBlank").width(($("html").innerWidth()-$(".aboutCon").innerWidth())/2);
	$(window.document).scroll(function() {
		if($(document).scrollTop()>270){
			$(".aboutConL").css({top:$(document).scrollTop()-270});
		}
	});
	$(".aboutConL a").each(function(index){
		$(this).click(function(){
			$(".aboutConL a").each(function(index){
				$(this).removeClass("ahove");
			})
			$(this).addClass("ahove");
		});
	});
})