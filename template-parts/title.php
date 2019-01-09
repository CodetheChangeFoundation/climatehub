<?php if( get_field("enable_title") && get_field("page_title") ): ?>
  <div class="row pt-5">
    <div class="col">
      <h1 class="font-weight-bold pl-5"><?php the_field("page_title"); ?> </h1>
    </div>
  </div>
<?php endif; ?>