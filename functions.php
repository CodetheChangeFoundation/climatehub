<?php
/**
 * Climate Hub Theme Functions
 *
 * @package climatehub
 */

require get_template_directory() . '/inc/cleanup.php';
require get_template_directory() . '/inc/enqueue.php';
require get_template_directory() . '/inc/theme-support.php';
require get_template_directory() . '/inc/title-cf.php';
require get_template_directory() . '/custom-fields/partners-content-section.php';

function climatehub_theme_setup() {
  add_theme_support('menus');
  register_nav_menu('primary', 'Primary Header Navigation');
}

add_action('init', 'climatehub_theme_setup');

// Include custom navwalker
require get_template_directory() . '/inc/bs4navwalker.php';
