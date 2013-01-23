<?php $options = get_option( 'duck_theme_options' ); ?>
<div id="side-bar">
	<div id="side-bar-wrap">
		<div id="branding">
			<?php /*<a href="<?php bloginfo( 'url' ); ?>" title="<?php get_bloginfo( 'name') ?> Home">*/ ?>
			<?php
				if( isset($options['branding']['id']) ) {
					echo wp_get_attachment_image(
						$options['branding']['id'], 
						array( '320', 'auto' )
					);
				}
			?>
			<?php //</a> ?>
		</div>
		<nav id="main-navagation">
			<?php wp_nav_menu( 'main-menu' ); ?>
		</nav>
	</div><!-- #side-bar-wrap -->
</div><!-- #side-bar -->
<div id="container" class="night">
	<div id="content" role="main">
		<div id="skyline">
			<div class="skylittle"></div>
			<div class="warehouse"></div>
			<div class="skyscraper"></div>
			<div class="building"></div>
			<div class="skyscraper"></div>
			<div class="skylittle"></div>
			<div class="warehouse"></div>
			<div id="lights-status">
				<?php for( $i=1; $i<13; $i++ ) { ?>
				<div class="city-light light_<?php echo $i; ?> light-on"></div>
				<?php } ?>
			</div>
		</div>