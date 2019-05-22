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
    <a class="item d-flex bg-white justify-content-between text-body" href="<?php the_permalink();?>">
      <div class="p-4">
        <h4 class="mb-0 font-weight-bold fade-line-ending"><?php the_title() ?></h4>
      </div>
      <?php if (get_the_post_thumbnail_url()): ?>
        <img class="card-img-top" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="Card image cap"/>
      <?php endif; ?>
    </a>
  </article>
  <?php return ob_get_clean();
}?>

<?php 
if (have_rows('carousel_configuration')):
  $all_tags = get_tags(array('fields'=>'ids'));
  while (have_rows('carousel_configuration')): the_row(); ?>
    <div class="container pt-4">
      <div class="row">
        <div class="col-12">
          <?php if (get_row_layout() == 'single_carousel'):
            $title = get_sub_field('title');
            $category = get_sub_field('category');
            $filter = array('post_type'=>'post', 'category'=> $category, 'posts_per_page' => -1);
            if (get_sub_field('tags')) {
              $filter['tag__and'] = get_sub_field('tags');
              $filter['tag__not_in'] = array_diff($all_tags, get_sub_field('tags'));
            };
            $filtered_posts = get_posts($filter);
            ?>

              <h3 class="pb-2 text-center"><ins><?php echo $title ?></ins></h3>
              <?php if (!empty($filtered_posts)): ?>
                <div class="scrolling-wrapper">
                  <?php foreach ($filtered_posts as $post):
                    setup_postdata($post);
                    echo climatehub_create_card();
                  endforeach;
                  wp_reset_postdata();?>
                </div>
              <?php endif;?>

          <?php elseif (get_row_layout() == 'tabbed_carousel'):
            
            $title_1 = get_sub_field('title_1');
            $category_1 = get_sub_field('category_1');
            $filter_1 = array('post_type' => 'post', 'category' => $category_1, 'posts_per_page' => -1);
            if (get_sub_field('tags_1')) {
              $filter_1['tag__and'] = get_sub_field('tags_1');
              $filter_1['tag__not_in'] = array_diff($all_tags, get_sub_field('tags_1'));
            };
            $filtered_posts_1 = get_posts($filter_1);

            $title_2 = get_sub_field('title_2');
            $category_2 = get_sub_field('category_2');
            $filter_2 = array('post_type' => 'post', 'category' => $category_2, 'posts_per_page' => -1);
            if (get_sub_field('tags_2')) {
              $filter_2['tag__and'] = get_sub_field('tags_2');
              $filter_2['tag__not_in'] = array_diff($all_tags, get_sub_field('tags_2'));
            };
            $filtered_posts_2 = get_posts($filter_2);
            ?>

            <nav class="tabbed-carousel">
              <div class="nav justify-content-center pb-2" id="nav-tab" role="tablist">
                <a class="nav-item nav-link py-0 text-success active" id="nav-first-tab" data-toggle="tab" href="#nav-first" role="tab" aria-controls="nav-first" aria-selected="true">
                  <h3><ins><?php echo $title_1 ?></ins></h3>
                </a>
                <a class="nav-item nav-link py-0 text-success" id="nav-second-tab" data-toggle="tab" href="#nav-second" role="tab" aria-controls="nav-second" aria-selected="false">
                  <h3><ins><?php echo $title_2 ?></ins></h3>
                </a>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-first" role="tabpanel" aria-labelledby="nav-first-tab">
                <?php if (!empty($filtered_posts_1)): ?>
                  <div class="scrolling-wrapper">
                    <?php foreach ($filtered_posts_1 as $post):
                      setup_postdata($post);
                      echo climatehub_create_card();
                    endforeach;
                    wp_reset_postdata(); ?>
                  </div>
                <?php endif; ?>
              </div>
              <div class="tab-pane fade" id="nav-second" role="tabpanel" aria-labelledby="nav-second-tab">
                <?php if (!empty($filtered_posts_2)): ?>
                  <div class="scrolling-wrapper">
                    <?php foreach ($filtered_posts_2 as $post):
                      setup_postdata($post);
                      echo climatehub_create_card();
                    endforeach;
                    wp_reset_postdata();?>
                  </div>
                <?php endif;?>
              </div>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  <?php endwhile; ?>
<?php endif; ?>