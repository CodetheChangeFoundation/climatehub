<?php get_header(); ?>
  <h1>This is my index.</h1>

  <div class="container">
    <?php get_template_part( "template-parts/title" ); ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/paragraph") ?>
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
