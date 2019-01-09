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

<!--melissa start !-->

<div class="containter">
<div class = "row">
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body bg-secondary">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <img class="card-img-bottom"src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="Card image cap">
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body bg-secondary">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <img class="card-img-bottom"src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="Card image cap">
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body bg-secondary">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <img class="card-img-bottom"src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="Card image cap">
    </div>
  </div>
</div>

</div>


<!-- melissa end !-->
<?php get_footer(); ?>
