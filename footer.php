<footer>

</body>
  <div class="row align-items-center bg-secondary" style="footer">
    <div class="col-sm-2">
      <img src="<?php echo get_template_directory_uri() . '/assets/images/ClimateHubLogo.gif'; ?>" class="img-fluid border-0" alt="ClimateHubLogo"/>
    </div>
    <div class="col-sm-2">
    <?php get_template_part( 'template-parts/footer_customfield' )?>
    Creating a vibrant community around bold climate action at UBC.
    </div>
    <div class="col-sm-4 text-center">
      <h6 class="font-weight-bold">FOLLOW US</h6>
      <div class="container-fluid">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <a href="https://www.facebook.com/UBCClimateHub/" class="fa fa-facebook"></a>
        <a href="#" class="fa fa-twitter"></a>
        <a href="#" class="fa fa-instagram"></a>
      </div>
    </div>
    <div class="col-sm-2 right">
      Help us achieve our vision! We appreciate your support.
    </div>
    <div class="col-sm-2 align-middle">
      <button type="button" class="btn btn-outline-primary font-italic align-middle">donate</button>
    </div>
  </div>

  <div class="row bg-dark text-white text-center">
    <div class="col text-center" >
        Copyright &copy; <script type="text/javascript">
          document.write(new Date().getFullYear());
        </script>
         Climate Hub. Created by
      <a href="http://codethechange.ca/"> Code the Change Foundation</a>

    </div>
  </div>

  </footer>

<?php wp_footer(); ?>

  </body>
</html>

