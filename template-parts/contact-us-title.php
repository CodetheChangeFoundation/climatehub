<?php if( get_field("enable_contact_us_title") && get_field("contact_us_title") ): ?>
  <div class="row pt-5">
    <div class="col">
      <h1 class="font-weight-bold"><?php the_field("contact_us_title"); ?> </h1>
    </div>
  </div>
<?php endif; ?>