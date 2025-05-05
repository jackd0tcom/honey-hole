<?php

/**
 * Shortcode Handler for Honey Hole
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/includes
 */

class Honey_Hole_Shortcode {

    /**
     * Initialize the class and set up hooks
     */
    public function __construct() {
        add_shortcode('honey_hole', array($this, 'render_shortcode'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }

    /**
     * Enqueue necessary scripts and styles
     */
    public function enqueue_scripts() {
        wp_enqueue_script('honey-hole-app');
        wp_enqueue_style('honey-hole-public');
    }

    /**
     * Render the shortcode
     *
     * @param array $atts Shortcode attributes
     * @return string
     */
    public function render_shortcode($atts) {
        // Create container for React app
        return '<div id="honey-hole-app"></div>';
    }
} 