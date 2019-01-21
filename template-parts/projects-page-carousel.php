<?php
 $enable = get_field('enable_projects_carousel');
 $title1 = get_field('project_carousel_project_title');
 $description1 = get_field('project_carousel_project_description');

 if($enable && $title1 && $description1): ?>


<div id="demo" class="carousel slide" data-ride="carousel">

  <!-- Indicators -->
  <ul class="carousel-indicators carousel-indicators-active carousel-indicators-dark">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>

  <!-- The slideshow -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class = "container row">
        <?php $max = 3; for($i = 0; $i<$max; $i++){ ?>
        <div class="col-sm-4">
          <a href="#" class="text-muted no-text-decoration">
          <div class="card">
            <div class="card-body bg-secondary">
              <h5 class="card-title"><?php echo $title1; ?> </h5>
              <p class="card-text"><?php echo $description1; ?></p>
            </div>
          <img class="card-img-bottom img-carousel" src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="Card image cap">
          </div>
          </a>
        </div>
        <?php } ?>
      </div>
    </div>
    <div class="carousel-item">
      <div class = "container row">
        <?php $max = 3; for($i = 0; $i<$max; $i++){ ?>
        <div class="col-sm-4">
          <a href="#" class="text-muted no-text-decoration">
          <div class="card">
            <div class="card-body bg-secondary">
              <h5 class="card-title"><?php echo $title1; ?> </h5>
              <p class="card-text"><?php echo $description1; ?></p>
            </div>
          <img class="card-img-bottom img-carousel" src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="Card image cap">
          </div>
          </a>
        </div>
        <?php } ?>
      </div>
    </div>
    <div class="carousel-item">
      <div class="containter row">
        <?php $max = 3; for($i = 0; $i<$max; $i++){ ?>
        <div class="col-sm-4">
          <a href="#" class="text-muted no-text-decoration">
          <div class="card">
            <div class="card-body bg-secondary">
              <h5 class="card-title"><?php echo $title1; ?> </h5>
              <p class="card-text"><?php echo $description1; ?></p>
            </div>
            <img class="card-img-bottom img-carousel" src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="Card image cap">
          </div>
          </a>
        </div>
        <?php } ?>
      </div>
    </div>
  </div>

  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <!-- <span class="carousel-control-prev-icon"></span> -->
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <!-- <span class="carousel-control-next-icon"></span> -->
  </a>

</div>

    <?php endif; ?>