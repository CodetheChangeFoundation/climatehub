<?php if( get_field("about_us_custom_field") ): ?>
  <div class="row pt-5">
    <div class="col">
      <h1 class="font-weight-bold pl-5"><?php the_field("about_us_title"); ?> </h1>
      <p><?php the_field("about_us_paragraph"); ?> </p>
    </div>
  </div>
<?php endif; ?>
