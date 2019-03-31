<?php
/**
 * Climate Hub about page highlighted section template
 *
 * @package climatehub
 */
?>

<?php
 $enable = get_field('enable_highlighted_section_cf');
 $title = get_field('highlighted_section_title');
 $content = get_field('highlighted_section_content_section');
 $link = get_field('highlighted_section_link_to_blog_post');
 if($enable && $title && $content && $link): ?>
<div class="container pt-4">
  <div class="row px-3">
    <div class="col-12 col-md-8 m-auto py-3 border-left border-dark bg-grey">
      <h4><?php echo $title ?></h4>
      <p><?php echo $content ?></p>
      <a href="<?php echo $link['url']; ?>"
        target="<?php echo $link['target']; ?>">
        <?php echo $link['title']; ?>
      </a>
    </div>
  </div>
</div>

<?php endif; ?>