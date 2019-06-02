<?php
/**
 * Climate Hub 404 Page
 *
 * @package climatehub
 */

$link = get_field('404_page_button', 'option');
?>

<?php get_header(); ?>

  <div class="container my-5">
    <div class="row">
      <div class="col-12">
        <?php the_field('404_page_content', 'option'); ?>
        <div class="w-100 text-center mt-4">
          <a class="btn btn-outline-primary btn-lg" target="<?php echo $link['target']; ?>" href="<?php echo $link['url']; ?>"><?php echo $link['title'] ?></a>
        </div>
      </div>
    </div>
  </div>

<?php get_footer(); ?>
