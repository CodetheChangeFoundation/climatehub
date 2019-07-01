<?php
/**
 * Asset Map Group CPT
 *
 * @package climatehub
 */

function asset_map_group_cpt (){
  $labels = array(
   'name' => 'Groups',
   'singular_name' => 'Group',
   'add_new' => 'Add group',
   'all_items' => 'All groups',
   'add_new_item' => 'Add group',
   'edit_item' => 'Edit group',
   'new_item' => 'New group',
   'view_item' => 'View group',
   'search_item' => 'Search groups',
   'not_found' => 'No groups found',
   'not_found_in_trash' => 'No groups found in trash',
   'parent_item_colon' => 'Parent group'
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
   'rest_base' => 'groups',
   'rest_controller_class' => 'WP_REST_Posts_Controller',
   'supports' => array(
     'title',
     'custom-fields',
     'thumbnail',
     'revisions',
   ),
   'menu_position' => 7,
   'menu_icon' => 'dashicons-clipboard',
   'exclude_from_search' => false
 );
 register_post_type('groups',$args);
}
add_action('init','asset_map_group_cpt');

function asset_map_group_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_groups", 'asset_map_group_add_acf', 10, 3);