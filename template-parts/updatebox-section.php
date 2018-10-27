<?php
/**
 * Climate Hub partners page supplementary updatebox section template
 * @package climatehub
 */

if(get_field('update_box_enable_custom_field')): ?>
<div class="container">
    <div class="row">
        <div class="col-12 col-md-4">
            <?php if(get_field('update_box_title')): ?>
            <h2><?php echo get_field('update_box_title') ?></h2>
            <?php endif; ?>
            
            <?php if( get_field('update_box_description') ): ?>
            <p><?php echo get_field('update_box_description')?></p>
            <?php endif; ?>
                  
            <?php if( get_field('update_box_image') ): ?>
            <img src="<?php echo get_field('update_box_image')['url']; ?>" class="img-fluid"/>
            <?php endif; ?>
        </div>
        
        <div class="col-12 col-md-4">
            <?php if(get_field('update_box_title')): ?>
            <h2><?php echo get_field('update_box_title') ?></h2>
            <?php endif; ?>
                  
            <?php if( get_field('update_box_description') ): ?>
            <p><?php echo get_field('update_box_description')?></p>
            <?php endif; ?>
                  
            <?php if( get_field('update_box_image') ): ?>
            <img src="<?php echo get_field('update_box_image')['url']; ?>" class="img-fluid"/>
            <?php endif; ?>
        </div>  
        
        <div class="col-12 col-md-4">
            <?php if(get_field('update_box_title')): ?>
            <h2><?php echo get_field('update_box_title') ?></h2>
            <?php endif; ?>
            
            <?php if( get_field('update_box_description') ): ?>
            <p><?php echo get_field('update_box_description')?></p>
            <?php endif; ?>
            
            <?php if( get_field('update_box_image') ): ?>
            <img src="<?php echo get_field('update_box_image')['url']; ?>" class="img-fluid"/>
            <?php endif; ?>     
        </div> 
    </div>
</div>
<?php endif; ?>