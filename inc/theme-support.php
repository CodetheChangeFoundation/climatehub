<?php
/**
 * Theme support options
 *
 * @package climatehub
 */

// Activate Featured Images
add_theme_support('post-thumbnails');

// Activate Custom Header Image
add_theme_support('custom-header');

// Activate HTML5 Features
add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));

// Activate nav menu
function climatehub_theme_setup() {
  add_theme_support('menus');
  register_nav_menu('primary', 'Primary Header Navigation');
}

add_action('init', 'climatehub_theme_setup');

// ACF Options Page
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
}
