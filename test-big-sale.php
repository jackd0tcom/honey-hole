<?php
/**
 * Test script for Big Sale feature
 * Run this in WordPress admin or via WP-CLI to test the functionality
 */

// Test if we're in WordPress
if (!defined('ABSPATH')) {
    echo "This script must be run within WordPress.\n";
    exit;
}

echo "=== Testing Big Sale Feature ===\n\n";

// Test 1: Check if Big Sale category exists
echo "1. Checking if 'Big Sale' category exists...\n";
$big_sale_term = get_term_by('name', 'Big Sale', 'deal_category');
if ($big_sale_term) {
    echo "   ✓ Big Sale category found (ID: {$big_sale_term->term_id})\n";
} else {
    echo "   ✗ Big Sale category not found. Creating it...\n";
    $result = wp_insert_term('Big Sale', 'deal_category');
    if (is_wp_error($result)) {
        echo "   ✗ Failed to create Big Sale category: " . $result->get_error_message() . "\n";
    } else {
        echo "   ✓ Big Sale category created (ID: {$result['term_id']})\n";
        $big_sale_term = get_term($result['term_id'], 'deal_category');
    }
}

// Test 2: Check if meta fields are accessible
echo "\n2. Testing meta field access...\n";
$test_post_id = wp_insert_post(array(
    'post_title' => 'Test Big Sale Deal',
    'post_type' => 'honey_hole_deal',
    'post_status' => 'draft'
));

if (!is_wp_error($test_post_id)) {
    echo "   ✓ Test post created (ID: {$test_post_id})\n";
    
    // Set category
    wp_set_object_terms($test_post_id, $big_sale_term->term_id, 'deal_category');
    
    // Test setting Big Sale meta fields
    update_post_meta($test_post_id, 'deal_description', 'This is a test Big Sale deal description');
    update_post_meta($test_post_id, 'deal_background_image', 'https://example.com/background.jpg');
    update_post_meta($test_post_id, 'deal_image_url', 'https://example.com/image.jpg');
    update_post_meta($test_post_id, 'deal_url', 'https://example.com/product');
    
    echo "   ✓ Big Sale meta fields set\n";
    
    // Test retrieving the fields
    $description = get_post_meta($test_post_id, 'deal_description', true);
    $background_image = get_post_meta($test_post_id, 'deal_background_image', true);
    
    if ($description === 'This is a test Big Sale deal description') {
        echo "   ✓ Description field working correctly\n";
    } else {
        echo "   ✗ Description field not working\n";
    }
    
    if ($background_image === 'https://example.com/background.jpg') {
        echo "   ✓ Background image field working correctly\n";
    } else {
        echo "   ✗ Background image field not working\n";
    }
    
    // Clean up test post
    wp_delete_post($test_post_id, true);
    echo "   ✓ Test post cleaned up\n";
    
} else {
    echo "   ✗ Failed to create test post: " . $test_post_id->get_error_message() . "\n";
}

// Test 3: Check REST API endpoint
echo "\n3. Testing REST API endpoint...\n";
$rest_url = rest_url('honey-hole/v1/deals');
echo "   REST API URL: {$rest_url}\n";

// Test 4: Check if meta boxes are properly registered
echo "\n4. Testing meta box registration...\n";
global $wp_meta_boxes;
if (isset($wp_meta_boxes['honey_hole_deal']['normal']['high']['honey_hole_deal_details'])) {
    echo "   ✓ Meta box properly registered\n";
} else {
    echo "   ✗ Meta box not found\n";
}

echo "\n=== Test Complete ===\n";
echo "\nTo test the full functionality:\n";
echo "1. Go to WordPress Admin > Honey Hole > Add New Deal\n";
echo "2. Select 'Big Sale' as the category\n";
echo "3. Verify that only Big Sale fields are shown\n";
echo "4. Fill in the fields and save\n";
echo "5. Check that the deal appears correctly on the frontend\n";
?>
