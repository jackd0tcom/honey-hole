<?php

/**
 * REST API Handler for Honey Hole
 *
 * @package    Honey_Hole
 * @subpackage Honey_Hole/includes
 */

class Honey_Hole_REST_API
{

    /**
     * The namespace for our REST API endpoints
     */
    private $namespace = 'honey-hole/v1';

    /**
     * Initialize the class and set up hooks
     */
    public function __construct()
    {
        // Register our REST API routes
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register the routes for our REST API endpoints
     */
    public function register_routes()
    {
        register_rest_route($this->namespace, '/deals', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_deals'),
            'permission_callback' => '__return_true',
        ));
        // register_rest_route($this->namespace, '/deals/category/(?P<category>[a-zA-Z0-9-]+)', array(
        //     'methods' => 'GET',
        //     'callback' => array($this, 'get_deals_by_category'),
        //     'permission_callback' => '__return_true',
        // ));
    }

    /**
     * Get deals with filtering and sorting
     * 
     * @param WP_REST_Request $request The request object
     * @return WP_REST_Response
     */
    public function get_deals($request)
    {
        $args = array(
            'post_type' => 'honey_hole_deal',
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC',
        );

        $query = new WP_Query($args);
        $deals = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();

                $deal = array(
                    'id' => $post_id,
                    'title' => get_the_title($post_id),
                    'sales_price' => get_post_meta($post_id, 'deal_sales_price', true),
                    'original_price' => get_post_meta($post_id, 'deal_original_price', true),
                    'rating' => get_post_meta($post_id, 'deal_rating', true),
                    'image_url' => get_post_meta($post_id, 'deal_image_url', true),
                    'product_url' => get_post_meta($post_id, 'deal_url', true),
                    'categories' => wp_get_post_terms($post_id, 'deal_category', array('fields' => 'slugs')),
                    'date_added' => get_the_date('Y-m-d H:i:s', $post_id),
                    'date_updated' => get_the_modified_date('Y-m-d H:i:s', $post_id),
                );

                $deals[] = $deal;
            }
        }
        wp_reset_postdata();

        return new WP_REST_Response($deals, 200);
    }

    // public function get_deals_by_category($request) {
    //     $category_id = $request->get_param('category_id');
    //     $args = array(
    //         'post_type' => 'deal',
    //         'posts_per_page' => -1,
    //         'post_status' => 'publish',
    //         'tax_query' => array(
    //             array(
    //                 'taxonomy' => 'deal_category',
    //                 'field' => 'term_id',
    //                 'terms' => $category_id,
    //             ),
    //         ),
    //     );

    //     $query = new WP_Query($args);
    //     $deals = $query->posts;

    //     return new WP_REST_Response($categories, 200);
    // }
}
