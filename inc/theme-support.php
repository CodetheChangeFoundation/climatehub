<?php
/**
 * Climate Hub theme support options
 *
 * @package climatehub
 */

// Activate Featured Images
add_theme_support( 'post-thumbnails' );

// Activate Custom Header Image
add_theme_support( 'custom-header' );

// Activate Nav Menu Option
function climatehub_register_nav_menu() {
  register_nav_menu( 'primary', 'Header Navigation Menu' );
  register_nav_menu( 'footer', 'Footer Menu' );
}
add_action( 'after_setup_theme', 'climatehub_register_nav_menu' );

// Activate HTML5 Features
add_theme_support( 'html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption') );

