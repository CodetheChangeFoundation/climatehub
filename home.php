<?php
/**
 * Climate Hub Blog Page
 *
 * @package climatehub
 */
?>

<?php get_header(); ?>

<?php
$id = get_option('page_for_posts');
$title = get_field("enable_title", $id) && get_field("title", $id);
$paragraph = get_field("enable_paragraph", $id) && get_field("paragraph", $id);
if ($title || $paragraph): ?>

  <div class="container">
    <div class="row pt-5">
      <div class="col-12">
        <?php if($title): ?>
          <h1 class="font-weight-bold pl-5"><?php the_field("title", $id); ?> </h1>
        <?php endif; ?>
      </div>
      <div class="col-12 col-md-8 m-auto">
        <?php if($paragraph): ?>
          <?php the_field("paragraph", $id); ?>
        <?php endif; ?>
      </div>
    </div>
  </div>

<?php endif; ?>

<?php if (have_posts()): ?>
  <div class="container mb-4">
    <div class="row row">
      <?php while (have_posts()): the_post(); ?>
        <div class="col-12 col-md-6 col-lg-4 mt-4">
          <a class="item d-flex bg-white justify-content-between text-body m-auto" target="<?php echo (get_field('post_behaviour') == 'link') ? get_field('post_link')['target'] : '_self'; ?>" href="<?php echo (get_field('post_behaviour') == 'link') ? get_field('post_link')['url'] : the_permalink() ?>">
            <div class="blog-card-content">
              <h4 class="font-weight-bold"><?php the_title() ?></h4>
                <?php 
                if (have_rows('post_content')):
                  while (have_rows('post_content')): the_row();
                    if (get_row_layout() == 'header'):
                      echo '<p>' . strip_tags(get_sub_field('excerpt'), '<br><em><strong><b><i>') . '</p>';
                    endif;
                  endwhile;
                endif; 
                ?>
            </div>
            <?php if (get_the_post_thumbnail_url()): 
              $image_id = get_post_thumbnail_id();
              $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', TRUE);
              ?>
              <img class="blog-card-img" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo $image_alt; ?>"/>
            <?php endif; ?>
          </a>
        </div>
      <?php endwhile; ?>
    </div>

    <div class="row">
      <div class="col-12">
        <nav aria-label="Blog page navigation">
          <?php
            global $wp_query;
            $current = max( 1, absint( get_query_var( 'paged' ) ) );
            $pagination = paginate_links( array(
              'base' => str_replace( PHP_INT_MAX, '%#%', esc_url( get_pagenum_link( PHP_INT_MAX ) ) ),
              'format' => '?paged=%#%',
              'current' => $current,
              'total' => $wp_query->max_num_pages,
              'type' => 'array',
              'prev_text' => '&laquo;',
              'next_text' => '&raquo;',
            ) ); ?>
          <?php if ( ! empty( $pagination ) ) : ?>
            <ul class="pagination justify-content-center mt-4 mb-0">
              <?php if ( strpos(htmlspecialchars($pagination[0]), 'laquo') === false ) : ?>
                <li class="page-item disabled">
                  <span class="page-numbers">&laquo;</span>
                </li>
              <?php endif; ?>
              <?php foreach ( $pagination as $key => $page_link ) : ?>
                <li class="page-item<?php if ( strpos( $page_link, 'current' ) !== false ) { echo ' active'; } ?>"><?php echo $page_link ?></li>
              <?php endforeach; ?>
              <?php if ( strpos(htmlspecialchars(end($pagination)), 'raquo') === false ) : ?>
                <li class="page-item disabled">
                  <span class="page-numbers">&raquo;</span>
                </li>
              <?php endif; ?>
            </ul>
          <?php endif ?>
        </nav>
      </div>
    </div>
  </div>

<?php endif; ?>
<?php get_footer(); ?>
