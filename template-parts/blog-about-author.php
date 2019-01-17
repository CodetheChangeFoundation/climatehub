<?php if( get_field("blog_about_the_author") && get_field("blog_about_the_author_paragraph")): ?>

  <div class="container border-top border-dark">
    <div class="col pt-3 ml-auto mr-auto">
      <h4><?php the_field("blog_about_the_author")?></h4>
      <?php the_field("blog_about_the_author_paragraph") ?>
    </div>
  </div>

<?php endif; ?>