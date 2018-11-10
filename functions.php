<?php
/**
 * Climate Hub Theme Functions
 *
 * @package climatehub
 */

require get_template_directory() . '/inc/cleanup.php';
require get_template_directory() . '/inc/enqueue.php';
require get_template_directory() . '/inc/theme-support.php';

require get_template_directory() . '/inc/title-cf.php';
require get_template_directory() . '/inc/paragraph-cf.php';
require get_template_directory() . '/custom-fields/partners-content-section.php';
require get_template_directory() . '/custom-fields/updatebox-section.php';

function my_acf_google_map_api( $api ){

	$api['key'] = 'xxx';

	return $api;

}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

?>