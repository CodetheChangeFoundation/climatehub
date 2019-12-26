<?php
/**
 * Asset Map Tag A, B, C CPTs
 *
 * @package climatehub
 */

//  TAG A
function asset_map_tag_a_cpt (){
  $labels = array(
   'name' => 'Tag A',
   'singular_name' => 'Tag A',
   'add_new' => 'Add tag a',
   'all_items' => 'All tag a',
   'add_new_item' => 'Add tag a',
   'edit_item' => 'Edit tag a',
   'new_item' => 'New tag a',
   'view_item' => 'View tag a',
   'search_item' => 'Search tag a',
   'not_found' => 'No tag a found',
   'not_found_in_trash' => 'No tag a found in trash',
   'parent_item_colon' => 'Parent tag a'
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
   'rest_base' => 'tag_a',
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
 register_post_type('tag_a',$args);
}
add_action('init','asset_map_tag_a_cpt');

function asset_map_tag_a_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_tag_a", 'asset_map_tag_a_add_acf', 10, 3);

//  TAG B
function asset_map_tag_b_cpt (){
  $labels = array(
   'name' => 'Tag B',
   'singular_name' => 'Tag B',
   'add_new' => 'Add tag b',
   'all_items' => 'All tag b',
   'add_new_item' => 'Add tag b',
   'edit_item' => 'Edit tag b',
   'new_item' => 'New tag b',
   'view_item' => 'View tag b',
   'search_item' => 'Search tag b',
   'not_found' => 'No tag b found',
   'not_found_in_trash' => 'No tag b found in trash',
   'parent_item_colon' => 'Parent tag b'
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
   'rest_base' => 'tag_b',
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
 register_post_type('tag_b',$args);
}
add_action('init','asset_map_tag_b_cpt');

function asset_map_tag_b_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_tag_b", 'asset_map_tag_b_add_acf', 10, 3);

//  TAG C
function asset_map_tag_c_cpt (){
  $labels = array(
   'name' => 'Tag C',
   'singular_name' => 'Tag C',
   'add_new' => 'Add tag c',
   'all_items' => 'All tag c',
   'add_new_item' => 'Add tag c',
   'edit_item' => 'Edit tag c',
   'new_item' => 'New tag c',
   'view_item' => 'View tag c',
   'search_item' => 'Search tag c',
   'not_found' => 'No tag c found',
   'not_found_in_trash' => 'No tag c found in trash',
   'parent_item_colon' => 'Parent tag c'
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
   'rest_base' => 'tag_c',
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
 register_post_type('tag_c',$args);
}
add_action('init','asset_map_tag_c_cpt');

function asset_map_tag_c_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_tag_c", 'asset_map_tag_c_add_acf', 10, 3);