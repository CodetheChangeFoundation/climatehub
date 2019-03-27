<?php if( get_field("enable_asset_map_banner")): ?>
  <div class="container home-asset-map bg-dark asset-map-banner-bg-image" style="background-image: url('<?php echo get_field('asset_map_image')['url'] ?>')">
    <div class="row">
      <div class="col p-0">
        <div class="col-sm-12 col-md-5 col-lg-5 bg-white p-4">
          <?php if (get_field("asset_map_title")): ?>
            <h2> <?php the_field("asset_map_title"); ?> </h2>
          <?php endif; ?>
          <?php if (get_field("asset_map_paragraph")): ?>
            <p> <?php the_field("asset_map_paragraph"); ?> </p>
          <?php endif; ?>
          <?php if (get_field("asset_map_button")): ?>
            <a class="btn btn-outline-primary font-weight-bold align-middle" href="<?php the_field("asset_map_button")['url'] ?>" role="button"> <?php the_field("asset_map_button")['title'] ?> </a>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>
