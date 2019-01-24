<?php
 $enable = get_field('project_carousel_enable');
 $numrows = 0 ;
 $items = get_field('project_carousel_item');
 if($enable):
    while (have_rows('project_carousel_item')): the_row();
     $numrows++;
    endwhile;
 ?>

<?php if($items) : ?>
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
        <?php for($i = 0; $i<2; $i++){
            the_row();
            $current_row = $items[$i];
            $title = $current_row['project_title'];
		    $description = $current_row['project_description'];
		    $link = $current_row['project_link'];
            $image = $current_row['project_image'];

            if( $title && $description && $link && $image): ?>
    		    <div class="col-sm-4">
                    <a href="<?php echo $link; ?>" class="text-muted no-text-decoration">
                    <div class="card">
                        <div class="card-body bg-secondary">
                            <h5 class="card-title"><?php echo $title; ?> </h5>
                            <p class="card-text"><?php echo $description; ?></p>
                        </div>
                        <img class="card-img-bottom img-carousel" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                    </div>
                    </a>
                </div>
            <?php  endif; } ?>
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
<?php endif; ?>
