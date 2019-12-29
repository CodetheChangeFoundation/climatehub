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


function parse_excel_file() {
	$screen = get_current_screen();
	if (strpos($screen->id, "asset-map") == true) {
    // To parse additional file, add to array
    $field_types = array(
      'cities' => array( 
        'field_type' => 'cities',
        'file_field_name' => 'city_file',
        'available_fields' => array('CITY_ID', 'NAME', 'LOCATION')
      ),
      'communities' => array(
        'field_type' => 'communities',
        'file_field_name' => 'community_file',
        'available_fields' => array('COMMUNITY_ID', 'NAME', 'CODE', 'LOCATION', 'CITY')
      ),
      'groups' => array(
        'field_type' => 'groups',
        'file_field_name' => 'group_file',
        'available_fields' => array('GROUP_ID', 'NAME', 'DESCRIPTION', 'TAG_A', 'TAG_B', 
        'TAG_C', 'WEBSITE', 'COMMUNITY', 'PARENT_GROUP', 'PROJECTS', 'INDIVIDUALS')
      ),
      'projects' => array(
        'field_type' => 'projects',
        'file_field_name' => 'project_file',
        'available_fields' => array('PROJECT_ID', 'NAME', 'DESCRIPTION', 'TAG_A', 'TAG_B', 
        'TAG_C', 'WEBSITE', 'BLOG_POST', 'DIRECTOR')
      ),
      'individuals' => array(
        'field_type' => 'individuals',
        'file_field_name' => 'individual_file',
        'available_fields' => array('INDIVIDUAL_ID', 'NAME', 'DESCRIPTION', 'TAG_A', 
        'TAG_B', 'TAG_C', 'WEBSITE', 'POSITION', 'EMAIL', 'PHONE', 'SURVEY_INFO')
      ),
      'tag_a' => array(
        'field_type' => 'tag_a',
        'file_field_name' => 'tag_a_file',
        'available_fields' => array('NAME')
      ),
      'tag_b' => array(
        'field_type' => 'tag_b',
        'file_field_name' => 'tag_b_file',
        'available_fields' => array('NAME')
      ),
      'tag_c' => array(
        'field_type' => 'tag_c',
        'file_field_name' => 'tag_c_file',
        'available_fields' => array('NAME')
      )
    );
    $all_objects = [];
    $updated_file_data = [];
    // Read files
    foreach($field_types as $field_type) {
      $file_data = read_file_from_field($field_type['file_field_name']);
      if($file_data) {
        $updated_file_data[] = (array($field_type['field_type'], $file_data));
      }
    }
    // Create posts
    for($i=0; $i<count($updated_file_data); $i++) {
      $file = $updated_file_data[$i];
      delete_all_posts($file[0]);
      $all_objects[$file[0]] = create_posts($file[1], $file[0]);
    }
    // Update posts
    update_fields($all_objects);

    // Test: print all_objects to name field of sample cities post
    // ------
    // $my_post = array(
    //   'post_title'    =>  key($all_objects),
    //   'post_status'   => 'publish',
    //   'post_author'   => 1,
    //   'post_type' => 'cities'
    // );
    // $post_id = wp_insert_post( $my_post );
    // update_field('name', $all_objects['cities'], $post_id);
    // ------
  }
}

function read_file_from_field($field_name) {
  $file = get_field($field_name, 'option');
  if ($file) { 
    $file_url = $file['url'];
    $file_data = [];
    if (($h = fopen($file_url, 'r')) !== FALSE) {
      while (($data = fgetcsv($h, 10000, ',')) !== FALSE) {
        $file_data[] = $data; 
      }
      fclose($h);
    }
    return ($file_data);
  }
}

// Creates posts for each row in post_data 
function create_posts($post_data, $post_type) {
  $post_objs = [];
  // First row is skipped and second row is file header
  $file_header = $post_data[1];
  for ($i=2; $i < count($post_data); $i++) {
    $curr_post = $post_data[$i];
    $post_objs[$curr_post[0]] = create_new_post($curr_post, $post_type, $file_header);
  }
  return $post_objs;
}

// Creates new WP post and returns object containing post_id and row data
function create_new_post($post_data, $post_type, $file_header) { 
  $my_post = array(
    'post_title'    =>  $post_data[0] . ($post_data[1]!==null? ': ' . $post_data[1] : ''),
    'post_status'   => 'publish',
    'post_author'   => 1,
    'post_type' => $post_type
  );
  // Insert the post into the database
  $post_id = wp_insert_post( $my_post );
  // Create object to cache
  $formatted_post_data = [];
  for($i=0 ; $i < count($file_header) ; $i++) {
    $formatted_post_data[$file_header[$i]] = $post_data[$i];
  };
  $post_obj = array(
    'post_id' => $post_id,
    'data' => $formatted_post_data
  );
  return $post_obj;
}

function update_fields($all_objects) {
  foreach($all_objects as $key => $post_type) {
    switch($key) {
      case 'cities': update_city_fields($post_type, $all_objects); break;
      case 'communities': update_community_fields($post_type, $all_objects); break;
      // case 'groups': update_group_fields($post_type, $all_objects); break;
      // case 'projects': update_project_fields($post_type, $all_objects); break;
      // case 'individuals': update_individual_fields($post_type, $all_objects); break;
    }
  }
}
function update_city_fields($cities, $all_objects) {
  foreach($cities as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    // Update 'CITY_ID', 'NAME', 'LOCATION'
    update_field('city_id', $post_data['CITY_ID'], $post_id);
    update_field('name', $post_data['NAME'], $post_id);
    // TODO $location = ['address' => $post_data[1]];
    // update_field('location', $location, $post_id);
  }
}

function update_community_fields($communities, $all_objects) {
  foreach($communities as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    // Update 'COMMUNITY_ID', 'NAME', 'CODE', 'LOCATION', 'CITY'
    update_field('community_id', $post_data['COMMUNITY_ID'], $post_id);
    update_field('name', $post_data['NAME'], $post_id);
    update_field('code', $post_data['CODE'], $post_id);
    // TODO Location -> Location
    // TODO City -> Relationship
    // update_field('name', $all_objects, $post_id);
    update_field('city', get_post_id('cities', $post_data['CITY'], $all_objects), $post_id);
  }
}

function update_group_fields($groups, $all_objects) {
  foreach($groups as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    // Update 'GROUP_ID', 'NAME', 'DESCRIPTION', 'TAG_A', 'TAG_B', 
    //  'TAG_C', 'WEBSITE', 'COMMUNITY', 'PARENT_GROUP', 'PROJECTS', 'INDIVIDUALS'
    update_field('group_id', $post_data['GROUP_ID'], $post_id);
    update_field('name', $post_data['NAME'], $post_id);
    update_field('description', $post_data['DESCRIPTION'], $post_id);
    update_field('website', $post_data['WEBSITE'], $post_id);
    // TODO Tag A, Tag B, Tag, C -> Relationships
    // TODO Community -> Relationship
    // TODO Parent_group -> Relationship
    // TODO Projects -> Relationship
    // TODO Individuals -> Relationship
  }
}

function update_project_fields($projects, $all_objects) {
  foreach($projects as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    // Update 'PROJECT_ID', 'NAME', 'DESCRIPTION', 'TAG_A', 'TAG_B', 
    //    'TAG_C', 'WEBSITE', 'BLOG_POST', 'DIRECTOR'
    update_field('project_id', $post_data['PROJECT_ID'], $post_id);
    update_field('name', $post_data['NAME'], $post_id);
    update_field('description', $post_data['DESCRIPTION'], $post_id);
    update_field('website', $post_data['WEBSITE'], $post_id);
    update_field('blog_post', $post_data['BLOG_POST'], $post_id);
    // TODO Tag A, Tag B, Tag, C -> Relationships
    // TODO Director -> Relationships
  }
}

function update_individual_fields($individuals, $all_objects) {
  foreach($individuals as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    // Update 'INDIVIDUAL_ID', 'NAME', 'DESCRIPTION', 'TAG_A', 
    //    'TAG_B', 'TAG_C', 'WEBSITE', 'POSITION', 'EMAIL', 'PHONE', 'SURVEY_INFO'
    update_field('individual_id', $post_data['INDIVIDUAL_ID'], $post_id);
    update_field('name', $post_data['NAME'], $post_id);
    update_field('description', $post_data['DESCRIPTION'], $post_id);
    update_field('website', $post_data['WEBSITE'], $post_id);
    update_field('position', $post_data['POSITION'], $post_id);
    update_field('email', $post_data['EMAIL'], $post_id);
    update_field('phone', $post_data['PHONE'], $post_id);
    update_field('survey_info', $post_data['SURVEY_INFO'], $post_id);
    // TODO Tag A, Tag B, Tag, C -> Relationships
  }
}

// INPUT: Related Object Type, Related Object ID, All Objects array
// RETURN: Related Object Post ID
function get_post_id($post_type, $object_id, $all_objects) {
  $post = $all_objects[$post_type][$object_id];
  return $post['post_id'];
}

// Delete all posts for given post type
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


//IDEAS: 
// --- Store WP Post ID after it has been looked up once