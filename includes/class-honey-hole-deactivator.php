<?php
/**
 * Fired during plugin deactivation.
 *
 * @package Honey_Hole
 */

class Honey_Hole_Deactivator {
    /**
     * Deactivate the plugin.
     *
     * This method is called when the plugin is deactivated.
     * It performs cleanup tasks like:
     * - Flushing rewrite rules
     * - Cleaning up temporary data
     */
    public static function deactivate() {
        // Flush rewrite rules to remove our custom post type
        flush_rewrite_rules();
        
        // Clear any scheduled events
        wp_clear_scheduled_hook('honey_hole_cleanup_old_deals');
        
        // Clear any transients
        delete_transient('honey_hole_recent_deals');
        delete_transient('honey_hole_popular_deals');
        
        // Clear any cached data
        wp_cache_flush();
    }
} 