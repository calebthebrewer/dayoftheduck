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
 //print out post
get_template_part( 'loop', 'single' );
//print out posts of the selected category
$cat = get_post_meta($post->ID, 'duck_post_category', true);
if( $cat!=''&&$cat!=-1 ) {
	$cat_name = get_term_by( 'id', $cat, 'category' );
	$cat_name = $cat_name->name;
	$cat = "cat=".$cat;
	$wp_query = new WP_Query( $cat );
	get_template_part( 'loop', 'list' );
}