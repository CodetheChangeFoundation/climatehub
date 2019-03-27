<?php
/**
 * Climate Hub partners page grid template
 *
 * @package climatehub
 */

if( get_field('enable_partners_grid') ): ?>
  <div class="container">
    <div class="row">
      <?php 
        if( have_rows('partners_grid') ):
          while ( have_rows('partners_grid') ) : the_row();
            $gridRow = get_sub_field('grid_row');
            $numImages = sizeof($gridRow);
            for($logo=1; $logo<=$numImages; $logo++):
              $image = $gridRow['image_'.$logo]; ?>
              <?php if ($image): ?>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 custom-col-xl-2-4 mb-5">
                  <div class="partner-logo-container m-auto">
                    <a href="<?php echo $image['url'] ?>">
                      <div class="partner-logo" style="background-image: url('<?php echo $image['url'] ?>')"></div>
                    </a>
                  </div>
                </div>
              <?php else: ?>
                <div class="d-none d-md-flex col-md-4 col-lg-3 custom-col-xl-2-4 mb-5">
                  <div class="partner-logo-container m-auto">
                    <a href="<?php echo $image['url'] ?>">
                      <div class="partner-logo" style="background-image: url('<?php echo $image['url'] ?>')"></div>
                    </a>
                  </div>
                </div>
              <?php endif;
            endfor;
          endwhile;
        endif;
      ?>
    </div>
  </div>
<?php endif ?>
