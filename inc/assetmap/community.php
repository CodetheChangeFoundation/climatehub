<?php
/**
 * Asset Map Community CPT
 *
 * @package climatehub
 */

function asset_map_community_cpt (){
  $labels = array(
   'name' => 'Communities',
   'singular_name' => 'Community',
   'add_new' => 'Add community',
   'all_items' => 'All communities',
   'add_new_item' => 'Add community',
   'edit_item' => 'Edit community',
   'new_item' => 'New community',
   'view_item' => 'View community',
   'search_item' => 'Search communities',
   'not_found' => 'No communities found',
   'not_found_in_trash' => 'No communities found in trash',
   'parent_item_colon' => 'Parent community'
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
   'rest_base' => 'communities',
   'rest_controller_class' => 'WP_REST_Posts_Controller',
   'supports' => array(
     'title',
     'custom-fields',
     'thumbnail',
     'revisions',
   ),
   'menu_position' => 6,
   'menu_icon' => 'dashicons-clipboard',
   'exclude_from_search' => false
 );
 register_post_type('communities',$args);
}
add_action('init','asset_map_community_cpt');

function asset_map_community_add_acf($data, $post, $request) {
  $_data = $data->data;
  $fields = get_fields($post->ID);
  foreach ($fields as $key => $value) {
    $_data[$key] = get_field($key, $post->ID);
  }
  $data->data = $_data;
  return $data;
}
add_filter("rest_prepare_communities", 'asset_map_community_add_acf', 10, 3);