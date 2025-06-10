<?php

function honey_hole_handle_image_upload()
{
    if (!isset($_POST['deal_id']) || !isset($_FILES['image'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_image_upload')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }

    $deal_id = intval($_POST['deal_id']);
    $file = $_FILES['image'];

    // Check file type
    $allowed_types = array('image/jpeg', 'image/png', 'image/gif');
    if (!in_array($file['type'], $allowed_types)) {
        wp_send_json_error('Invalid file type. Only JPG, PNG, and GIF files are allowed.');
    }

    // Upload the file
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $attachment_id = media_handle_upload('image', 0);

    if (is_wp_error($attachment_id)) {
        wp_send_json_error($attachment_id->get_error_message());
    }

    // Get the URL of the uploaded image
    $image_url = wp_get_attachment_url($attachment_id);

    // Update the deal's image URL
    update_post_meta($deal_id, 'deal_image_url', $image_url);

    wp_send_json_success(array(
        'image_url' => $image_url
    ));
}
add_action('wp_ajax_honey_hole_upload_image', 'honey_hole_handle_image_upload');

// Add AJAX handler for updating deal order
function honey_hole_update_deal_order()
{
    if (!isset($_POST['updates']) || !isset($_POST['nonce'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_update_order')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }

    $updates = json_decode(stripslashes($_POST['updates']), true);
    if (!is_array($updates)) {
        wp_send_json_error('Invalid updates data');
    }

    $success = true;

    foreach ($updates as $update) {
        $deal_id = intval($update['deal_id']);
        $new_order = intval($update['new_order']);

        $result = wp_update_post(array(
            'ID' => $deal_id,
            'menu_order' => $new_order
        ));

        if (is_wp_error($result)) {
            $success = false;
            break;
        }
    }

    if ($success) {
        wp_send_json_success();
    } else {
        wp_send_json_error('Failed to update some deal orders');
    }
}
add_action('wp_ajax_honey_hole_update_order', 'honey_hole_update_deal_order');

function honey_hole_save_visibility_changes()
{
    if (!isset($_POST['changes']) || !isset($_POST['nonce'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_visibility_toggle')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }

    $changes = $_POST['changes'];
    $success = true;

    foreach ($changes as $change) {
        $deal_id = intval($change['deal_id']);
        $visibility = rest_sanitize_boolean($change['visibility']);

        $result = update_post_meta($deal_id, 'deal_visibility', $visibility);
        if ($result === false) {
            $success = false;
            break;
        }
    }

    if ($success) {
        wp_send_json_success();
    } else {
        wp_send_json_error('Failed to save some visibility changes');
    }
}
add_action('wp_ajax_honey_hole_save_visibility_changes', 'honey_hole_save_visibility_changes');

// Add AJAX handler for getting deal order
function honey_hole_get_deal_order()
{
    if (!isset($_POST['nonce'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_update_order')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }

    // Debug: Log the query parameters
    error_log('Fetching deals with orderby: menu_order, order: ASC');

    $deals = get_posts(array(
        'post_type' => 'honey_hole_deal',
        'posts_per_page' => -1,
        'orderby' => array(
            'menu_order' => 'ASC',
            'date' => 'DESC' // Fallback to date if menu_order is the same
        ),
        'suppress_filters' => false // Ensure filters are applied
    ));

    // Debug: Log the results
    error_log('Found ' . count($deals) . ' deals');
    foreach ($deals as $deal) {
        error_log("Deal ID: {$deal->ID}, Menu Order: {$deal->menu_order}");
    }

    $order = array();
    foreach ($deals as $deal) {
        $order[] = array(
            'id' => $deal->ID,
            'order' => $deal->menu_order
        );
    }

    wp_send_json_success($order);
}
add_action('wp_ajax_honey_hole_get_order', 'honey_hole_get_deal_order');
