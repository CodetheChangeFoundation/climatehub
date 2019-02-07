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
    <!-- todo: add nav tabs for past/current -->
    <!-- todo: make enable options for each of the carousels, if "past" is empty or not enabled, do not show the link (and same for the rest of the carousels) -->
  <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
</div> -->
    <p> current </p> <p> past </p>
    <!-- todo! ask Viniel about this -->
    <?php $current = true;
     if($current):
      get_template_part( 'template-parts/projects-page-carousel-current' );
     else:
      get_template_part( 'template-parts/projects-page-carousel-past' );
     endif;
      ?>
  </div>

  <div class="container pt-4 pb-4">
    <h2 class="text-center"> featured projects from the community </h2>
    <?php get_template_part( 'template-parts/projects-page-carousel-featured' )?>
  </div>

  <div class="container pt-4 pb-4">
    <!-- todo: add style below to css -->
    <h2 class="text-center" style="text-decoration: underline;"> upcoming events in the community </h2>
    <?php get_template_part( 'template-parts/projects-page-carousel-upcoming' )?>
  </div>

<?php get_footer(); ?>
