<?php
 $enable = get_field('project_carousel_enable');

 if($enable):
  $numrows = 0 ;
  $items = get_field('project_carousel_item_featured');
  while (have_rows('project_carousel_item_featured')): the_row();
    $numrows++;
  endwhile; ?>

 <div id="projects-carousel" class="carousel slide projects-carousel" data-ride="carousel">
   <div class="carousel-inner row">
      <div class="carousel-item col-md-4 active">
        <?php
         the_row();
         $current_row = $items[0];
         $title = $current_row['project_title'];
         $link = $current_row['project_link'];
         $image = $current_row['project_image']; ?>
                 <a href="<?php echo $link; ?>" class="text-muted carousel-no-text-decoration">
                 <div class="card carousel-card-no-border">
                   <div class="card-body" style="height: 6.5rem; ">
                     <h5 class="card-title font-weight-bold"> <?php echo $title; ?></h5>

                   </div>
                   <img class="card-img-bottom img-carousel" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                 </div>
                 </a>


     </div>
         <?php for($i = 1; $i<$numrows; $i++){
             the_row();
             $current_row = $items[$i];
             $title = $current_row['project_title'];
             $link = $current_row['project_link'];
             $image = $current_row['project_image'];

             if( $title && $link && $image): ?>
             <div class="carousel-item col-md-4">
                     <a href="<?php echo $link; ?>" class="text-muted carousel-no-text-decoration">
                     <div class="card carousel-card-no-border">
                         <div class="card-body" style="height: 6.5rem; ">
                             <h5 class="card-title font-weight-bold "><?php echo $title; ?> </h5>
                             </div>
                         <img class="card-img-bottom img-carousel" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                     </div>
                     </a>
             </div>
             <?php endif; } ?>
     </div>
   <!-- Left and right controls -->
   <a class="carousel-control-prev" href="#projects-carousel" data-slide="prev">
    <?php if($numrows>3): ?><span class="carousel-control-prev-icon"><?php endif; ?></span>
    <span class="sr-only">Previous</span>
   </a>
   <a class="carousel-control-next" href="#projects-carousel" data-slide="next">
    <?php if($numrows>3): ?>
    <span class="carousel-control-next-icon"><?php endif; ?></span>
    <span class="sr-only">Next</span>
   </a>
 </div>

 <?php  endif; ?>
