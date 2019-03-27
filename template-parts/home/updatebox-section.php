<?php
/**
 * Climate Hub partners page supplementary updatebox section template
 * @package climatehub
 */

if (get_field('enable_update_boxes')): ?>
<div class="container">
    <div class="row">
        <?php if( have_rows('update_box') ): ?>
            <?php while ( have_rows('repeater_field_name') ) : the_row(); ?>
                <div class="col-12 col-md-4">
                    <?php if (get_sub_field('title')): ?>
                        <h2><?php echo the_sub_field('title') ?></h2>
                    <?php endif; ?>
                    
                    <?php if (get_sub_field('paragraph') ): ?>
                        <p><?php echo the_sub_field('paragraph')?></p>
                    <?php endif; ?>
                        
                    <img src="<?php echo the_sub_field('image')['url']; ?>" class="img-fluid"/>
                </div>
            <?php endwhile; ?>
        <?php endif; ?>
    </div>
</div>
<?php endif; ?>