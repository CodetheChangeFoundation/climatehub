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
  <div class="carousel-inner row">
    <div class="carousel-item col-md-4 active">
        <?php
        the_row();
        $current_row = $items[0];
        $title = $current_row['project_title'];
        $description = $current_row['project_description'];
        $link = $current_row['project_link'];
        $image = $current_row['project_image'];
        if( $title && $description && $link && $image): ?>
                <a href="<?php echo $link; ?>" class="text-muted no-text-decoration">
                <div class="card">
                    <div class="card-body bg-secondary">
                        <h5 class="card-title"><?php echo $title; ?> </h5>
                        <p class="card-text"><?php echo $description; ?></p>
                    </div>
                    <img class="card-img-bottom img-carousel" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                </div>
                </a>

        <?php endif; ?>
    </div>

        <?php for($i = 1; $i<$numrows; $i++){

            the_row();
            $current_row = $items[$i];
            $title = $current_row['project_title'];
		        $description = $current_row['project_description'];
		        $link = $current_row['project_link'];
            $image = $current_row['project_image'];
            if( $title && $description && $link && $image): ?>
            <div class="carousel-item col-md-4">
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
            <?php endif; } ?>

    </div>

  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
    <span class="sr-only">Next</span>
  </a>

</div>

<?php endif; ?>
<?php endif; ?>
