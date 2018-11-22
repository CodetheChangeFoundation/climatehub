<?php if(get_field('enable_content_w/_right_side_img_cf')): ?>
<div class="container-fluid">
    <div class="row bg-secondary">
        <div class="col mt-4 mb-4 mr-4 ">
            <h4><?php the_field('content_w/_right_side_img_title') ?> </h4>
            <p><?php the_field('content_w/_right_side_img_paragraph') ?></p>
            <button type="button"
        href="<?php the_field('content_w/_right_side_img_join_us_button'); ?>"
        class="btn btn-outline-primary font-italic align-middle">join us</button>
        </div>
        <div class="col">
         <?php if( get_field('content_w/_right_side_img_picture') ): ?>
            <div class="w-100 h-100 content-right-side-background-image" style="background-image: url('<?php the_field('content_w/_right_side_img_picture'); ?>')"></div>
         <?php endif; ?>
        </div>
    </div>
</div>

<?php endif ?>