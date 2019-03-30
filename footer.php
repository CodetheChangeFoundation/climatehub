<?php
/**
 * Climate Hub footer template
 *
 * @package climatehub
 */

  $left_column = get_field('footer_left_column', 'option');
  $middle_column = get_field('footer_middle_column', 'option');
  $right_column = get_field('footer_right_column', 'option');

?>

<footer class="pt-4">
  <div class="bg-grey">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-4 text-center text-md-left py-3 d-block d-md-flex">
          <div class="col-6 col-md-4 d-flex align-items-center justify-content-center m-auto px-0 pb-3 pb-md-0">
            <img src="<?php echo (isset($left_column['logo']['url'])) ? $left_column['logo']['url'] : ''; ?>" class="img-fluid" />
          </div>
          <p class="col-6 col-md-8 m-0 m-auto px-0 pl-md-3"><?php echo (isset($left_column['caption'])) ? $left_column['caption'] : ''; ?></p>
        </div>
        
        <div class="col-12 col-md-4 text-center py-3">
          <h4><?php echo (isset($middle_column['title'])) ? $middle_column['title'] : ''; ?></h4>
          <?php
            $fb = $middle_column['facebook_link'];
            $ig = $middle_column['instagram_link'];
            $twitter = $middle_column['twitter_link'];
            $fb_link = (isset($fb['url'])) ? $fb['url'] : '';
            $fb_target = (isset($fb['target'])) ? $fb['target'] : '';
            $twitter_link = (isset($twitter['url'])) ? $twitter['url'] : '';
            $twitter_target = (isset($twitter['target'])) ? $twitter['target'] : '';
            $ig_link = (isset($ig['url'])) ? $ig['url'] : '';
            $ig_target = (isset($ig['target'])) ? $ig['target'] : '';
          ?>
          <?php if($fb_link != ''): ?>
            <a href="<?php echo $fb_link; ?>" target="<?php echo $fb_target ?>" class="fa fa-facebook"></a>
          <?php endif; ?>
          <?php if($twitter_link != ''): ?>
            <a href="<?php echo $twitter_link; ?>" target="<?php echo $twitter_target ?>" class="fa fa-twitter"></a>
          <?php endif; ?>
          <?php if($ig_link != ''): ?>
            <a href="<?php echo $ig_link; ?>" target="<?php echo $ig_target ?>" class="fa fa-instagram"></a>
          <?php endif; ?>
        </div>

        <div class="col-12 col-md-4 text-center text-md-right py-3 d-block d-md-flex">
          <p class="m-0 pr-md-4"><?php echo (isset($right_column['caption'])) ? $right_column['caption'] : ''; ?></p>
          <?php
            $footer_button = $right_column['button'];
            $footer_button_link = (isset($footer_button['url'])) ? $footer_button['url'] : '';
            $footer_button_text = (isset($footer_button['title'])) ? $footer_button['title'] : '';
            $footer_button_target = (isset($footer_button['target'])) ? $footer_button['target'] : '';
          ?>
          <div class="d-flex align-items-center justify-content-center pt-3 pt-md-0">
            <button type="button" class="btn btn-outline-primary font-italic" href="<?php echo $footer_button_link ?>" target="<?php echo $footer_button_target ?>"><?php echo $footer_button_text ?></button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-dark text-center py-3">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="text-light m-0 small">Copyright &copy;
              <script type="text/javascript">document.write(new Date().getFullYear());</script>
              Climate Hub. Created by
              <a href="http://codethechange.ca/"> Code the Change Foundation</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<?php wp_footer();?>
</body>
</html>