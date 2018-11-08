<?php if( get_field("enable_address_input") && get_field("address_input") ): ?>
  <div class="row">
    <div class="col">
      <p><?php the_field("address_input"); ?></p>
    </div>
  </div>
<?php endif; ?>