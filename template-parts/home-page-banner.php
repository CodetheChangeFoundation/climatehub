<?php if( get_field("enable_banner") ): ?>

  <div class="row ml-4 mr-4 pb-4 home-page-banner" style="background-image: url('<?php the_field('banner_image')['url']; ?>')" >

    <div class="col md-6">
      <div class ="home-page-banner-bottom-left pl-4">
        <?php if( get_field("homepage_title") ): ?>
          <h4 class="font-weight-bold text-white overlay w-50 bg-dark pl-3 pr-3 pb-3 pt-3"> 
            <?php the_field("homepage_title"); ?> 
          </h4>
        <?php endif; ?>

        <?php if( get_field("homepage_paragraph") ): ?>
          <p class="pl-3 pr-3 pb-3 pt-3 w-50 bg-light"> <?php echo get_field("homepage_paragraph", false, false); ?> </p>
        <?php endif; ?>

        <?php if( get_field("homepage_button") ): ?>
          <a role="button" href="<?php echo the_field("homepage_button")['url']; ?>" class="btn btn-outline-primary font-italic align-middle"> 
            <?php the_field("homepage_button")['title']; ?> 
          </a>
        <?php endif; ?>
      </div>
    </div>

  </div>

<?php endif; ?>