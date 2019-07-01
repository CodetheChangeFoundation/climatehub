<?php
/**
 * Asset Map project CPT
 *
 * @package climatehub
 */

function asset_map_project_cpt (){
  $labels = array(
   'name' => 'Projects',
   'singular_name' => 'Project',
   'add_new' => 'Add project',
   'all_items' => 'All projects',
   'add_new_item' => 'Add project',
   'edit_item' => 'Edit project',
   'new_item' => 'New project',
   'view_item' => 'View project',
   'search_item' => 'Search projects',
   'not_found' => 'No projects found',
   'not_found_in_trash' => 'No projects found in trash',
   'parent_item_colon' => 'Parent project'
 );
 $args = array(
   'labels' => $labels,
   'public' => true,
   'has_archive' => false,
   'publicly_queryable' => true,
   'query_var' => true,
   'rewrite' => true,
   'capability_type' => 'post',
   'hierarchical' => false,
   'show_in_rest' => true,
   'rest_base' => 'projects',
   'rest_controller_class' => 'WP_REST_Posts_Controller',
   'supports' => array(
     'title',
     'custom-fields',
     'thumbnail',
     'revisions',
   ),
   'menu_position' => 8,
   'menu_icon' => 'dashicons-clipboard',
   'exclude_from_search' => false
 );
 register_post_type('projects',$args);
}
add_action('init','asset_map_project_cpt');

function asset_map_project_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_projects", 'asset_map_project_add_acf', 10, 3);