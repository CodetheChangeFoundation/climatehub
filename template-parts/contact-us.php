<?php if( get_field("enable_contact_us") ): ?>

  <div class="row ml-3 pb-3">
    <div class="col md-6 pl-4 pt-4 bg-white">
      <h1 class="font-weight-bold"> Contact Us </h1>
      <?php if( get_field("enable_address_title") ): ?>
        <h3 class="font-weight-bold pt-3"> address </h3>
      <?php endif ?>
      <?php if( get_field("enable_address_input") && get_field("address_input") ): ?>
        </p> <?php the_field("address_input"); ?> </p>
      <?php endif; ?>
      <?php if( get_field("enable_phone_number") && get_field("phone_number")): ?>
        <h3 class="font-weight-bold pb-3"> phone: <?php the_field("phone_number"); ?></h3>
      <? endif; ?>
      <button type="button" class="btn btn-outline-primary font-weight-bold align-middle">Contact Us</button>
    </div>

    <div class="col md-6">
      <?php if( get_field("enable_map") && get_field("address_map") ): ?>
        <?php the_field("address_map"); ?>
      <?php else: ?>
        <h2> Map currently Not Available </h2>
      <?php endif; ?>
  </div>

<?php endif; ?>