<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query. 
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 * 
 */
get_header();
get_template_part( 'side-bar' ); ?>
<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
	<article class="toggleable">	
		<div class="shadow">
			<div class="excerpt-wrap" title="Click to expand <?php the_title(); ?>">
				<div class="excerpt">
					<?php
						if( has_post_thumbnail() ) {
							the_post_thumbnail( array( '800', 'auto'), array( 'title'=>'Click to expand '.get_the_title() ) );
						} else {
							?><h1><?php the_title(); ?></h1><?php
							the_excerpt();
						}
					?>
				</div>	
			</div>
			<div class="content-wrap" style="display: none" title="Click to close <?php the_title(); ?>">
				<div class="content" style="opacity: 0;">
					<h2><?php the_title(); ?></h2>
					<?php the_content(); ?>
				</div>
			</div>	
		</div>	
	</article>
<?php endwhile; endif; ?>
<?php get_footer(); ?>