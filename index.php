<?php get_header(); ?>
  <h1>This is my index.</h1>

  <div class="container">
    <?php get_template_part( "template-parts/title" ); ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/paragraph") ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/contact-us-title" ) ?>
    <?php get_template_part( "template-parts/address" ) ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/address-input" ) ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/phone" ) ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/contact-us-button" ) ?>
  </div>

  <div class="container">
    <?php get_template_part("template-parts/address-map") ?>
  </div>

  <?php get_template_part( 'template-parts/partners-content-section' )?>
  <?php get_template_part( 'template-parts/updatebox-section' )?>
<?php get_footer(); ?>
