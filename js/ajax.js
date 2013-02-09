jQuery(document).ready(function($) {
	//handle back/forward buttons button
	window.onpopstate = function(event) {
		var page_id = js_history.pop();
		jQuery.post(
			spiders_ajax.ajaxurl,
			{
				action : 'spiders-load-page',
				page_id : page_id
			},
			function( response ) {
				$("#main").html( response );
				if( $("#container .metroUI").length > 0 ) {
					$("#container .metroUI").horizontal_scroll();
				} else {
					window.scrollTo(0, 0);
					apply_paralax();
				}
			}
		);
	};
	$("#secondary .menu li a").click(function( e ) {
		e.preventDefault();
		//check if this is a parent item
		if( $(this).parent().parent().hasClass('menu') ) {
			console.log('good');
			var focus = '#metro-'+$(this).parent().attr('id');
			if( $("#container .metroUI").length > 0 ) {
				$("#container .metroUI").horizontal_scroll({
					'focus'	: focus
				});
			} else {
				history.pushState({foo: $("#spiders-home-link").attr('href')}, "Home", $("#spiders-home-link").attr('href'));
				js_history.push( 'home' );
				jQuery.post(
					spiders_ajax.ajaxurl,
					{
						action : 'spiders-load-page',
						page_id : 'home'
					},
					function( response ) {
						$("#main").html( response );
						$("#container .metroUI").horizontal_scroll({
							'focus'	: focus
						});
					}
				);	
			}	
		} else {
			history.pushState({foo: $(this).attr('href')}, $(this).attr('data-title'), $(this).attr('href'));
			js_history.push( $(this).attr('data-id') );
			jQuery.post(
				spiders_ajax.ajaxurl,
				{
					action : 'spiders-load-page',
					page_id : $(this).attr('data-id')
				},
				function( response ) {
					window.scrollTo(0, 0);
					$("#main").html( response );
					apply_parallax();
				}
			);
			
		}
	});
	$("#spiders-home-link").click(function( e ){
		e.preventDefault();
		if( $('#container .metroUI').length == 0 ) {
			var href = $(this).attr('href');
			history.pushState({foo: $(this).attr('href')}, "Home", $(this).attr('href'));
			js_history.push( 'home' );
			jQuery.post(
				spiders_ajax.ajaxurl,
				{
					action : 'spiders-load-page',
					page_id : 'home'
				},
				function( response ) {
					$("#main").html( response );
					$("#container .metroUI").horizontal_scroll({
						'focus' : 'left'
					});
				}
			);
		} else {
			$("#container .metroUI").horizontal_scroll({
				'focus' : 'left'
			});
		}
	});
	$(document).on('click', '#content .group a, .ajax-link', function( e ){
		e.preventDefault();
		history.pushState({foo: $(this).attr('href')}, $(this).attr('data-title'), $(this).attr('href'));
		js_history.push( $(this).attr('data-id') );
		jQuery.post(
			spiders_ajax.ajaxurl,
			{
				action : 'spiders-load-page',
				page_id : $(this).attr('data-id')
			},
			function( response ) {
				window.scrollTo(0, 0);
				$("#main").html( response );
				apply_parallax();
			}
		);
	});
});