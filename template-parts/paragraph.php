<?php if( get_field('paragraph') ): ?>
  <div class='row'>
    <div class='col-12 col-md-8 m-auto'>
      <p><?php the_field('paragraph'); ?></p>
    </div>
</div>
<?php endif; ?>