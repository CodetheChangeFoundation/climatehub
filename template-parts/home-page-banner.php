<?php if( get_field("enable_home_page_title") && get_field("home_page_title")
          && get_field("home_page_image") ): ?>

  <div class="row ml-4 mr-4 pb-4 home-page-banner" style="background-image: url('<?php the_field('home_page_image'); ?>')" >

    <div class="col md-6">
      <div class ="home-page-banner-bottom-left pl-4">
        <h4 class="font-weight-bold text-white overlay w-50 bg-dark pl-3 pr-3 pb-3 pt-3"> <?php the_field("home_page_title"); ?> </h4>
        <?php if( get_field("enable_home_page_text") && get_field("home_page_text") ): ?>
          <p class="pl-3 pr-3 pb-3 pt-3 home-page-banner-width-paragraph bg-light"> <?php echo get_field("home_page_text", false, false); ?> </p>
        <?php endif; ?>

        <?php if( get_field("home_page_button_enable") && get_field("home_page_button_text") && get_field("home_page_button_link") ): ?>
          <a role="button" href="<?php echo the_field("home_page_button_link"); ?>" class="btn btn-outline-primary font-italic align-middle"> <?php the_field("home_page_button_text")?> </a>
        <?php endif; ?>
      </div>
    </div>

  </div>

<?php endif; ?>