<?php

/**
 * Plugin Name: Honey Hole
 * Description: A plugin for managing and displaying deals on the Honey Hole
 * Version: 1.0.0
 * Author: Jack Ball
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
    // Get the current site URL
    $site_url = get_site_url();

    // Allow requests from the WordPress site
    header('Access-Control-Allow-Origin: ' . $site_url);
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
        'menu_name'          => 'Honey Hole',
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
        'query_var'           => true,
        'rewrite'             => array('slug' => 'deals'),
        'capability_type'     => 'post',
        'hierarchical'        => false,
        'supports'            => array('title', 'editor', 'thumbnail'),
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-money-alt',
        'show_in_rest'        => true,
        'show_in_menu'        => false, // Hide the default menu item
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
        'order_nonce' => wp_create_nonce('honey_hole_update_order'),
        'visibility_nonce' => wp_create_nonce('honey_hole_visibility_toggle')
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

// Add menu items
function honey_hole_admin_menu()
{
    // Get the icon URL
    $icon_url = plugins_url('admin/images/honey-hole-icon.svg', __FILE__);
    
    // Add main menu
    add_menu_page(
        'Honey Hole Deals',
        'Honey Hole',
        'manage_options',
        'honey-hole',
        'honey_hole_admin_page',
        $icon_url,
        30
    );

    // Add submenu items
    add_submenu_page(
        'honey-hole',
        'All Deals',
        'All Deals',
        'manage_options',
        'honey-hole',
        'honey_hole_admin_page'
    );

    add_submenu_page(
        'honey-hole',
        'Add New Deal',
        'Add New',
        'manage_options',
        'honey-hole-add-deal',
        'honey_hole_add_deal_page'
    );

    add_submenu_page(
        'honey-hole',
        'Manage Categories',
        'Categories',
        'manage_options',
        'honey-hole-categories',
        'honey_hole_categories_page'
    );

    // Add hidden submenu for edit page
    add_submenu_page(
        null, // Parent slug (null makes it hidden)
        'Edit Deal',
        'Edit Deal',
        'manage_options',
        'honey-hole-edit-deal',
        'honey_hole_edit_deal_page'
    );

    add_submenu_page(
        'honey-hole',
        'Import Deals',
        'Import Deals',
        'manage_options',
        'honey-hole-import',
        'honey_hole_import_page'
    );
}
add_action('admin_menu', 'honey_hole_admin_menu');

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
                </div>
                <div class="honey-hole-search">
                    <input type="text" id="deal-search" placeholder="Search by title" class="regular-text">
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

    // Get search query
    $search_query = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';

    // Get all deals
    $args = array(
        'post_type' => 'honey_hole_deal',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    );

    // Add search query if present
    if (!empty($search_query)) {
        $args['s'] = $search_query;
    }

    $deals = get_posts($args);

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

    // Start output buffering
    ob_start();
?>
    <div class="honey-hole-deals">
        <?php
        // First, get the most recent deals
        $recent_args = array(
            'post_type' => 'honey_hole_deal',
            'post_status' => 'publish',
            'posts_per_page' => 4,
            'orderby' => 'date',
            'order' => 'DESC'
        );

        $recent_query = new WP_Query($recent_args);
        $recent_deals = $recent_query->posts;

        if (!empty($recent_deals)) :
        ?>
            <div class="honey-hole-hero">
                <div class="honey-hole-hero-content">
                    <div class="honey-hole-hero-image"><img src="https://outdoorempire.com/wp-content/uploads/2025/02/the-honey-hole-transparent.png" alt=""></div>
                    <div class="honey-hole-hero-copy">
                        <h2>We Find the Best Outdoor Gear Deals to Save You Time and Money!</h2>
                        <p>We manually crawl catalogs, ads, and websites of top outdoor gear brands and retailers in search of discounted outdoor gear to create this curated list that will save you hours of shopping around.
                        </p>
                        <p id="honey-hole-updated">Last Updated: <?php echo date('F j, Y'); ?></p>
                    </div>
                </div>
            </div>
            <div class="category-section">
                <h2>Just Added</h2>
                <div class="deals-grid">
                    <?php foreach ($recent_deals as $deal):
                        $original_price = get_post_meta($deal->ID, 'deal_original_price', true);
                        $sales_price = get_post_meta($deal->ID, 'deal_sales_price', true);
                        $deal_url = get_post_meta($deal->ID, 'deal_url', true);
                        $image_url = get_post_meta($deal->ID, 'deal_image_url', true);
                        $rating = get_post_meta($deal->ID, 'deal_rating', true);

                        // Calculate discount with error handling
                        $discount = 0;
                        if (is_numeric($original_price) && is_numeric($sales_price) && $original_price > 0) {
                            $discount = round((($original_price - $sales_price) / $original_price) * 100);
                        }

                        // Format prices with error handling
                        $formatted_sales_price = '';
                        $formatted_original_price = '';
                        
                        if (is_numeric($sales_price) && $sales_price !== '') {
                            $formatted_sales_price = number_format((float)$sales_price, 2);
                        }
                        
                        if (is_numeric($original_price) && $original_price !== '') {
                            $formatted_original_price = number_format((float)$original_price, 2);
                        }
                    ?>
                        <div class="deal-card">
                            <a href="<?php echo esc_url($deal_url); ?>" target="_blank" rel="noopener noreferrer" class="deal-card-link">
                                <div class="deal-image">
                                    <?php if ($image_url): ?>
                                        <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($deal->post_title); ?>">
                                    <?php else: ?>
                                        <div class="no-image">No image</div>
                                    <?php endif; ?>
                                </div>
                                <div class="deal-content">
                                    <h3 class="deal-title"><?php echo esc_html($deal->post_title); ?></h3>
                                    <div class="deal-pricing">
                                        <?php if ($formatted_sales_price !== ''): ?>
                                            <span class="sales-price">$<?php echo esc_html($formatted_sales_price); ?></span>
                                        <?php endif; ?>
                                        <?php if ($formatted_original_price !== ''): ?>
                                            <span class="original-price">$<?php echo esc_html($formatted_original_price); ?></span>
                                            <?php if ($discount > 0): ?>
                                                <span class="discount discount-<?php echo $discount >= 50 ? 'high' : ($discount >= 25 ? 'medium' : 'low'); ?>"><?php echo $discount; ?>% Off</span>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    </div>
                                    <?php if ($rating > 0): ?>
                                        <div class="deal-rating">
                                            <div class="rating-stars">
                                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                                    <span class="star <?php echo $i <= $rating ? 'filled' : ''; ?>">★</span>
                                                <?php endfor; ?>
                                            </div>
                                            <span class="rating-value"><?php echo number_format($rating, 1); ?></span>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <div id="hh-email-section">
                <div class="hh-email-wrapper">
                            <div class="hh-email-container-one">
                                <div class="hh-email-image"></div>
                                <div class="hh-email-content">
                                <h2>Get the Best Deals and Win Free Gear!
                                </h2>
                                <form method="post" class="af-form-wrapper" accept-charset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl"  >
                                    <div style="display: none;">
                                    <input type="hidden" name="meta_web_form_id" value="894900673" />
                                    <input type="hidden" name="meta_split_id" value="" />
                                    <input type="hidden" name="listname" value="awlist6324539" />
                                    <input type="hidden" name="redirect" value="https://www.aweber.com/thankyou-coi.htm?m=text" id="redirect_8e911f903751383335eaae138e94c2b8" />

                                    <input type="hidden" name="meta_adtracking" value="Honey_Hole_unstyled_form" />
                                    <input type="hidden" name="meta_message" value="1" />
                                    <input type="hidden" name="meta_required" value="email" />

                                    <input type="hidden" name="meta_tooltip" value="" />
                                    </div>
                                    <div id="af-form-894900673" class="af-form"><div id="af-body-894900673" class="af-body af-standards">
                                    <div class="af-element">
                                    <div class="af-textWrap"><input placeholder="Email" class="text" id="awf_field-118013225" type="email" name="email" value="" tabindex="500" onfocus=" if (this.value == '') { this.value = ''; }" onblur="if (this.value == '') { this.value='';}" />
                                    </div><div class="af-clear"></div>
                                    </div><div class="af-element buttonContainer">
                                    <input id="hh-email-submit" name="submit" class="submit" type="submit" value="Submit" tabindex="501" />
                                    <div class="af-clear"></div>
                                    </div>
                                    </div>
                                    </div>
                                    <div style="display: none;"><img src="https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM" alt="" /></div>
                                </form>
                                <p id="hh-email-disclaimer">We only email every other week. Unsubscribe at any time.</p>
                                    </div>
                                </div>
                                <div class="hh-email-container-two-wrapper">
                                    <div class="hh-email-container-two">
                                    <h4>Outdoor Gear. Epic Deals. Free Giveaways.</h4>
                                    <p>Love camping, hiking, hunting, or fishing? The Honey Hole email newsletter is your go-to for:

                                    </p>
                                    <ul>
                                        <li>Exclusive outdoor gear deals you won't find anywhere else.
                                        </li>
                                        <li>Weekly gear giveaways because who doesn't love free gear?
                                        </li>
                                            <li>Raw, honest reviews and testing insights.
                                            </li>
                                            <li>Fun stories and tips for your next adventure.
                                            </li>
                                        </ul>
                                        <p>Join thousands of outdoor enthusiasts who love saving money and discovering the best gear.</p>
                                    </div>
                                </div>
                            </div>
                    </div>
        <?php
        endif;

        // Get all categories for the filter
        $categories = get_terms(array(
            'taxonomy' => 'deal_category',
            'hide_empty' => true,
            'orderby' => 'name',
            'order' => 'ASC'
        ));
        ?>

        <?php
        // Get all deals
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

        $query = new WP_Query($args);
        $deals = $query->posts;

        if (!empty($deals)) :
        ?>
            <div class="category-section">
                <h2>All Deals</h2>
                <div class="deals-grid">
                    <?php foreach ($deals as $deal):
                        $original_price = get_post_meta($deal->ID, 'deal_original_price', true);
                        $sales_price = get_post_meta($deal->ID, 'deal_sales_price', true);
                        $deal_url = get_post_meta($deal->ID, 'deal_url', true);
                        $image_url = get_post_meta($deal->ID, 'deal_image_url', true);
                        $rating = get_post_meta($deal->ID, 'deal_rating', true);

                        // Calculate discount with error handling
                        $discount = 0;
                        if (is_numeric($original_price) && is_numeric($sales_price) && $original_price > 0) {
                            $discount = round((($original_price - $sales_price) / $original_price) * 100);
                        }

                        // Format prices with error handling
                        $formatted_sales_price = '';
                        $formatted_original_price = '';
                        
                        if (is_numeric($sales_price) && $sales_price !== '') {
                            $formatted_sales_price = number_format((float)$sales_price, 2);
                        }
                        
                        if (is_numeric($original_price) && $original_price !== '') {
                            $formatted_original_price = number_format((float)$original_price, 2);
                        }
                    ?>
                        <div class="deal-card">
                            <a href="<?php echo esc_url($deal_url); ?>" target="_blank" rel="noopener noreferrer" class="deal-card-link">
                                <div class="deal-image">
                                    <?php if ($image_url): ?>
                                        <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($deal->post_title); ?>">
                                    <?php else: ?>
                                        <div class="no-image">No image</div>
                                    <?php endif; ?>
                                </div>
                                <div class="deal-content">
                                    <h3 class="deal-title"><?php echo esc_html($deal->post_title); ?></h3>
                                    <div class="deal-pricing">
                                        <?php if ($formatted_sales_price !== ''): ?>
                                            <span class="sales-price">$<?php echo esc_html($formatted_sales_price); ?></span>
                                        <?php endif; ?>
                                        <?php if ($formatted_original_price !== ''): ?>
                                            <span class="original-price">$<?php echo esc_html($formatted_original_price); ?></span>
                                            <?php if ($discount > 0): ?>
                                                <span class="discount discount-<?php echo $discount >= 50 ? 'high' : ($discount >= 25 ? 'medium' : 'low'); ?>"><?php echo $discount; ?>% Off</span>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    </div>
                                    <?php if ($rating > 0): ?>
                                        <div class="deal-rating">
                                            <div class="rating-stars">
                                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                                    <span class="star <?php echo $i <= $rating ? 'filled' : ''; ?>">★</span>
                                                <?php endfor; ?>
                                            </div>
                                            <span class="rating-value"><?php echo number_format($rating, 1); ?></span>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php
        endif;
        ?>
    </div>
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

// Handle CSV import
function honey_hole_handle_csv_import()
{
    if (!isset($_POST['honey_hole_import_csv']) || !check_admin_referer('honey_hole_import_csv')) {
        return;
    }

    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized access');
    }

    if (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) {
        add_settings_error(
            'honey_hole_import',
            'upload_error',
            'Error uploading file. Please try again.',
            'error'
        );
        return;
    }

    // Check memory limit
    $memory_limit = ini_get('memory_limit');
    $memory_limit_bytes = wp_convert_hr_to_bytes($memory_limit);
    $memory_usage = memory_get_usage(true);
    $memory_available = $memory_limit_bytes - $memory_usage;

    if ($memory_available < 10 * 1024 * 1024) { // Less than 10MB available
        add_settings_error(
            'honey_hole_import',
            'memory_error',
            'Not enough memory available for import. Please try with a smaller file or contact your hosting provider.',
            'error'
        );
        return;
    }

    // Set execution time limit
    $max_execution_time = ini_get('max_execution_time');
    if ($max_execution_time < 300) { // Less than 5 minutes
        set_time_limit(300); // Try to set to 5 minutes
    }

    $file = $_FILES['csv_file']['tmp_name'];
    $handle = fopen($file, 'r');

    if ($handle === false) {
        add_settings_error(
            'honey_hole_import',
            'file_error',
            'Error opening file. Please try again.',
            'error'
        );
        return;
    }

    // Read headers
    $headers = fgetcsv($handle);
    if ($headers === false) {
        fclose($handle);
        add_settings_error(
            'honey_hole_import',
            'header_error',
            'Error reading CSV headers. Please check the file format.',
            'error'
        );
        return;
    }

    // Define required fields and their corresponding meta keys
    $required_fields = array(
        'Title' => 'post_title',
        'Description' => 'post_content',
        'Original Price' => 'deal_original_price',
        'Sales Price' => 'deal_sales_price',
        'Rating' => 'deal_rating',
        'Deal URL' => 'deal_url',
        'Normal Link' => 'deal_normal_link',
        'Image URL' => 'deal_image_url',
        'Category' => 'deal_category'
    );

    // Map CSV headers to required fields (case-insensitive)
    $field_map = array();
    foreach ($headers as $index => $header) {
        $header = trim($header); // Remove any whitespace but keep case
        foreach ($required_fields as $field => $meta_key) {
            if (strcasecmp($header, $field) === 0) { // Case-insensitive comparison
                $field_map[$field] = $index;
                break;
            }
        }
    }

    // Verify all required fields are present
    $missing_fields = array();
    foreach ($required_fields as $field => $meta_key) {
        if (!isset($field_map[$field])) {
            $missing_fields[] = $field;
        }
    }

    if (!empty($missing_fields)) {
        fclose($handle);
        add_settings_error(
            'honey_hole_import',
            'missing_fields',
            'Missing required fields: ' . implode(', ', $missing_fields),
            'error'
        );
        return;
    }

    $imported = 0;
    $skipped = 0;
    $errors = array();
    $row_number = 1; // Start at 1 to account for header row
    $batch_size = 20; // Process 20 rows at a time
    $batch = array();
    $start_time = microtime(true);

    while (($data = fgetcsv($handle)) !== false) {
        $row_number++;
        
        // Check if all required fields have values
        $missing_data = false;
        foreach ($field_map as $field => $index) {
            if (!isset($data[$index]) || trim($data[$index]) === '') {
                $missing_data = true;
                break;
            }
        }

        if ($missing_data) {
            $skipped++;
            continue;
        }

        // Add row to batch
        $batch[] = array(
            'data' => $data,
            'field_map' => $field_map
        );

        // Process batch when it reaches the batch size
        if (count($batch) >= $batch_size) {
            $result = honey_hole_process_import_batch($batch, $imported, $errors, $row_number);
            $imported = $result['imported'];
            $errors = $result['errors'];
            $batch = array();

            // Check if we're approaching time limit
            if (microtime(true) - $start_time > 25) { // Leave 5 seconds buffer
                add_settings_error(
                    'honey_hole_import',
                    'time_limit',
                    sprintf(
                        'Import partially completed. Successfully imported %d deals. Skipped %d rows. Some rows may not have been processed due to time constraints. Please try importing the remaining rows.',
                        $imported,
                        $skipped
                    ),
                    'warning'
                );
                break;
            }
        }
    }

    // Process any remaining rows
    if (!empty($batch)) {
        $result = honey_hole_process_import_batch($batch, $imported, $errors, $row_number);
        $imported = $result['imported'];
        $errors = $result['errors'];
    }

    fclose($handle);

    // Prepare success message
    $message = sprintf(
        'Import completed. Successfully imported %d deals. Skipped %d incomplete rows.',
        $imported,
        $skipped
    );

    if (!empty($errors)) {
        $message .= ' Errors: ' . implode('; ', $errors);
    }

    add_settings_error(
        'honey_hole_import',
        'import_success',
        $message,
        'success'
    );
}

// Helper function to process a batch of rows
function honey_hole_process_import_batch($batch, $imported, $errors, $row_number) {
    foreach ($batch as $row) {
        $data = $row['data'];
        $field_map = $row['field_map'];

        // Prepare post data
        $post_data = array(
            'post_title' => sanitize_text_field($data[$field_map['Title']]),
            'post_content' => wp_kses_post($data[$field_map['Description']]),
            'post_status' => 'publish',
            'post_type' => 'honey_hole_deal'
        );

        // Insert the post
        $post_id = wp_insert_post($post_data);

        if (is_wp_error($post_id)) {
            $errors[] = "Row {$row_number}: " . $post_id->get_error_message();
            continue;
        }

        // Add meta data
        update_post_meta($post_id, 'deal_original_price', sanitize_text_field($data[$field_map['Original Price']]));
        update_post_meta($post_id, 'deal_sales_price', sanitize_text_field($data[$field_map['Sales Price']]));
        update_post_meta($post_id, 'deal_rating', sanitize_text_field($data[$field_map['Rating']]));
        update_post_meta($post_id, 'deal_url', esc_url_raw($data[$field_map['Deal URL']]));
        update_post_meta($post_id, 'deal_normal_link', esc_url_raw($data[$field_map['Normal Link']]));
        update_post_meta($post_id, 'deal_image_url', esc_url_raw($data[$field_map['Image URL']]));

        // Set category
        $category = sanitize_text_field($data[$field_map['Category']]);
        wp_set_object_terms($post_id, $category, 'deal_category');

        $imported++;
    }

    return array(
        'imported' => $imported,
        'errors' => $errors
    );
}

// Render import page
function honey_hole_import_page()
{
    // Handle the import
    honey_hole_handle_csv_import();
    ?>
    <div class="wrap">
        <h1>Import Deals</h1>
        <?php settings_errors('honey_hole_import'); ?>
        
        <div class="honey-hole-import-section">
            <h2>Import Deals from CSV</h2>
            <p>Upload a CSV file containing your deals. The file should have the following columns (column names are case-insensitive):</p>
            <ul>
                <li><strong>Title</strong> - The deal title (required)</li>
                <li><strong>Description</strong> - The deal description (required)</li>
                <li><strong>Original Price</strong> - The original price (required)</li>
                <li><strong>Sales Price</strong> - The sale price (required)</li>
                <li><strong>Rating</strong> - The deal rating (required)</li>
                <li><strong>Deal URL</strong> - The affiliate deal URL (required)</li>
                <li><strong>Normal Link</strong> - The original product URL (required)</li>
                <li><strong>Image URL</strong> - URL to the product image (required)</li>
                <li><strong>Category</strong> - The deal category (required)</li>
            </ul>
            <p><em>Note: Rows with missing required fields will be skipped automatically. Any additional columns in the CSV will be ignored.</em></p>

            <form method="post" action="" enctype="multipart/form-data" id="honey-hole-import-form">
                <?php wp_nonce_field('honey_hole_import_csv'); ?>
                <input type="hidden" name="honey_hole_import_csv" value="1">
                <div class="honey-hole-form-field">
                    <label for="csv_file">Select CSV File</label>
                    <input type="file" id="csv_file" name="csv_file" accept=".csv" required>
                    <p class="description">The file should be a CSV with UTF-8 encoding</p>
                </div>
                <div class="honey-hole-form-actions">
                    <button type="submit" class="button button-primary" id="import-button">Import Deals</button>
                </div>
            </form>

            <div id="import-progress" style="display: none;">
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
                <div class="progress-status">Preparing import...</div>
                <div class="progress-details">
                    <p>Imported: <span id="imported-count">0</span></p>
                    <p>Skipped: <span id="skipped-count">0</span></p>
                    <p>Errors: <span id="error-count">0</span></p>
                </div>
            </div>

            <div class="honey-hole-sample-csv">
                <h3>Sample CSV Format</h3>
                <pre>title,description,original_price,sales_price,rating,deal_url,normal_link,image_url,category
"REI Co-op Flash 22 Pack","Great daypack for hiking",49.95,29.95,4.5,"https://example.com/affiliate","https://example.com/product","https://example.com/image.jpg","Backpacks"
"Patagonia Nano Puff Jacket","Lightweight insulated jacket",199.00,149.00,4.8,"https://example.com/affiliate2","https://example.com/product2","https://example.com/image2.jpg","Jackets"</pre>
            </div>
        </div>
    </div>

    <script>
    jQuery(document).ready(function($) {
        $('#honey-hole-import-form').on('submit', function(e) {
            e.preventDefault();
            
            var formData = new FormData(this);
            var $progress = $('#import-progress');
            var $progressFill = $('.progress-fill');
            var $progressText = $('.progress-text');
            var $progressStatus = $('.progress-status');
            var $importedCount = $('#imported-count');
            var $skippedCount = $('#skipped-count');
            var $errorCount = $('#error-count');
            var $importButton = $('#import-button');
            
            // Show progress bar
            $progress.show();
            $importButton.prop('disabled', true).text('Importing...');
            
            // Add action for progress tracking
            formData.append('action', 'honey_hole_import_csv_ajax');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            var percent = Math.round((e.loaded / e.total) * 100);
                            $progressFill.css('width', percent + '%');
                            $progressText.text(percent + '%');
                        }
                    }, false);
                    return xhr;
                },
                success: function(response) {
                    if (response.success) {
                        $progressStatus.text('Import completed successfully!');
                        $importedCount.text(response.data.imported);
                        $skippedCount.text(response.data.skipped);
                        $errorCount.text(response.data.errors.length);
                        
                        // Reload page after 2 seconds to show the imported deals
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    } else {
                        $progressStatus.text('Import failed: ' + response.data);
                        $importButton.prop('disabled', false).text('Import Deals');
                    }
                },
                error: function() {
                    $progressStatus.text('Import failed. Please try again.');
                    $importButton.prop('disabled', false).text('Import Deals');
                }
            });
        });
    });
    </script>
    <?php
}

// Add AJAX handler for CSV import with progress tracking
function honey_hole_import_csv_ajax() {
    if (!isset($_POST['honey_hole_import_csv']) || !check_admin_referer('honey_hole_import_csv')) {
        wp_send_json_error('Invalid nonce');
    }

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized access');
    }

    if (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) {
        wp_send_json_error('Error uploading file. Please try again.');
    }

    // Check memory limit
    $memory_limit = ini_get('memory_limit');
    $memory_limit_bytes = wp_convert_hr_to_bytes($memory_limit);
    $memory_usage = memory_get_usage(true);
    $memory_available = $memory_limit_bytes - $memory_usage;

    if ($memory_available < 10 * 1024 * 1024) { // Less than 10MB available
        wp_send_json_error('Not enough memory available for import. Please try with a smaller file or contact your hosting provider.');
    }

    // Set execution time limit
    $max_execution_time = ini_get('max_execution_time');
    if ($max_execution_time < 300) { // Less than 5 minutes
        set_time_limit(300); // Try to set to 5 minutes
    }

    $file = $_FILES['csv_file']['tmp_name'];
    $handle = fopen($file, 'r');

    if ($handle === false) {
        wp_send_json_error('Error opening file. Please try again.');
    }

    // Read headers
    $headers = fgetcsv($handle);
    if ($headers === false) {
        fclose($handle);
        wp_send_json_error('Error reading CSV headers. Please check the file format.');
    }

    // Define required fields and their corresponding meta keys
    $required_fields = array(
        'Title' => 'post_title',
        'Description' => 'post_content',
        'Original Price' => 'deal_original_price',
        'Sales Price' => 'deal_sales_price',
        'Rating' => 'deal_rating',
        'Deal URL' => 'deal_url',
        'Normal Link' => 'deal_normal_link',
        'Image URL' => 'deal_image_url',
        'Category' => 'deal_category'
    );

    // Map CSV headers to required fields (case-insensitive)
    $field_map = array();
    foreach ($headers as $index => $header) {
        $header = trim($header); // Remove any whitespace but keep case
        foreach ($required_fields as $field => $meta_key) {
            if (strcasecmp($header, $field) === 0) { // Case-insensitive comparison
                $field_map[$field] = $index;
                break;
            }
        }
    }

    // Verify all required fields are present
    $missing_fields = array();
    foreach ($required_fields as $field => $meta_key) {
        if (!isset($field_map[$field])) {
            $missing_fields[] = $field;
        }
    }

    if (!empty($missing_fields)) {
        fclose($handle);
        wp_send_json_error('Missing required fields: ' . implode(', ', $missing_fields));
    }

    // Count total rows for progress calculation
    $total_rows = 0;
    $temp_handle = fopen($file, 'r');
    fgetcsv($temp_handle); // Skip header
    while (fgetcsv($temp_handle) !== false) {
        $total_rows++;
    }
    fclose($temp_handle);

    $imported = 0;
    $skipped = 0;
    $errors = array();
    $row_number = 1; // Start at 1 to account for header row
    $batch_size = 20; // Process 20 rows at a time
    $batch = array();
    $start_time = microtime(true);

    while (($data = fgetcsv($handle)) !== false) {
        $row_number++;
        
        // Check if all required fields have values
        $missing_data = false;
        foreach ($field_map as $field => $index) {
            if (!isset($data[$index]) || trim($data[$index]) === '') {
                $missing_data = true;
                break;
            }
        }

        if ($missing_data) {
            $skipped++;
            continue;
        }

        // Add row to batch
        $batch[] = array(
            'data' => $data,
            'field_map' => $field_map
        );

        // Process batch when it reaches the batch size
        if (count($batch) >= $batch_size) {
            $result = honey_hole_process_import_batch($batch, $imported, $errors, $row_number);
            $imported = $result['imported'];
            $errors = $result['errors'];
            $batch = array();

            // Check if we're approaching time limit
            if (microtime(true) - $start_time > 25) { // Leave 5 seconds buffer
                wp_send_json_error(sprintf(
                    'Import partially completed. Successfully imported %d deals. Skipped %d rows. Some rows may not have been processed due to time constraints. Please try importing the remaining rows.',
                    $imported,
                    $skipped
                ));
                break;
            }
        }
    }

    // Process any remaining rows
    if (!empty($batch)) {
        $result = honey_hole_process_import_batch($batch, $imported, $errors, $row_number);
        $imported = $result['imported'];
        $errors = $result['errors'];
    }

    fclose($handle);

    wp_send_json_success(array(
        'imported' => $imported,
        'skipped' => $skipped,
        'errors' => $errors,
        'message' => sprintf(
            'Import completed. Successfully imported %d deals. Skipped %d incomplete rows.',
            $imported,
            $skipped
        )
    ));
}
add_action('wp_ajax_honey_hole_import_csv_ajax', 'honey_hole_import_csv_ajax');

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

// Add meta boxes
function honey_hole_add_meta_boxes() {
    add_meta_box(
        'honey_hole_deal_details',
        'Deal Details',
        'honey_hole_deal_details_callback',
        'honey_hole_deal',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'honey_hole_add_meta_boxes');
add_action('save_post_honey_hole_deal', 'honey_hole_save_deal_details');

// Render meta box content
function honey_hole_deal_details_callback($post) {
    // Add nonce for security
    wp_nonce_field('honey_hole_save_deal_details', 'honey_hole_deal_details_nonce');
    
    // Get saved values
    $price = get_post_meta($post->ID, '_honey_hole_price', true);
    $original_price = get_post_meta($post->ID, '_honey_hole_original_price', true);
    $store = get_post_meta($post->ID, '_honey_hole_store', true);
    $url = get_post_meta($post->ID, '_honey_hole_url', true);
    $original_url = get_post_meta($post->ID, '_honey_hole_original_url', true);
    $image_url = get_post_meta($post->ID, '_honey_hole_image_url', true);
    $date_found = get_post_meta($post->ID, '_honey_hole_date_found', true);
    
    // If date_found is empty, use current date
    if (empty($date_found)) {
        $date_found = current_time('Y-m-d');
    }
    
    // Output the form fields
    ?>
    <div class="honey-hole-meta-box">
        <p>
            <label for="honey_hole_price">Price ($):</label>
            <input type="text" id="honey_hole_price" name="honey_hole_price" value="<?php echo esc_attr($price); ?>" />
        </p>
        <p>
            <label for="honey_hole_original_price">Original Price ($):</label>
            <input type="text" id="honey_hole_original_price" name="honey_hole_original_price" value="<?php echo esc_attr($original_price); ?>" />
        </p>
        <p>
            <label for="honey_hole_store">Store:</label>
            <input type="text" id="honey_hole_store" name="honey_hole_store" value="<?php echo esc_attr($store); ?>" />
        </p>
        <p>
            <label for="honey_hole_url">Deal URL:</label>
            <input type="url" id="honey_hole_url" name="honey_hole_url" value="<?php echo esc_url($url); ?>" class="widefat" />
        </p>
        <p>
            <label for="honey_hole_original_url">Original URL:</label>
            <input type="url" id="honey_hole_original_url" name="honey_hole_original_url" value="<?php echo esc_url($original_url); ?>" class="widefat" />
        </p>
        <p>
            <label for="honey_hole_image_url">Image URL:</label>
            <input type="url" id="honey_hole_image_url" name="honey_hole_image_url" value="<?php echo esc_url($image_url); ?>" class="widefat" />
        </p>
        <p>
            <label for="honey_hole_date_found">Date Found:</label>
            <input type="date" id="honey_hole_date_found" name="honey_hole_date_found" value="<?php echo esc_attr($date_found); ?>" />
        </p>
    </div>
    <?php
}

// Save meta box data
function honey_hole_save_deal_details($post_id) {
    // Check if our nonce is set
    if (!isset($_POST['honey_hole_deal_details_nonce'])) {
        return;
    }
    
    // Verify that the nonce is valid
    if (!wp_verify_nonce($_POST['honey_hole_deal_details_nonce'], 'honey_hole_save_deal_details')) {
        return;
    }
    
    // If this is an autosave, our form has not been submitted, so we don't want to do anything
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    // Check the user's permissions
    if (isset($_POST['post_type']) && 'honey_hole_deal' == $_POST['post_type']) {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }
    
    // Save the meta box data
    if (isset($_POST['honey_hole_price'])) {
        update_post_meta($post_id, '_honey_hole_price', sanitize_text_field($_POST['honey_hole_price']));
    }
    
    if (isset($_POST['honey_hole_original_price'])) {
        update_post_meta($post_id, '_honey_hole_original_price', sanitize_text_field($_POST['honey_hole_original_price']));
    }
    
    if (isset($_POST['honey_hole_store'])) {
        update_post_meta($post_id, '_honey_hole_store', sanitize_text_field($_POST['honey_hole_store']));
    }
    
    if (isset($_POST['honey_hole_url'])) {
        update_post_meta($post_id, '_honey_hole_url', esc_url_raw($_POST['honey_hole_url']));
    }
    
    if (isset($_POST['honey_hole_original_url'])) {
        update_post_meta($post_id, '_honey_hole_original_url', esc_url_raw($_POST['honey_hole_original_url']));
    }
    
    if (isset($_POST['honey_hole_image_url'])) {
        update_post_meta($post_id, '_honey_hole_image_url', esc_url_raw($_POST['honey_hole_image_url']));
    }
    
    if (isset($_POST['honey_hole_date_found'])) {
        update_post_meta($post_id, '_honey_hole_date_found', sanitize_text_field($_POST['honey_hole_date_found']));
    }
}
