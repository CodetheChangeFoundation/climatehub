<?php if( get_field("enable_phone") && get_field("phone") ): ?>
  <div class="row">
    <div class="col">
      <h1 class="font-weight-bold"><?php the_field("phone"); ?> </h1>
    </div>
  </div>
<?php endif; ?>