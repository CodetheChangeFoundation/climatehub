<?php if( get_field("enable_home_page_title") && get_field("home_page_title")
          && get_field("home_page_image") ): ?>

  <div class="row ml-4 mr-4 pb-4" style="background-image: url('<?php the_field('home_page_image'); ?>')" >

    <div class="col pl-4 md-6 align-self-end">
      <h4 class="font-weight-bold text-white overlay mt-5"> <?php the_field("home_page_title"); ?> </h4>
      <?php if( get_field("enable_home_page_text") && get_field("home_page_text") ): ?>
        <p class="text-white pt-3"> <?php echo get_field("home_page_text", false, false); ?> </p>
      <?php endif; ?>

      <button type="button" class="btn btn-outline-primary font-weight-bold align-middle">Join Us</button>
    </div>

    <div class="col md-6">
    </div>

  </div>

<?php endif; ?>