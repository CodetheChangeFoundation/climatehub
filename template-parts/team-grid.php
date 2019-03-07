<?php
$enable = get_field('team_grid_enable');
if($enable):
    $members = get_field('team_members');
    $numitems = 0;
    $i = 0;
    while(have_rows('team_member')): the_row();
        $numitems++;
    endwhile;

    $numrowsm1 = floor($numitems / 4); //=numrows-1
    $numlastrow = $numitems % 4;
    //numrows = floor of numitems/4
    //last row has numitems%4
?>

<?php endif; ?>

<div class = "container-fluid">
    <div class="row">
        <?php for($i; $i<=$numrowsm1; $i++){
            the_row();
            $current_member = $members[$i];
            $image = $current_member['member_image'];
            $name = $current_member['member_name'];
            $description = $current_member['member_description'];?>
            <div class="col">
                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?> " />
                <h5 class="font-weight-bold"><?php echo $name; ?></h5>
                <h5><?php echo $description;?></h5>
            </div>

        <?php } ?>
    </div>
    <div class = "row">
        <?php for($i; $i<$numitems; $i++){ //$numitems?
            the_row();
            $current_member = $members[$i];
            $image = $current_member['member_image'];
            $name = $current_member['member_name'];
            $description = $current_member['member_description']; //optional ?>
            <div class="col">
                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?> " />
                <h5 class="font-weight-bold"><?php echo $name; ?></h5>
                <h5><?php echo $description;?></h5>
            </div>

        <?php } ?>
    </div>

</div>

<!-- do a for loop for every repeater field (with subgroups image, title, opti description) and insert col
        after 4 (when i = 4), make new row , and continue inserting col
        there might be an issue with centering -> can figure out later
        todo: ask liam if there will always be 8 board of directors? or a certain number of staff? volunteers? -->

<!-- https://www.codeply.com/go/MJTglTsq9h -->