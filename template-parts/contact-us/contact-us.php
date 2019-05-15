<?php
/**
 * Climate Hub Contact Us Page
 *
 * @package climatehub
 */
?>

<?php if(get_field("enable_contact_us_info")): ?>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12 col-md-6 px-3 pr-md-0">
        <div class="bg-white w-100 h-100 p-3">
          <?php the_field("contact_info"); ?>
        </div>
      </div>
      <div class="col-12 col-md-6 px-3 pl-md-0">
        <?php $location = get_field('map');
        if (!empty($location)): ?>
          <div class="acf-map">
            <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
          </div>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBklza7tjbuNSp-Ul6TLx0op9eEbV8yDCE"></script>
        <?php endif;?>
      </div>
    </div>
  </div>
<?php endif; ?>