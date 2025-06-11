<?php
/**
 * Handle custom meta boxes for deals.
 *
 * @package Honey_Hole
 */

class Honey_Hole_Meta_Boxes {
    /**
     * Add meta boxes to the deal post type.
     */
    public function add_meta_boxes() {
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
    public function render_deal_details_meta_box($post) {
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
        
        // Output the form fields
        ?>
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
            <label for="honey_hole_deal_url">Deal URL:</label>
            <input type="url" id="honey_hole_deal_url" name="honey_hole_deal_url" value="<?php echo esc_url($deal_url); ?>" class="widefat" />
        </p>
        <p>
            <label for="honey_hole_normal_link">Normal Link:</label>
            <input type="url" id="honey_hole_normal_link" name="honey_hole_normal_link" value="<?php echo esc_url($normal_link); ?>" class="widefat" />
        </p>
        <p>
            <label for="honey_hole_image_url">Image URL:</label>
            <input type="url" id="honey_hole_image_url" name="honey_hole_image_url" value="<?php echo esc_url($image_url); ?>" class="widefat" />
        </p>
        <p>
            <label for="honey_hole_original_url">Original URL:</label>
            <input type="url" id="honey_hole_original_url" name="honey_hole_original_url" value="<?php echo esc_url($original_url); ?>" class="widefat" />
        </p>
        <?php
    }
    
    /**
     * Save meta box data.
     *
     * @param int $post_id The post ID.
     */
    public function save_meta_box_data($post_id) {
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
            'honey_hole_original_url' => 'deal_original_url'
        );
        
        foreach ($fields as $field => $meta_key) {
            if (isset($_POST[$field])) {
                $value = sanitize_text_field($_POST[$field]);
                update_post_meta($post_id, $meta_key, $value);
            }
        }
    }
} 