<?php
/*
 * Blog Page image options:
 * 1. Full width of page
 * 2. Width of paragraph
 * 3. Small in margin (either on the left side or right side)
 *
 * The user should select an option in WordPress. See wikipage.
 */

$sel   = get_field("blog_page_select_image_size");
$full  = "blog_page_full_size";
$med   = "blog_page_paragraph_size";
$right = "blog_page_small_right";
$left  = "blog_page_small_left";

  switch ($sel) {
    case $full :
      break;
    case $med :
      break;
    case $right :
      break;
    case $left :
      break;
    default :
      break;
  }
?>