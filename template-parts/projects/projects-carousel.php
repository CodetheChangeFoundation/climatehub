<?php
/**
 * Projects carousel
 *
 * @package climatehub
 */
?>

<?php function climatehub_create_card() {
  ob_start(); ?>
  <article id="post-<?php the_ID();?>" <?php post_class();?>>
    <a class="item d-flex bg-white justify-content-between text-body" target="<?php echo (get_field('post_behaviour') == 'link') ? get_field('post_link')['target'] : '_self'; ?>" href="<?php echo (get_field('post_behaviour') == 'link') ? get_field('post_link')['url'] : the_permalink() ?>">
      <div class="p-4">
        <h4 class="mb-0 font-weight-bold fade-line-ending"><?php the_title() ?></h4>
      </div>
      <?php if (get_the_post_thumbnail_url()): 
        $image_id = get_post_thumbnail_id();
        $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', TRUE);
        ?>
        <img class="card-img-top" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo $image_alt; ?>"/>
      <?php endif; ?>
    </a>
  </article>
  <?php return ob_get_clean();
}?>

<?php function climatehub_create_filter($suffix) {
  $all_tags = get_tags(array('fields' => 'ids'));
  $all_categories = get_categories(array('fields' => 'ids'));
  $category = get_sub_field('category'.$suffix);
  $tags = get_sub_field('tags'.$suffix);
  $filter = array('post_type'=>'post', 'category'=> $category, 'posts_per_page' => -1);
  $filter['category__not_in'] = array_diff($all_categories, array($category));
  if ($tags) {
    $filter['tag__and'] = $tags;
    $filter['tag__not_in'] = array_diff($all_tags, $tags);
  };
  return $filter;
}?>

<?php function climatehub_render_carousel($filter) {
  global $post;
  $filtered_posts = get_posts($filter);
  $output = '';
  if (!empty($filtered_posts)):
    $output .= '<div class="owl-carousel">';
      foreach ($filtered_posts as $post):
        setup_postdata($post);
         $output .= climatehub_create_card();
      endforeach;
      wp_reset_postdata();
     $output .= '</div>';
  endif;
  return $output;
}?>

<?php 
if (have_rows('carousel_configuration')):
  while (have_rows('carousel_configuration')): the_row(); ?>
    <div class="container pt-4">
      <?php if (get_row_layout() == 'single_carousel'): ?>
        
        <h3 class="pb-2 text-center"><ins><?php the_sub_field('title') ?></ins></h3>
        <?php echo climatehub_render_carousel(climatehub_create_filter('')) ?>

      <?php elseif (get_row_layout() == 'tabbed_carousel'): ?>

        <nav class="tabbed-carousel">
          <div class="nav justify-content-center pb-2" id="nav-tab" role="tablist">
            <a class="nav-item nav-link py-0 text-success active" id="nav-first-tab" data-toggle="tab" href="#nav-first" role="tab" aria-controls="nav-first" aria-selected="true">
              <h3><ins><?php the_sub_field('title_1') ?></ins></h3>
            </a>
            <a class="nav-item nav-link py-0 text-success" id="nav-second-tab" data-toggle="tab" href="#nav-second" role="tab" aria-controls="nav-second" aria-selected="false">
              <h3><ins><?php the_sub_field('title_2') ?></ins></h3>
            </a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-first" role="tabpanel" aria-labelledby="nav-first-tab">
            <?php echo climatehub_render_carousel(climatehub_create_filter('_1')) ?>
          </div>
          <div class="tab-pane fade" id="nav-second" role="tabpanel" aria-labelledby="nav-second-tab">
            <?php echo climatehub_render_carousel(climatehub_create_filter('_2')) ?>
          </div>
        </div>

      <?php endif; ?>
    </div>
  <?php endwhile; ?>
<?php endif; ?>