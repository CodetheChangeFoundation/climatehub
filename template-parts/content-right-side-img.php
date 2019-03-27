<?php if (get_field('enable_two_column')): ?>
<div class="container-fluid">
    <div class="row bg-secondary">
        <div class="col mt-4 mb-4 mr-4 ">
            <?php if (get_field('two_column_title')): ?>
                <h4><?php echo the_field('two_column_title') ?> </h4>
            <?php endif; ?>
            <?php if (get_field('two_column_paragraph')): ?>
                <p><?php echo the_field('two_column_paragraph') ?></p>
            <?php endif; ?>
            <?php if (get_field('two_column_button')): ?>
                <a type="button"
                href="<?php echo the_field('two_column_button')['url']; ?>"
                class="btn btn-outline-primary font-italic align-middle"
                target="<?php echo the_field('two_column_button')['target']; ?>">
                    <?php echo the_field('two_column_button')['title']; ?>
                </a>
            <?php endif; ?>
        </div>
        <div class="col">
            <div class="w-100 h-100 content-right-side-background-image" style="background-image: url('<?php echo the_field('two_column_image'); ?>')"></div>
        </div>
    </div>
</div>
<?php endif; ?>