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
   'show_in_menu' => false,
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

// REST API
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

// Add Id Column in Wordpress Backend
add_filter( 'manage_groups_posts_columns', 'climatehub_filter_posts_columns' );
function climatehub_filter_posts_columns( $columns ) {
  $columns = array(
      'group_id' => __('Group ID'),
      'title' => __( 'Title' ),
      'date' => __( 'Date published' )
    );
  return $columns;
}

add_action( 'manage_groups_posts_custom_column', 'climatehub_groups_column', 10, 2);
function climatehub_groups_column( $column, $post_id ) {
  $column_names = ['group_id'];
  foreach ($column_names as $key => $value) {
    if ( $value === $column ) {
      $column_name = get_field($value);
      if ( ! $column_name ) {
        _e( 'n/a' );  
      } else {
        echo $column_name;
      }
    }
  }
}

add_filter( 'manage_edit-groups_sortable_columns', 'climatehub_groups_sortable_columns');
function climatehub_groups_sortable_columns( $columns ) {
  $columns['group_id'] = 'group_id';
  return $columns;
}

add_action( 'pre_get_posts', 'climatehub_posts_orderby' );
function climatehub_posts_orderby( $query ) {
  if( ! is_admin() || ! $query->is_main_query() ) {
    return;
  }

  if ( 'group_id' === $query->get( 'orderby') ) {
    $query->set( 'orderby', 'meta_value' );
    $query->set( 'meta_key', 'group_id' );
    $query->set( 'meta_type', 'numeric' );
  }
}

add_action('admin_head', 'my_column_width');

function my_column_width() {
    echo '<style type="text/css">';
    echo '#group_id { text-align: center; width:100px !important; overflow:hidden }';
    echo '</style>';
}