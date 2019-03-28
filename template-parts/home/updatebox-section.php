<?php
/**
 * Climate Hub partners page supplementary updatebox section template
 * @package climatehub
 */

if (get_field('enable_update_boxes')): ?>
<div class="container">
    <div class="row justify-content-center">
        <?php if( have_rows('update_box') ): ?>
            <?php while ( have_rows('update_box') ) : the_row(); ?>
                <div class="col-12 col-md-6 col-lg-4 mt-4">
                    <div class="bg-white">
                        <div class="px-3 pt-3">
                            <?php if (get_sub_field('title')): ?>
                                <h2><?php echo the_sub_field('title') ?></h2>
                            <?php endif; ?>
                            <?php if (get_sub_field('paragraph') ): ?>
                                <p><?php echo the_sub_field('paragraph')?></p>
                            <?php endif; ?>
                        </div>
                        <?php if (get_sub_field('paragraph') ): ?>
                            <img src="<?php echo get_sub_field('image')['url']; ?>" class="img-fluid"/>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php endif; ?>
    </div>
</div>
<?php endif; ?>