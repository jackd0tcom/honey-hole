<?php
/**
 * Register custom post types and taxonomies.
 *
 * @package Honey_Hole
 */

class Honey_Hole_Post_Types {
    /**
     * Register custom post types and taxonomies.
     */
    public function register_post_types() {
        $this->register_deal_post_type();
        $this->register_deal_taxonomies();
    }
    
    /**
     * Register the deal post type.
     */
    private function register_deal_post_type() {
        $labels = array(
            'name'               => 'Deals',
            'singular_name'      => 'Deal',
            'menu_name'          => 'Honey Hole',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Deal',
            'edit_item'          => 'Edit Deal',
            'new_item'           => 'New Deal',
            'view_item'          => 'View Deal',
            'search_items'       => 'Search Deals',
            'not_found'          => 'No deals found',
            'not_found_in_trash' => 'No deals found in Trash',
        );

        $args = array(
            'labels'              => $labels,
            'public'              => true,
            'has_archive'         => true,
            'publicly_queryable'  => true,
            'query_var'           => true,
            'rewrite'             => array('slug' => 'deals'),
            'capability_type'     => 'post',
            'hierarchical'        => false,
            'supports'            => array('title', 'thumbnail'),
            'menu_position'       => 5,
            'menu_icon'           => 'dashicons-money-alt',
            'show_in_rest'        => true,
            'show_in_menu'        => false, // Hide from main menu as we have custom menu
        );

        register_post_type('honey_hole_deal', $args);
    }
    
    /**
     * Register deal taxonomies.
     */
    private function register_deal_taxonomies() {
        // Register Deal Categories
        register_taxonomy('deal_category', 'honey_hole_deal', array(
            'label'        => 'Deal Categories',
            'hierarchical' => true,
            'show_ui'      => true,
            'show_in_rest' => true,
            'rewrite'      => array('slug' => 'deal-category'),
        ));
        
        // Register Deal Tags
        register_taxonomy('deal_tag', 'honey_hole_deal', array(
            'label'        => 'Deal Tags',
            'hierarchical' => false,
            'show_ui'      => true,
            'show_in_rest' => true,
            'rewrite'      => array('slug' => 'deal-tag'),
        ));
    }
} 