<?php get_header(); ?>
  <h1>Index</h1>

  <div class="container">
    <?php get_template_part( "template-parts/title" ); ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/paragraph") ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/highlightedSection") ?>
    <?php get_template_part("template-parts/content-right-side-img") ?>
  </div>

  <div class="containter">
    <?php get_template_part("template-parts/content-right-side-img") ?>
  </div>


<?php get_footer(); ?>

<?php get_template_part( 'template-parts/partners-content-section' )?>



