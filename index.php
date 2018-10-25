<?php get_header(); ?>
  <h1>This is my index.</h1>

  <div class="container">
    <?php get_template_part( "template-parts/title" ); ?>
  </div>

  <div class="container">
    <?php get_template_part( "template-parts/paragraph") ?>
  </div>

<?php get_footer(); ?>
  <?php get_template_part( 'template-parts/partners-content-section' )?>
<?php get_footer(); ?>