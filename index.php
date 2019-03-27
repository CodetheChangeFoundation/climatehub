<?php get_header(); ?>
  <!-- Global -->
  <div class="container">
    <?php get_template_part( 'template-parts/global/title' ); ?>
    <?php get_template_part( 'template-parts/global/paragraph') ?>
  </div>

  <!-- Home Page -->
  <?php get_template_part('template-parts/home/home-page-banner') ?>
  <?php get_template_part('template-parts/home/home-asset-map') ?>
  <?php get_template_part('template-parts/home/content-right-side-img') ?>
  <?php get_template_part('template-parts/home/updatebox-section') ?>

  <!-- About Page -->
  <?php get_template_part( 'template-parts/about/about-us-title-paragraph' )?>

  <!-- Partners Page -->
  <?php get_template_part( 'template-parts/partners/partners-content-section' )?>

  <!-- Contact Page -->
  <div class="container">
    <?php get_template_part( "template-parts/contact-us" ) ?>
    <?php get_template_part( "template-parts/address-title" ) ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/contact-us-button" ) ?>
  </div>

<?php get_footer(); ?>
