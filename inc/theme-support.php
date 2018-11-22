<?php
/**
 * Climate Hub theme support options
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
