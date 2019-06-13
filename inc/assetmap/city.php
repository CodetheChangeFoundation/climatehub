<?php
/**
 * Asset Map City CPT
 *
 * @package climatehub
 */

function asset_map_city_cpt (){
  $labels = array(
   'name' => 'Cities',
   'singular_name' => 'City',
   'add_new' => 'Add city',
   'all_items' => 'All cities',
   'add_new_item' => 'Add city',
   'edit_item' => 'Edit city',
   'new_item' => 'New city',
   'view_item' => 'View city',
   'search_item' => 'Search cities',
   'not_found' => 'No cities found',
   'not_found_in_trash' => 'No cities found in trash',
   'parent_item_colon' => 'Parent city'
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
   'rest_base' => 'cities',
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
 register_post_type('cities',$args);
}
add_action('init','asset_map_city_cpt');

function asset_map_cities_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_cities", 'asset_map_cities_add_acf', 10, 3);
