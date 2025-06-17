<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://fishbones.digital
 * @since      2.0.0
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/public
 * @author     Jack Ball <jackballdev@gmail.com>
 */
class Honey_Hole_Public
{

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_styles()
	{
		// Get the asset file
		$asset_file = include(plugin_dir_path(dirname(__FILE__)) . 'admin/js/honey-hole-frontend.asset.php');

		// Use time() for development to prevent caching
		$version = defined('WP_DEBUG') && WP_DEBUG ? time() : $asset_file['version'];

		// Enqueue frontend styles
		wp_enqueue_style(
			'honey-hole-frontend',
			plugin_dir_url(dirname(__FILE__)) . 'src/frontend/components/styles.css',
			array(),
			$version
		);
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function enqueue_scripts()
	{
		// Enqueue WordPress element first
		wp_enqueue_script('wp-element');

		// Get the asset file
		$asset_file = include(plugin_dir_path(dirname(__FILE__)) . 'admin/js/honey-hole-frontend.asset.php');

		// Use time() for development to prevent caching
		$version = defined('WP_DEBUG') && WP_DEBUG ? time() : $asset_file['version'];

		// Enqueue React app script
		wp_enqueue_script(
			'honey-hole-frontend',
			plugin_dir_url(dirname(__FILE__)) . 'admin/js/honey-hole-frontend.js',
			array_merge(['wp-element'], $asset_file['dependencies']),
			$version,
			true
		);

		// Localize the script with the REST API URL
		wp_localize_script(
			'honey-hole-frontend',
			'honeyHoleData',
			array(
				'apiUrl' => rest_url('honey-hole/v1/deals'),
				'nonce' => wp_create_nonce('wp_rest'),
				'debug' => defined('WP_DEBUG') && WP_DEBUG
			)
		);
	}

	/**
	 * Render the deals shortcode
	 *
	 * @since    2.0.0
	 * @param    array    $atts    Shortcode attributes
	 * @return   string   The rendered shortcode output
	 */
	public function render_deals_shortcode($atts)
	{
		// Include the shortcode function file
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/honey-hole-shortcode.php';

		// Call the shortcode function with the attributes
		return honey_hole_deals_shortcode($atts);
	}
}
