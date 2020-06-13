<?php
/**
 * Climate Hub team grid template
 *
 * @package climatehub
 */

$enable = get_field('team_grid_enable');
$title = get_field('team_grid_title');
$description_paragraph = get_field('team_grid_description');
if($enable && get_field('team_members')):
    $members = get_field('team_members');
    $num = sizeof($members);
endif; ?>

<?php if($enable): ?>
    <div class="container pt-4">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 m-auto">
                <h2><?php echo $title; ?> </h2>
                <p><?php echo $description_paragraph; ?></p>
            </div>
            <div class="col-12 col-md-8 m-auto">
                <div class="container-fluid">
                    <div class="row justify-content-center team-grid-container">
                        <?php for($i=0; $i<$num; $i++):
                            the_row();
                            $current_member = $members[$i];
                            $image = $current_member['member_image'];
                            $name = $current_member['member_name'];
                            $description = $current_member['member_description'];
                            $bio = $current_member['member_bio'];?>
                            <div class="text-center grid-image my-3">
                                <a class="btn btn-link p-0 border-0 w-100" data-toggle="collapse" data-target="#team-member-<?php echo $i ?>" aria-expanded="false" aria-controls="team-member-<?php echo $i ?>">
                                    <img class="img-fluid team-member-image p-0" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                                    <?php if($name || $description): ?>
                                    <div class="bg-white p-2">
                                        <h5 class="text-left font-weight-bold"><?php echo $name; ?></h5>
                                        <h5 class="text-left m-0"><?php echo $description;?></h5>
                                    </div>
                                    <?php endif; ?>
                                </a>
                            </div>
                            
                            <div class="team-member-bio collapse" id="team-member-<?php echo $i ?>">
                                <div class="container bg-white">
                                    <div class="row">
                                    <a class="close-icon text-primary btn btn-link font-weight-light" role="button">&times;</a>
                                    <div class="col-12 p-4">
                                        <?php echo $bio ?>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        <?php endfor; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>