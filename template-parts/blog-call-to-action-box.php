<?php if( have_rows('call_to_action_repeater') ): ?>

  <?php while ( have_rows("call_to_action_repeater") ) : the_row(); // loop through the rows of data

    $title       = get_sub_field("call_to_action_title");
    $summary     = get_sub_field("call_to_action_summary");
    $buttontitle = get_sub_field("call_to_action_button_title");
    $link        = get_sub_field("call_to_action_button_link");
  ?>

    <div class="container pt-5 pb-5 text-center">
      <div class="col-md-3 col-md-offset-3 bg-white pb-2 pt-3 ml-auto mr-auto">

        <?php if( $title ): ?>
          <h3><?php echo $title; ?> </h3>
        <? endif; ?>

        <?php if( $summary ): ?>
          <p><?php echo $summary; ?></p>
        <?php endif; ?>

        <?php if( $buttontitle && $link ): ?>
          <a role="button" href="<?php echo $link; ?>" class="btn btn-outline-primary font-italic align-middle">
          <?php echo $buttontitle; ?> </a>
        <?php endif; ?>
      </div>
    </div>

  <?php endwhile; ?>

<?php endif; ?>