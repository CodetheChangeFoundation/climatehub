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

// Google Maps
function my_acf_init() {
	acf_update_setting('google_api_key', 'AIzaSyBwOAKi-kqE-mh7SFpWuKnFsqMEkZCyp_4');
}
add_action('acf/init', 'my_acf_init');

// Add custom media metadata fields
function add_image_attachment_fields_to_edit($form_fields, $post) {
	$form_fields["link_one_url"] = array(
		"label" => __("Link One URL"),
		"input" => "text",
		"value" => esc_attr(get_post_meta($post->ID, "_link_one_url", true))
	);

	$form_fields["link_one_text"] = array(
    "label" => __("Link One Text"),
    "input" => "text",
    "value" => esc_attr(get_post_meta($post->ID, "_link_one_text", true)),
	);

	$form_fields["link_two_url"] = array(
		"label" => __("Link Two URL"),
		"input" => "text",
		"value" => esc_attr(get_post_meta($post->ID, "_link_two_url", true))
	);

	$form_fields["link_two_text"] = array(
    "label" => __("Link Two Text"),
    "input" => "text",
    "value" => esc_attr(get_post_meta($post->ID, "_link_two_text", true)),
	);

	return $form_fields;
}
add_filter("attachment_fields_to_edit", "add_image_attachment_fields_to_edit", null, 2);

// Save custom media metadata fields
function add_image_attachment_fields_to_save($post, $attachment) {
	if (isset($attachment['link_one_url'])) {
		update_post_meta($post['ID'], '_link_one_url', esc_url($attachment['link_one_url']));
	}

	if (isset($attachment['link_one_text'])) {
		update_post_meta($post['ID'], '_link_one_text', esc_attr($attachment['link_one_text']));
	}

	if (isset($attachment['link_two_url'])) {
		update_post_meta($post['ID'], '_link_two_url', esc_url($attachment['link_two_url']));
	}

	if (isset($attachment['link_two_text'])) {
		update_post_meta($post['ID'], '_link_two_text', esc_attr($attachment['link_two_text']));
	}

	return $post;
}
add_filter("attachment_fields_to_save", "add_image_attachment_fields_to_save", null, 2);

// Highlight menu item for individual project/blog pages
add_action('nav_menu_css_class', 'add_current_nav_class', 10, 2 );
function add_current_nav_class($classes, $item) {
	global $post;
	$menu_slug = strtolower(trim($item->url));
	$current_post_category = get_the_category($post->ID);
	$category_parent_id = $current_post_category[0]->category_parent;
	if ($category_parent_id != 0) {
    $category_parent = get_term($category_parent_id, 'category');
    $category_slug = $category_parent->slug;
	} else {
    $category_slug = $current_post_category[0]->slug;
	}

	if (strpos($menu_slug,$category_slug) !== false) {
		$classes[] = 'current-menu-item active';
	}

	return $classes;
}