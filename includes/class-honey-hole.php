<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://fishbones.digital
 * @since      2.0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      2.0.0
 * @package    Honey_Hole
 * @subpackage Honey_Hole/includes
 * @author     Jack Ball <jackballdev@gmail.com>
 */
class Honey_Hole
{

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      Honey_Hole_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function __construct()
	{
		if (defined('HONEY_HOLE_VERSION')) {
			$this->version = HONEY_HOLE_VERSION;
		} else {
			$this->version = '2.0.0';
		}
		$this->plugin_name = 'honey-hole';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Honey_Hole_Loader. Orchestrates the hooks of the plugin.
	 * - Honey_Hole_i18n. Defines internationalization functionality.
	 * - Honey_Hole_Admin. Defines all hooks for the admin area.
	 * - Honey_Hole_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{

		/**
		 * The class responsible for registering post types and taxonomies.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-honey-hole-post-types.php';

		/**
		 * The class responsible for adding meta boxes to the post type.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-honey-hole-meta-boxes.php';

		/**
		 * The class responsible for REST API endpoints.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-honey-hole-rest-api.php';

		/**
		 * The class responsible for shortcode functionality.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-honey-hole-shortcode.php';

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-honey-hole-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-honey-hole-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-honey-hole-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-honey-hole-public.php';

		$this->loader = new Honey_Hole_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Honey_Hole_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function set_locale()
	{

		$plugin_i18n = new Honey_Hole_i18n();

		$this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function define_admin_hooks()
	{

		$plugin_admin = new Honey_Hole_Admin($this->get_plugin_name(), $this->get_version());

		$post_types = new Honey_Hole_Post_Types();
		$meta_boxes = new Honey_Hole_Meta_Boxes();

		$this->loader->add_action('admin_menu', $plugin_admin, 'add_admin_menu');
		$this->loader->add_action('init', $post_types, 'register_post_types');
		$this->loader->add_action('add_meta_boxes', $meta_boxes, 'add_meta_boxes');
		$this->loader->add_action('save_post', $meta_boxes, 'save_meta_box_data');

		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function define_public_hooks()
	{

		$plugin_public = new Honey_Hole_Public($this->get_plugin_name(), $this->get_version());
		$rest_api = new Honey_Hole_REST_API();
		$shortcode = new Honey_Hole_Shortcode();

		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
		$this->loader->add_action('rest_api_init', $rest_api, 'register_routes');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    2.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     2.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name()
	{
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     2.0.0
	 * @return    Honey_Hole_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     2.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}
}
