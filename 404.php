<?php
/**
 * Climate Hub 404 Page
 *
 * @package climatehub
 */
?>

<?php get_header(); ?>
  
  <div class="container my-5">
    <div class="row">
      <div class="col-12 text-center">
        <div class="h1 font-weight-bold">404</div>
        <div class="h2">Page Not Found</div>
        <div class="h3">
          We can't find the page you're looking for. Go back or head over the the homepage.
        </div>
        <a class="btn btn-outline-primary btn-lg mt-4" role="button" href="<?php echo get_home_url(); ?>">Homepage</a>
      </div>
    </div>
  </div>

<?php get_footer(); ?>
