<?php

/**
 * Display the categories page in the admin area.
 *
 * @since      2.0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/admin/partials
 */


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