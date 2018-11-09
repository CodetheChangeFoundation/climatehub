<?php if(get_field('enable_cf')): ?>
<div class="container">
    <div class="row">
        <div class="column">
            <h4><?php the_field('title') /*issue with same name for "title in multiple custom fields"*/?></h4>
            <p><?php the_field('paragraph') ?></p>
        </div>
        <div class="column">

        </div>

<?php endif ?>