<?php
/**
 * Climate Hub home page asset map banner template
 *
 * @package climatehub
 */


if( get_field("enable_asset_map_banner")): ?>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="home-asset-map background-image" style="background-image: url('<?php echo get_field('asset_map_image')['url']; ?>')">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6 p-4 bg-white">
            <?php if (get_field("asset_map_title")): ?>
              <h2><?php the_field("asset_map_title"); ?></h2>
            <?php endif; ?>
            <?php if (get_field("asset_map_paragraph")): ?>
              <p><?php the_field("asset_map_paragraph"); ?></p>
            <?php endif; ?>
            <?php if (get_field("asset_map_button")): ?>
              <a role="button" href="<?php echo get_field("asset_map_button")['url']; ?>" target="<?php echo get_field("asset_map_button")['target']; ?>" class="btn btn-outline-primary font-italic"> 
                <?php echo get_field("asset_map_button")['title']; ?> 
              </a>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>
