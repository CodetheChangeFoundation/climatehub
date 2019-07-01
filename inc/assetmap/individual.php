<?php
/**
 * Asset Map Individual CPT
 *
 * @package climatehub
 */

function asset_map_individual_cpt (){
  $labels = array(
   'name' => 'Individuals',
   'singular_name' => 'Individual',
   'add_new' => 'Add individual',
   'all_items' => 'All individuals',
   'add_new_item' => 'Add individual',
   'edit_item' => 'Edit individual',
   'new_item' => 'New individual',
   'view_item' => 'View individual',
   'search_item' => 'Search individuals',
   'not_found' => 'No individuals found',
   'not_found_in_trash' => 'No individuals found in trash',
   'parent_item_colon' => 'Parent individual'
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
   'rest_base' => 'individuals',
   'rest_controller_class' => 'WP_REST_Posts_Controller',
   'supports' => array(
     'title',
     'custom-fields',
     'thumbnail',
     'revisions',
   ),
   'menu_position' => 9,
   'menu_icon' => 'dashicons-clipboard',
   'exclude_from_search' => false
 );
 register_post_type('individuals',$args);
}
add_action('init','asset_map_individual_cpt');

function asset_map_individual_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_individuals", 'asset_map_individual_add_acf', 10, 3);