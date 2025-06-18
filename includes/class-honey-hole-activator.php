<?php
/**
 * Fired during plugin activation.
 *
 * @package Honey_Hole
 */

class Honey_Hole_Activator {
    /**
     * Activate the plugin.
     *
     * This method is called when the plugin is activated.
     * It performs necessary setup tasks like:
     * - Creating custom tables
     * - Setting up default options
     * - Flushing rewrite rules
     */
    public static function activate() {
        // Flush rewrite rules to ensure our custom post type works
        flush_rewrite_rules();
        
        // Set default options if they don't exist
        if (!get_option('honey_hole_settings')) {
            update_option('honey_hole_settings', array(
                'items_per_page' => 12,
                'show_ratings' => true,
                'show_categories' => true,
                'default_sort' => 'date',
                'default_order' => 'desc'
            ));
        }
        
        // Set default video URL if it doesn't exist
        if (!get_option('honey_hole_video_url')) {
            update_option('honey_hole_video_url', 'https://www.youtube.com/embed/SMiEJ0qDJ8I?si=y-zCwgrDLO7z7NUO');
        }
        
        // Create necessary database tables if needed
        self::create_tables();
    }
    
    /**
     * Create necessary database tables.
     */
    private static function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Example table for storing import history
        $table_name = $wpdb->prefix . 'honey_hole_imports';
        
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            import_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            total_rows int(11) NOT NULL,
            imported_rows int(11) NOT NULL,
            skipped_rows int(11) NOT NULL,
            error_rows int(11) NOT NULL,
            status varchar(20) NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
} 