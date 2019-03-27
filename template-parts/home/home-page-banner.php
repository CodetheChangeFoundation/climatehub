<?php
/**
 * Climate Hub home page banner template
 *
 * @package climatehub
 */

if( get_field("enable_banner") ): ?>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="home-page-banner background-image d-flex align-items-end" style="background-image: url('<?php echo get_field('banner_image')['url']; ?>')">
          <div class ="col-12 col-sm-10 col-md-8 col-lg-6 p-2 p-sm-3 p-md-4 p-lg-5">
            <?php if( get_field("homepage_title") ): ?>
              <h4 class="font-weight-bold text-white overlay bg-dark p-3"> 
                <?php the_field("homepage_title"); ?> 
              </h4>
            <?php endif; ?>
            <?php if( get_field("homepage_paragraph") ): ?>
              <p class="p-3 bg-light"> <?php echo get_field("homepage_paragraph", false, false); ?> </p>
            <?php endif; ?>
            <?php if( get_field("homepage_button") ): ?>
              <a role="button" href="<?php echo get_field("homepage_button")['url']; ?>" target="<?php echo get_field("homepage_button")['target']; ?>" class="btn btn-outline-primary font-italic align-middle"> 
                <?php echo get_field("homepage_button")['title']; ?> 
              </a>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>