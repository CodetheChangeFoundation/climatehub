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

// Allow csv upload format.
function my_custom_mime_types( $mimes ) {
  $mimes['csv'] = 'application/csvm+json'; 
  $mimes['csv'] = 'text/csv'; 
  unset($mimes['xlsx']);
  return $mimes;
}

add_filter( 'upload_mimes', 'my_custom_mime_types' );
// 
function parse_excel_file() {
	$screen = get_current_screen();
	if (strpos($screen->id, "asset-map") == true) {
    
    $city_data = read_file_from_field('city_file');
    $community_data = read_file_from_field('community_file');
    $project_data = read_file_from_field('project_file');
    $group_data = read_file_from_field('group_file');
    $individual_data = read_file_from_field('individual_file');

    $all_objects = [];
    if ($city_data) {
      delete_all_posts('cities');
      $all_objects['cities'] = create_posts($city_data, 'cities');
      // $all_objects['cities']['fields'] = $city_data[0];
    }
    if ($community_data) {
      delete_all_posts('communities');
      $all_objects['communities'] = create_posts($community_data, 'communities');
    }
    if ($project_data) {
      delete_all_posts('projects');
      $all_objects['projects'] = create_posts($project_data, 'projects');
    }
    if ($group_data) {
      delete_all_posts('groups');
      $all_objects['groups'] = create_posts($group_data, 'groups');
    }
    if ($individual_data) {
      delete_all_posts('individuals');
      $all_objects['individuals'] = create_posts($individual_data, 'individuals');
    }

    // Test: print all_objects to name field of sample cities post
    // $my_post = array(
    //   'post_title'    =>  'sample',
    //   'post_status'   => 'publish',
    //   'post_author'   => 1,
    //   'post_type' => 'cities'
    // );
    // $post_id = wp_insert_post( $my_post );
    // update_field('name', $all_objects, $post_id);
  }

}

function read_file_from_field($field_name) {
  $file = get_field($field_name, 'option');
  if ($file) { 
    $file_url = $file['url'];
    $file_data = [];
    if (($h = fopen($file_url, 'r')) !== FALSE) {
      while (($data = fgetcsv($h, 100, ',')) !== FALSE) {
        $file_data[] = $data; 
      }
      fclose($h);
    }
    return $file_data;
  }
}

function create_posts($post_data, $post_type) {
  $post_objs = [];
  for ($i=1; $i < count($post_data); $i++) {
    $curr_post = $post_data[$i];
    $post_objs[$curr_post[1]] = create_new_post($curr_post, $post_type);
  }
  return $post_objs;
}

function create_new_post($post_data, $post_type) { 
  $my_post = array(
    'post_title'    =>  $post_data[0] . ': ' . $post_data[1],
    'post_status'   => 'publish',
    'post_author'   => 1,
    'post_type' => $post_type
  );
  // Insert the post into the database
  $post_id = wp_insert_post( $my_post );
  $post_obj = array(
    'post_id' => $post_id,
    'data' => $post_data
  );
  return $post_obj;
}

function update_city_fields($post_id, $post_data, $post_fields) {
  // update_field('name', $post_data[0], $post_id);
  // $location = ['address' => $post_data[1]];
  // update_field('location', $location, $post_id);
  // update_field('community')
}

function delete_all_posts($post_type) {
  $query = new WP_query(array(
    'post_type' => $post_type,
    'post_status' => 'publish',
    'posts_per_page' => -1
  ));

  while($query->have_posts()) {
    $query->the_post();
    $post_id = get_the_id();
    wp_delete_post($post_id);
  }
}

add_action('acf/save_post', 'parse_excel_file', 20);