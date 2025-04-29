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

		// Add action for delete all deals
		add_action('admin_init', array($this, 'handle_delete_all_deals'));
		// Add action for edit deal
		add_action('admin_init', array($this, 'handle_edit_deal'));
		// Add AJAX handler for CSV import
		add_action('wp_ajax_honey_hole_import_csv_ajax', array($this, 'honey_hole_import_csv_ajax'));
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

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/honey-hole-admin.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_scripts()
	{
		wp_enqueue_script(
			$this->plugin_name,
			plugin_dir_url(__FILE__) . 'js/honey-hole-admin-modern.js',
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
	public function honey_hole_admin_page()
	{
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
	public function honey_hole_add_deal_page()
	{
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
			$deal_id = intval($_POST['deal_id']);

			// Update post
			wp_update_post(array(
				'ID' => $deal_id,
				'post_title' => sanitize_text_field($_POST['deal_title']),
				'post_content' => sanitize_textarea_field($_POST['deal_description'])
			));

			// Update meta
			update_post_meta($deal_id, 'deal_original_price', floatval($_POST['deal_original_price']));
			update_post_meta($deal_id, 'deal_sales_price', floatval($_POST['deal_sales_price']));
			update_post_meta($deal_id, 'deal_rating', floatval($_POST['deal_rating']));
			update_post_meta($deal_id, 'deal_url', esc_url_raw($_POST['deal_url']));
			update_post_meta($deal_id, 'deal_image_url', esc_url_raw($_POST['deal_image_url']));

			// Update category
			wp_set_object_terms($deal_id, intval($_POST['deal_category']), 'deal_category');

			// Update tags
			if (!empty($_POST['deal_tags'])) {
				$tags = array_map('trim', explode(',', $_POST['deal_tags']));
				wp_set_object_terms($deal_id, $tags, 'post_tag');
			}

			// Set success message
			set_transient('honey_hole_deal_updated', true, 45);

			// Redirect back to deals list
			wp_redirect(admin_url('admin.php?page=honey-hole'));
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
					'post_title' => sanitize_text_field($data[$field_map['Title']]),
					'post_content' => wp_kses_post($data[$field_map['Description']]),
					'post_status' => 'publish',
					'post_type' => 'honey_hole_deal'
				);

				// Insert the post
				$post_id = wp_insert_post($post_data);

				if (is_wp_error($post_id)) {
					throw new Exception($post_id->get_error_message());
				}

				// Add meta data using direct SQL to avoid large queries
				$meta_updates = array(
					'deal_original_price' => sanitize_text_field($data[$field_map['Original Price']]),
					'deal_sales_price' => sanitize_text_field($data[$field_map['Sales Price']]),
					'deal_rating' => sanitize_text_field($data[$field_map['Rating']]),
					'deal_url' => esc_url_raw($data[$field_map['Deal URL']]),
					'deal_normal_link' => esc_url_raw($data[$field_map['Normal Link']]),
					'deal_image_url' => esc_url_raw($data[$field_map['Image URL']])
				);

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
				$category = sanitize_text_field($data[$field_map['Category']]);
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
			'Description' => 'post_content',
			'Original Price' => 'deal_original_price',
			'Sales Price' => 'deal_sales_price',
			'Rating' => 'deal_rating',
			'Deal URL' => 'deal_url',
			'Normal Link' => 'deal_normal_link',
			'Image URL' => 'deal_image_url',
			'Category' => 'deal_category'
		);

		// Map CSV headers to required fields (case-insensitive)
		$field_map = array();
		foreach ($headers as $index => $header) {
			$header = trim($header); // Remove any whitespace but keep case
			foreach ($required_fields as $field => $meta_key) {
				if (strcasecmp($header, $field) === 0) { // Case-insensitive comparison
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
		$row_number = 1; // Start at 1 to account for header row
		$batch_size = 20; // Process 20 rows at a time
		$batch = array();
		$start_time = microtime(true);

		while (($data = fgetcsv($handle)) !== false) {
			$row_number++;

			// Check if all required fields have values
			$missing_data = false;
			foreach ($field_map as $field => $index) {
				if (!isset($data[$index]) || trim($data[$index]) === '') {
					$missing_data = true;
					break;
				}
			}

			if ($missing_data) {
				$skipped++;
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
					wp_send_json_error(sprintf(
						'Import partially completed. Successfully imported %d deals. Skipped %d rows. Some rows may not have been processed due to time constraints. Please try importing the remaining rows.',
						$imported,
						$skipped
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

		wp_send_json_success(array(
			'imported' => $imported,
			'skipped' => $skipped,
			'errors' => $errors,
			'message' => sprintf(
				'Import completed. Successfully imported %d deals. Skipped %d incomplete rows.',
				$imported,
				$skipped
			)
		));
	}
}
