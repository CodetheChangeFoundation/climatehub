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

// Add Id Column in Wordpress Backend
add_filter( 'manage_projects_posts_columns', 'climatehub_filter_project_columns' );
function climatehub_filter_project_columns( $columns ) {
  $columns = array(
      'project_id' => __('Project ID'),
      'title' => __( 'Title' ),
      'date' => __( 'Date published' )
    );
  return $columns;
}

add_action( 'manage_projects_posts_custom_column', 'climatehub_projects_column', 10, 2);
function climatehub_projects_column( $column, $post_id ) {
  $column_names = ['project_id'];
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

add_filter( 'manage_edit-projects_sortable_columns', 'climatehub_projects_sortable_columns');
function climatehub_projects_sortable_columns( $columns ) {
  $columns['project_id'] = 'project_id';
  return $columns;
}

add_action( 'pre_get_posts', 'climatehub_projects_orderby' );
function climatehub_projects_orderby( $query ) {
  if( ! is_admin() || ! $query->is_main_query() ) {
    return;
  }

  if ( 'project_id' === $query->get( 'orderby') ) {
    $query->set( 'orderby', 'meta_value' );
    $query->set( 'meta_key', 'project_id' );
    $query->set( 'meta_type', 'numeric' );
  }
}

add_action('admin_head', 'projects_column_width');

function projects_column_width() {
    echo '<style type="text/css">';
    echo '#project_id { text-align: center; width:100px !important; overflow:hidden }';
    echo '</style>';
}