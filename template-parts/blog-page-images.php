<?php
/*
 * Blog Page image options:
 *
 * 1. Full width of page
 * 2. Width of paragraph
 * 3. Small in margin (either on the left side or right side)
 *
 * The user should select an option in WordPress. See wikipage.
 */

if( have_rows('blog_page_images_repeater') ):

  while ( have_rows('blog_page_images_repeater') ) : the_row();

      $sel         = get_sub_field("blog_page_select_image_size");
      $img_full    = get_sub_field("blog_page_full_size");
      $img_med     = get_sub_field("blog_page_paragraph_size");
      $img_small_r = get_sub_field("blog_page_small_right");
      $img_small_l = get_sub_field("blog_page_small_left");
      $img_txt     = get_sub_field("blog_page_image_text");

      $full    = "Full page width";
      $med     = "Paragraph width";
      $right   = "Small right";
      $left    = "Small left";

      $size_full  = "full";
      $size_med   = "full";
      $size_small = "full";

      ?>
      <div class="row"> <?php

        switch ($sel) {

          case $full :

            if( $img_full ){ ?>
              <div class="container-fluid pl-3 pr-3 pt-5 pb-5" align="center">
                <div class="figure"> <?php
                  echo wp_get_attachment_image( $img_full, $size_full );
                  text_display_bp($img_txt); ?>
                </div> <?php
            }

          case $med :

            if( $img_med ){ ?>
              <div class="container-fluid" align="center">
                <div class="figure"> <?php
                  echo wp_get_attachment_image( $img_med, $size_med );
                  text_display_bp($img_txt); ?>
                </div> <?php
            }

          case $right :

            if( $img_small_r ){ ?>
              <div class="container-fluid pr-3 pl-3 pl-3 pt-3 pb-3" align="right">
                <div class="figure"> <?php
                echo wp_get_attachment_image( $img_small_r, $size_small );
                text_display_bp($img_txt);?>
              </div><?php
            }

          case $left :

            if( $img_small_l ){ ?>
              <div class="container-fluid pr-3 pl-3 pt-3 pb-3" align="left">
                <div class="figure"> <?php
                  echo wp_get_attachment_image( $img_small_l, $size_small );
                  text_display_bp($img_txt); ?>
                </div> <?php
            }

          default :
            break;
        } ?>
        </div>
      </div>
      <?php

  endwhile;
endif;

/* If there is image caption display bottom left */
function text_display_bp($txt) {
  if( $txt ){
    ?> <figcaption class="figure-caption" align="left"> <?php echo $txt; ?> </figcaption> <?php
  }
  return;
}
?>
