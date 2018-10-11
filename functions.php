<?php

function climatehub_script_enqueue() {

  wp_enqueue_style('customstyle', get_template_directory_uri() . '/css/climatehub.css', array(), '1.0.0', 'all');
  wp_enqueue_script('customjs', get_template_directory_uri() . '/js/climatehub.js', array(), '1.0.0', true);

}

add_action('wp_enqueue_scripts', 'climatehub_script_enqueue');
?>
