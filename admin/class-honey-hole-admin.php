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

class Honey_Hole_Admin
{
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

		// Add hidden submenu for edit page
		add_submenu_page(
			null, // Parent slug (null makes it hidden)
			'Edit Deal',
			'Edit Deal',
			'manage_options',
			'honey-hole-edit-deal',
			array($this, 'honey_hole_edit_deal_page')
		);

		add_submenu_page(
			'honey-hole',
			'Import Deals',
			'Import Deals',
			'manage_options',
			'honey-hole-import',
			array($this, 'honey_hole_import_page')
		);

		add_submenu_page(
			'honey-hole',
			'Export Deals',
			'Export Deals',
			'manage_options',
			'honey-hole-export',
			array($this, 'honey_hole_export_page')
		);

		add_submenu_page(
			'honey-hole',
			'Video Settings',
			'Video Settings',
			'manage_options',
			'honey-hole-video-settings',
			array($this, 'honey_hole_video_settings_page')
		);
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
	public function __construct($plugin_name, $version)
	{
		$this->plugin_name = $plugin_name;
		$this->version = $version;

		// Include helper functions
		require_once plugin_dir_path(__FILE__) . 'honey-hole-admin-helper-functions.php';

		// Add action for delete all deals
		add_action('admin_init', array($this, 'handle_delete_all_deals'));
		// Add action for edit deal
		add_action('admin_init', array($this, 'handle_edit_deal'));
		// Add AJAX handler for CSV import
		add_action('wp_ajax_honey_hole_import_csv_ajax', array($this, 'honey_hole_import_csv_ajax'));
		// Add AJAX handler for image upload
		add_action('wp_ajax_honey_hole_upload_image', 'honey_hole_handle_image_upload');
		// Add AJAX handler for deal order updates
		add_action('wp_ajax_honey_hole_update_order', 'honey_hole_update_deal_order');
		// Add AJAX handler for visibility changes
		add_action('wp_ajax_honey_hole_save_visibility_changes', 'honey_hole_save_visibility_changes');
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_styles()
	{

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

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'js/honey-hole-admin.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_scripts()
	{
		// Enqueue jQuery for admin pages
		wp_enqueue_script('jquery');

		// Enqueue wp-util for ajaxurl
		wp_enqueue_script('wp-util');

		// Enqueue React and ReactDOM
		wp_enqueue_script('react');
		wp_enqueue_script('react-dom');

		// Get the asset file
		$asset_file = include(plugin_dir_path(__FILE__) . 'js/honey-hole-admin.asset.php');

		// Use time() for development to prevent caching
		$version = defined('WP_DEBUG') && WP_DEBUG ? time() : $asset_file['version'];

		// Enqueue our admin script
		wp_enqueue_script(
			'honey-hole-admin',
			plugin_dir_url(__FILE__) . 'js/honey-hole-admin.js',
			array_merge(['jquery', 'wp-util', 'react', 'react-dom'], $asset_file['dependencies']),
			$version,
			true
		);

		// Enqueue our admin styles
		wp_enqueue_style(
			'honey-hole-admin',
			plugin_dir_url(__FILE__) . 'js/honey-hole-admin.css',
			array(),
			$version
		);

		// Add any necessary data for the script
		wp_localize_script(
			'honey-hole-admin',
			'honeyHoleAdmin',
			array(
				'ajaxurl' => admin_url('admin-ajax.php'),
				'nonce' => wp_create_nonce('wp_rest'),
				'visibility_nonce' => wp_create_nonce('honey_hole_visibility_toggle'),
				'bulk_nonce' => wp_create_nonce('honey_hole_bulk'),
				'order_nonce' => wp_create_nonce('honey_hole_update_order'),
				'image_upload_nonce' => wp_create_nonce('honey_hole_image_upload'),
				'logoUrl' => plugin_dir_url(__FILE__) . 'images/the-honey-hole-font-logo.png',
				'debug' => true // Enable debug mode
			)
		);
	}

	/**
	 * Display the main admin page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_admin_page()
	{
		// Check if the current user has the necessary capabilities
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}

		// Output the container for the React app
		echo '<div id="honey-hole-admin-root"></div>';
	}

	/**
	 * Display the add deal page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_add_deal_page()
	{
		// Check if the current user has the necessary capabilities
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}

		// Handle form submission
		if (isset($_POST['action']) && $_POST['action'] === 'add_deal' && isset($_POST['honey_hole_nonce']) && wp_verify_nonce($_POST['honey_hole_nonce'], 'honey_hole_add_deal')) {
			// Debug: Log the POST data
			error_log('Honey Hole Add Deal - POST data: ' . print_r($_POST, true));
			
			// Get category to determine which fields to process
			$category_id = intval($_POST['deal_category']);
			$category_term = get_term($category_id, 'deal_category');
			$is_big_sale = $category_term && $category_term->name === 'Big Sale';
			
			// Sanitize and validate input based on category
			if ($is_big_sale) {
				$title = sanitize_text_field($_POST['deal_title_big_sale']);
				$description = sanitize_textarea_field($_POST['deal_description']);
				$background_image = esc_url_raw($_POST['deal_background_image']);
			} else {
				$title = sanitize_text_field($_POST['deal_title']);
				$original_price = floatval($_POST['deal_original_price']);
				$sales_price = !empty($_POST['deal_sales_price']) ? floatval($_POST['deal_sales_price']) : '';
				$rating = floatval($_POST['deal_rating']);
				$seller = sanitize_text_field($_POST['deal_seller']);
			}
			
			// Common fields
			$deal_url = esc_url_raw($_POST['deal_url']);
			$promo_code = sanitize_text_field($_POST['deal_promo_code']);
			$image_url = esc_url_raw($_POST['deal_image_url']);
			$tags = sanitize_text_field($_POST['deal_tags']);
			$badge = sanitize_text_field($_POST['deal_badge']);
			error_log('Honey Hole Common - Badge value: ' . $badge);

			// Create the deal post
			$deal_data = array(
				'post_title'    => $title,
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

				// Save the meta data based on category
				if ($is_big_sale) {
					update_post_meta($deal_id, 'deal_description', $description);
					update_post_meta($deal_id, 'deal_background_image', $background_image);
				} else {
					update_post_meta($deal_id, 'deal_original_price', $original_price);
					update_post_meta($deal_id, 'deal_sales_price', $sales_price);
					update_post_meta($deal_id, 'deal_rating', $rating);
					update_post_meta($deal_id, 'deal_seller', $seller);
				}
				
				// Common meta fields
				update_post_meta($deal_id, 'deal_url', $deal_url);
				update_post_meta($deal_id, 'deal_promo_code', $promo_code);
				update_post_meta($deal_id, 'deal_image_url', $image_url);
				update_post_meta($deal_id, 'deal_badge', $badge);
				error_log('Honey Hole Common - Saved badge: ' . $badge . ' for deal ID: ' . $deal_id);

				// Set transient for success message
				set_transient('honey_hole_deal_added', true, 45);

				// Use JavaScript to redirect
				echo '<script>window.location.href = "' . admin_url('admin.php?page=honey-hole') . '";</script>';
				exit;
			} else {
				// Handle error
				$error_message = $deal_id->get_error_message();
				add_action('admin_notices', function () use ($error_message) {
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
	public function honey_hole_categories_page()
	{
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}
		require_once plugin_dir_path(__FILE__) . './partials/honey-hole-categories-page.php';

		honey_hole_categories_page();
	}
	/**
	 * Handle delete all deals action.
	 *
	 * @since    2.0.0
	 */
	public function handle_delete_all_deals()
	{
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
	 * Display the edit deal page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_edit_deal_page()
	{
		// Check if the current user has the necessary capabilities
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.'));
		}

		// Include the admin display partial	
		require_once plugin_dir_path(__FILE__) . 'partials/honey-hole-edit-deal-page.php';

		// Call the display function
		honey_hole_edit_deal_page();
	}

	/**
	 * Handle edit deal action.
	 *
	 * @since    2.0.0
	 */
	public function handle_edit_deal()
	{
		if (isset($_POST['action']) && $_POST['action'] === 'edit_deal' && isset($_POST['honey_hole_nonce']) && wp_verify_nonce($_POST['honey_hole_nonce'], 'honey_hole_edit_deal')) {
			// Debug: Log the POST data
			error_log('Honey Hole Edit Deal - POST data: ' . print_r($_POST, true));
			
			$deal_id = intval($_POST['deal_id']);

			// Get category to determine which fields to process
			$category_id = intval($_POST['deal_category']);
			$category_term = get_term($category_id, 'deal_category');
			$is_big_sale = $category_term && $category_term->name === 'Big Sale';
			
			// Update post title based on category
			if ($is_big_sale) {
				$title = sanitize_text_field($_POST['deal_title_big_sale']);
			} else {
				$title = sanitize_text_field($_POST['deal_title']);
			}
			
			wp_update_post(array(
				'ID' => $deal_id,
				'post_title' => $title
			));

			// Update meta based on category
			if ($is_big_sale) {
				update_post_meta($deal_id, 'deal_description', sanitize_textarea_field($_POST['deal_description']));
				update_post_meta($deal_id, 'deal_background_image', esc_url_raw($_POST['deal_background_image']));
			} else {
				update_post_meta($deal_id, 'deal_original_price', floatval($_POST['deal_original_price']));
				update_post_meta($deal_id, 'deal_sales_price', !empty($_POST['deal_sales_price']) ? floatval($_POST['deal_sales_price']) : '');
				update_post_meta($deal_id, 'deal_rating', floatval($_POST['deal_rating']));
				update_post_meta($deal_id, 'deal_seller', sanitize_text_field($_POST['deal_seller']));
			}
			
			// Common meta fields
			update_post_meta($deal_id, 'deal_url', esc_url_raw($_POST['deal_url']));
			update_post_meta($deal_id, 'deal_promo_code', sanitize_text_field($_POST['deal_promo_code']));
			update_post_meta($deal_id, 'deal_image_url', esc_url_raw($_POST['deal_image_url']));
			update_post_meta($deal_id, 'deal_badge', sanitize_text_field($_POST['deal_badge']));
			error_log('Honey Hole Edit Common - Saved badge: ' . sanitize_text_field($_POST['deal_badge']) . ' for deal ID: ' . $deal_id);

			// Update category
			wp_set_object_terms($deal_id, $category_id, 'deal_category');

			// Update tags
			if (!empty($_POST['deal_tags'])) {
				$tags = array_map('trim', explode(',', $_POST['deal_tags']));
				wp_set_object_terms($deal_id, $tags, 'post_tag');
			}

			// Set success message
			set_transient('honey_hole_deal_updated', true, 45);

			// Use JavaScript to redirect
			echo '<script>window.location.href = "' . admin_url('admin.php?page=honey-hole') . '";</script>';
			exit;
		}
	}

	/**
	 * Display the import deals page.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_import_page()
	{
		// Include the admin display partial
		require_once plugin_dir_path(__FILE__) . 'partials/honey-hole-import-page.php';

		// Call the display function
		honey_hole_import_page();
	}

	/**
	 * Check if enough memory is available for import.
	 *
	 * @since    2.0.0
	 * @return   bool    True if enough memory is available, false otherwise.
	 */
	private function check_memory_available()
	{
		$memory_limit = ini_get('memory_limit');
		$memory_limit_bytes = wp_convert_hr_to_bytes($memory_limit);
		$memory_usage = memory_get_usage(true);
		$memory_available = $memory_limit_bytes - $memory_usage;

		if ($memory_available < 10 * 1024 * 1024) { // Less than 10MB available
			return false;
		}
		return true;
	}

	/**
	 * Handle import errors consistently.
	 *
	 * @since    2.0.0
	 * @param    string    $message    The error message.
	 * @param    string    $type       The type of message (error, warning, success).
	 */
	private function handle_import_error($message, $type = 'error')
	{
		if (wp_doing_ajax()) {
			wp_send_json_error($message);
		} else {
			add_settings_error(
				'honey_hole_import',
				'import_error',
				$message,
				$type
			);
		}
	}

	/**
	 * Process a batch of import rows.
	 *
	 * @since    2.0.0
	 * @param    array     $batch        The batch of rows to process.
	 * @param    int       $imported     Number of successfully imported items.
	 * @param    array     $errors       Array of error messages.
	 * @param    int       $row_number   Current row number.
	 * @return   array     Updated import statistics.
	 */
	private function honey_hole_process_import_batch($batch, $imported, $errors, $row_number)
	{
		global $wpdb;

		foreach ($batch as $row) {
			$data = $row['data'];
			$field_map = $row['field_map'];

			// Start transaction
			$wpdb->query('START TRANSACTION');

			try {
				// Prepare post data
				$post_data = array(
					'post_title' => sanitize_text_field($this->clean_imported_value($data[$field_map['Title']])),
					'post_status' => 'publish',
					'post_type' => 'honey_hole_deal'
				);

				// Handle date added if present
				if (isset($field_map['Date Added']) && isset($data[$field_map['Date Added']]) && trim($data[$field_map['Date Added']]) !== '') {
					$date_added = $this->clean_imported_value($data[$field_map['Date Added']]);
					// Try to parse the date
					$parsed_date = $this->parse_date_added($date_added);
					if ($parsed_date) {
						$post_data['post_date'] = $parsed_date;
						$post_data['post_date_gmt'] = get_gmt_from_date($parsed_date);
					}
				}

				// Insert the post
				$post_id = wp_insert_post($post_data);

				if (is_wp_error($post_id)) {
					throw new Exception($post_id->get_error_message());
				}

				// Add meta data using direct SQL to avoid large queries
				$meta_updates = array(
					'deal_original_price' => sanitize_text_field($this->clean_imported_value($data[$field_map['Original Price']])),
					'deal_sales_price' => sanitize_text_field($this->clean_imported_value($data[$field_map['Sales Price']])),
					'deal_rating' => sanitize_text_field($this->clean_imported_value($data[$field_map['Rating']])),
					'deal_url' => esc_url_raw($this->clean_imported_value($data[$field_map['Deal URL']])),
					'deal_normal_link' => esc_url_raw($this->clean_imported_value($data[$field_map['Normal Link']])),
					'deal_image_url' => esc_url_raw($this->clean_imported_value($data[$field_map['Image URL']]))
				);
				// Only set promo code if present
				if (isset($field_map['Promo Code']) && isset($data[$field_map['Promo Code']]) && trim($data[$field_map['Promo Code']]) !== '') {
					$meta_updates['deal_promo_code'] = sanitize_text_field($this->clean_imported_value($data[$field_map['Promo Code']]));
				}

				foreach ($meta_updates as $meta_key => $meta_value) {
					$wpdb->insert(
						$wpdb->postmeta,
						array(
							'post_id' => $post_id,
							'meta_key' => $meta_key,
							'meta_value' => $meta_value
						),
						array('%d', '%s', '%s')
					);
				}

				// Set category
				$category = sanitize_text_field($this->clean_imported_value($data[$field_map['Category']]));
				wp_set_object_terms($post_id, $category, 'deal_category');

				// Commit transaction
				$wpdb->query('COMMIT');
				$imported++;
			} catch (Exception $e) {
				// Rollback transaction on error
				$wpdb->query('ROLLBACK');
				$errors[] = "Row {$row_number}: " . $e->getMessage();
			}
		}

		return array(
			'imported' => $imported,
			'errors' => $errors
		);
	}

	/**
	 * Handle CSV import via AJAX.
	 *
	 * @since    2.0.0
	 */
	public function honey_hole_import_csv_ajax()
	{
		if (!isset($_POST['honey_hole_import_csv']) || !check_admin_referer('honey_hole_import_csv')) {
			wp_send_json_error('Invalid nonce');
		}

		if (!current_user_can('manage_options')) {
			wp_send_json_error('Unauthorized access');
		}

		if (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) {
			wp_send_json_error('Error uploading file. Please try again.');
		}

		// Check memory limit
		if (!$this->check_memory_available()) {
			wp_send_json_error('Not enough memory available for import. Please try with a smaller file or contact your hosting provider.');
		}

		// Set execution time limit
		$max_execution_time = ini_get('max_execution_time');
		if ($max_execution_time < 300) { // Less than 5 minutes
			set_time_limit(300); // Try to set to 5 minutes
		}

		$file = $_FILES['csv_file']['tmp_name'];
		$handle = fopen($file, 'r');

		if ($handle === false) {
			wp_send_json_error('Error opening file. Please try again.');
		}

		// Read headers
		$headers = fgetcsv($handle);
		if ($headers === false) {
			fclose($handle);
			wp_send_json_error('Error reading CSV headers. Please check the file format.');
		}

		// Define required fields and their corresponding meta keys
		$required_fields = array(
			'Title' => 'post_title',
			'Original Price' => 'deal_original_price',
			'Sales Price' => 'deal_sales_price',
			'Rating' => 'deal_rating',
			'Deal URL' => 'deal_url',
			'Normal Link' => 'deal_normal_link',
			'Image URL' => 'deal_image_url',
			'Category' => 'deal_category'
		);
		// Promo Code and Date Added are optional
		$optional_fields = array(
			'Promo Code' => 'deal_promo_code',
			'Date Added' => 'post_date'
		);

		// Map CSV headers to required and optional fields (case-insensitive)
		$field_map = array();
		foreach ($headers as $index => $header) {
			$header = trim($header);
			foreach (array_merge($required_fields, $optional_fields) as $field => $meta_key) {
				if (strcasecmp($header, $field) === 0) {
					$field_map[$field] = $index;
					break;
				}
			}
		}

		// Verify all required fields are present
		$missing_fields = array();
		foreach ($required_fields as $field => $meta_key) {
			if (!isset($field_map[$field])) {
				$missing_fields[] = $field;
			}
		}

		if (!empty($missing_fields)) {
			fclose($handle);
			wp_send_json_error('Missing required fields: ' . implode(', ', $missing_fields));
		}

		// Count total rows for progress calculation
		$total_rows = 0;
		$temp_handle = fopen($file, 'r');
		fgetcsv($temp_handle); // Skip header
		while (fgetcsv($temp_handle) !== false) {
			$total_rows++;
		}
		fclose($temp_handle);

		$imported = 0;
		$skipped = 0;
		$errors = array();
		$error_counts = array(); // Track error types
		$skipped_deals = array(); // Track skipped deals by title
		$row_number = 1; // Start at 1 to account for header row
		$batch_size = 20; // Process 20 rows at a time
		$batch = array();
		$start_time = microtime(true);

		while (($data = fgetcsv($handle)) !== false) {
			$row_number++;

			// Check for missing required fields and track specific issues
			$missing_fields = array();
			foreach ($required_fields as $field => $meta_key) {
				if (!isset($field_map[$field]) || !isset($data[$field_map[$field]]) || trim($data[$field_map[$field]]) === '') {
					$missing_fields[] = $field;
				}
			}

			if (!empty($missing_fields)) {
				$skipped++;
				// Get the title for tracking (if available)
				$title = isset($field_map['Title']) && isset($data[$field_map['Title']]) ? trim($data[$field_map['Title']]) : "Row {$row_number}";
				$error_key = 'missing_fields: ' . implode(', ', $missing_fields);
				if (!isset($error_counts[$error_key])) {
					$error_counts[$error_key] = 0;
					$skipped_deals[$error_key] = array();
				}
				$error_counts[$error_key]++;
				$skipped_deals[$error_key][] = $title;
				continue;
			}

			// Validate data types
			$validation_errors = array();

			// Check if prices are numeric
			if (!is_numeric($data[$field_map['Original Price']])) {
				$validation_errors[] = 'invalid_original_price';
			}
			if (!is_numeric($data[$field_map['Sales Price']])) {
				$validation_errors[] = 'invalid_sales_price';
			}

			// Check if rating is numeric and between 0-5
			if (
				!is_numeric($data[$field_map['Rating']]) ||
				floatval($data[$field_map['Rating']]) < 0 ||
				floatval($data[$field_map['Rating']]) > 5
			) {
				$validation_errors[] = 'invalid_rating';
			}

			// Check if URLs are valid
			if (!filter_var($data[$field_map['Deal URL']], FILTER_VALIDATE_URL)) {
				$validation_errors[] = 'invalid_deal_url';
			}
			if (!filter_var($data[$field_map['Normal Link']], FILTER_VALIDATE_URL)) {
				$validation_errors[] = 'invalid_normal_link';
			}
			if (!filter_var($data[$field_map['Image URL']], FILTER_VALIDATE_URL)) {
				$validation_errors[] = 'invalid_image_url';
			}

			if (!empty($validation_errors)) {
				$skipped++;
				$title = isset($field_map['Title']) && isset($data[$field_map['Title']]) ? trim($data[$field_map['Title']]) : "Row {$row_number}";
				$error_key = 'validation_errors: ' . implode(', ', $validation_errors);
				if (!isset($error_counts[$error_key])) {
					$error_counts[$error_key] = 0;
					$skipped_deals[$error_key] = array();
				}
				$error_counts[$error_key]++;
				$skipped_deals[$error_key][] = $title;
				continue;
			}

			// Add row to batch
			$batch[] = array(
				'data' => $data,
				'field_map' => $field_map
			);

			// Process batch when it reaches the batch size
			if (count($batch) >= $batch_size) {
				$result = $this->honey_hole_process_import_batch($batch, $imported, $errors, $row_number);
				$imported = $result['imported'];
				$errors = $result['errors'];
				$batch = array();

				// Check if we're approaching time limit
				if (microtime(true) - $start_time > 25) { // Leave 5 seconds buffer
					$error_summary = $this->format_error_summary($error_counts, $skipped_deals);
					wp_send_json_error(sprintf(
						'Import partially completed. Successfully imported %d deals. Skipped %d rows. %s Some rows may not have been processed due to time constraints. Please try importing the remaining rows.',
						$imported,
						$skipped,
						$error_summary
					));
					break;
				}
			}
		}

		// Process any remaining rows
		if (!empty($batch)) {
			$result = $this->honey_hole_process_import_batch($batch, $imported, $errors, $row_number);
			$imported = $result['imported'];
			$errors = $result['errors'];
		}

		fclose($handle);

		$error_summary = $this->format_error_summary($error_counts, $skipped_deals);

		wp_send_json_success(array(
			'imported' => $imported,
			'skipped' => $skipped,
			'errors' => $errors,
			'error_summary' => $error_summary,
			'skipped_deals' => $skipped_deals,
			'message' => sprintf(
				'Import completed. Successfully imported %d deals. Skipped %d rows. %s',
				$imported,
				$skipped,
				$error_summary
			)
		));
	}

	/**
	 * Format error summary.
	 *
	 * @since    2.0.0
	 * @param    array     $error_counts    Array of error counts.
	 * @param    array     $skipped_deals   Array of skipped deals.
	 * @return   string    Formatted error summary.
	 */
	private function format_error_summary($error_counts, $skipped_deals)
	{
		if (empty($error_counts)) {
			return '';
		}

		$summary_parts = array();

		foreach ($error_counts as $error_key => $count) {
			$message = $this->get_error_message($error_key, $count, $skipped_deals);
			if ($message) {
				$summary_parts[] = $message;
			}
		}

		return empty($summary_parts) ? '' : 'Issues found: ' . implode('; ', $summary_parts);
	}

	/**
	 * Get user-friendly error message.
	 *
	 * @since    2.0.0
	 * @param    string    $error_key    Error key.
	 * @param    int       $count        Error count.
	 * @param    array     $skipped_deals   Array of skipped deals.
	 * @return   string    User-friendly error message.
	 */
	private function get_error_message($error_key, $count, $skipped_deals = array())
	{
		$deals_list = isset($skipped_deals[$error_key]) ? $skipped_deals[$error_key] : array();
		if (strpos($error_key, 'missing_fields:') === 0) {
			$fields = str_replace('missing_fields: ', '', $error_key);
			$field_list = explode(', ', $fields);

			if (count($field_list) === 1) {
				$message = "({$count}) skipped due to missing {$field_list[0]}";
			} else {
				$last_field = array_pop($field_list);
				$field_string = implode(', ', $field_list) . ' and ' . $last_field;
				$message = "({$count}) skipped due to missing {$field_string}";
			}

			// Add deal titles if available
			if (!empty($deals_list)) {
				$message .= ': ' . implode(', ', array_slice($deals_list, 0, 5)); // Show first 5
				if (count($deals_list) > 5) {
					$message .= ' and ' . (count($deals_list) - 5) . ' more';
				}
			}

			return $message;
		}

		if (strpos($error_key, 'validation_errors:') === 0) {
			$errors = str_replace('validation_errors: ', '', $error_key);
			$error_list = explode(', ', $errors);

			$error_messages = array();
			foreach ($error_list as $error) {
				switch ($error) {
					case 'invalid_original_price':
						$error_messages[] = 'invalid original price';
						break;
					case 'invalid_sales_price':
						$error_messages[] = 'invalid sales price';
						break;
					case 'invalid_rating':
						$error_messages[] = 'invalid rating (must be 0-5)';
						break;
					case 'invalid_deal_url':
						$error_messages[] = 'invalid deal URL';
						break;
					case 'invalid_normal_link':
						$error_messages[] = 'invalid normal link';
						break;
					case 'invalid_image_url':
						$error_messages[] = 'invalid image URL';
						break;
				}
			}

			if (count($error_messages) === 1) {
				$message = "({$count}) skipped due to {$error_messages[0]}";
			} else {
				$last_error = array_pop($error_messages);
				$error_string = implode(', ', $error_messages) . ' and ' . $last_error;
				$message = "({$count}) skipped due to {$error_string}";
			}

			// Add deal titles if available
			if (!empty($deals_list)) {
				$message .= ': ' . implode(', ', array_slice($deals_list, 0, 5)); // Show first 5
				if (count($deals_list) > 5) {
					$message .= ' and ' . (count($deals_list) - 5) . ' more';
				}
			}

			return $message;
		}

		return "({$count}) {$error_key}";
	}

	// Add AJAX handler for saving visibility changes
	function honey_hole_save_visibility_changes()
	{
		if (!isset($_POST['changes']) || !isset($_POST['nonce'])) {
			wp_send_json_error('Missing required fields');
		}

		if (!wp_verify_nonce($_POST['nonce'], 'honey_hole_visibility_toggle')) {
			wp_send_json_error('Invalid nonce');
		}

		if (!current_user_can('manage_options')) {
			wp_send_json_error('Insufficient permissions');
		}

		$changes = $_POST['changes'];
		$success = true;

		foreach ($changes as $change) {
			$deal_id = intval($change['deal_id']);
			$visibility = rest_sanitize_boolean($change['visibility']);

			$result = update_post_meta($deal_id, 'deal_visibility', $visibility);
			if ($result === false) {
				$success = false;
				break;
			}
		}

		if ($success) {
			wp_send_json_success();
		} else {
			wp_send_json_error('Failed to save some visibility changes');
		}
	}

	/**
	 * Parse date added field from various formats
	 *
	 * @since    2.0.0
	 * @param    string    $date_string    The date string to parse
	 * @return   string|false    MySQL formatted date or false if invalid
	 */
	private function parse_date_added($date_string)
	{
		// Remove any extra whitespace
		$date_string = trim($date_string);

		if (empty($date_string)) {
			return false;
		}

		// Try common date formats
		$formats = array(
			'Y-m-d H:i:s',    // 2024-01-15 14:30:00
			'Y-m-d H:i',      // 2024-01-15 14:30
			'Y-m-d',          // 2024-01-15
			'm/d/Y H:i:s',    // 01/15/2024 14:30:00
			'm/d/Y H:i',      // 01/15/2024 14:30
			'm/d/Y',          // 01/15/2024
			'd/m/Y H:i:s',    // 15/01/2024 14:30:00
			'd/m/Y H:i',      // 15/01/2024 14:30
			'd/m/Y',          // 15/01/2024
			'F j, Y H:i:s',   // January 15, 2024 14:30:00
			'F j, Y H:i',     // January 15, 2024 14:30
			'F j, Y',         // January 15, 2024
		);

		foreach ($formats as $format) {
			$date = DateTime::createFromFormat($format, $date_string);
			if ($date !== false) {
				// If no time is specified, set to current time
				if (strpos($format, 'H') === false) {
					$date->setTime(date('H'), date('i'), date('s'));
				}
				return $date->format('Y-m-d H:i:s');
			}
		}

		// Try strtotime as a fallback
		$timestamp = strtotime($date_string);
		if ($timestamp !== false) {
			return date('Y-m-d H:i:s', $timestamp);
		}

		return false;
	}

	/**
	 * Clean up common encoding issues in imported data.
	 *
	 * @since    2.0.0
	 * @param    string    $value    The value to clean.
	 * @return   string    Cleaned value.
	 */
	private function clean_imported_value($value)
	{
		// Decode common HTML entities
		$value = html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');

		// Remove extra whitespace
		$value = trim($value);

		return $value;
	}

	/**
	 * Render the video settings page
	 */
	public function honey_hole_video_settings_page()
	{
		// Handle form submission
		if (isset($_POST['submit_video_settings'])) {
			check_admin_referer('honey_hole_video_settings', 'honey_hole_video_nonce');

			$video_url = sanitize_text_field($_POST['video_url']);
			update_option('honey_hole_video_url', $video_url);

			echo '<div class="notice notice-success"><p>Video settings updated successfully!</p></div>';
		}

		// Get current video URL
		$current_video_url = get_option('honey_hole_video_url', 'https://www.youtube.com/embed/SMiEJ0qDJ8I?si=y-zCwgrDLO7z7NUO');

?>
		<div class="wrap">
			<h1>Video Settings</h1>
			<p>Configure the video that appears on the deals page.</p>

			<form method="post" action="">
				<?php wp_nonce_field('honey_hole_video_settings', 'honey_hole_video_nonce'); ?>

				<table class="form-table">
					<tr>
						<th scope="row">
							<label for="video_url">Video URL</label>
						</th>
						<td>
							<input type="url"
								id="video_url"
								name="video_url"
								value="<?php echo esc_attr($current_video_url); ?>"
								class="regular-text"
								placeholder="https://www.youtube.com/embed/VIDEO_ID"
								required />
							<p class="description">
								Enter the full YouTube embed URL. Example: https://www.youtube.com/embed/VIDEO_ID
							</p>
						</td>
					</tr>
				</table>

				<?php submit_button('Save Video Settings', 'primary', 'submit_video_settings'); ?>
			</form>

			<div style="margin-top: 30px;">
				<h3>Preview</h3>
				<div style="max-width: 600px;">
					<iframe
						width="100%"
						height="315"
						src="<?php echo esc_url($current_video_url); ?>"
						title="Video Preview"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen>
					</iframe>
				</div>
			</div>
		</div>
<?php
	}

	/**
	 * Display the export deals page in the admin area.
	 */
	public function honey_hole_export_page()
	{
		// Get deal count for display
		$deal_count = wp_count_posts('honey_hole_deal');
		$total_deals = $deal_count->publish + $deal_count->draft;
		?>
		<div class="wrap">
			<h1>Export Deals</h1>
			
			<div class="honey-hole-export-container">
				<div class="export-info">
					<h2>Export All Deals to CSV</h2>
					<p>Export all your deals to a CSV file for backup, migration, or analysis purposes.</p>
					
					<div class="export-stats">
						<p><strong>Total Deals:</strong> <?php echo $total_deals; ?></p>
						<p><strong>Published:</strong> <?php echo $deal_count->publish; ?></p>
						<p><strong>Drafts:</strong> <?php echo $deal_count->draft; ?></p>
					</div>
				</div>

				<div class="export-form">
					<div id="export-form-fields">
						<table class="form-table">
							<tr>
								<th scope="row">
									<label for="export_status">Export Status</label>
								</th>
								<td>
									<select id="export_status" name="export_status">
										<option value="all">All Deals (Published + Drafts)</option>
										<option value="publish">Published Only</option>
										<option value="draft">Drafts Only</option>
									</select>
									<p class="description">Choose which deals to export</p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="export_format">Export Format</label>
								</th>
								<td>
									<select id="export_format" name="export_format">
										<option value="full">Full Export (All Fields)</option>
										<option value="basic">Basic Export (Essential Fields Only)</option>
									</select>
									<p class="description">Choose the level of detail in the export</p>
								</td>
							</tr>
						</table>

						<button type="button" id="export-csv-btn" class="button button-primary">Export to CSV</button>
					</div>
					
					<div id="export-progress" style="display: none;">
						<div class="spinner" style="float: left; margin-right: 10px;"></div>
						<p>Exporting deals... Please wait.</p>
					</div>
				</div>

				<div class="export-help">
					<h3>Export Information</h3>
					<ul>
						<li><strong>Full Export:</strong> Includes all deal fields, meta data, categories, and tags</li>
						<li><strong>Basic Export:</strong> Includes essential fields only (title, price, URL, image, etc.)</li>
						<li><strong>CSV Format:</strong> Compatible with Excel, Google Sheets, and other spreadsheet applications</li>
						<li><strong>Import Ready:</strong> The exported CSV can be used with the Import Deals feature</li>
					</ul>
				</div>
			</div>
		</div>

		<style>
		.honey-hole-export-container {
			max-width: 800px;
		}
		.export-info {
			background: #fff;
			padding: 20px;
			border-radius: 5px;
			margin-bottom: 20px;
			box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		}
		.export-stats {
			background: #f9f9f9;
			padding: 15px;
			border-radius: 3px;
			margin-top: 15px;
		}
		.export-stats p {
			margin: 5px 0;
		}
		.export-form {
			background: #fff;
			padding: 20px;
			border-radius: 5px;
			margin-bottom: 20px;
			box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		}
		.export-help {
			background: #fff;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		}
		.export-help ul {
			margin-left: 20px;
		}
		.export-help li {
			margin-bottom: 8px;
		}
		.spinner {
			border: 4px solid #f3f3f3;
			border-top: 4px solid #0073aa;
			border-radius: 50%;
			width: 20px;
			height: 20px;
			animation: spin 1s linear infinite;
		}
		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}
		</style>

		<script>
		document.addEventListener('DOMContentLoaded', function() {
			const exportBtn = document.getElementById('export-csv-btn');
			const exportForm = document.getElementById('export-form-fields');
			const exportProgress = document.getElementById('export-progress');
			
			exportBtn.addEventListener('click', async function() {
				const exportStatus = document.getElementById('export_status').value;
				const exportFormat = document.getElementById('export_format').value;
				
				// Show progress
				exportForm.style.display = 'none';
				exportProgress.style.display = 'block';
				
				try {
					// Fetch deals data
					const response = await fetch('/wp-json/honey-hole/v1/deals');
					if (!response.ok) throw new Error('Failed to fetch deals');
					
					const deals = await response.json();
					
					// Filter deals based on status
					let filteredDeals = deals;
					if (exportStatus === 'publish') {
						filteredDeals = deals.filter(deal => deal.status === 'publish');
					} else if (exportStatus === 'draft') {
						filteredDeals = deals.filter(deal => deal.status === 'draft');
					}
					
					// Create CSV content
					let csvContent = '';
					
					// Define headers based on export format
					let headers;
					if (exportFormat === 'full') {
						headers = [
							'ID', 'Title', 'Status', 'Date Created', 'Date Modified',
							'Category', 'Original Price', 'Sales Price', 'Discount Percentage',
							'Rating', 'Seller', 'Badge', 'Deal URL', 'Normal Link', 'Image URL',
							'Promo Code', 'Tags', 'Big Sale Title', 'Big Sale Description',
							'Background Image', 'Author', 'Featured Image ID'
						];
					} else {
						headers = [
							'ID', 'Title', 'Status', 'Date Created', 'Category',
							'Original Price', 'Sales Price', 'Seller', 'Deal URL', 'Normal Link',
							'Image URL', 'Promo Code', 'Tags'
						];
					}
					
					// Add headers
					csvContent += headers.join(',') + '\n';
					
					// Add deal data
					filteredDeals.forEach(deal => {
						let row = [];
						
						if (exportFormat === 'full') {
							// Calculate discount percentage
							let discountPercentage = '';
							if (deal.original_price && deal.sales_price && deal.original_price > 0) {
								discountPercentage = Math.round(((deal.original_price - deal.sales_price) / deal.original_price) * 100);
							}
							
							// Get category names
							let categoryNames = '';
							if (deal.categories && deal.categories.length > 0) {
								categoryNames = deal.categories.map(cat => cat.name).join(', ');
							}
							
							row = [
								deal.id || '',
								(deal.title || '').replace(/"/g, '""'),
								deal.status || '',
								deal.date_added || '',
								deal.date_updated || '',
								(categoryNames || '').replace(/"/g, '""'),
								deal.original_price || '',
								deal.sales_price || '',
								discountPercentage,
								deal.rating || '',
								(deal.seller || '').replace(/"/g, '""'),
								(deal.badge || '').replace(/"/g, '""'),
								deal.product_url || '',
								deal.product_url || '', // Normal Link - same as Deal URL for now
								deal.image_url || '',
								(deal.promo_code || '').replace(/"/g, '""'),
								(deal.tags || '').replace(/"/g, '""'),
								(deal.big_sale_title || '').replace(/"/g, '""'),
								(deal.big_sale_description || '').replace(/"/g, '""'),
								deal.background_image || '',
								deal.author || '',
								deal.featured_image_id || ''
							];
						} else {
							// Get category names
							let categoryNames = '';
							if (deal.categories && deal.categories.length > 0) {
								categoryNames = deal.categories.map(cat => cat.name).join(', ');
							}
							
							row = [
								deal.id || '',
								(deal.title || '').replace(/"/g, '""'),
								deal.status || '',
								deal.date_added || '',
								(categoryNames || '').replace(/"/g, '""'),
								deal.original_price || '',
								deal.sales_price || '',
								(deal.seller || '').replace(/"/g, '""'),
								deal.product_url || '',
								deal.product_url || '', // Normal Link - same as Deal URL for now
								deal.image_url || '',
								(deal.promo_code || '').replace(/"/g, '""'),
								(deal.tags || '').replace(/"/g, '""')
							];
						}
						
						// Properly escape CSV values
						const escapedRow = row.map(value => {
							// If value contains comma, newline, or quote, wrap in quotes and escape quotes
							if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"') || value.includes('\r'))) {
								return '"' + value.replace(/"/g, '""') + '"';
							}
							return value;
						});
						
						csvContent += escapedRow.join(',') + '\n';
					});
					
					// Create and download file
					const filename = 'honey-hole-deals-export-' + new Date().toISOString().slice(0, 19).replace(/:/g, '-') + '.csv';
					const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
					const link = document.createElement('a');
					
					if (link.download !== undefined) {
						const url = URL.createObjectURL(blob);
						link.setAttribute('href', url);
						link.setAttribute('download', filename);
						link.style.visibility = 'hidden';
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					}
					
					// Reset form
					setTimeout(() => {
						exportForm.style.display = 'block';
						exportProgress.style.display = 'none';
					}, 1000);
					
				} catch (error) {
					console.error('Export failed:', error);
					alert('Export failed: ' + error.message);
					exportForm.style.display = 'block';
					exportProgress.style.display = 'none';
				}
			});
		});
		</script>
<?php
	}


}
