<?php

/**
 * Plugin Name: Honey Hole
 * Description: A plugin for managing and displaying outdoor gear deals
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: honey-hole
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('HONEY_HOLE_VERSION', '1.0.0');
define('HONEY_HOLE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('HONEY_HOLE_PLUGIN_URL', plugin_dir_url(__FILE__));

// Add CORS headers for development
function honey_hole_add_cors_headers()
{
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}
add_action('init', 'honey_hole_add_cors_headers');

// Register Custom Post Type for Deals
function honey_hole_register_post_type()
{
    $labels = array(
        'name'               => 'Deals',
        'singular_name'      => 'Deal',
        'menu_name'          => 'Deals',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Deal',
        'edit_item'          => 'Edit Deal',
        'new_item'           => 'New Deal',
        'view_item'          => 'View Deal',
        'search_items'       => 'Search Deals',
        'not_found'          => 'No deals found',
        'not_found_in_trash' => 'No deals found in Trash',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'deals'),
        'capability_type'     => 'post',
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-tag',
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
        'show_in_rest'        => true, // Enable Gutenberg editor
    );

    register_post_type('honey_hole_deal', $args);

    // Register Deal Categories
    register_taxonomy('deal_category', 'honey_hole_deal', array(
        'label'        => 'Deal Categories',
        'hierarchical' => true,
        'show_ui'      => true,
        'show_in_rest' => true,
        'rewrite'      => array('slug' => 'deal-category'),
    ));
}
add_action('init', 'honey_hole_register_post_type');

// Register Custom Meta Fields
function honey_hole_register_meta()
{
    register_post_meta('honey_hole_deal', 'deal_price', array(
        'type'              => 'number',
        'description'       => 'The price of the deal',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
    ));

    register_post_meta('honey_hole_deal', 'deal_url', array(
        'type'              => 'string',
        'description'       => 'The URL to the deal',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'esc_url_raw',
    ));

    register_post_meta('honey_hole_deal', 'deal_visibility', array(
        'type'              => 'boolean',
        'description'       => 'Whether the deal is visible on the frontend',
        'single'            => true,
        'show_in_rest'      => true,
        'default'           => true,
        'sanitize_callback' => 'rest_sanitize_boolean',
    ));
}
add_action('init', 'honey_hole_register_meta');

// Register REST API endpoints
function honey_hole_register_rest_routes()
{
    register_rest_route('honey-hole/v1', '/deals', array(
        'methods'             => 'GET',
        'callback'           => 'honey_hole_get_deals',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'honey_hole_register_rest_routes');

// Callback function to get deals
function honey_hole_get_deals($request)
{
    $args = array(
        'post_type'      => 'honey_hole_deal',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'menu_order',
        'order'          => 'ASC'
    );

    $query = new WP_Query($args);
    $deals = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $deals[] = array(
                'id'              => get_the_ID(),
                'title'           => get_the_title(),
                'description'     => get_the_excerpt(),
                'image_url'       => get_the_post_thumbnail_url(get_the_ID(), 'full'),
                'price'           => get_post_meta(get_the_ID(), 'deal_price', true),
                'expiration_date' => get_post_meta(get_the_ID(), 'deal_expiration', true),
                'deal_url'        => get_post_meta(get_the_ID(), 'deal_url', true),
                'categories'      => wp_get_post_terms(get_the_ID(), 'deal_category', array('fields' => 'names')),
            );
        }
    }

    wp_reset_postdata();
    return rest_ensure_response($deals);
}

// Enqueue admin scripts and styles
function honey_hole_admin_enqueue_scripts($hook)
{
    // Check if we're on a Honey Hole admin page
    if (strpos($hook, 'honey-hole') === false) {
        return;
    }

    wp_enqueue_style(
        'honey-hole-admin',
        HONEY_HOLE_PLUGIN_URL . 'admin/css/admin.css',
        array(),
        HONEY_HOLE_VERSION
    );

    wp_enqueue_script(
        'honey-hole-admin',
        HONEY_HOLE_PLUGIN_URL . 'admin/js/admin.js',
        array('jquery', 'jquery-ui-sortable'),
        HONEY_HOLE_VERSION,
        true
    );

    wp_localize_script('honey-hole-admin', 'honeyHoleAdmin', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('honey_hole_image_upload'),
        'bulk_nonce' => wp_create_nonce('honey_hole_bulk_action'),
        'order_nonce' => wp_create_nonce('honey_hole_update_order')
    ));
}
add_action('admin_enqueue_scripts', 'honey_hole_admin_enqueue_scripts');

// Activation hook
function honey_hole_activate()
{
    honey_hole_register_post_type();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'honey_hole_activate');

// Deactivation hook
function honey_hole_deactivate()
{
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'honey_hole_deactivate');

// Add admin menu
function honey_hole_add_admin_menu()
{
    add_menu_page(
        'Honey Hole Deals', // Page title
        'Honey Hole', // Menu title
        'manage_options', // Capability required
        'honey-hole', // Menu slug
        'honey_hole_admin_page', // Function to render the page
        'dashicons-tag', // Icon
        30 // Position
    );

    add_submenu_page(
        'honey-hole', // Parent slug
        'Add New Deal', // Page title
        'Add New Deal', // Menu title
        'manage_options', // Capability required
        'honey-hole-add-deal', // Menu slug
        'honey_hole_add_deal_page' // Function to render the page
    );

    add_submenu_page(
        'honey-hole', // Parent slug
        'Manage Categories', // Page title
        'Categories', // Menu title
        'manage_options', // Capability required
        'honey-hole-categories', // Menu slug
        'honey_hole_categories_page' // Function to render the page
    );

    // Add hidden submenu for edit page
    add_submenu_page(
        null, // Parent slug (null makes it hidden)
        'Edit Deal', // Page title
        'Edit Deal', // Menu title
        'manage_options', // Capability required
        'honey-hole-edit-deal', // Menu slug
        'honey_hole_edit_deal_page' // Function to render the page
    );

    add_submenu_page(
        'honey-hole', // Parent slug
        'Import Deals', // Page title
        'Import Deals', // Menu title
        'manage_options', // Capability required
        'honey-hole-import', // Menu slug
        'honey_hole_import_page' // Function to render the page
    );
}
add_action('admin_menu', 'honey_hole_add_admin_menu');

// Render main admin page
function honey_hole_admin_page()
{
?>
    <div class="wrap">
        <h1>Honey Hole Deals</h1>
        <div class="honey-hole-admin">
            <div class="honey-hole-menu-container">
                <div class="honey-hole-actions">
                    <a href="<?php echo admin_url('admin.php?page=honey-hole-add-deal'); ?>" class="button button-primary button-hero">Add Deal</a>
                    <button type="button" id="save-order" class="button button-primary" style="display: none;">Save Order Changes</button>
                </div>
                <div class="honey-hole-stats">
                    <div class="stat-box">
                        <span class="stat-label">Active Deals</span>
                        <span class="stat-value"><?php echo honey_hole_get_active_deals_count(); ?></span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Hidden Deals</span>
                        <span class="stat-value"><?php echo honey_hole_get_hidden_deals_count(); ?></span>
                    </div>
                </div>
            </div>
            <?php honey_hole_render_deals_table(); ?>
            <div class="honey-hole-danger-zone">
                <h3>Danger Zone</h3>
                <form method="post" action="">
                    <?php wp_nonce_field('honey_hole_delete_all', 'honey_hole_nonce'); ?>
                    <input type="hidden" name="action" value="delete_all_deals">
                    <button type="submit" class="button button-secondary" onclick="return confirm('Are you sure you want to delete all deals? This action cannot be undone!')">Delete All Deals</button>
                </form>
            </div>
        </div>
    </div>
<?php
}

// Add handler for delete all deals
function honey_hole_handle_delete_all_deals()
{
    if (!isset($_POST['action']) || $_POST['action'] !== 'delete_all_deals') {
        return;
    }

    if (!isset($_POST['honey_hole_nonce']) || !wp_verify_nonce($_POST['honey_hole_nonce'], 'honey_hole_delete_all')) {
        wp_die('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_die('Insufficient permissions');
    }

    // Get all deals
    $deals = get_posts(array(
        'post_type' => 'honey_hole_deal',
        'post_status' => 'publish',
        'posts_per_page' => -1
    ));

    $deleted_count = 0;
    foreach ($deals as $deal) {
        if (wp_delete_post($deal->ID, true)) {
            $deleted_count++;
        }
    }

    wp_redirect(add_query_arg('message', 'all_deals_deleted', admin_url('admin.php?page=honey-hole')));
    exit;
}
add_action('admin_init', 'honey_hole_handle_delete_all_deals');

// Render add new deal page
function honey_hole_add_deal_page()
{
?>
    <div class="wrap">
        <h1>Add New Deal</h1>
        <form id="honey-hole-deal-form" method="post" action="">
            <?php wp_nonce_field('honey_hole_add_deal', 'honey_hole_nonce'); ?>
            <div class="honey-hole-form-container">
                <div class="honey-hole-form-section">
                    <h2>Deal Information</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-title">Title *</label>
                        <input type="text" id="deal-title" name="deal_title" required>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-original-price">Original Price *</label>
                        <div class="price-input-wrapper">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="deal-original-price" name="deal_original_price" step="0.01" min="0" required>
                        </div>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-sales-price">Sales Price *</label>
                        <div class="price-input-wrapper">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="deal-sales-price" name="deal_sales_price" step="0.01" min="0" required>
                        </div>
                    </div>
                    <div class="honey-hole-form-field">
                        <label>Discount</label>
                        <div class="discount-display">
                            <span id="discount-percentage">0</span>% off
                        </div>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-rating">Rating</label>
                        <div class="rating-input">
                            <input type="number" id="deal-rating" name="deal_rating" min="0" max="5" step="0.5" value="0">
                            <div class="rating-stars">
                                <span class="star" data-value="1">★</span>
                                <span class="star" data-value="2">★</span>
                                <span class="star" data-value="3">★</span>
                                <span class="star" data-value="4">★</span>
                                <span class="star" data-value="5">★</span>
                            </div>
                        </div>
                        <p class="description">Rate the deal from 0 to 5 stars</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-url">Deal URL *</label>
                        <input type="url" id="deal-url" name="deal_url" required>
                    </div>
                </div>

                <div class="honey-hole-form-section">
                    <h2>Deal Details</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-description">Description</label>
                        <textarea id="deal-description" name="deal_description" rows="5"></textarea>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-category">Category *</label>
                        <select id="deal-category" name="deal_category" required>
                            <option value="">Select a category</option>
                            <?php
                            $categories = get_terms(array(
                                'taxonomy' => 'deal_category',
                                'hide_empty' => false,
                            ));
                            foreach ($categories as $category) {
                                echo '<option value="' . esc_attr($category->term_id) . '">' . esc_html($category->name) . '</option>';
                            }
                            ?>
                        </select>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-tags">Tags</label>
                        <input type="text" id="deal-tags" name="deal_tags" class="honey-hole-tags-input" placeholder="Add tags (comma separated)">
                        <div class="honey-hole-tags-container"></div>
                        <p class="description">Enter tags separated by commas (e.g., camping, hiking, backpacking)</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-image">Deal Image URL *</label>
                        <input type="url" id="deal-image-url" name="deal_image_url" placeholder="Enter image URL" required>
                        <p class="description">Enter the direct URL to the product image</p>
                    </div>
                </div>
            </div>
            <div class="honey-hole-form-actions">
                <button type="submit" class="button button-primary">Save Deal</button>
                <a href="<?php echo admin_url('admin.php?page=honey-hole'); ?>" class="button">Cancel</a>
            </div>
        </form>
    </div>
<?php
}

// Add Avantlink Settings
function honey_hole_register_settings()
{
    register_setting('honey_hole_options', 'honey_hole_avantlink_username');
    register_setting('honey_hole_options', 'honey_hole_avantlink_password');
    register_setting('honey_hole_options', 'honey_hole_avantlink_website_id');
}
add_action('admin_init', 'honey_hole_register_settings');

// Add Avantlink settings page
function honey_hole_add_settings_page()
{
    add_submenu_page(
        'honey-hole',
        'Avantlink Settings',
        'Avantlink Settings',
        'manage_options',
        'honey-hole-settings',
        'honey_hole_settings_page'
    );
}
add_action('admin_menu', 'honey_hole_add_settings_page');

// Render settings page
function honey_hole_settings_page()
{
?>
    <div class="wrap">
        <h1>Avantlink Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('honey_hole_options');
            do_settings_sections('honey_hole_options');
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Avantlink Username</th>
                    <td>
                        <input type="text" name="honey_hole_avantlink_username"
                            value="<?php echo esc_attr(get_option('honey_hole_avantlink_username')); ?>"
                            class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">Avantlink Password</th>
                    <td>
                        <input type="password" name="honey_hole_avantlink_password"
                            value="<?php echo esc_attr(get_option('honey_hole_avantlink_password')); ?>"
                            class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">Website ID</th>
                    <td>
                        <input type="text" name="honey_hole_avantlink_website_id"
                            value="<?php echo esc_attr(get_option('honey_hole_avantlink_website_id')); ?>"
                            class="regular-text">
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// Function to convert URL to Avantlink affiliate link
function honey_hole_convert_to_affiliate_link($url)
{
    $username = get_option('honey_hole_avantlink_username');
    $password = get_option('honey_hole_avantlink_password');
    $website_id = get_option('honey_hole_avantlink_website_id');

    if (empty($username) || empty($password) || empty($website_id)) {
        return $url; // Return original URL if credentials are not set
    }

    // Avantlink API endpoint
    $api_url = 'https://www.avantlink.com/api/affiliate/links';

    // Prepare the request data
    $data = array(
        'username' => $username,
        'password' => $password,
        'website_id' => $website_id,
        'url' => $url,
        'format' => 'json'
    );

    // Make the API request
    $response = wp_remote_post($api_url, array(
        'body' => $data,
        'timeout' => 15
    ));

    if (is_wp_error($response)) {
        return $url; // Return original URL if there's an error
    }

    $body = wp_remote_retrieve_body($response);
    $result = json_decode($body, true);

    if (isset($result['affiliate_url'])) {
        return $result['affiliate_url'];
    }

    return $url; // Return original URL if conversion fails
}

// Modify the form submission handler to handle both new and edit cases
function honey_hole_handle_form_submission()
{
    if (!isset($_POST['honey_hole_nonce'])) {
        return;
    }

    // Check if this is an edit or new submission
    $is_edit = isset($_POST['deal_id']);
    $nonce_action = $is_edit ? 'honey_hole_edit_deal' : 'honey_hole_add_deal';

    if (!wp_verify_nonce($_POST['honey_hole_nonce'], $nonce_action)) {
        return;
    }

    if (!current_user_can('manage_options')) {
        return;
    }

    // Convert the deal URL to an affiliate link
    $deal_url = esc_url_raw($_POST['deal_url']);
    $affiliate_url = honey_hole_convert_to_affiliate_link($deal_url);

    $deal_data = array(
        'post_title'    => sanitize_text_field($_POST['deal_title']),
        'post_content'  => wp_kses_post($_POST['deal_description'] ?? ''),
        'post_status'   => 'publish',
        'post_type'     => 'honey_hole_deal',
    );

    if ($is_edit) {
        $deal_data['ID'] = intval($_POST['deal_id']);
        $post_id = wp_update_post($deal_data);
    } else {
        $post_id = wp_insert_post($deal_data);
    }

    if (!is_wp_error($post_id)) {
        update_post_meta($post_id, 'deal_original_price', floatval($_POST['deal_original_price']));
        update_post_meta($post_id, 'deal_sales_price', floatval($_POST['deal_sales_price']));
        update_post_meta($post_id, 'deal_rating', floatval($_POST['deal_rating']));
        update_post_meta($post_id, 'deal_url', $affiliate_url);
        update_post_meta($post_id, 'deal_original_url', $deal_url);
        update_post_meta($post_id, 'deal_image_url', esc_url_raw($_POST['deal_image_url']));

        if (isset($_POST['deal_category'])) {
            wp_set_object_terms($post_id, intval($_POST['deal_category']), 'deal_category');
        }

        // Save tags
        if (isset($_POST['deal_tags'])) {
            $tags = array_map('trim', explode(',', sanitize_text_field($_POST['deal_tags'])));
            wp_set_object_terms($post_id, $tags, 'post_tag');
        }

        wp_redirect(admin_url('admin.php?page=honey-hole&message=' . ($is_edit ? 'deal_updated' : 'deal_added')));
        exit;
    }
}

// Add action hook for form submission
add_action('admin_init', 'honey_hole_handle_form_submission');

// Helper function to get active deals count
function honey_hole_get_active_deals_count()
{
    $args = array(
        'post_type' => 'honey_hole_deal',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'deal_visibility',
                'value' => '1',
                'compare' => '=',
            ),
        ),
    );
    $query = new WP_Query($args);
    return $query->found_posts;
}

// Helper function to get hidden deals count
function honey_hole_get_hidden_deals_count()
{
    $args = array(
        'post_type' => 'honey_hole_deal',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'deal_visibility',
                'value' => '0',
                'compare' => '=',
            ),
        ),
    );
    $query = new WP_Query($args);
    return $query->found_posts;
}

// Render deals table
function honey_hole_render_deals_table()
{
    // Get all categories
    $categories = get_terms(array(
        'taxonomy' => 'deal_category',
        'hide_empty' => false,
        'orderby' => 'name',
    ));

    // Get all deals
    $deals = get_posts(array(
        'post_type' => 'honey_hole_deal',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ));

    // Organize deals by category and tags
    $organized_deals = array();
    foreach ($deals as $deal) {
        $deal_categories = wp_get_post_terms($deal->ID, 'deal_category');
        $deal_tags = wp_get_post_terms($deal->ID, 'post_tag');

        if (!empty($deal_categories)) {
            $category_term = $deal_categories[0];
            $category = $category_term->name;
            $tag = !empty($deal_tags) ? $deal_tags[0]->name : 'Uncategorized';

            if (!isset($organized_deals[$category])) {
                $organized_deals[$category] = array();
            }
            if (!isset($organized_deals[$category][$tag])) {
                $organized_deals[$category][$tag] = array();
            }
            $organized_deals[$category][$tag][] = $deal;
        }
    }

    // Sort categories alphabetically
    ksort($organized_deals);

    // Display each category's deals
    foreach ($organized_deals as $category => $tagged_deals) {
    ?>
        <div class="category-section">
            <h2><?php echo esc_html($category); ?></h2>
            <div class="honey-hole-deals-grid">
                <?php
                // Sort deals by tag
                ksort($tagged_deals);
                foreach ($tagged_deals as $tag => $deals) {
                    foreach ($deals as $deal):
                        $original_price = get_post_meta($deal->ID, 'deal_original_price', true);
                        $sales_price = get_post_meta($deal->ID, 'deal_sales_price', true);
                        $discount = $original_price > 0 ? round((($original_price - $sales_price) / $original_price) * 100) : 0;
                        $image_url = get_post_meta($deal->ID, 'deal_image_url', true);
                        $deal_url = get_post_meta($deal->ID, 'deal_url', true);
                        $original_url = get_post_meta($deal->ID, 'deal_original_url', true);
                        $rating = get_post_meta($deal->ID, 'deal_rating', true);
                        $visibility = get_post_meta($deal->ID, 'deal_visibility', true);
                        $deal_tags = wp_get_post_terms($deal->ID, 'post_tag', array('fields' => 'names'));
                ?>
                        <div class="honey-hole-deal-card" data-deal-id="<?php echo esc_attr($deal->ID); ?>">
                            <div class="deal-card-header">
                                <input type="checkbox" class="deal-checkbox" value="<?php echo esc_attr($deal->ID); ?>">
                                <div class="drag-handle">
                                    <span class="dashicons dashicons-menu"></span>
                                </div>
                                <div class="deal-visibility">
                                    <label class="visibility-toggle">
                                        <input type="checkbox" class="visibility-checkbox" data-deal-id="<?php echo esc_attr($deal->ID); ?>" <?php checked($visibility, true); ?>>
                                        <span class="visibility-status"><?php echo $visibility ? 'Visible' : 'Hidden'; ?></span>
                                    </label>
                                </div>
                            </div>
                            <div class="deal-image">
                                <?php if ($image_url): ?>
                                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($deal->post_title); ?>" class="deal-thumbnail-image">
                                    <div class="image-overlay">
                                        <button type="button" class="button upload-image-button" data-deal-id="<?php echo esc_attr($deal->ID); ?>">Replace Image</button>
                                    </div>
                                <?php else: ?>
                                    <div class="no-image">No image</div>
                                    <div class="image-overlay">
                                        <button type="button" class="button upload-image-button" data-deal-id="<?php echo esc_attr($deal->ID); ?>">Replace Image</button>
                                    </div>
                                <?php endif; ?>
                                <input type="file" class="deal-image-upload" data-deal-id="<?php echo esc_attr($deal->ID); ?>" accept="image/*" style="display: none;">
                            </div>
                            <div class="deal-content">
                                <h3 class="deal-title"><?php echo esc_html($deal->post_title); ?></h3>
                                <div class="deal-pricing">
                                    <span class="sales-price">$<?php echo number_format($sales_price, 2); ?></span>
                                    <?php if ($original_price > 0): ?>
                                        <span class="original-price">$<?php echo number_format($original_price, 2); ?></span>
                                    <?php endif; ?>
                                    <?php if ($discount > 0): ?>
                                        <span class="discount discount-high">-<?php echo $discount; ?>% Off</span>
                                    <?php endif; ?>
                                </div>
                                <div class="deal-rating">
                                    <div class="rating-stars">
                                        <?php for ($i = 1; $i <= 5; $i++): ?>
                                            <span class="star <?php echo $i <= $rating ? 'filled' : ''; ?>">★</span>
                                        <?php endfor; ?>
                                    </div>
                                    <span class="rating-value"><?php echo number_format($rating, 1); ?></span>
                                </div>
                                <div class="deal-tags">
                                    <?php echo esc_html(implode(', ', $deal_tags)); ?>
                                </div>
                                <div class="deal-date">
                                    <?php echo get_the_date('M j, Y', $deal->ID); ?>
                                </div>
                                <?php if ($original_url): ?>
                                    <div class="deal-url" title="<?php echo esc_attr($original_url); ?>">
                                        <a href="<?php echo esc_url($original_url); ?>" target="_blank">Original URL: <?php echo esc_html(substr($original_url, 0, 30) . '...'); ?></a>
                                    </div>
                                <?php endif; ?>
                                <div class="deal-actions">
                                    <a href="<?php echo admin_url('admin.php?page=honey-hole-edit-deal&deal_id=' . $deal->ID); ?>" class="button button-small">Edit</a>
                                    <a href="<?php echo get_delete_post_link($deal->ID); ?>" class="button button-small" onclick="return confirm('Are you sure you want to delete this deal?')">Delete</a>
                                    <?php if ($deal_url) : ?>
                                        <a href="<?php echo esc_url($deal_url); ?>" target="_blank" class="button button-small affiliate-link">View Deal</a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                <?php endforeach;
                }
                ?>
            </div>
        </div>
    <?php
    }
}

// Add AJAX handler for visibility toggle
function honey_hole_handle_visibility_toggle()
{
    if (!isset($_POST['deal_id']) || !isset($_POST['visibility'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_visibility_toggle')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }

    $deal_id = intval($_POST['deal_id']);
    $visibility = rest_sanitize_boolean($_POST['visibility']);

    update_post_meta($deal_id, 'deal_visibility', $visibility);

    wp_send_json_success(array(
        'visibility' => $visibility,
        'status' => $visibility ? 'Visible' : 'Hidden'
    ));
}
add_action('wp_ajax_honey_hole_toggle_visibility', 'honey_hole_handle_visibility_toggle');

// Add admin notices
function honey_hole_admin_notices()
{
    if (isset($_GET['message'])) {
        switch ($_GET['message']) {
            case 'bulk_deleted':
                echo '<div class="notice notice-success is-dismissible"><p>Selected deals have been deleted.</p></div>';
                break;
            case 'deal_added':
                echo '<div class="notice notice-success is-dismissible"><p>Deal has been added successfully.</p></div>';
                break;
            case 'deal_updated':
                echo '<div class="notice notice-success is-dismissible"><p>Deal updated successfully!</p></div>';
                break;
            case 'invalid_deal':
                echo '<div class="notice notice-error is-dismissible"><p>Invalid deal ID provided.</p></div>';
                break;
            case 'all_deals_deleted':
                echo '<div class="notice notice-success is-dismissible"><p>All deals have been deleted successfully!</p></div>';
                break;
        }
    }
}
add_action('admin_notices', 'honey_hole_admin_notices');

// Render categories management page
function honey_hole_categories_page()
{
    // Handle category actions
    if (isset($_POST['action']) && isset($_POST['honey_hole_nonce']) && wp_verify_nonce($_POST['honey_hole_nonce'], 'honey_hole_categories')) {
        if ($_POST['action'] === 'add_category') {
            $name = sanitize_text_field($_POST['category_name']);
            $slug = sanitize_title($_POST['category_slug']);

            if (!empty($name)) {
                wp_insert_term($name, 'deal_category', array(
                    'slug' => $slug
                ));
                echo '<div class="notice notice-success"><p>Category added successfully!</p></div>';
            }
        } elseif ($_POST['action'] === 'delete_category' && isset($_POST['category_id'])) {
            $term_id = intval($_POST['category_id']);
            wp_delete_term($term_id, 'deal_category');
            echo '<div class="notice notice-success"><p>Category deleted successfully!</p></div>';
        }
    }

    // Get all categories
    $categories = get_terms(array(
        'taxonomy' => 'deal_category',
        'hide_empty' => false,
        'orderby' => 'name',
        'order' => 'ASC'
    ));
    ?>
    <div class="wrap">
        <h1>Manage Categories</h1>

        <div class="honey-hole-categories-admin">
            <!-- Add New Category Form -->
            <div class="honey-hole-form-section">
                <h2>Add New Category</h2>
                <form method="post" action="">
                    <?php wp_nonce_field('honey_hole_categories', 'honey_hole_nonce'); ?>
                    <input type="hidden" name="action" value="add_category">
                    <div class="honey-hole-form-field">
                        <label for="category_name">Category Name *</label>
                        <input type="text" id="category_name" name="category_name" required>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="category_slug">Slug (optional)</label>
                        <input type="text" id="category_slug" name="category_slug">
                        <p class="description">Leave empty to auto-generate from name</p>
                    </div>
                    <div class="honey-hole-form-actions">
                        <button type="submit" class="button button-primary">Add Category</button>
                    </div>
                </form>
            </div>

            <!-- Categories List -->
            <div class="honey-hole-form-section">
                <h2>Existing Categories</h2>
                <?php if (!empty($categories) && !is_wp_error($categories)): ?>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Count</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($categories as $category): ?>
                                <tr>
                                    <td><?php echo esc_html($category->name); ?></td>
                                    <td><?php echo esc_html($category->slug); ?></td>
                                    <td><?php echo esc_html($category->count); ?></td>
                                    <td>
                                        <form method="post" action="" style="display: inline;">
                                            <?php wp_nonce_field('honey_hole_categories', 'honey_hole_nonce'); ?>
                                            <input type="hidden" name="action" value="delete_category">
                                            <input type="hidden" name="category_id" value="<?php echo esc_attr($category->term_id); ?>">
                                            <button type="submit" class="button button-small" onclick="return confirm('Are you sure you want to delete this category? This will remove the category from all deals.')">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p>No categories found.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
<?php
}

// Render edit deal page
function honey_hole_edit_deal_page()
{
    // Check if deal ID is provided
    if (!isset($_GET['deal_id'])) {
        wp_redirect(admin_url('admin.php?page=honey-hole&message=invalid_deal'));
        exit;
    }

    $deal_id = intval($_GET['deal_id']);
    $deal = get_post($deal_id);

    // Check if deal exists and is of correct type
    if (!$deal || $deal->post_type !== 'honey_hole_deal') {
        wp_redirect(admin_url('admin.php?page=honey-hole&message=invalid_deal'));
        exit;
    }

    // Get deal meta
    $original_price = get_post_meta($deal_id, 'deal_original_price', true);
    $sales_price = get_post_meta($deal_id, 'deal_sales_price', true);
    $deal_url = get_post_meta($deal_id, 'deal_url', true);
    $original_url = get_post_meta($deal_id, 'deal_original_url', true);
    $image_url = get_post_meta($deal_id, 'deal_image_url', true);
    $rating = get_post_meta($deal_id, 'deal_rating', true);
    $category = wp_get_post_terms($deal_id, 'deal_category', array('fields' => 'ids'));
    $category = !empty($category) ? $category[0] : '';
?>
    <div class="wrap">
        <h1>Edit Deal</h1>
        <form id="honey-hole-deal-form" method="post" action="">
            <?php wp_nonce_field('honey_hole_edit_deal', 'honey_hole_nonce'); ?>
            <input type="hidden" name="deal_id" value="<?php echo esc_attr($deal_id); ?>">
            <div class="honey-hole-form-container">
                <div class="honey-hole-form-section">
                    <h2>Deal Information</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-title">Title *</label>
                        <input type="text" id="deal-title" name="deal_title" value="<?php echo esc_attr($deal->post_title); ?>" required>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-original-price">Original Price *</label>
                        <div class="price-input-wrapper">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="deal-original-price" name="deal_original_price" step="0.01" min="0" value="<?php echo esc_attr($original_price); ?>" required>
                        </div>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-sales-price">Sales Price *</label>
                        <div class="price-input-wrapper">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="deal-sales-price" name="deal_sales_price" step="0.01" min="0" value="<?php echo esc_attr($sales_price); ?>" required>
                        </div>
                    </div>
                    <div class="honey-hole-form-field">
                        <label>Discount</label>
                        <div class="discount-display">
                            <span id="discount-percentage">0</span>% off
                        </div>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-rating">Rating</label>
                        <div class="rating-input">
                            <input type="number" id="deal-rating" name="deal_rating" min="0" max="5" step="0.5" value="<?php echo esc_attr($rating); ?>">
                            <div class="rating-stars">
                                <span class="star" data-value="1">★</span>
                                <span class="star" data-value="2">★</span>
                                <span class="star" data-value="3">★</span>
                                <span class="star" data-value="4">★</span>
                                <span class="star" data-value="5">★</span>
                            </div>
                        </div>
                        <p class="description">Rate the deal from 0 to 5 stars</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-url">Deal URL *</label>
                        <input type="url" id="deal-url" name="deal_url" value="<?php echo esc_attr($original_url); ?>" required>
                    </div>
                </div>

                <div class="honey-hole-form-section">
                    <h2>Deal Details</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-description">Description</label>
                        <textarea id="deal-description" name="deal_description" rows="5"><?php echo esc_textarea($deal->post_content); ?></textarea>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-category">Category *</label>
                        <select id="deal-category" name="deal_category" required>
                            <option value="">Select a category</option>
                            <?php
                            $categories = get_terms(array(
                                'taxonomy' => 'deal_category',
                                'hide_empty' => false,
                            ));
                            foreach ($categories as $cat) {
                                $selected = $cat->term_id == $category ? 'selected' : '';
                                echo '<option value="' . esc_attr($cat->term_id) . '" ' . $selected . '>' . esc_html($cat->name) . '</option>';
                            }
                            ?>
                        </select>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-tags">Tags</label>
                        <?php
                        $tags = wp_get_post_terms($deal_id, 'post_tag', array('fields' => 'names'));
                        $tags_string = !empty($tags) ? implode(', ', $tags) : '';
                        ?>
                        <input type="text" id="deal-tags" name="deal_tags" class="honey-hole-tags-input" value="<?php echo esc_attr($tags_string); ?>" placeholder="Add tags (comma separated)">
                        <div class="honey-hole-tags-container"></div>
                        <p class="description">Enter tags separated by commas (e.g., camping, hiking, backpacking)</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-image">Deal Image URL *</label>
                        <input type="url" id="deal-image-url" name="deal_image_url" value="<?php echo esc_attr($image_url); ?>" required>
                        <p class="description">Enter the direct URL to the product image</p>
                    </div>
                </div>
            </div>
            <div class="honey-hole-form-actions">
                <button type="submit" class="button button-primary">Update Deal</button>
                <a href="<?php echo admin_url('admin.php?page=honey-hole'); ?>" class="button">Cancel</a>
            </div>
        </form>
    </div>
<?php
}

// Add shortcode for displaying deals
function honey_hole_deals_shortcode($atts)
{
    // Parse attributes
    $atts = shortcode_atts(array(
        'category' => '',
        'count' => -1,
        'columns' => 3
    ), $atts);

    // Get deals
    $args = array(
        'post_type' => 'honey_hole_deal',
        'post_status' => 'publish',
        'posts_per_page' => $atts['count'],
        'orderby' => 'menu_order',
        'order' => 'ASC'
    );

    // Add category filter if specified
    if (!empty($atts['category'])) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'deal_category',
                'field' => 'slug',
                'terms' => $atts['category']
            )
        );
    }

    // Get deals
    $deals = get_posts($args);

    // Organize deals by category
    $organized_deals = array();
    foreach ($deals as $deal) {
        $categories = wp_get_post_terms($deal->ID, 'deal_category');
        if (!empty($categories)) {
            $category = $categories[0]->name;
            if (!isset($organized_deals[$category])) {
                $organized_deals[$category] = array();
            }
            $organized_deals[$category][] = $deal;
        }
    }

    // Sort categories alphabetically
    ksort($organized_deals);

    // Start output buffering
    ob_start();
?>
    <?php foreach ($organized_deals as $category => $category_deals): ?>
        <div class="category-section">
            <h2><?php echo esc_html($category); ?></h2>
            <div class="honey-hole-deals-grid" style="grid-template-columns: repeat(<?php echo esc_attr($atts['columns']); ?>, 1fr);">
                <?php foreach ($category_deals as $deal):
                    $original_price = get_post_meta($deal->ID, 'deal_original_price', true);
                    $sales_price = get_post_meta($deal->ID, 'deal_sales_price', true);
                    $discount = $original_price > 0 ? round((($original_price - $sales_price) / $original_price) * 100) : 0;
                    $image_url = get_post_meta($deal->ID, 'deal_image_url', true);
                    $deal_url = get_post_meta($deal->ID, 'deal_url', true);
                    $original_url = get_post_meta($deal->ID, 'deal_original_url', true);
                    $rating = get_post_meta($deal->ID, 'deal_rating', true);
                    $visibility = get_post_meta($deal->ID, 'deal_visibility', true);

                    // Skip if deal is not visible
                    if (!$visibility) continue;
                ?>
                    <div class="honey-hole-deal-card">
                        <?php if ($deal_url): ?>
                            <a href="<?php echo esc_url($deal_url); ?>" target="_blank" class="deal-card-link">
                            <?php endif; ?>
                            <div class="deal-image">
                                <?php if ($image_url): ?>
                                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($deal->post_title); ?>">
                                    <div class="image-overlay">
                                        <button type="button" class="button upload-image-button" data-deal-id="<?php echo esc_attr($deal->ID); ?>">Replace Image</button>
                                    </div>
                                <?php else: ?>
                                    <div class="no-image">No image</div>
                                    <div class="image-overlay">
                                        <button type="button" class="button upload-image-button" data-deal-id="<?php echo esc_attr($deal->ID); ?>">Replace Image</button>
                                    </div>
                                <?php endif; ?>
                                <input type="file" class="deal-image-upload" data-deal-id="<?php echo esc_attr($deal->ID); ?>" accept="image/*" style="display: none;">
                            </div>
                            <div class="deal-content">
                                <h3 class="deal-title"><?php echo esc_html($deal->post_title); ?></h3>
                                <div class="deal-pricing">
                                    <span class="sales-price">$<?php echo number_format($sales_price, 2); ?></span>
                                    <?php if ($original_price > 0): ?>
                                        <span class="original-price">$<?php echo number_format($original_price, 2); ?></span>
                                    <?php endif; ?>
                                    <?php if ($discount > 0): ?>
                                        <span class="discount discount-high">-<?php echo $discount; ?>% Off</span>
                                    <?php endif; ?>
                                </div>
                                <div class="deal-rating">
                                    <div class="rating-stars">
                                        <?php
                                        $rating = floatval($rating);
                                        for ($i = 1; $i <= 5; $i++) {
                                            $star_class = $i <= $rating ? 'filled' : '';
                                            echo '<span class="star ' . $star_class . '">★</span>';
                                        }
                                        ?>
                                    </div>
                                    <span class="rating-value"><?php echo number_format($rating, 1); ?></span>
                                </div>
                            </div>
                            <?php if ($deal_url): ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endforeach; ?>
<?php
    return ob_get_clean();
}
add_shortcode('honey_hole_deals', 'honey_hole_deals_shortcode');

// Enqueue frontend styles
function honey_hole_enqueue_frontend_styles()
{
    wp_enqueue_style(
        'honey-hole-frontend',
        HONEY_HOLE_PLUGIN_URL . 'public/css/frontend.css',
        array(),
        HONEY_HOLE_VERSION
    );
}
add_action('wp_enqueue_scripts', 'honey_hole_enqueue_frontend_styles');

// Render import deals page
function honey_hole_import_page()
{
    // Handle CSV import
    if (isset($_POST['action']) && $_POST['action'] === 'import_csv' && isset($_FILES['csv_file'])) {
        if (check_admin_referer('honey_hole_import_csv')) {
            $file = $_FILES['csv_file'];

            // Check file type
            if ($file['type'] !== 'text/csv' && $file['type'] !== 'application/vnd.ms-excel') {
                echo '<div class="notice notice-error"><p>Please upload a valid CSV file.</p></div>';
            } else {
                // Open the file
                $handle = fopen($file['tmp_name'], 'r');

                // Skip header row
                $header = fgetcsv($handle);

                $imported = 0;
                $errors = array();

                while (($data = fgetcsv($handle)) !== false) {
                    // Map CSV columns to deal data
                    $deal_data = array(
                        'post_title' => sanitize_text_field($data[0]),
                        'post_content' => wp_kses_post($data[1]),
                        'post_status' => 'publish',
                        'post_type' => 'honey_hole_deal',
                    );

                    // Insert the deal
                    $post_id = wp_insert_post($deal_data);

                    if (!is_wp_error($post_id)) {
                        // Update meta fields
                        update_post_meta($post_id, 'deal_original_price', floatval($data[2]));
                        update_post_meta($post_id, 'deal_sales_price', floatval($data[3]));
                        update_post_meta($post_id, 'deal_rating', floatval($data[4]));
                        update_post_meta($post_id, 'deal_url', esc_url_raw($data[5]));
                        update_post_meta($post_id, 'deal_original_url', esc_url_raw($data[6]));
                        update_post_meta($post_id, 'deal_image_url', esc_url_raw($data[7]));

                        // Set category
                        if (!empty($data[8])) {
                            $category_slug = sanitize_title($data[8]);
                            $category = get_term_by('slug', $category_slug, 'deal_category');
                            if ($category) {
                                wp_set_object_terms($post_id, $category->term_id, 'deal_category');
                            } else {
                                $errors[] = "Skipped deal '{$data[0]}' - Category with slug '{$category_slug}' does not exist";
                                continue; // Skip this deal and move to the next one
                            }
                        } else {
                            $errors[] = "Skipped deal '{$data[0]}' - No category specified";
                            continue; // Skip this deal and move to the next one
                        }

                        // Set tags
                        if (!empty($data[9])) {
                            $tags = array_map('trim', explode(',', sanitize_text_field($data[9])));
                            wp_set_object_terms($post_id, $tags, 'post_tag');
                        }

                        $imported++;
                    } else {
                        $errors[] = "Failed to import deal: {$data[0]}";
                    }
                }

                fclose($handle);

                if ($imported > 0) {
                    echo '<div class="notice notice-success"><p>Successfully imported ' . $imported . ' deals.</p></div>';
                }

                if (!empty($errors)) {
                    echo '<div class="notice notice-error"><p>Errors occurred while importing some deals:</p><ul>';
                    foreach ($errors as $error) {
                        echo '<li>' . esc_html($error) . '</li>';
                    }
                    echo '</ul></p></div>';
                }
            }
        }
    }
?>
    <div class="wrap">
        <h1>Import Deals</h1>
        <div class="honey-hole-import-section">
            <h2>Import Deals from CSV</h2>
            <p>Upload a CSV file containing your deals. The file should have the following columns:</p>
            <ol>
                <li>Title (required)</li>
                <li>Description (optional)</li>
                <li>Original Price (required)</li>
                <li>Sales Price (required)</li>
                <li>Rating (optional, 0-5)</li>
                <li>Deal URL (required)</li>
                <li>Original URL (required)</li>
                <li>Image URL (required)</li>
                <li>Category (required)</li>
                <li>Tags (optional, comma-separated)</li>
            </ol>

            <form method="post" action="" enctype="multipart/form-data">
                <?php wp_nonce_field('honey_hole_import_csv'); ?>
                <input type="hidden" name="action" value="import_csv">
                <div class="honey-hole-form-field">
                    <label for="csv_file">Select CSV File</label>
                    <input type="file" id="csv_file" name="csv_file" accept=".csv" required>
                    <p class="description">The file should be a CSV with UTF-8 encoding</p>
                </div>
                <div class="honey-hole-form-actions">
                    <button type="submit" class="button button-primary">Import Deals</button>
                </div>
            </form>

            <div class="honey-hole-sample-csv">
                <h3>Sample CSV Format</h3>
                <pre>Title,Description,Original Price,Sales Price,Rating,Deal URL,Original URL,Image URL,Category,Tags
"REI Co-op Flash 22 Pack","Lightweight daypack perfect for day hikes",49.95,29.95,4.5,"https://example.com/deal","https://example.com/original","https://example.com/image.jpg","Backpacks","hiking,daypack,lightweight"
"Patagonia Nano Puff Jacket","Warm and lightweight synthetic jacket",199.00,149.00,4.8,"https://example.com/deal2","https://example.com/original2","https://example.com/image2.jpg","Jackets","jacket,warm,outdoor"</pre>
            </div>
        </div>
    </div>
<?php
}

// Add this new function to handle image uploads
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

    $updates = $_POST['updates'];
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

// Add AJAX handler for saving visibility changes
function honey_hole_save_visibility_changes()
{
    if (!isset($_POST['changes']) || !isset($_POST['nonce'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_bulk_action')) {
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

// Add AJAX handler for bulk deletion
function honey_hole_handle_bulk_delete()
{
    if (!isset($_POST['deal_ids']) || !isset($_POST['nonce'])) {
        wp_send_json_error('Missing required fields');
    }

    if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_bulk_action')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }

    $deal_ids = array_map('intval', $_POST['deal_ids']);
    $success = true;
    $deleted_count = 0;

    foreach ($deal_ids as $deal_id) {
        if (wp_delete_post($deal_id, true)) {
            $deleted_count++;
        } else {
            $success = false;
            break;
        }
    }

    if ($success) {
        wp_send_json_success(array(
            'message' => sprintf('%d deals deleted successfully', $deleted_count)
        ));
    } else {
        wp_send_json_error('Failed to delete some deals');
    }
}
add_action('wp_ajax_honey_hole_bulk_delete_deals', 'honey_hole_handle_bulk_delete');
