<?php

/**
 * Handle custom meta boxes for deals.
 *
 * @package Honey_Hole
 */

class Honey_Hole_Meta_Boxes
{
    /**
     * Add meta boxes to the deal post type.
     */
    public function add_meta_boxes()
    {
        add_meta_box(
            'honey_hole_deal_details',
            'Deal Details',
            array($this, 'render_deal_details_meta_box'),
            'honey_hole_deal',
            'normal',
            'high'
        );
    }

    /**
     * Render the deal details meta box.
     *
     * @param WP_Post $post The post object.
     */
    public function render_deal_details_meta_box($post)
    {
        // Add nonce for security
        wp_nonce_field('honey_hole_save_meta_box_data', 'honey_hole_meta_box_nonce');

        // Get existing values
        $original_price = get_post_meta($post->ID, 'deal_original_price', true);
        $sales_price = get_post_meta($post->ID, 'deal_sales_price', true);
        $rating = get_post_meta($post->ID, 'deal_rating', true);
        $deal_url = get_post_meta($post->ID, 'deal_url', true);
        $normal_link = get_post_meta($post->ID, 'deal_normal_link', true);
        $image_url = get_post_meta($post->ID, 'deal_image_url', true);
        $original_url = get_post_meta($post->ID, 'deal_original_url', true);
        $promo_code = get_post_meta($post->ID, 'deal_promo_code', true);
        $seller = get_post_meta($post->ID, 'deal_seller', true);
        $description = get_post_meta($post->ID, 'deal_description', true);
        $background_image = get_post_meta($post->ID, 'deal_background_image', true);

        // Get the current category to determine which fields to show
        $terms = get_the_terms($post->ID, 'deal_category');
        $current_category = $terms && !empty($terms) ? $terms[0]->name : '';

        // Output the form fields
?>
        <div id="honey-hole-category-selector">
            <p>
                <label for="honey_hole_deal_category">Deal Category:</label>
                <select id="honey_hole_deal_category" name="honey_hole_deal_category" onchange="honeyHoleToggleFields()">
                    <option value="">Select Category</option>
                    <?php
                    $categories = get_terms(array(
                        'taxonomy' => 'deal_category',
                        'hide_empty' => false,
                    ));
                    foreach ($categories as $category) {
                        $selected = ($current_category === $category->name) ? 'selected' : '';
                        echo '<option value="' . esc_attr($category->name) . '" ' . $selected . '>' . esc_html($category->name) . '</option>';
                    }
                    ?>
                </select>
            </p>
        </div>

        <!-- Standard Deal Fields (hidden for Big Sale) -->
        <div id="honey-hole-standard-fields" class="honey-hole-field-group" style="<?php echo ($current_category === 'Big Sale') ? 'display: none;' : ''; ?>">
            <p>
                <label for="honey_hole_original_price">Original Price:</label>
                <input type="text" id="honey_hole_original_price" name="honey_hole_original_price" value="<?php echo esc_attr($original_price); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_sales_price">Sales Price:</label>
                <input type="text" id="honey_hole_sales_price" name="honey_hole_sales_price" value="<?php echo esc_attr($sales_price); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_rating">Rating:</label>
                <input type="text" id="honey_hole_rating" name="honey_hole_rating" value="<?php echo esc_attr($rating); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_normal_link">Normal Link:</label>
                <input type="url" id="honey_hole_normal_link" name="honey_hole_normal_link" value="<?php echo esc_url($normal_link); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_original_url">Original URL:</label>
                <input type="url" id="honey_hole_original_url" name="honey_hole_original_url" value="<?php echo esc_url($original_url); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_seller">Seller:</label>
                <input type="text" id="honey_hole_seller" name="honey_hole_seller" value="<?php echo esc_attr($seller); ?>" class="widefat" />
                <span class="description">Add the seller for the deal</span>
            </p>
        </div>

        <!-- Big Sale Specific Fields (hidden for standard deals) -->
        <div id="honey-hole-big-sale-fields" class="honey-hole-field-group" style="<?php echo ($current_category === 'Big Sale') ? '' : 'display: none;'; ?>">
            <p>
                <label for="honey_hole_description">Description:</label>
                <textarea id="honey_hole_description" name="honey_hole_description" class="widefat" rows="4"><?php echo esc_textarea($description); ?></textarea>
                <span class="description">Enter a detailed description for the big sale deal</span>
            </p>
            <p>
                <label for="honey_hole_background_image">Background Image URL:</label>
                <input type="url" id="honey_hole_background_image" name="honey_hole_background_image" value="<?php echo esc_url($background_image); ?>" class="widefat" />
                <span class="description">Enter the URL for the background image (optional)</span>
            </p>
        </div>

        <!-- Common Fields (shown for all deals) -->
        <div id="honey-hole-common-fields">
            <p>
                <label for="honey_hole_deal_url">Deal URL:</label>
                <input type="url" id="honey_hole_deal_url" name="honey_hole_deal_url" value="<?php echo esc_url($deal_url); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_image_url">Image URL:</label>
                <input type="url" id="honey_hole_image_url" name="honey_hole_image_url" value="<?php echo esc_url($image_url); ?>" class="widefat" />
            </p>
            <p>
                <label for="honey_hole_promo_code">Promo Code (Optional):</label>
                <input type="text" id="honey_hole_promo_code" name="honey_hole_promo_code" value="<?php echo esc_attr($promo_code); ?>" class="widefat" />
                <span class="description">Enter any promotional code for this deal</span>
            </p>
        </div>

        <script>
        function honeyHoleToggleFields() {
            const categorySelect = document.getElementById('honey_hole_deal_category');
            const standardFields = document.getElementById('honey-hole-standard-fields');
            const bigSaleFields = document.getElementById('honey-hole-big-sale-fields');
            
            if (categorySelect.value === 'Big Sale') {
                standardFields.style.display = 'none';
                bigSaleFields.style.display = 'block';
            } else {
                standardFields.style.display = 'block';
                bigSaleFields.style.display = 'none';
            }
        }
        </script>
<?php
    }

    /**
     * Save meta box data.
     *
     * @param int $post_id The post ID.
     */
    public function save_meta_box_data($post_id)
    {
        // Check if our nonce is set
        if (!isset($_POST['honey_hole_meta_box_nonce'])) {
            return;
        }

        // Verify that the nonce is valid
        if (!wp_verify_nonce($_POST['honey_hole_meta_box_nonce'], 'honey_hole_save_meta_box_data')) {
            return;
        }

        // If this is an autosave, our form has not been submitted, so we don't want to do anything
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Check the user's permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Save the meta fields
        $fields = array(
            'honey_hole_original_price' => 'deal_original_price',
            'honey_hole_sales_price' => 'deal_sales_price',
            'honey_hole_rating' => 'deal_rating',
            'honey_hole_deal_url' => 'deal_url',
            'honey_hole_normal_link' => 'deal_normal_link',
            'honey_hole_image_url' => 'deal_image_url',
            'honey_hole_original_url' => 'deal_original_url',
            'honey_hole_promo_code' => 'deal_promo_code',
            'honey_hole_seller' => 'deal_seller',
            'honey_hole_description' => 'deal_description',
            'honey_hole_background_image' => 'deal_background_image'
        );

        foreach ($fields as $field => $meta_key) {
            if (isset($_POST[$field])) {
                $value = sanitize_text_field($_POST[$field]);
                update_post_meta($post_id, $meta_key, $value);
            }
        }

        // Save the category if it was changed
        if (isset($_POST['honey_hole_deal_category'])) {
            $category_name = sanitize_text_field($_POST['honey_hole_deal_category']);
            if (!empty($category_name)) {
                $category = get_term_by('name', $category_name, 'deal_category');
                if ($category) {
                    wp_set_object_terms($post_id, $category->term_id, 'deal_category');
                }
            }
        }
    }
}
