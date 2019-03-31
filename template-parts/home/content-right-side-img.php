<?php
/**
 * Climate Hub home page two column content template
 *
 * @package climatehub
 */


if (get_field('enable_two_column')): ?>
    <div class="container mt-4">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="bg-secondary p-4">
                    <?php if (get_field('two_column_title')): ?>
                        <h4><?php echo the_field('two_column_title') ?> </h4>
                    <?php endif; ?>
                    <?php if (get_field('two_column_paragraph')): ?>
                        <p><?php echo the_field('two_column_paragraph') ?></p>
                    <?php endif; ?>
                    <?php if (get_field('two_column_button')): ?>
                        <a href="<?php echo get_field('two_column_button')['url']; ?>" class="btn btn-outline-primary font-italic align-middle" target="<?php echo get_field('two_column_button')['target']; ?>">
                            <?php echo get_field('two_column_button')['title']; ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
            <div class="col-12 col-md-6 right-side-image">
                <div class="w-100 h-100 background-image" style="background-image: url('<?php echo get_field('two_column_image')['url']; ?>')"></div>
            </div>
        </div>
    </div>
<?php endif; ?>