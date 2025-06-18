<?php
// If uninstall not called from WordPress, exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete all deals
$deals = get_posts(array(
    'post_type' => 'honey_hole_deal',
    'numberposts' => -1,
    'post_status' => 'any'
));

foreach ($deals as $deal) {
    // Delete all post meta
    $meta_keys = array(
        'deal_url',
        'deal_normal_link',
        'deal_image_url',
        'deal_sales_price',
        'deal_original_price',
        'deal_rating',
        'deal_category'
    );
    
    foreach ($meta_keys as $meta_key) {
        delete_post_meta($deal->ID, $meta_key);
    }
    
    // Delete the post
    wp_delete_post($deal->ID, true);
}

// Delete all plugin options
$options = array(
    'honey_hole_settings',
    'honey_hole_version',
    'honey_hole_installed',
    'honey_hole_video_url'
);

foreach ($options as $option) {
    delete_option($option);
}

// Delete all transients
global $wpdb;
$wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE '%honey_hole_%'");

// Delete all user meta
$wpdb->query("DELETE FROM $wpdb->usermeta WHERE meta_key LIKE '%honey_hole_%'");

// Delete the custom post type and its data
$wpdb->query("DELETE FROM $wpdb->posts WHERE post_type = 'honey_hole_deal'");
$wpdb->query("DELETE FROM $wpdb->postmeta WHERE post_id NOT IN (SELECT id FROM $wpdb->posts)");

// Delete the taxonomy and its terms
$terms = get_terms(array(
    'taxonomy' => 'deal_category',
    'hide_empty' => false
));

foreach ($terms as $term) {
    wp_delete_term($term->term_id, 'deal_category');
}

// Flush rewrite rules to clean up custom post type rules
flush_rewrite_rules(); 