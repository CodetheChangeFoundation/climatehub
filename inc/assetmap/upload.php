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

$errors = [];
function parse_excel_file() {
	$screen = get_current_screen();
	if (strpos($screen->id, "asset-map") == true) {
    // To parse additional file, add to array
    $field_types = array(
      'cities' => array( 
        'file_field_name' => 'city_file',
        'basic_fields' => array('CITY_ID', 'NAME'),
        'location_fields' => array('LOCATION'),
        'relationship_fields' => array(),
      ),
      'communities' => array(
        'file_field_name' => 'community_file',
        'basic_fields' => array('COMMUNITY_ID', 'NAME', 'CODE'),
        'location_fields' => array('LOCATION'),
        'relationship_fields' => array('CITY'),
      ),
      'groups' => array(
        'file_field_name' => 'group_file',
        'basic_fields' => array('GROUP_ID', 'NAME', 'DESCRIPTION', 'WEBSITE'),
        'location_fields' => array(),
        'relationship_fields' => array('TAGS', 'TAG_A', 'TAG_B', 'TAG_C', 'COMMUNITY', 
          'PARENT_GROUP', 'PROJECTS', 'INDIVIDUALS'),       
      ),
      'projects' => array(
        'file_field_name' => 'project_file',
        'basic_fields' => array('PROJECT_ID', 'NAME', 'DESCRIPTION', 'WEBSITE', 'BLOG_POST'),
        'location_fields' => array(),
        'relationship_fields' => array('TAGS', 'TAG_A', 'TAG_B', 'TAG_C', 'DIRECTOR'),    
      ),
      'individuals' => array(
        'file_field_name' => 'individual_file',
        'basic_fields' => array('INDIVIDUAL_ID', 'NAME', 'DESCRIPTION', 'WEBSITE', 
          'POSITION', 'EMAIL', 'PHONE', 'SURVEY_INFO'),
        'location_fields' => array(),
        'relationship_fields' => array('TAGS', 'TAG_A', 'TAG_B', 'TAG_C'), 
      ),
      'tags' => array(
        'file_field_name' => 'tag_file',
        'basic_fields' => array('NAME'),
        'location_fields' => array(),
        'relationship_fields' => array('TYPE'), 
      ),
      'tag_types' => array(
        'file_field_name' => 'tag_type_file',
        'basic_fields' => array('TYPE_ID', 'NAME', 'COLOUR'),
        'location_fields' => array(),
        'relationship_fields' => array(), 
      ),
      'tag_a' => array(
        'file_field_name' => 'tag_a_file',
        'basic_fields' => array('NAME'),
        'location_fields' => array(),
        'relationship_fields' => array(), 
      ),
      'tag_b' => array(
        'file_field_name' => 'tag_b_file',
        'basic_fields' => array('NAME'),
        'location_fields' => array(),
        'relationship_fields' => array(), 
      ),
      'tag_c' => array(
        'file_field_name' => 'tag_c_file',
        'basic_fields' => array('NAME'),
        'location_fields' => array(),
        'relationship_fields' => array(), 
      )
    );
    $related_posts = array(
      'cities' => array( 
        'COMMUNITIES' => array(
          'post_type' => 'communities',
          'field_name' => 'CITY',
        )
      ),
      'communities' => array(
        'CITY' => array(
          'post_type' => 'cities',
          'field_name' => 'COMMUNITIES'
        ),
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'COMMUNITY'
        )
      ),
      'groups' => array(
        'COMMUNITY' => array(
          'post_type' => 'communities',
          'field_name' => 'GROUPS'
        ),
        'PARENT_GROUP' => array(
          'post_type' => 'groups',
          'field_name' => 'CHILD_GROUPS'
        ),
        'CHILD_GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'PARENT_GROUP'
        ),
        'PROJECTS' => array(
          'post_type' => 'projects',
          'field_name' => 'GROUPS'
        ),
        'INDIVIDUALS' => array(
          'post_type' => 'individuals',
          'field_name' => 'GROUPS'
        ),
        'TAGS' => array(
          'post_type' => 'tags', 
          'field_name' => 'GROUPS'
        ),
        'TAG_A' => array(
          'post_type' => 'tag_a', 
          'field_name' => 'GROUPS'
        ),
        'TAG_B' => array(
          'post_type' => 'tag_b', 
          'field_name' => 'GROUPS'
        ),
        'TAG_C' => array(
          'post_type' => 'tag_c', 
          'field_name' => 'GROUPS'
        ),
      ),
      'projects' => array(
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'PROJECTS'
        ),
        'DIRECTOR' => array(
          'post_type' => 'individuals',
          'field_name' => 'PROJECTS'
        ),
        'TAGS' => array(
          'post_type' => 'tags', 
          'field_name' => 'PROJECTS'
        ),
        'TAG_A' => array(
          'post_type' => 'tag_a', 
          'field_name' => 'PROJECTS'
        ),
        'TAG_B' => array(
          'post_type' => 'tag_b', 
          'field_name' => 'PROJECTS'
        ),
        'TAG_C' => array(
          'post_type' => 'tag_c', 
          'field_name' => 'PROJECTS'
        ),
      ),
      'individuals' => array(
        'PROJECTS' => array(
          'post_type' => 'projects',
          'field_name' => 'DIRECTOR'
        ),
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'INDIVIDUALS'
        ),
        'TAGS' => array(
          'post_type' => 'tags', 
          'field_name' => 'INDIVIDUALS'
        ),
        'TAG_A' => array(
          'post_type' => 'tag_a', 
          'field_name' => 'INDIVIDUALS'
        ),
        'TAG_B' => array(
          'post_type' => 'tag_b', 
          'field_name' => 'INDIVIDUALS'
        ),
        'TAG_C' => array(
          'post_type' => 'tag_c', 
          'field_name' => 'INDIVIDUALS'
        ),
      ),
      'tags' => array(
        'TYPE' => array(
          'post_type' => 'tag_types',
          'field_name' => 'TAGS'
        ),
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'TAGS'
        ),
        'PROJECTS' => array(
          'post_type' => 'projects',
          'field_name' => 'TAGS'
        ),
        'INDIVIDUALS' => array(
          'post_type' => 'individuals',
          'field_name' => 'TAGS'
        ),
      ),
      'tag_types' => array(
        'TAGS' => array(
          'post_type' => 'tags',
          'field_name' => 'TYPE'
        ),
      ),
      'tag_a' => array(
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'TAG_A'
        ),
        'PROJECTS' => array(
          'post_type' => 'projects',
          'field_name' => 'TAG_A'
        ),
        'INDIVIDUALS' => array(
          'post_type' => 'individuals',
          'field_name' => 'TAG_A'
        ),
      ),
      'tag_b' => array(
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'TAG_B'
        ),
        'PROJECTS' => array(
          'post_type' => 'projects',
          'field_name' => 'TAG_B'
        ),
        'INDIVIDUALS' => array(
          'post_type' => 'individuals',
          'field_name' => 'TAG_B'
        ),
      ),
      'tag_c' => array(
        'GROUPS' => array(
          'post_type' => 'groups',
          'field_name' => 'TAG_C'
        ),
        'PROJECTS' => array(
          'post_type' => 'projects',
          'field_name' => 'TAG_C'
        ),
        'INDIVIDUALS' => array(
          'post_type' => 'individuals',
          'field_name' => 'TAG_C'
        ),
      )
    );
    $all_objects = [];
    $updated_file_data = [];
    $updated_file_headers = [];
    // Read files
    foreach($field_types as $key => $field_type) {
      $file_data = read_file_from_field($field_type['file_field_name']);
      if($file_data) {
        $updated_file_data[] = (array($key, $file_data));
      }
    }
    // Create posts
    for($i=0; $i<count($updated_file_data); $i++) {
      $post_type = $updated_file_data[$i][0];
      $file_data = $updated_file_data[$i][1];
      delete_all_posts($post_type);
      $posts = create_posts($file_data, $post_type, $field_types);
      $updated_file_headers[$post_type] = $posts['header'];
      $all_objects[$post_type] = $posts['posts'];
    }
    // Update posts
    $errors = update_fields($all_objects, $updated_file_headers, $related_posts);
   
    
    //TEST POST
    $my_post = array(
      'post_title'    =>  'ALL OBJECTS',
      'post_status'   => 'publish',
      'post_author'   => 1,
      'post_type' => 'cities'
    );
    // Insert the post into the database
    $post_id = wp_insert_post( $my_post );
    update_field('name', $all_objects, $post_id);
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
function create_posts($post_data, $post_type, $field_types) {
  $post_objs = [];
  // First row is skipped and second row is file header
  $file_header = array_map('trim', $post_data[1]);
  $updated_fields['basic_fields'] = array_values(
    array_intersect($file_header, $field_types[$post_type]['basic_fields']));
  $updated_fields['location_fields'] = array_values(
    array_intersect($file_header, $field_types[$post_type]['location_fields']));
  $updated_fields['relationship_fields'] = array_values(
    array_intersect($file_header, $field_types[$post_type]['relationship_fields']));
  for ($i=2; $i < count($post_data); $i++) {
    $curr_post = $post_data[$i];
    $post_objs[$curr_post[0]] = create_new_post($curr_post, $post_type, $file_header);
  }
  return array(
    'header' => $updated_fields,
    'posts' => $post_objs,
  );
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

function update_fields($all_objects, $file_headers, $related_posts) {
  foreach($all_objects as $post_type => $posts) {
    update_basic_fields($posts, $file_headers[$post_type]['basic_fields']);
    update_location_fields($posts, $file_headers[$post_type]['location_fields']);
    update_relationship_fields($posts, $file_headers[$post_type]['relationship_fields'], 
      $all_objects, $related_posts[$post_type]);
  }
}

function update_basic_fields($posts, $fields_to_update) {
  foreach($posts as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    foreach($fields_to_update as $field) {
      update_field(strtolower($field), $post_data[$field], $post_id);
    }
    if (!get_field(strtolower($field), $post_id) || 
    get_field(strtolower($field), $post_id) !== $post_data[$field]) {
      $key = $post_data['NAME'];
      $GLOBALS['errors'][$key] = get_field(strtolower($field), $post_id) . ' does not match ' . $post_data[$field];
    }
  }
}

function update_location_fields($posts, $fields_to_update) {
  foreach($posts as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    foreach($fields_to_update as $field) {
      $address = explode(';', $post_data[$field]);
      $location = array('address' => $address[0], 'lat' => $address[1], 'lng' => $address[2]);
      update_field(strtolower($field), $location, $post_id);
      // TODO: Validate update of fields
    }
  }
}

function update_relationship_fields($posts, $fields_to_update, $all_objects, $related_posts) {
  foreach($posts as $post) {
    $post_id = $post['post_id'];
    $post_data = $post['data'];
    foreach($fields_to_update as $field) {
      $field_name = strtolower($field);   
      $related_post_type = $related_posts[$field]['post_type'];
      $related_field_name = strtolower($related_posts[$field]['field_name']);
      $related_post_ids = get_post_id($related_post_type, $post_data[$field], $all_objects);
      update_field($field_name, $related_post_ids, $post_id);
      // TODO: Validate update of fields
      // Bi-directional update
      foreach($related_post_ids as $related_post_id) {
        $curr = [];
        if (get_field($related_field_name, $related_post_id)) {
          $curr = get_field($related_field_name, $related_post_id);
        }
        $curr[] = $post_id;
        update_field($related_field_name, $curr, $related_post_id);
        // TODO: Validate update of fields
      }
    }
  }
}

// INPUT: Related Object Type, Related Object ID(s), All Objects array
// RETURN: Related Object Post ID(s)
function get_post_id($post_type, $object_id, $all_objects) {
  $objects = explode(',',$object_id);
  $return_id = [];
  while (!empty($objects)) {
    $object = trim(array_shift($objects));
    $post = $all_objects[$post_type][$object];
    $return_id[] = $post['post_id'];
  }
  return $return_id;
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

// TODO: Export $errors data to csv
function export_to_csv($errors) {
  header('Content-Type: text/csv');
  header('Content-Dispostion:attachment; filename="errors.csv"');
  $file = fopen("errors.csv", 'w');
  foreach($errors as $line) {
    fputcsv($file, $line);
  }
  fclose($file);
  readfile($file);
  exit();
}

add_action('acf/save_post', 'parse_excel_file', 20);