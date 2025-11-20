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
     * 
     * IMPORTANT: This checks if the plugin is already installed to prevent
     * data loss during updates. On updates, only non-destructive tasks run.
     */
    public static function activate() {
        // Check if this is a fresh install or an update
        $installed_version = get_option('honey_hole_version');
        $current_version = defined('HONEY_HOLE_VERSION') ? HONEY_HOLE_VERSION : '3.0.0';
        $is_fresh_install = !$installed_version;
        $is_update = $installed_version && version_compare($installed_version, $current_version, '<');
        
        // On fresh install, set up everything
        if ($is_fresh_install) {
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
            
            // Create necessary database tables
            self::create_tables();
            
            // Mark as installed
            update_option('honey_hole_version', $current_version);
            update_option('honey_hole_installed', current_time('mysql'));
        }
        
        // On update, run upgrade tasks
        if ($is_update) {
            self::upgrade($installed_version, $current_version);
        }
        
        // Always flush rewrite rules (safe on both install and update)
        // This ensures custom post type URLs work correctly
        flush_rewrite_rules();
        
        // Store the current version
        update_option('honey_hole_version', $current_version);
    }
    
    /**
     * Handle plugin upgrades.
     * 
     * @param string $old_version The previous version
     * @param string $new_version The new version
     */
    private static function upgrade($old_version, $new_version) {
        // Ensure tables exist (in case new tables were added)
        self::create_tables();
        
        // Run version-specific upgrade tasks
        // Example: if (version_compare($old_version, '2.0.0', '<')) {
        //     // Migrate data from version 1.x to 2.x
        // }
        
        // Log the upgrade for debugging
        error_log("Honey Hole: Upgraded from {$old_version} to {$new_version}");
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