<?php get_header(); ?>
  <h1>This is my index.</h1>
<?php get_footer(); ?>

<div class='container'>
  <?php echo get_template_part( "template-parts/title" ); ?>
  <?php get_template_part( 'template-parts/paragraph' ); ?>
</div>
