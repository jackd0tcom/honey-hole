<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://fishbones.digital
 * @since      .0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/admin
 * @author     Jack Ball <jackballdev@gmail.com>
 */

 class Honey_Hole_Admin {
	   /**
     * Add the admin menu items.
     */
    public function add_admin_menu()
    {
        add_menu_page(
            'Honey Hole Deals',
            'Honey Hole',
            'manage_options',
            'honey-hole',
            array($this, 'honey_hole_admin_page'),
            'dashicons-money-alt',
            30
        );

        //add_submenu_page(
        //    'honey-hole',
        //    'Import Deals',
        //    'Import Deals',
        //    'manage_options',
        //    'honey-hole-import',
        //    array($this, 'display_import_page')
        //);
	
		// add_submenu_page(
		// 	'honey-hole',
		// 	'All Deals',
		// 	'All Deals',
		// 	'manage_options',
		// 	'honey-hole',
		// 	'honey_hole_admin_page'
		// );
	
		// add_submenu_page(
		// 	'honey-hole',
		// 	'Add New Deal',
		// 	'Add New',
		// 	'manage_options',
		// 	'honey-hole-add-deal',
		// 	'honey_hole_add_deal_page'
		// );
	
		// add_submenu_page(
		// 	'honey-hole',
		// 	'Manage Categories',
		// 	'Categories',
		// 	'manage_options',
		// 	'honey-hole-categories',
		// 	'honey_hole_categories_page'
		// );
	
		// // Add hidden submenu for edit page
		// add_submenu_page(
		// 	null, // Parent slug (null makes it hidden)
		// 	'Edit Deal',
		// 	'Edit Deal',
		// 	'manage_options',
		// 	'honey-hole-edit-deal',
		// 	'honey_hole_edit_deal_page'
		// );
	
		// add_submenu_page(
		// 	'honey-hole',
		// 	'Import Deals',
		// 	'Import Deals',
		// 	'manage_options',
		// 	'honey-hole-import',
		// 	'honey_hole_import_page'
		// );
    }

	/**
	 * The ID of this plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    2.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Honey_Hole_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Honey_Hole_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/honey-hole-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Honey_Hole_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Honey_Hole_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/honey-hole-admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Display the main admin page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_admin_page() {
		// Check if the current user has the necessary capabilities
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}
		
		// Include the admin display partial
		require_once plugin_dir_path(__FILE__) . 'partials/honey-hole-admin-display.php';
		
		// Call the display function
		honey_hole_render_deals_table();
	}

}
