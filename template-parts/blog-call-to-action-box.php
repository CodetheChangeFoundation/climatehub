<?php if( get_field("call_to_action_title") && get_field("call_to_action_summary") ): ?>

  <div class="container text-center">
    <div class="col-md-3 col-md-offset-3 bg-white pb-2 pt-3 ml-auto mr-auto">
      <h3><?php the_field("call_to_action_title") ?> </h3>
      <p><?php the_field("call_to_action_summary") ?></h3>

      <?php if( get_field("call_to_action_button_title") &&  get_field("call_to_action_button_link")): ?>
        <a role="button" href="<?php echo the_field("call_to_action_button_link"); ?>" class="btn btn-outline-primary font-italic align-middle">
        <?php the_field("call_to_action_button_title")?> </a>
      <? endif; ?>
    </div>
  </div>

<?php endif; ?>