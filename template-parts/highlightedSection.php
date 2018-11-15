<div class="container-fluid highlighted-section-cf-bg border-left border-dark">
  <div class="row">
    <div class="col mt-2 mb-2">
      <?php if(get_field('enable_highlighted_section_cf')): ?>
        <h4 class="strong"><?php the_field('highlighted_section_title') ?></h4>
        <p><?php the_field('highlighted_section_content_section') ?></p>
      <?php endif ?>
    </div>
  </div>
</div>

<?php /*TODO: cannot load most recent blog post
 <?php if(get_field('link_to_blog_post')):
  the_field('link_to_blog_post');
endif; ?>  */ ?>