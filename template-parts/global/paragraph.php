<?php
/**
 * Climate Hub global paragraph template
 *
 * @package climatehub
 */

if( get_field("enable_paragraph") && get_field("paragraph") ): ?>
  <div class="row">
    <div class="col-12 col-md-8 m-auto">
      <p><?php the_field("paragraph"); ?></p>
    </div>
  </div>
<?php endif; ?>