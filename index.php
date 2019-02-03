<?php get_header(); ?>
  <h1>This is my index.</h1>

  <div class="container">
    <?php get_template_part( 'template-parts/title' ); ?>
  </div>

  <div class="container">
    <?php get_template_part( 'template-parts/paragraph') ?>
  </div>

  <div class="container-fluid">
    <?php get_template_part( "template-parts/contact-us" ) ?>
    <?php get_template_part( "template-parts/address-title" ) ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/contact-us-button" ) ?>
  </div>

  </div class="jumbotron d-flex flex-column border border-primary justify-content-end align-content-start p-0">
    <?php get_template_part("template-parts/home-page-banner") ?>
  </div>

  <?php get_template_part( 'template-parts/partners-content-section' )?>
  <?php get_template_part( 'template-parts/updatebox-section' )?>
  <?php get_template_part( 'template-parts/about-us-title-paragraph' )?>

<?php get_footer(); ?>
