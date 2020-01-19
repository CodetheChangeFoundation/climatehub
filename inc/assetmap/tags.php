<?php
/**
 * Asset Map Tag A, B, C CPTs
 *
 * @package climatehub
 */

function asset_map_tag_cpt (){
  $labels = array(
   'name' => 'Tags',
   'singular_name' => 'Tag',
   'add_new' => 'Add tag',
   'all_items' => 'All tags',
   'add_new_item' => 'Add tag',
   'edit_item' => 'Edit tag',
   'new_item' => 'New tag',
   'view_item' => 'View tag',
   'search_item' => 'Search tag',
   'not_found' => 'No tag found',
   'not_found_in_trash' => 'No tag found in trash',
   'parent_item_colon' => 'Parent tag'
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
   'show_in_menu' => false,
   'rest_base' => 'tags',
   'rest_controller_class' => 'WP_REST_Posts_Controller',
   'supports' => array(
     'title',
     'custom-fields',
     'thumbnail',
     'revisions',
   ),
   'menu_position' => 5,
   'menu_icon' => 'dashicons-clipboard',
   'exclude_from_search' => false
 );
 register_post_type('tags',$args);
}
add_action('init','asset_map_tag_cpt');

function asset_map_tag_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_tags", 'asset_map_tag_add_acf', 10, 3);

function asset_map_tag_type_cpt (){
  $labels = array(
   'name' => 'Tag Types',
   'singular_name' => 'Tag Type',
   'add_new' => 'Add tag type',
   'all_items' => 'All tag types',
   'add_new_item' => 'Add tag type',
   'edit_item' => 'Edit tag type',
   'new_item' => 'New tag type',
   'view_item' => 'View tag type',
   'search_item' => 'Search tag type',
   'not_found' => 'No tag type found',
   'not_found_in_trash' => 'No tag type found in trash',
   'parent_item_colon' => 'Parent tag type'
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
   'show_in_menu' => false,
   'rest_base' => 'tag_types',
   'rest_controller_class' => 'WP_REST_Posts_Controller',
   'supports' => array(
     'title',
     'custom-fields',
     'thumbnail',
     'revisions',
   ),
   'menu_position' => 5,
   'menu_icon' => 'dashicons-clipboard',
   'exclude_from_search' => false
 );
 register_post_type('tag_types',$args);
}
add_action('init','asset_map_tag_type_cpt');

function asset_map_tag_type_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_tag_types", 'asset_map_tag_type_add_acf', 10, 3);