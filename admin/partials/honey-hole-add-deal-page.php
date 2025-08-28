<?php

/**
 * Add a new deal to the Honey Hole
 *
 * @since      2.0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/admin/partials
 */

function honey_hole_add_deal_page()
{
?>
    <div class="wrap">
        <h1>Add New Deal</h1>
        <form id="honey-hole-deal-form" method="post" action="">
            <?php wp_nonce_field('honey_hole_add_deal', 'honey_hole_nonce'); ?>
            <input type="hidden" name="action" value="add_deal">
            <div class="honey-hole-form-container">
                
                <!-- Category Selection (First) -->
                <div class="honey-hole-form-section">
                    <h2>Deal Category</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-category">Category *</label>
                        <select id="deal-category" name="deal_category" required onchange="honeyHoleToggleAddDealFields()">
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
                        <p class="description">Select the category for this deal. Big Sale deals have a different structure.</p>
                    </div>
                </div>

                <!-- Standard Deal Fields (hidden for Big Sale) -->
                <div id="honey-hole-standard-deal-fields" class="honey-hole-form-section" style="display: none;">
                    <h2>Standard Deal Information</h2>
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
                        <label for="deal-seller">Seller *</label>
                        <input type="text" id="deal-seller" name="deal_seller" placeholder="Enter seller" required>
                        <p class="description">Enter the seller for this deal</p>
                    </div>
                </div>

                <!-- Big Sale Specific Fields (hidden for standard deals) -->
                <div id="honey-hole-big-sale-fields" class="honey-hole-form-section" style="display: none;">
                    <h2>Big Sale Deal Information</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-title-big-sale">Title *</label>
                        <input type="text" id="deal-title-big-sale" name="deal_title_big_sale" required>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-description">Description *</label>
                        <textarea id="deal-description" name="deal_description" rows="4" required placeholder="Enter a detailed description for the big sale deal"></textarea>
                        <p class="description">Provide a compelling description for the big sale deal</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-background-image">Background Image URL</label>
                        <input type="url" id="deal-background-image" name="deal_background_image" placeholder="Enter background image URL (optional)">
                        <p class="description">Enter the URL for a background image (optional)</p>
                    </div>
                </div>

                <!-- Common Fields (shown for all deals) -->
                <div class="honey-hole-form-section">
                    <h2>Common Deal Details</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-url">Deal URL *</label>
                        <input type="url" id="deal-url" name="deal_url" required>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-promo-code">Promo Code (Optional)</label>
                        <input type="text" id="deal-promo-code" name="deal_promo_code" placeholder="Enter promotional code">
                        <p class="description">Enter any promotional code for this deal</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-tags">Tags</label>
                        <input type="text" id="deal-tags" name="deal_tags" class="honey-hole-tags-input" placeholder="Add tags (comma separated)">
                        <div class="honey-hole-tags-container"></div>
                        <p class="description">Enter tags separated by commas (e.g., camping, hiking, backpacking)</p>
                    </div>
                    <div class="honey-hole-form-field">
                        <label for="deal-image">Deal Image *</label>
                        <div class="image-upload-container">
                            <input type="url" id="deal-image-url" name="deal_image_url" required>
                            <input type="file" id="deal-image-upload" accept="image/*" style="display: none;">
                            <button type="button" class="button" id="upload-image-button">Upload Image</button>
                        </div>
                        <div class="image-preview-container">
                            <div class="no-image">No image selected</div>
                        </div>
                        <p class="description">Upload an image or enter the direct URL to the product image</p>
                    </div>
                </div>
            </div>
            <div class="honey-hole-form-actions">
                <button type="submit" class="button button-primary">Save Deal</button>
                <a href="<?php echo admin_url('admin.php?page=honey-hole'); ?>" class="button">Cancel</a>
            </div>
        </form>
    </div>

    <script>
    function honeyHoleToggleAddDealFields() {
        const categorySelect = document.getElementById('deal-category');
        const standardFields = document.getElementById('honey-hole-standard-deal-fields');
        const bigSaleFields = document.getElementById('honey-hole-big-sale-fields');
        
        // Hide both sections initially
        standardFields.style.display = 'none';
        bigSaleFields.style.display = 'none';
        
        // Get the selected category name
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const categoryName = selectedOption.text;
        
        if (categoryName === 'Big Sale') {
            bigSaleFields.style.display = 'block';
            // Make Big Sale title required, standard title not required
            document.getElementById('deal-title').required = false;
            document.getElementById('deal-title-big-sale').required = true;
        } else if (categoryName !== '') {
            standardFields.style.display = 'block';
            // Make standard title required, Big Sale title not required
            document.getElementById('deal-title').required = true;
            document.getElementById('deal-title-big-sale').required = false;
        }
    }
    </script>
<?php
}
