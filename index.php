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
  <?php get_template_part("template-parts/about/team-grid")?>
  <?php get_template_part("template-parts/about/board-of-directors-grid")?>

  <!-- Partners Page -->
  <?php get_template_part( 'template-parts/partners/partners-grid' )?>
  <?php get_template_part( 'template-parts/partners/partners-content-section' )?>

  <!-- Contact Page -->
  <?php get_template_part( "template-parts/contact-us" ) ?>
  <?php get_template_part( "template-parts/address-title" ) ?>
  <?php get_template_part( "template-parts/contact-us-button" ) ?>

  <div class="container pt-4 pb-4">
    <div id="toggle-past-current" class="text-center">
      <h2>
        <a href="?link=current"> current</a>
        <a href="?link=past">past</a>
      </h2>
      <?php $link=$_GET['link'];
      if($link == 'past'){
        get_template_part( 'template-parts/projects-page-carousel-past' );
      } else{
        get_template_part( 'template-parts/projects-page-carousel-current' );
      } ?>
    </div>
    <!-- todo! enqueue both current and past carousels before clicking hyperlink -->
    <!-- todo! remove project_carousel_currentpast_toggle -->
    <!-- todo! add image restriction for update carousel DONE -->
    <!-- todo! make it not a carousel, hardcode it? -->

  </div>

  <div class="container pt-4 pb-4">
    <h2 class="text-center" style="text-decoration: underline;"> featured projects from the community </h2>
    <?php get_template_part( 'template-parts/projects-page-carousel-featured' )?>
  </div>

  <div class="container pt-4 pb-4">
    <!-- todo: add style below to css -->
    <h2 class="text-center" style="text-decoration: underline;"> upcoming events in the community </h2>
    <?php get_template_part( 'template-parts/projects-page-carousel-upcoming' )?>
  </div>

<?php get_footer(); ?>
