<?php
/*
 * Blog Page image options:
 * 1. Full width of page
 * 2. Width of paragraph
 * 3. Small in margin (either on the left side or right side)
 *
 * The user should select an option in WordPress. See wikipage.
 */

$sel       = get_field("blog_page_select_image_size");
$img_full  = get_field("blog_page_full_size");
$img_med   = get_field("blog_page_paragraph_size");
$img_small_r = get_field("blog_page_small_right");
$img_small_l = get_field("blog_page_small_left");

$full    = "Full page width";
$med     = "Paragraph width";
$right   = "Small right";
$left    = "Small left";

$size_full = "full";
$size_med  = "medium";
$size_small ="small";

  switch ($sel) {
    case $full :
      if( $img_full ){
        echo wp_get_attachment_image( $img_full, $size_full );
      }

    case $med :
      if( $img_med ){
        echo wp_get_attachment_image( $img_med, $size_med );
      }

    case $right :
      if( $img_small_r ){
        echo wp_get_attachment_image( $img_small_r, $size_small );
      }

    case $left :
      if( $img_small_l ){
        echo wp_get_attachment_image( $img_small_l, $size_small );
      }

    default :
      break;
  }