<?php
    $enable = get_field('enable_content_w/_right_side_img_cf');
    $title = get_field('content_w/_right_side_img_title');
    $paragraph = get_field('content_w/_right_side_img_paragraph');
    $link = get_field('content_w/_right_side_img_join_us_button');
    $picture = get_field('content_w/_right_side_img_picture');
    if($enable && $title && $paragraph && $link && $picture):
?>
<div class="container-fluid">
    <div class="row bg-secondary">
        <div class="col mt-4 mb-4 mr-4 ">
            <h4><?php echo $title ?> </h4>
            <p><?php echo $paragraph ?></p>
            <a type="button"
              href="<?php echo $link['url']; ?>"
              class="btn btn-outline-primary font-italic align-middle"
              target="<?php echo $link['target']; ?>">
            <?php echo $link['title']; ?>
            </a>
        </div>
        <div class="col">
            <div class="w-100 h-100 content-right-side-background-image" style="background-image: url('<?php the_field('content_w/_right_side_img_picture'); ?>')"></div>
        </div>
    </div>
</div>
<?php endif; ?>