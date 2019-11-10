<?php
/**
 * Asset Map Upload Functionality
 *
 * @package climatehub
 */

function register_acf_options_pages() {

  // Check function exists.
  if( !function_exists('acf_add_options_page') )
      return;

  // register options page.
  acf_add_options_page(array(
      'page_title'    => __('Asset Map Settings'),
      'menu_title'    => __('Asset Map'),
      'menu_slug'     => 'asset-map',
      'capability'    => 'edit_posts',
      'redirect'      => false
  ));
}

// Hook into acf initialization.
add_action('acf/init', 'register_acf_options_pages');

// 
include "SimpleXLSX.php";
function parse_excel_file() {
	$screen = get_current_screen();
	if (strpos($screen->id, "asset-map") == true) {


    
    $my_post = array(
      'post_title'    => 'IT WORKED',
      'post_status'   => 'publish',
      'post_author'   => 1,
      'post_type' => 'cities'
    );
    
    // Insert the post into the database
    wp_insert_post( $my_post );
	}
}
add_action('acf/save_post', 'parse_excel_file', 20);

function my_custom_mime_types( $mimes ) {
  $mimes['csv'] = 'application/csvm+json'; 
  $mimes['csv'] = 'text/csv'; 
  unset($mimes['xlsx']);
  return $mimes;
}
add_filter( 'upload_mimes', 'my_custom_mime_types' );


// $dataUrl = the_field('asset_map_data', 'option');
// $filecontent = file_get_contents($dataUrl);
// file_put_contents($tmpfname, $filecontent);
// echo '<p>' . $dataUrl . '</p>';
// if ( $xlsx = SimpleXLSX::parse($tmpfname) ) {
//   echo '<h1>Tiobe Index August 2019</h1><pre>';
//   echo '<table><tbody>';
//   $i = 0;
//   foreach ($xlsx->rows() as $elt) {
//     if ($i == 0) {
//       echo "<tr><th>" . $elt[0] . "</th><th>" . $elt[1] . "</th></tr>";
//     } else {
//       echo "<tr><td>" . $elt[0] . "</td><td>" . $elt[1] . "</td></tr>";
//     }      
//     $i++;
//   }
// }