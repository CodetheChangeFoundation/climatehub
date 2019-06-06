<?php
/**
 * Climate Hub contact us banner template
 *
 * @package climatehub
 */

if (get_field("enable_contact_us_banner")): ?>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="contact-us-banner background-image d-flex align-items-end" style="background-image: url('<?php echo get_field('banner_image')['url']; ?>')">
          <div class ="col-12 col-sm-10 col-md-8 col-lg-6 p-2 p-sm-3 p-md-4 p-lg-5">
            <?php if (get_field("banner_title")): ?>
              <h4 class="font-weight-bold text-white bg-dark p-3">
                <?php the_field("banner_title");?>
              </h4>
            <?php endif;?>
            <?php if (get_field("banner_paragraph")): ?>
              <p class="p-3 bg-light"> <?php echo get_field("banner_paragraph", false, false); ?> </p>
            <?php endif;?>
            <?php if (get_field("banner_button")): ?>
              <a role="button" href="<?php echo get_field("banner_button")['url']; ?>" target="<?php echo get_field("banner_button")['target']; ?>" class="btn btn-outline-primary font-italic">
                <?php echo get_field("banner_button")['title']; ?>
              </a>
            <?php endif;?>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php endif;?>