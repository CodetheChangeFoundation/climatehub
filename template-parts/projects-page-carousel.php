<?php
 $enable = get_field('project_carousel_enable');

 if($enable):
  $numrows = 0 ;
  $items = get_field('project_carousel_item_current');
  while (have_rows('project_carousel_item_current')): the_row();
    $numrows++;
  endwhile; ?>
  <h1> <?php echo $numrows ?> </h1>

 <div id="projects-carousel" class="carousel slide projects-carousel" data-ride="carousel">
   <div class="carousel-inner row">
      <div class="carousel-item col-md-4 active">
        <?php
         the_row();
         $current_row = $items[0];
         $title = $current_row['project_title'];
         $link = $current_row['project_link'];
         $image = $current_row['project_image'];
         $description = $current_row['project_description'];
        //  if( $title && $link && $image): ?>
         <!-- make above line less restrictive (placeholder image, link)/warn user/put it in the docs -->
                 <a href="<?php echo $link; ?>" class="text-muted carousel-no-text-decoration">
                 <div class="card">
                   <div class="card-body">
                     <h5 class="card-title font-weight-bold"> <?php echo $title; ?></h5>
                     <?php if ($description): ?>
                     <p class="card-text"> <?php echo $description; endif; ?> </p>
                   </div>
                   <img class="card-img-bottom img-carousel" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                 </div>
                 </a>
         <!-- <?php
        //  endif; ?> -->
     </div>
         <?php for($i = 1; $i<$numrows; $i++){
             the_row();
             $current_row = $items[$i];
             $title = $current_row['project_title'];
             $link = $current_row['project_link'];
             $image = $current_row['project_image'];
             $description = $current_row['project_description'];
             if( $title && $link && $image): ?>
             <div class="carousel-item col-md-4">
                     <a href="<?php echo $link; ?>" class="text-muted carousel-no-text-decoration">
                     <div class="card">
                         <div class="card-body">
                             <h5 class="card-title font-weight-bold "><?php echo $title; ?> </h5>
                             <p class="card-text"><?php if($description): echo $description; endif;?></p>
                         </div>
                         <img class="card-img-bottom img-carousel" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                     </div>
                     </a>
             </div>
             <?php endif; } ?>
     </div>
   <!-- Left and right controls -->
   <a class="carousel-control-prev" href="#projects-carousel" data-slide="prev">
     <!-- <span class="carousel-control-prev-icon"></span> -->
     <span class="sr-only">Previous</span>
   </a>
   <a class="carousel-control-next" href="#projects-carousel" data-slide="next">
     <!-- <span class="carousel-control-next-icon"></span> -->
     <span class="sr-only">Next</span>
   </a>
 </div>

 <?php  endif; ?>
