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
        
        // Get the selected category name
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const categoryName = selectedOption.text;
        
        if (categoryName === 'Big Sale') {
            // Show Big Sale fields, hide standard fields
            standardFields.style.display = 'none';
            bigSaleFields.style.display = 'block';
            
            // Disable required attributes for standard deal fields
            const standardRequiredFields = standardFields.querySelectorAll('[required]');
            standardRequiredFields.forEach(field => {
                field.required = false;
                field.disabled = true; // Disable to prevent form submission
            });
            
            // Enable required attributes for Big Sale fields
            const bigSaleRequiredFields = bigSaleFields.querySelectorAll('[required]');
            bigSaleRequiredFields.forEach(field => {
                field.required = true;
                field.disabled = false;
            });
            
        } else if (categoryName !== '') {
            // Show standard fields, hide Big Sale fields
            standardFields.style.display = 'block';
            bigSaleFields.style.display = 'none';
            
            // Enable required attributes for standard deal fields
            const standardRequiredFields = standardFields.querySelectorAll('[required]');
            standardRequiredFields.forEach(field => {
                field.required = true;
                field.disabled = false;
            });
            
            // Disable required attributes for Big Sale fields
            const bigSaleRequiredFields = bigSaleFields.querySelectorAll('[required]');
            bigSaleRequiredFields.forEach(field => {
                field.required = false;
                field.disabled = true; // Disable to prevent form submission
            });
        } else {
            // No category selected - show all fields but disable them until category is chosen
            standardFields.style.display = 'block';
            bigSaleFields.style.display = 'block';
            
            // Disable all fields until category is selected
            const allFields = document.querySelectorAll('#honey-hole-standard-deal-fields input, #honey-hole-standard-deal-fields textarea, #honey-hole-big-sale-fields input, #honey-hole-big-sale-fields textarea');
            allFields.forEach(field => {
                field.disabled = true;
            });
        }
    }
    
    // Initialize fields on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Only run the toggle function if a category is already selected
        const categorySelect = document.getElementById('deal-category');
        if (categorySelect && categorySelect.value !== '') {
            honeyHoleToggleAddDealFields();
        }
        
        // Add form validation debugging
        const form = document.getElementById('honey-hole-deal-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                console.log('Form submission - validating fields...');
                
                // Check which category is selected
                const categorySelect = document.getElementById('deal-category');
                const selectedOption = categorySelect.options[categorySelect.selectedIndex];
                const categoryName = selectedOption.text;
                
                console.log('Selected category:', categoryName);
                
                if (categoryName === 'Big Sale') {
                    // Validate Big Sale fields
                    const bigSaleTitle = document.getElementById('deal-title-big-sale');
                    const description = document.getElementById('deal-description');
                    
                    if (!bigSaleTitle.value.trim()) {
                        e.preventDefault();
                        alert('Please enter a title for the Big Sale deal.');
                        bigSaleTitle.focus();
                        return false;
                    }
                    
                    if (!description.value.trim()) {
                        e.preventDefault();
                        alert('Please enter a description for the Big Sale deal.');
                        description.focus();
                        return false;
                    }
                } else if (categoryName !== '') {
                    // Validate standard deal fields
                    const title = document.getElementById('deal-title');
                    const originalPrice = document.getElementById('deal-original-price');
                    const salesPrice = document.getElementById('deal-sales-price');
                    const seller = document.getElementById('deal-seller');
                    
                    if (!title.value.trim()) {
                        e.preventDefault();
                        alert('Please enter a title for the deal.');
                        title.focus();
                        return false;
                    }
                    
                    if (!originalPrice.value || parseFloat(originalPrice.value) <= 0) {
                        e.preventDefault();
                        alert('Please enter a valid original price.');
                        originalPrice.focus();
                        return false;
                    }
                    
                    if (!salesPrice.value || parseFloat(salesPrice.value) <= 0) {
                        e.preventDefault();
                        alert('Please enter a valid sales price.');
                        salesPrice.focus();
                        return false;
                    }
                    
                    if (!seller.value.trim()) {
                        e.preventDefault();
                        alert('Please enter a seller for the deal.');
                        seller.focus();
                        return false;
                    }
                } else {
                    e.preventDefault();
                    alert('Please select a category for the deal.');
                    categorySelect.focus();
                    return false;
                }
                
                // Validate common fields
                const dealUrl = document.getElementById('deal-url');
                const imageUrl = document.getElementById('deal-image-url');
                
                if (!dealUrl.value.trim()) {
                    e.preventDefault();
                    alert('Please enter a deal URL.');
                    dealUrl.focus();
                    return false;
                }
                
                if (!imageUrl.value.trim()) {
                    e.preventDefault();
                    alert('Please enter an image URL.');
                    imageUrl.focus();
                    return false;
                }
                
                console.log('Form validation passed!');
            });
        }
    });
    </script>
<?php
}
