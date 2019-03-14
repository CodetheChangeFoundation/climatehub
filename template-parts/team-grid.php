<?php
$enable = get_field('team_grid_enable');
$title = get_field('team_grid_title');
$description_paragraph = get_field('team_grid_description');
if($enable):
    $members = get_field('team_members');
    $num = sizeof($members);
endif; ?>

<h1 class="p-2"><?php echo $title; ?> </h1>
<h5 class="p-2"><?php echo $description_paragraph; ?></h5>

<div class="container">
    <div class="row justify-content-center">
        <?php
            for($i=0; $i<$num; $i++){
                the_row();
                $current_member = $members[$i];
                $image = $current_member['member_image'];
                $name = $current_member['member_name'];
                $description = $current_member['member_description'];?>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
                    <img class="img-fluid" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                    <?php if($name || $description): ?>
                    <div class="bg-white p-2 mb-3">
                        <h5 class="text-left font-weight-bold"><?php echo $name; ?></h5>
                        <h5 class="text-left m-0"><?php echo $description;?></h5>
                    </div>
                    <?php endif; ?>
                </div>
            <?php } ?>
    </div>
</div>