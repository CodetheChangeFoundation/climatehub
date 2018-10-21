<?php
/**
 * Climate Hub partners page supplementary content section template
 *
 * @package climatehub
 */

if( get_field('enable_partners_content_section') ): ?>
  <div class="container">
    <section>
      <div class="row m-3 w-100">
        <div class="col-12 col-md-8 p-3">
          <?php if( get_field('left_column_title') ): ?>
            <h3><?php the_field('left_column_title')?></h3>
          <?php endif ?>

          <?php if( get_field('left_column_paragraph') ): ?>
            <p><?php the_field('left_column_paragraph')?></p>
          <?php endif ?>
        </div>
        <div class="col-12 col-md-4 p-3">
          <?php if( get_field('right_column_title') ): ?>
            <h3><?php the_field('right_column_title')?></h3>
          <?php endif ?>

          <?php if( get_field('right_column_paragraph') ): ?>
            <p><?php the_field('right_column_paragraph')?></p>
          <?php endif ?>
        </div>
      </div>
    </section>
  </div>
<?php endif ?>
