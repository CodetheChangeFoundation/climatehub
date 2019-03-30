<?php
/**
 * Climate Hub board of directors grid template
 *
 * @package climatehub
 */


$enable = get_field('board_of_directors_team_grid_enable');
$title = get_field('board_of_directors_team_grid_title');
$description_paragraph = get_field('board_of_directors_team_grid_description');
if($enable && get_field('board_of_directors_team_members')):
    $members = get_field('board_of_directors_team_members');
    $num = sizeof($members);
endif; ?>

<?php if($enable): ?>
    <div class="container pt-4">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 m-auto">
                <h2><?php echo $title; ?> </h2>
                <p><?php echo $description_paragraph; ?></p>
            </div>
            <div class="col-12 col-md-8 m-auto pt-2">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <?php for($i=0; $i<$num; $i++):
                            the_row();
                            $current_member = $members[$i];
                            $image = $current_member['member_image'];
                            $name = $current_member['member_name'];
                            $description = $current_member['member_description'];?>
                            <div class="col-12 col-sm-6 col-lg-4 col-xl-3 text-center grid-image mt-3">
                                <img class="img-fluid" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                                <?php if($name || $description): ?>
                                <div class="bg-white p-2 mb-3">
                                    <h5 class="text-left font-weight-bold"><?php echo $name; ?></h5>
                                    <h5 class="text-left m-0"><?php echo $description;?></h5>
                                </div>
                                <?php endif; ?>
                            </div>
                        <?php endfor; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>