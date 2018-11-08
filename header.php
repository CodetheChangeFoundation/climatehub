<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Climate Hub</title>
    <?php wp_head(); ?>
  </head>
  <body>
      <nav class="navbar sticky-top navbar-expand-md navbar-light bg-white text-uppercase font-weight-bold p-0 align-items-stretch">
        <a class="navbar-brand" href="#"></a>

        <div class="container-fluid">
          <img class="navbar-brand" src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="logo" width=auto height=130>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs4navbar" aria-controls="bs4navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

   <?php
   wp_nav_menu([
     'menu'            => 'primary',
     'theme_location'  => 'primary',
     'container'       => 'div',
     'container_id'    => 'bs4navbar',
     'container_class' => 'collapse navbar-collapse',
     'menu_id'         => false,
     'menu_class'      => 'navbar-nav mr-auto h-100',
     'depth'           => 2,
     'fallback_cb'     => 'bs4navwalker::fallback',
     'walker'          => new bs4navwalker()
   ]);
   ?>
</nav>
