<?php
//add theme options page
add_action('admin_menu', 'duck_admin_menu_functions');
function duck_admin_menu_functions() {
	//add media uploader support
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	wp_enqueue_style('thickbox');
	//add sub menus
	add_submenu_page( 'themes.php', 'Theme Options', 'Theme Options', 'edit_theme_options', 'duck-theme-options', 'duck_theme_options' );
}
//add menu support
add_theme_support( 'menus' );
register_nav_menus( array(
	'main-menu' => 'Main Menu'
) );
//add featured image support
add_theme_support( 'post-thumbnails' );
//add scripts
add_action( 'wp_enqueue_scripts', 'duck_enqueue_scripts' );
function duck_enqueue_scripts() {
	wp_enqueue_script( 'dotd-ajax-request', get_template_directory_uri() . '/js/ajax.js', array( 'jquery' ) );
	wp_localize_script( 'dotd-ajax-request', 'dotd_ajax', array( 
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'site_name' =>  get_bloginfo( 'name' )
		) );
}
//theme options hooks
add_action( 'wp_ajax_duck_theme_options_ajax_action', 'duck_theme_options_ajax_callback' );
add_action( 'after_setup_theme', 'duck_theme_options_initialization' );
/*
 * Theme Options Display Function
 */
 if( !function_exists( 'duck_theme_options' ) ) {
	function duck_theme_options() {
		$options = get_option( 'duck_theme_options' );
	?>
		<div id="duck-theme-options-wrap">
			<div class="icon32" id="icon-tools"><br /></div>
			<h2>Theme Options</h2>
			<p><i>From here you can modify different settings for this theme.</i></p>
			<section id="branding">
				<h3>Branding</h3>
				<img id="duck-logo-src" src="<?php echo isset($options['branding'] ) ? $options['branding']['src'] : ''; ?>"><br>
				<input type="hidden" id="duck-logo-id" value="<?php echo isset($options['branding'] ) ? $options['branding']['id'] : ''; ?>">
				<input type="button" id="duck-logo-change" value="Set Image">
				<input type="button" id="duck-logo-remove" value="Remove Image">
			</section>
		</div>
			<div>
				<p class="submit"><input id="save-changes-btn" name="Submit" type="submit" class="button-primary" value="<?php esc_attr_e('Save Changes'); ?>"></p>
				<h2 id="ajax-response-field" style="text-align: left"></h2>
			</div>
		</div>
		<script type="text/javascript">
		jQuery(function($) {
			//handle image edit
			$(document).on("click", "#duck-logo-change", function() { // button
				formfield = 'add image';
				tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
				return false;
			});
			window.send_to_editor = function(html) {
				var imgurl = $('img',html).attr('src');
				var imgid = $('img', html).attr('class');
				imgid = imgid.replace(/(.*?)wp-image-/, '');
				tb_remove();
				$("#duck-logo-src").attr( 'src', imgurl ); // image preview
				$("#duck-logo-id").val(imgid); // hidden id
			}
			$(document).mouseup(function(e) {
			    if ( $("#TP_iframeContent").has(e.target).length === 0 ) {
					tb_remove();
			    }
			});
			$(document).on("click", "#duck-logo-remove", function() { // button
				$("#duck-logo-src").attr('src', '');
				$("#duck-logo-id").val('');
			});
			//handle save
			$("#save-changes-btn").click(function() {
				$("#save-changes-btn").val( 'Saving...' );
				//send ajax request to update
				var data = { 
					action: 'duck_theme_options_ajax_action',
					duck_theme_options: { branding: { src: $("#duck-logo-src").attr('src'), id: $("#duck-logo-id").val() } }
				};
				$.post(ajaxurl, data, function( msg ) {
					$("#save-changes-btn").val( msg );
				});
			});
		});
		</script>
	<?php }
}
/*
 * Theme Option Save
 */
if( !function_exists( 'duck_theme_options_ajax_callback' ) ) {
	function duck_theme_options_ajax_callback() {
		global $wpdb; // this is how you get access to the database
		update_option( 'duck_theme_options', $_POST['duck_theme_options'] );
		echo 'Changes Saved'; // save confirmation
		exit(); // this is required to return a proper result
	}
}
/*
 * Theme Options Initialization
 */
if( !function_exists( 'duck_theme_options_initialization' ) ) {
	function duck_theme_options_initialization() {
//		add_option( $option_name, $value, ' ', 'no' );
	}
}
/*
 * Page Category Meta Box
 */
function duck_post_category_meta ( $post ) { 
	?>
	<div style="border:1px solid #CCCCCC;padding:10px;margin-bottom:10px;">
		<p><strong>Use this option to select which post category is displayed on this page.</strong></p>
		Post Category: <?php wp_dropdown_categories( array(
			'selected'=> get_post_meta($post->ID, 'duck_post_category', true),
			'name' => 'duck_post_category',
			'show_option_none' => 'None',
			'class' => 'postform duck-dropdown',
			'hide_empty' => false) ); ?>
	</div>
<?php }
/*
 * Add Meta Boxes
 */
function duck_admin_init_metaboxes() {
	//Check the page template.
	$post_id = isset($_GET['post']) ? $_GET['post'] : (isset($_POST['post_ID']) ? $_POST['post_ID'] : '');
	$template_file = get_post_meta($post_id, '_wp_page_template', TRUE);
	//add post category optino to all pages
	add_meta_box('duck-post-category-meta', 'Post Category', 'duck_post_category_meta', 'page', 'normal', 'high');	
	//normally there would a switch case here for the template file
}
add_action('admin_init', 'duck_admin_init_metaboxes');
/*
 * Save Meta Box Values
 */
function duck_meta_save_post( $post_id ) {
	//If an autosave, the person can't edit, or no meta data set, skip it.
	if ( (defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE) || !current_user_can( 'edit_page', $post_id ) ) {
		return;
	}
	if( isset($_POST['duck_post_category']) ) {
		update_post_meta($post_id, 'duck_post_category', $_POST['duck_post_category'] );
	}
}
add_action( 'save_post', 'duck_meta_save_post' );
/**
 * AJAX
 */
add_action( 'wp_ajax_nopriv_dotd-load-page', 'dotd_load_page' );
add_action( 'wp_ajax_dotd-load-page', 'dotd_load_page' );
//ajax callback
function dotd_load_page() {
	$page_id = url_to_postid( $_POST['url'] );
	if( !$page_id ) {
		$page_id = get_option( 'page_on_front' );
	}
	// The Query
	global $wp_query;
	$wp_query = new WP_Query( array( 'post_type' => 'any', 'post__in' => array( $page_id ) ) );
	get_template_part( 'part', 'post' );
	exit;
}
