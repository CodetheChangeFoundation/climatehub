<?php
 $enable = get_field('enable_highlighted_section_cf');
 $title = get_field('highlighted_section_title');
 $content = get_field('highlighted_section_content_section');
 $link = get_field('highlighted_section_link_to_blog_post');
 if($enable && $title && $content && $link): ?>
<div class="container-fluid highlighted-section-cf-bg border-left border-dark">
  <div class="row">
    <div class="col mt-2 mb-2">
      <h4><?php echo $title ?></h4>
      <p><?php echo $content ?></p>
      <a href="<?php echo $link['url']; ?>"
        target="<?php echo $link['target']; ?>">
        <?php echo $link['title']; ?>
      </a>
    </div>
  </div>
</div>

<? endif; ?>

