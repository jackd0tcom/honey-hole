<?php

function honey_hole_deals_shortcode($atts)
{
    // Parse attributes
    $atts = shortcode_atts(array(
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
                        <p>We update this page all the time with the best deals we find on gear for camping, hiking, backpacking, hunting, fishing, and more.
                        </p>
                        <p>Bookmark this page and check back often!</p>
                        <p>Deal prices are valid at time of posting, but could change at any moment.</p>
                        <p id="honey-hole-updated">Last Updated: <?php echo date('F j, Y'); ?></p>
                    </div>
                </div>
            </div>
            <div class="category-section">
                <p id="hh-affiliate-disclaimer">DISCLAIMER: Outdoor Empire does not sell the products on this page. Some or all links are affiliate links which means we may earn a small commission if you make a purchase, at no cost to you. As an Amazon Associate I earn from qualifying purchases. Discounts and availability are not guaranteed. Verify all information at respective retailers before making a purchase. <a href="https://outdoorempire.com/affiliate-disclaimer/" target="_blank" rel="noopener noreferrer">Learn More</a></p>
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
                            <form method="post" class="af-form-wrapper" accept-charset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl">
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
                                <div id="af-form-894900673" class="af-form">
                                    <div id="hh-input-wrapper" class="af-body af-standards">
                                        <div class="af-element">
                                            <div class="af-textWrap"><input placeholder="Email" class="text" id="awf_field-118013225" type="email" name="email" value="" tabindex="500" onfocus=" if (this.value == '') { this.value = ''; }" onblur="if (this.value == '') { this.value='';}" />
                                            </div>
                                            <div class="af-clear"></div>
                                        </div>
                                        <div class="af-element buttonContainer">
                                            <input id="hh-email-submit" name="submit" class="submit" type="submit" value="Subscribe" tabindex="501" />
                                            <div class="af-clear"></div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: none;"><img src="https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM" alt="" /></div>
                            </form>
                            <p class="hh-email-disclaimer">We email once per week, sometimes more. Unsubscribe at any time.</p>
                            <p class="hh-email-disclaimer">We respect your <a id="hh-email-disclaimer-link" href="https://www.aweber.com/privacy.htm" target="_blank" rel="noopener noreferrer">email privacy</a></p>
                        </div>
                    </div>
                    <div class="hh-email-container-two-wrapper">
                        <div class="hh-email-container-two">
                            <h4>Get Sweet Outdoor Gear Deals in Your Inbox 🤑🏕️🔥
                            </h4>
                            <p>Receive outdoor stories, tips, and deal alerts. Plus, be entered into our weekly gear giveaway when you sign up for <span style="font-style: italic;">The Honey Hole</span> email newsletter!
                            </p>
                            <p>Join thousands of outdoor enthusiasts who love saving money and discovering the best gear.</p>
                        </div>
                    </div>
                </div>
            </div>
        <?php
        endif;

        // Get all deals
        $args = array(
            'post_type' => 'honey_hole_deal',
            'post_status' => 'publish',
            'posts_per_page' => $atts['count'],
            'orderby' => 'menu_order',
            'order' => 'ASC'
        );

        $query = new WP_Query($args);
        $deals = $query->posts;

        if (!empty($deals)) :
        ?>
            <div class="category-section">
                <h2>Outdoor Gear Deals</h2>
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
