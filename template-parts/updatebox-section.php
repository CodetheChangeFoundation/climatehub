<?php
/**
 * Climate Hub partners page supplementary updatebox section template
 * @package climatehub
 */


  if(get_field('enable_custom_field')): ?>
    <div class="container">
      <section>
        <div class="row">
          <div class="col-sm">
                  <?php if(get_field('title')): ?>
                   <h2><?php echo get_field('title') ?></h2>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_description') ): ?>
                   <p><?php echo get_field('project_description')?></p>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_image') ): ?>
                   <img src="<?php echo get_field('project_image')['url']; ?>" class="img-fluid"/>
                  <?php endif; ?>   
            </div>
        
            
            <div class="col-sm">
                  <?php if(get_field('title')): ?>
                   <h2><?php echo get_field('title') ?></h2>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_description') ): ?>
                   <p><?php echo get_field('project_description')?></p>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_image') ): ?>
                    <img src="<?php echo get_field('project_image')['url']; ?>" class="img-fluid"/>
                  <?php endif; ?>
             </div>  
            
            
             <div class="col-sm">
                  <?php if(get_field('title')): ?>
                   <h2><?php echo get_field('title') ?></h2>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_description') ): ?>
                   <p><?php echo get_field('project_description')?></p>
                  <?php endif; ?>
                  
                  <?php if( get_field('project_image') ): ?>
                    <img src="<?php echo get_field('project_image')['url']; ?>" class="img-fluid"/>
                  <?php endif; ?>     
             </div> 
            
          </div>
       </section>
     </div>

<?php endif; ?>