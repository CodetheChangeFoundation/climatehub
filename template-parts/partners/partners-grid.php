<?php
/**
 * Climate Hub partners page grid template
 *
 * @package climatehub
 */

if( get_field('enable_partners_grid') ):
  if( have_rows('partner_grids') ):
    $grid_num = 1;
    while ( have_rows('partner_grids') ) : the_row();?>
      <div class="container">
        <div class="row pt-5">
          <div class="col">
            <h2 class="font-weight-bold pl-5"><?php the_sub_field("grid_title"); ?> </h2>
          </div>
        </div>
        <div class="partner-grid-container">
          <?php 
            if( have_rows('partners_grid') ):
              $count = 1;
              while ( have_rows('partners_grid') ) : the_row();
                $gridRow = get_sub_field('grid_row');
                $numImages = sizeof($gridRow);
                for($logo=1; $logo<=$numImages; $logo++):
                  $image = $gridRow['image_'.$logo];
                  $partnerId = 'partner-content-'.$grid_num.'-'.$count; ?>
                  <?php if ($image): ?>
                    <a class="btn btn-link p-0 border-0" data-toggle="collapse" data-target="#<?php echo $partnerId ?>" aria-expanded="false" aria-controls="<?php echo $partnerId ?>">
                      <div class="partner-image background-image my-3" style="background-image: url('<?php echo $image['url'] ?>')"></div>
                    </a>
                    <div class="partner-content collapse" id="<?php echo $partnerId ?>">
                      <div class="container bg-white">
                        <div class="row">
                          <a class="close-icon text-primary btn btn-link font-weight-light" role="button">&times;</a>
                          <div class="col-12 col-md-8 p-4">
                            <h3 class="mr-5"><?php echo $image['title'] ?></h3>
                            <p><?php echo $image['description'] ?></p>
                          </div>
                          <div class="col-12 col-md-4 p-4">
                            <h3>Links</h3>
                            <a href="<?php echo get_post_meta($image['id'], '_link_one_url', true);?>"><?php echo get_post_meta($image['id'], '_link_one_text', true); ?></a>
                            <br/>
                            <a href="<?php echo get_post_meta($image['id'], '_link_two_url', true);?>"><?php echo get_post_meta($image['id'], '_link_two_text', true); ?></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  <?php else: ?>
                    <div class="partner-image d-none d-md-block"></div>
                  <?php endif;
                  $count++;
                endfor;
              endwhile;
            endif;
          ?>
        </div>
      </div>
      <?php $grid_num++; endwhile ?>
  <?php endif ?>
<?php endif ?>
