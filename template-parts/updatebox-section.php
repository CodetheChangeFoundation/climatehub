<?php
/**
 * Climate Hub partners page supplementary updatebox section template
 * @package climatehub
 */


  if(get_field('enable_custom_field')): ?>
  <div class="container">
      <section>
          <div class="row m-3 w-100">
              <div class="col-12 col-md-8 p-3">
                  <?php if(get_field('title')): ?>
                   <h3><?php echo get_field('title') ?></h3>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_description') ): ?>
                   <p><?php echo get_field('project_description')?></p>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_image') ): ?>
                   <img src="<?php the_field('project_image'); ?>" />
                  <?php endif; ?>
                  
              </div>
          </div>
       </section>
  </div>                 
<?php endif; ?>

