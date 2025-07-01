<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://fishbones.digital
 * @since             2.1.0
 * @package           Honey_Hole_2
 *
 * @wordpress-plugin
 * Plugin Name:       Honey Hole 2.0
 * Plugin URI:        https://outdoorempire.com/thehoneyhole
 * Description:       A plugin for managing and displaying deals on the Honey Hole
 * Version:           2.1.0
 * Author:            Jack Ball
 * Author URI:        https://fishbones.digital/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       honey-hole
 * Domain Path:       /languages
 * Update URI:        https://github.com/jackd0tcom/honey-hole
 * Tested up to:      6.6.1
 * Requires at least: 6.0
 * Requires PHP:      8.0
 */

// If this file is called directly, abort.
if (! defined('WPINC')) {
	die;
}
	define('HONEY_HOLE_VERSION', '2.1.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-honey-hole-activator.php
 */
function activate_honey_hole()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-honey-hole-activator.php';
	Honey_Hole_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-honey-hole-deactivator.php
 */
function deactivate_honey_hole()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-honey-hole-deactivator.php';
	Honey_Hole_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_honey_hole');
register_deactivation_hook(__FILE__, 'deactivate_honey_hole');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-honey-hole.php';

/**
 * GitHub Updater integration
 * Enables automatic updates from GitHub repository
 */
require plugin_dir_path(__FILE__) . 'includes/GitHubUpdater.php';

// Initialize GitHub Updater
$gitHubUpdater = new \Honey_Hole\GitHubUpdater\GitHubUpdater(__FILE__);
$gitHubUpdater->setBranch('main'); // or 'master' depending on your default branch
$gitHubUpdater->setPluginIcon('admin/images/honey-hole-icon.svg');
$gitHubUpdater->setChangelog('CHANGELOG.md');
$gitHubUpdater->enableSetting(); // Adds GitHub Access Token setting to General Settings
$gitHubUpdater->add();

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    2.0.0
 */
function run_honey_hole()
{

	$plugin = new Honey_Hole();
	$plugin->run();
}
run_honey_hole();
