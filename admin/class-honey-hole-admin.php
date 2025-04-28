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

		$hh_icon = plugins_url('images/honey-hole-icon.svg', __FILE__);	

        add_menu_page(
            'Honey Hole Deals',
            'Honey Hole',
            'manage_options',
            'honey-hole',
            array($this, 'honey_hole_admin_page'),
            $hh_icon,
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
	
		add_submenu_page(
			'honey-hole',
			'All Deals',
			'All Deals',
			'manage_options',
			'honey-hole',
			array($this, 'honey_hole_admin_page')
		);
	
		add_submenu_page(
			'honey-hole',
			'Add New Deal',
			'Add New Deal',
			'manage_options',
			'honey-hole-add-deal',
			array($this, 'honey_hole_add_deal_page')
		);
	
		add_submenu_page(
			'honey-hole',
			'Manage Categories',
			'Categories',
			'manage_options',
			'honey-hole-categories',
			array($this, 'honey_hole_categories_page')
		);
	
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

		// Add action for delete all deals
		add_action('admin_init', array($this, 'handle_delete_all_deals'));
	}

	/**
	 * Handle delete all deals action.
	 *
	 * @since    2.0.0
	 */
	public function handle_delete_all_deals() {
		if (isset($_POST['action']) && $_POST['action'] === 'delete_all_deals' && isset($_POST['honey_hole_nonce']) && wp_verify_nonce($_POST['honey_hole_nonce'], 'honey_hole_delete_all')) {
			// Get all deals
			$deals = get_posts(array(
				'post_type' => 'honey_hole_deal',
				'post_status' => 'any',
				'posts_per_page' => -1,
				'fields' => 'ids'
			));

			// Delete each deal
			foreach ($deals as $deal_id) {
				wp_delete_post($deal_id, true); // true means force delete
			}

			// Set transient for success message
			set_transient('honey_hole_deals_deleted', true, 45);
			
			// Redirect back to the deals page
			wp_redirect(admin_url('admin.php?page=honey-hole'));
			exit;
		}
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
		wp_enqueue_script( 
			$this->plugin_name, 
			plugin_dir_url( __FILE__ ) . 'js/honey-hole-admin-modern.js', 
			array(), 
			$this->version, 
			false 
		);

		// Add any necessary data for the script
		wp_localize_script(
			$this->plugin_name,
			'honeyHoleAdmin',
			array(
				'ajaxurl' => admin_url('admin-ajax.php'),
				'nonce' => wp_create_nonce('honey_hole_nonce'),
				'visibility_nonce' => wp_create_nonce('honey_hole_visibility'),
				'bulk_nonce' => wp_create_nonce('honey_hole_bulk'),
				'order_nonce' => wp_create_nonce('honey_hole_order')
			)
		);
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
		honey_hole_admin_page();
	}

	/**
	 * Display the add deal page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_add_deal_page() {
		// Check if the current user has the necessary capabilities
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}

		// Handle form submission
		if (isset($_POST['action']) && $_POST['action'] === 'add_deal' && isset($_POST['honey_hole_nonce']) && wp_verify_nonce($_POST['honey_hole_nonce'], 'honey_hole_add_deal')) {
			// Sanitize and validate input
			$title = sanitize_text_field($_POST['deal_title']);
			$original_price = floatval($_POST['deal_original_price']);
			$sales_price = floatval($_POST['deal_sales_price']);
			$rating = floatval($_POST['deal_rating']);
			$deal_url = esc_url_raw($_POST['deal_url']);
			$description = sanitize_textarea_field($_POST['deal_description']);
			$category_id = intval($_POST['deal_category']);
			$image_url = esc_url_raw($_POST['deal_image_url']);
			$tags = sanitize_text_field($_POST['deal_tags']);

			// Create the deal post
			$deal_data = array(
				'post_title'    => $title,
				'post_content'  => $description,
				'post_status'   => 'publish',
				'post_type'     => 'honey_hole_deal'
			);

			// Insert the post
			$deal_id = wp_insert_post($deal_data);

			if (!is_wp_error($deal_id)) {
				// Set the category
				wp_set_object_terms($deal_id, $category_id, 'deal_category');

				// Set the tags
				if (!empty($tags)) {
					$tag_array = array_map('trim', explode(',', $tags));
					wp_set_object_terms($deal_id, $tag_array, 'post_tag');
				}

				// Save the meta data
				update_post_meta($deal_id, 'deal_original_price', $original_price);
				update_post_meta($deal_id, 'deal_sales_price', $sales_price);
				update_post_meta($deal_id, 'deal_rating', $rating);
				update_post_meta($deal_id, 'deal_url', $deal_url);
				update_post_meta($deal_id, 'deal_image_url', $image_url);

				// Set transient for success message
				set_transient('honey_hole_deal_added', true, 45);
				
				// Use JavaScript to redirect
				echo '<script>window.location.href = "' . admin_url('admin.php?page=honey-hole') . '";</script>';
				exit;
			} else {
				// Handle error
				$error_message = $deal_id->get_error_message();
				add_action('admin_notices', function() use ($error_message) {
					echo '<div class="notice notice-error"><p>Error adding deal: ' . esc_html($error_message) . '</p></div>';
				});
			}
		}

		// Include the admin display partial
		require_once plugin_dir_path(__FILE__) . 'partials/honey-hole-add-deal-page.php';
		
		// Call the display function
		honey_hole_add_deal_page();
	}

	/**
	 * Display the categories page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_categories_page() {
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}
		require_once plugin_dir_path(__FILE__) . './partials/honey-hole-categories-page.php';
		
		honey_hole_categories_page();
	}

}
