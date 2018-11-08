<?php if( get_field("enable_address") && get_field("address_title") ): ?>
  <div class="row pt-5">
    <div class="col">
      <h1 class="font-weight-bold"><?php the_field("address_title"); ?> </h1>
    </div>
  </div>
<?php endif; ?>