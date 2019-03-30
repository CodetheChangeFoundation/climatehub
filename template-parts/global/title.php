<?php
/**
 * Climate Hub global title template
 *
 * @package climatehub
 */

if( get_field("enable_title") && get_field("title") ): ?>
  <div class="row pt-5">
    <div class="col">
      <h1 class="font-weight-bold pl-5"><?php the_field("title"); ?> </h1>
    </div>
  </div>
<?php endif; ?>