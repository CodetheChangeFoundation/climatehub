<?php
/**
 * Asset Map - Bi-directional update of ACF relationship fields 
 *
 * @package climatehub
 */

//https://github.com/Hube2/acf-filters-and-functions/blob/master/acf-reciprocal-relationship.php#L40
function acf_bidirectional($value, $post_id, $field) {

    $key_a = 'field_5d1a74084ab10'; 
    $key_b = 'field_5d1a72fc145b7'; 

    if ($key_a != $field['key']) {
        $temp = $key_a;
        $key_a = $key_b;
        $key_b = $temp;
    }

    $field_a = acf_get_field($key_a);
    $field_b = acf_get_field($key_b);
    $name_a = $field_a['name'];
    $name_b = $field_b['name'];
    $old = get_post_meta($post_id, $name_a, true);
    if (!is_array($old)) {
        if (empty($old)) {
            $old = array();
        } else {
            $old = array($old);
        }
    }
 
    $new = $value;
    if (!is_array($new)) {
        if (empty($new)) {
            $new = array();
        } else {
            $new = array($new);
        }
    }

    // get differences
    $add = array_diff($new, $old);
    // $add = $new;
    $delete = array_diff($old, $new);

    $add = array_values($add);
    $delete = array_values($delete);

    if (!count($add) && !count($delete)) {
        return $value;
    }
    // loop through all of the posts that need to have
    // the recipricol relationship removed
    for ($i=0; $i<count($delete); $i++) {
        $related = get_post_meta($delete[$i], $name_b, true);
        if (!is_array($related)) {
            if (empty($related)) {
                $related = array();
            } else {
                $related = array($related);
            }
        }

        $related = array_diff($related, array($post_id));
        update_post_meta($delete[$i], $name_b, $related);
        update_post_meta($delete[$i], '_'.$name_b, $key_b);
    }

    for ($i=0; $i<count($add); $i++) {
        $related = get_post_meta($add[$i], $name_b, true);
        if (!is_array($related)) {
            if (empty($related)) {
                $related = array();
            } else {
                $related = array($related);
            }
        }
        if (!in_array($post_id, $related)) {
            $related[] = $post_id;
        }
        // update value
        update_post_meta($add[$i], $name_b, $related);
        update_post_meta($add[$i], '_'.$name_b, $key_b);
    }
    return $value;
} 

add_filter('acf/update_value/key=field_5d1a74084ab10', 'acf_reciprocal_relationship', 10, 3); //edit this with your ID - field one
add_filter('acf/update_value/key=field_5d1a72fc145b7', 'acf_reciprocal_relationship', 10, 3); //edit this with your ID - field two
