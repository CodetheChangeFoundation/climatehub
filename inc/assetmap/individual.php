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
   'show_in_menu' => false,
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

// Add Id Column in Wordpress Backend
add_filter( 'manage_individuals_posts_columns', 'climatehub_filter_individual_columns' );
function climatehub_filter_individual_columns( $columns ) {
  $columns = array(
      'individual_id' => __('Individual ID'),
      'title' => __( 'Title' ),
      'date' => __( 'Date published' )
    );
  return $columns;
}

add_action( 'manage_individuals_posts_custom_column', 'climatehub_individuals_column', 10, 2);
function climatehub_individuals_column( $column, $post_id ) {
  $column_names = ['individual_id'];
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

add_filter( 'manage_edit-individuals_sortable_columns', 'climatehub_individuals_sortable_columns');
function climatehub_individuals_sortable_columns( $columns ) {
  $columns['individual_id'] = 'individual_id';
  return $columns;
}

add_action( 'pre_get_posts', 'climatehub_individuals_orderby' );
function climatehub_individuals_orderby( $query ) {
  if( ! is_admin() || ! $query->is_main_query() ) {
    return;
  }

  if ( 'individual_id' === $query->get( 'orderby') ) {
    $query->set( 'orderby', 'meta_value' );
    $query->set( 'meta_key', 'individual_id' );
    $query->set( 'meta_type', 'numeric' );
  }
}

add_action('admin_head', 'individuals_column_width');

function individuals_column_width() {
    echo '<style type="text/css">';
    echo '#individual_id { text-align: center; width:125px !important; overflow:hidden }';
    echo '</style>';
}