//global vars
var min_height,
	content_min_height,
	min_width = 600,
	c_height,
	anim_d = 300,
	anim = {duration: anim_d, queue: false };
//resize website
function resize() {
	//width
	$("#content").width( $(window).width()-325 );
	//height
	resize_height();
}
function resize_height(height_diff) {
	if( !height_diff ) {
		height_diff = 0;
	}
	//move menu
	if( $("#side-bar-wrap").height()+28<$("#side-bar").height() ) {
		$("#side-bar-wrap").css( {
			top: $("#side-bar").height()-(min_height+28),
			position: "fixed"
		}, anim_d );
	} else {
		$("#side-bar-wrap").css( {
			top: "0",
			position: "relative"
		}, anim_d );
	}
	//move content
	if( ($("#content").height()+56)+height_diff<$("#container").height() ) {
		$("#content").animate( {
			top: $("#container").height()-(($("#content").height()+56)+height_diff)
		}, anim );
	} else {
		$("#content").animate( {
			top: "0"
		}, anim );
	}
}
function toggle_time( new_time ) {
	if( new_time==null ) {
		new_time = current_time+1;
	}
	var rand,
		current_class = $("#container").attr('class');
	if( current_time!=new_time ) {
		switch( new_time ) {
			case 0:	//night
				$("#container").switchClass(current_class, 'night');
				$(".city-light").each(function(){
					if( $(this).hasClass('light-off') ) {
						$(this).switchClass('light-off', 'light-on');
					}
				});		
				current_time = 0;
				break;
			case 1:	//dawn
				$("#container").switchClass(current_class, 'dawn');
				$(".city-light").each(function(){
					rand = Math.random();
					if( rand<.3 ) {
						$(this).switchClass('light-on', 'light-off');
					}
				});	
				current_time = 1;
				break
			case 2:	//day
				$("#container").switchClass(current_class, 'day');
				$(".city-light").each(function(){
					if( $(this).hasClass('light-on') ) {
						$(this).switchClass('light-on', 'light-off');
					}
				});	
				current_time = 2;
				break;
			case 3:	//dusk
				$("#container").switchClass(current_class, 'dusk');
				$(".city-light").each(function(){
					rand = Math.random();
					if( rand<.7 ) {
						$(this).switchClass('light-off', 'light-on');
					}
				});	
				current_time = 3;
				break;
			default:
				toggle_time( 0 );
				break;
		}	
	}
}
function toggle_article(article, article_2) {
	if( $(article).find('.content').is(":visible") ) {
        $(article).find('.content').animate( {
    			opacity: "0"
	    	}, anim_d, function() {
	    		resize_height(($(article).find('.excerpt-wrap').height()-$(article).find('.content-wrap').height()-0));
	    		$(article).find('.content-wrap').slideUp( anim_d );
		    	$(article).find('.excerpt-wrap').slideDown( anim_d, function(){
		            $(article).find('.excerpt').animate( {
		            	opacity: "1"            	
		            }, anim );
		        });
	    	});
    } else {
    	$(article).find('.excerpt').animate( {
    			opacity: "0"
	    	}, anim_d, function() {
	    		resize_height(($(article).find('.content-wrap').height())-$(article).find('.excerpt-wrap').height()+0);
	    		$(article).find('.excerpt-wrap').slideUp( anim_d );
		    	$(article).find('.content-wrap').slideDown( anim_d, function(){
		            $(article).find('.content').animate( {
		            	opacity: "1"
		            }, anim );
		        });	
	    	});
	}
	resize();
}
//document ready stuff
var current_time;
jQuery(document).ready(function($) {
	$("#branding").click(function() {
		toggle_time();
	});
	//reset min_height
	min_height = $("#side-bar-wrap").height();
	content_min_height = $("#content").height();
	//bind and run resize
	$.event.add( window, "resize", resize );
	resize();
	//bind tile click
	$("#content .toggleable").click(function() {
		if( $(this).siblings().find('.content').is(":visible") ) {
			var article = $(this);
			toggle_article( article.siblings().find('.content:visible').parent().parent().parent() );
			setTimeout(function(){toggle_article(article)}, anim_d*2 );
		} else {
			toggle_article( this );
		}
	});
	//time control
	function time_control() {
		time = new Date();
		time = time.getHours();
		if( time >=4 && time < 10 ) {	//dawn
			toggle_time( 1 );
		} else if( time >=10 && time < 16 ) {	//day
			toggle_time( 2 );
		} else if( time >=16 && time < 22 ) {	//dusk
			toggle_time( 3 );
		} else {	//night
			current_time = 0;
		}
	}
	time_control();
});
