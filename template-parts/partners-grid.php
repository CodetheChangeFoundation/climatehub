<?php
/**
 * Climate Hub partners page supplementary content section template
 *
 * @package climatehub
 */

if( get_field('enable_partners_grid') ): ?>
  <div class="container">
    <?php $size = 'thumbnail'; ?> <!--(thumbnail, medium, large, full or custom size)-->
    <div class="row">
      <div class="col">
        <?php
          $image = get_field('row_1')['logo_1'];
          if( $image ) {
            echo wp_get_attachment_image( $image, $size );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_1')['logo_2'];
          if( $image ) {
            echo wp_get_attachment_image( $image, $size );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_1')['logo_3'];
          if( $image ) {
            echo wp_get_attachment_image( $image, $size );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_1')['logo_4'];
          if( $image ) {
            echo wp_get_attachment_image( $image, $size );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_1')['logo_5'];
          if( $image ) {
            echo wp_get_attachment_image( $image, $size );
          }
        ?>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <?php
          $image = get_field('row_2')['logo_1'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_2')['logo_2'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_2')['logo_3'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_2')['logo_4'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_2')['logo_5'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <?php
          $image = get_field('row_3')['logo_1'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_3')['logo_2'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_3')['logo_3'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_3')['logo_4'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
      <div class="col">
        <?php
          $image = get_field('row_3')['logo_5'];
          if( $image ) {
            echo wp_get_attachment_image( $image );
          }
        ?>
      </div>
    </div>
  </div>
<?php endif ?>
