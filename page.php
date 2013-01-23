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
get_template_part( 'side-bar' );
$cat = get_post_meta($post->ID, 'duck_post_category', true);
if( $cat!=''&&$cat!=-1 ) {
	$cat_name = get_term_by( 'id', $cat, 'category' );
	$cat_name = $cat_name->name;
	$cat = "cat=".$cat;
$query = new WP_Query( $cat );
if( $query->have_posts() ) : while( $query->have_posts() ) : $query->the_post(); ?>
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
					<h1><?php the_title(); ?></h1>
					<?php the_content(); ?>
				</div>
			</div>	
		</div>	
	</article>			
<?php endwhile; endif;
	wp_reset_postdata();
} else {
	if( have_posts() ) : while( have_posts() ) : the_post(); ?>
		<article class="single">
			<div class="shadow">
				<div class="content-wrap">
					<div class="content">
						<h1><?php the_title(); ?></h1>
						<?php the_content(); ?>
					</div>
				</div>	
			</div>	
		</article>
	<?php endwhile; endif;
} ?>
<?php get_footer(); ?>