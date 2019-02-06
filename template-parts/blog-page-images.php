<?php
/*
 * Blog Page image options:
 * 1. Full width of page
 * 2. Width of paragraph
 * 3. Small in margin (either on the left side or right side)
 *
 * The user should select an option in WordPress. See wikipage.
 */

$sel         = get_field("blog_page_select_image_size");
$img_full    = get_field("blog_page_full_size");
$img_med     = get_field("blog_page_paragraph_size");
$img_small_r = get_field("blog_page_small_right");
$img_small_l = get_field("blog_page_small_left");
$img_txt     = get_field("blog_page_image_text");

$full    = "Full page width";
$med     = "Paragraph width";
$right   = "Small right";
$left    = "Small left";

$size_full  = "full";
$size_med   = "full";
$size_small = "full";
?>

<div class="container">
  <div class="row justify-content-center"> <?php
    switch ($sel) {
      case $full :
        if( $img_full ){
          echo wp_get_attachment_image( $img_full, $size_full );
          ?></div><?php
          ?><div class="row pl-3"><?php
          text_display_bp($img_txt);
        }

      case $med :
        if( $img_med ){
            echo wp_get_attachment_image( $img_med, $size_med );
            ?></div><?php
            ?><div class="row pl-3 justify-content-left"><?php
            text_display_bp($img_txt);
        }

      case $right :
        if( $img_small_r ){
          echo wp_get_attachment_image( $img_small_r, $size_small );
          ?></div><?php
          ?><div class="row pl-3"><?php
          text_display_bp($img_txt);
        }

      case $left :
        if( $img_small_l ){
          echo wp_get_attachment_image( $img_small_l, $size_small );
          ?></div><?php
          ?><div class="row pl-3"><?php
          text_display_bp($img_txt);
        }

      default :
        break;
    }
  ?>
  </div>
</div>

<?php
/* If there is image caption display bottom left */
function text_display_bp($txt) {
  if( $txt ){
    ?> <p class="text-left"> <?php echo $txt; ?> </p> <?php
  }
  return;
}
?>