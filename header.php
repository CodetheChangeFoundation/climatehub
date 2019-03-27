<!doctype html>
<html lang="en">
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?php bloginfo( 'name' ); wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo('description') ?>">
    <link rel="profile" href="http://gmpg.org/xfn/11">

    <?php if (is_singular() && pings_open(get_queried_object())): ?>
      <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php endif; ?>
    <?php wp_head() ?>
  </head>
  <body>
    <nav class="navbar sticky-top navbar-expand-md navbar-light bg-white text-uppercase font-weight-bold p-0 align-items-stretch">
      <div class="container">
        <a class="navbar-brand p-0 m-0" href="<?php echo get_home_url() ?>">
          <img class="navbar-brand" src="<?php echo get_template_directory_uri(); ?>/assets/images/ClimateHubLogo.png" alt="logo" width=auto height=130/>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs4navbar" aria-controls="bs4navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <?php
          wp_nav_menu([
            'menu'            => 'primary',
            'theme_location'  => 'primary',
            'container'       => 'div',
            'container_id'    => 'bs4navbar',
            'container_class' => 'collapse navbar-collapse h-100',
            'menu_id'         => false,
            'menu_class'      => 'navbar-nav ml-auto',
            'depth'           => 2,
            'fallback_cb'     => 'bs4navwalker::fallback',
            'walker'          => new bs4navwalker()
          ]);
        ?>
      </div>
    </nav>

