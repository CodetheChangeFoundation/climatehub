<?php
/**
 * Climate Hub Single Post Page
 *
 * @package climatehub
 */
?>

<?php function climatehub_blog_post_content_wrapper($content, $classes) {
  ob_start(); ?>
  <div class="container my-3">
    <div class="row">
      <div class="<?php echo $classes ?>">
        <?php echo $content ?>
      </div>
    </div>
  </div>
  <?php return ob_get_clean();
}?>

<?php get_header();?>

<?php
if (have_rows('post_content')):
  while (have_rows('post_content')): the_row();
    if (get_row_layout() == 'header'):
      $content = '<h1><strong>' . get_sub_field('title') . '</strong> ' . get_sub_field('subtitle') . '</h1>';
      echo climatehub_blog_post_content_wrapper($content, 'col-12 pt-4');
      echo climatehub_blog_post_content_wrapper(get_sub_field('excerpt'), 'col-12 col-md-8 m-auto');
    elseif (get_row_layout() == 'paragraph'):
      $placement = get_sub_field('gutter_image_placement'); 
      $image = get_sub_field('image'); ?>
      <div class="container my-3">
        <div class="row">
          <div class="col-12 col-md-8 mr-auto offset-md-2 <?php if ($placement == 'left') { echo 'offset-lg-0'; } ?>">
            <?php the_sub_field('text'); ?>
          </div>
          <?php if ($placement != 'none'): ?>
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 pt-2 m-auto m-lg-0 d-flex align-items-center justify-content-center flex-column <?php if ($placement == 'left') { echo 'order-lg-first'; } ?>">
              <img class="img-fluid blog-gutter-image" src="<?php echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>">
              <figcaption class="figure-caption <?php if ($placement == 'right') { echo 'text-lg-right'; } ?>"><?php echo $image['caption'] ?></figcaption>
            </div>
          <?php endif; ?>
        </div>
      </div>
    <?php elseif (get_row_layout() == 'featured_text'):
      $content = '<div class="border-left border-dark bg-grey px-4 pt-4 pb-2">' . get_sub_field('text') . '</div>';
      echo climatehub_blog_post_content_wrapper($content, 'col-12 col-md-8 mx-auto');
    elseif (get_row_layout() == 'section_title'):
      $content = '<h1>' . get_sub_field('title') . '</h1>';
      echo climatehub_blog_post_content_wrapper($content, 'col-12 col-md-10 pt-4 mx-auto');
    elseif (get_row_layout() == 'full_width_image'):
      $image = get_sub_field('image'); ?>
      <div class="container-fluid my-3">
        <div class="row">
          <img class="full-width-image" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
          <div class="col-12">
            <figcaption class="figure-caption text-right pt-2"><?php echo $image['caption'] ?></figcaption>
          </div>
        </div>
      </div>
    <?php elseif (get_row_layout() == 'large_image'):
      $image = get_sub_field('image');
      $content = '<img class="img-fluid img-cover" src="' . $image['url'] . '" alt="' . $image['alt'] . '"/>';
      $content .= '<figcaption class="figure-caption text-right pt-2">' . $image['caption'] . '</figcaption>';
      echo climatehub_blog_post_content_wrapper($content, 'col-12 col-md-8 mx-auto');
    elseif (get_row_layout() == 'call_to_action'):
      $button = get_sub_field('button_link');
      $content = '<h3 class="font-weight-bold">' . get_sub_field('title') . '</h3>';
      $content .= '<p>' . get_sub_field('summary') . '</p>';
      $content .= '<a class="btn btn-outline-primary align-self-center" href="' . $button['url'] . '" role="button" target="' . $button['target'] . '">' . $button['title'] . '</a>';
      echo climatehub_blog_post_content_wrapper($content, 'col-10 col-md-5 col-lg-4 col-xl-3 p-4 mx-auto my-3 bg-white text-dark d-flex flex-column');
    elseif (get_row_layout() == 'footer'):
      $content = '<div class="pt-3 border-top border-dark">' . get_sub_field('text') . '</div>';
      echo climatehub_blog_post_content_wrapper($content, 'col-12 col-md-8 mx-auto');
    endif;
  endwhile;
endif;
?>

<?php get_footer();?>
