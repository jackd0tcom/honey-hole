<?php

/**
 * Display the edit deal page.
 *
 * @since      2.0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/admin/partials
 */

function honey_hole_edit_deal_page()
{
    // Check if deal ID is provided
    if (!isset($_GET['id'])) {
        echo '<script>window.location.href = "' . admin_url('admin.php?page=honey-hole&message=invalid_deal') . '";</script>';
        return;
    }

    $deal_id = intval($_GET['id']);
    $deal = get_post($deal_id);

    // Check if deal exists and is of correct type
    if (!$deal || $deal->post_type !== 'honey_hole_deal') {
        echo '<script>window.location.href = "' . admin_url('admin.php?page=honey-hole&message=invalid_deal') . '";</script>';
        return;
    }

    // Get deal meta
    $original_price = get_post_meta($deal_id, 'deal_original_price', true);
    $sales_price = get_post_meta($deal_id, 'deal_sales_price', true);
    $deal_url = get_post_meta($deal_id, 'deal_url', true);
    $original_url = get_post_meta($deal_id, 'deal_original_url', true);
    $image_url = get_post_meta($deal_id, 'deal_image_url', true);
    $rating = get_post_meta($deal_id, 'deal_rating', true);
    $promo_code = get_post_meta($deal_id, 'deal_promo_code', true);
    $category = wp_get_post_terms($deal_id, 'deal_category', array('fields' => 'ids'));
    $category = !empty($category) ? $category[0] : '';
?>
    <div class="wrap">
        <h1>Edit Deal</h1>
        <form id="honey-hole-deal-form" method="post" action="">
            <?php wp_nonce_field('honey_hole_edit_deal', 'honey_hole_nonce'); ?>
            <input type="hidden" name="action" value="edit_deal">
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
                        <input type="url" id="deal-url" name="deal_url" value="<?php echo esc_attr($deal_url); ?>" required>
                    </div>
                </div>

                <div class="honey-hole-form-section">
                    <h2>Deal Details</h2>
                    <div class="honey-hole-form-field">
                        <label for="deal-promo-code">Promo Code (Optional)</label>
                        <input type="text" id="deal-promo-code" name="deal_promo_code" value="<?php echo esc_attr($promo_code); ?>" placeholder="Enter promotional code">
                        <p class="description">Enter any promotional code for this deal</p>
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
                        <label for="deal-image">Deal Image *</label>
                        <div class="image-upload-container">
                            <input type="url" id="deal-image-url" name="deal_image_url" value="<?php echo esc_attr($image_url); ?>" required>
                            <input type="file" id="deal-image-upload" accept="image/*" style="display: none;">
                            <button type="button" class="button" id="upload-image-button">Upload Image</button>
                        </div>
                        <div class="image-preview-container">
                            <?php if (!empty($image_url)) : ?>
                                <img src="<?php echo esc_url($image_url); ?>" alt="Deal Image" style="max-width: 200px; max-height: 200px; margin-top: 10px;">
                            <?php else : ?>
                                <div class="no-image">No image selected</div>
                            <?php endif; ?>
                        </div>
                        <p class="description">Upload an image or enter the direct URL to the product image</p>
                    </div>
                </div>
            </div>
            <div class="honey-hole-form-actions">
                <button type="submit" class="button button-primary">Update Deal</button>
                <a href="<?php echo admin_url('admin.php?page=honey-hole'); ?>" class="button">Cancel</a>
            </div>
        </form>
    </div>

    <script>
        jQuery(document).ready(function($) {
            // Image upload functionality
            $('#upload-image-button').on('click', function() {
                $('#deal-image-upload').click();
            });

            $('#deal-image-upload').on('change', function() {
                var file = this.files[0];
                if (file) {
                    var formData = new FormData();
                    formData.append('action', 'honey_hole_upload_image');
                    formData.append('nonce', '<?php echo wp_create_nonce('honey_hole_image_upload'); ?>');
                    formData.append('deal_id', '<?php echo esc_js($deal_id); ?>');
                    formData.append('image', file);

                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            if (response.success) {
                                $('#deal-image-url').val(response.data.image_url);
                                $('.image-preview-container').html('<img src="' + response.data.image_url + '" alt="Deal Image" style="max-width: 200px; max-height: 200px; margin-top: 10px;">');
                            } else {
                                alert('Upload failed: ' + response.data);
                            }
                        },
                        error: function() {
                            alert('Upload failed. Please try again.');
                        }
                    });
                }
            });

            // Discount calculation
            function calculateDiscount() {
                var originalPrice = parseFloat($('#deal-original-price').val()) || 0;
                var salesPrice = parseFloat($('#deal-sales-price').val()) || 0;
                
                if (originalPrice > 0 && salesPrice > 0) {
                    var discount = Math.round((originalPrice - salesPrice) / originalPrice * 100);
                    $('#discount-percentage').text(discount);
                } else {
                    $('#discount-percentage').text('0');
                }
            }

            $('#deal-original-price, #deal-sales-price').on('input', calculateDiscount);
            calculateDiscount(); // Calculate on page load

            // Rating stars functionality
            $('.rating-stars .star').on('click', function() {
                var value = $(this).data('value');
                $('#deal-rating').val(value);
                updateStars(value);
            });

            function updateStars(value) {
                $('.rating-stars .star').removeClass('filled');
                $('.rating-stars .star').each(function(index) {
                    if (index < value) {
                        $(this).addClass('filled');
                    }
                });
            }

            // Initialize stars on page load
            updateStars(parseFloat($('#deal-rating').val()) || 0);
        });
    </script>
<?php
}
