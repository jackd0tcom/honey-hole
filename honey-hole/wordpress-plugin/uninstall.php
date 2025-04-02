<?php
// If uninstall is not called from WordPress, exit
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
    // Delete associated image
    $image_id = get_post_meta($deal->ID, '_honey_hole_image_id', true);
    if ($image_id) {
        wp_delete_attachment($image_id, true);
    }
    
    // Delete the deal post
    wp_delete_post($deal->ID, true);
}

// Delete plugin options
delete_option('honey_hole_settings');

// Delete plugin transients
delete_transient('honey_hole_deals_cache');

// Delete user meta for visibility preferences
$users = get_users();
foreach ($users as $user) {
    delete_user_meta($user->ID, 'honey_hole_deal_visibility');
}

// Delete plugin capabilities from roles
$roles = array('administrator', 'editor', 'author');
foreach ($roles as $role) {
    $role_obj = get_role($role);
    if ($role_obj) {
        $role_obj->remove_cap('manage_honey_hole');
        $role_obj->remove_cap('edit_honey_hole_deal');
        $role_obj->remove_cap('edit_others_honey_hole_deal');
        $role_obj->remove_cap('publish_honey_hole_deal');
        $role_obj->remove_cap('read_honey_hole_deal');
        $role_obj->remove_cap('read_private_honey_hole_deal');
        $role_obj->remove_cap('delete_honey_hole_deal');
        $role_obj->remove_cap('delete_private_honey_hole_deal');
        $role_obj->remove_cap('delete_published_honey_hole_deal');
        $role_obj->remove_cap('delete_others_honey_hole_deal');
    }
}

// Flush rewrite rules to clean up custom post type rules
flush_rewrite_rules(); 