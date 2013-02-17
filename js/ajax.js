function ajax_page_load( $link ) {
	jQuery.post(
		dotd_ajax.ajaxurl,
		{
			action : 'dotd-load-page',
			url : $link.attr('href')
		},
		function( response ) {
			//update nav menu
			$("nav .current-menu-item").removeClass( 'current-menu-item' );
			$link.parent().addClass( 'current-menu-item' );
			//update head and history
			$("title").html( $link.html() + ' | ' + dotd_ajax.site_name );
			//update content
			$("#main-content").html( response );
			resize();
		}
	);
}
jQuery(document).ready(function($) {
	//handle back/forward buttons button
	window.onpopstate = function(event) {
		event.preventDefault();
		if( event.state ) {
			ajax_page_load( $("nav a[href='" + event.state.href + "']") );
		} else {
			ajax_page_load( $("nav a[href='" + event.target.content.location.href + "']") );
		}
	};
	$(".menu-item a").click(function( e ) {
		e.preventDefault();
		history.pushState( 
			{ href: $(this).attr('href') },
			$(this).html(),
			$(this).attr('href')
		);
		ajax_page_load( $(this) );
	});
});