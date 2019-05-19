<?php
/**
 * Climate Hub Index
 *
 * @package climatehub
 */
?>

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
  <?php get_template_part( 'template-parts/about/highlightedSection' )?>
  <?php get_template_part( 'template-parts/about/team-grid' )?>
  <?php get_template_part( 'template-parts/about/board-of-directors-grid' )?>

  <!-- Partners Page -->
  <?php get_template_part( 'template-parts/partners/partners-grid' )?>

  <!-- Projects Page -->
  <?php get_template_part('template-parts/projects/projects-carousel')?>
  <?php get_template_part('template-parts/projects/featured-projects-carousel')?>
  <?php get_template_part('template-parts/projects/events-carousel')?>

  <!-- Contact Page -->
  <?php get_template_part( 'template-parts/contact-us/contact-us' ) ?>
  <?php get_template_part( 'template-parts/contact-us/contact-us-banner' )?>


<?php get_footer(); ?>
