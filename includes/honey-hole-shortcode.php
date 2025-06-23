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
    <div id="honey-hole-app" data-count="<?php echo esc_attr($atts['count']); ?>" data-columns="<?php echo esc_attr($atts['columns']); ?>"></div>
<?php
    return ob_get_clean();
}
