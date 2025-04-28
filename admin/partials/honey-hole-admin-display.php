<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://fishbones.digital
 * @since      2.0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/admin/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<?php
// Check if the current user has the necessary capabilities
if (!current_user_can('manage_options')) {
    wp_die(__('You do not have sufficient permissions to access this page.'));
}
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