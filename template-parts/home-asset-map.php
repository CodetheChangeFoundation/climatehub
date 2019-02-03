<?php if( get_field("asset_map_custom_field")): ?>
  <div class="container home-asset-map bg-dark asset-map-banner-bg-image" style="background-image: url('<?php echo get_field('asset_map_image')['url'] ?>')">
    <div class="row">
      <div class="col p-0">
        <div class="col-sm-12 col-md-5 col-lg-5 bg-white p-4">
          <h2> <?php the_field("asset_map_title"); ?> </h2>
            <p> <?php the_field("asset_map_paragraph"); ?> </p>
            <a class="btn btn-outline-primary font-weight-bold align-middle" href="<?php the_field("asset_map_button_link") ?>" role="button"> <?php the_field("asset_map_button_text") ?> </a>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>
