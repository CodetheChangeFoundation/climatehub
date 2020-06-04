<?php get_header(); ?>

  <div id="root"></div>
  <?php foreach (glob("wp-content/themes/climatehub/assetmap/build/static/js/*.js") as $filename) {
    $filename = get_site_url() . "/" . $filename;
    echo "<script type=\"text/javascript\" src=\"$filename\"></script>";
  } ?>

<?php get_footer(); ?>