<?php get_header(); ?>
<?php if( get_field('page_title') && get_field('paragraph') ): ?>
    <h2><?php the_field('page_title'); ?><h2>
    <p><?php the_field('paragraph'); ?><p>
<?php endif; ?>
<?php get_footer(); ?>