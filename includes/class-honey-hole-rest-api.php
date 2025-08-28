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
        register_rest_route($this->namespace, '/categories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_categories'),
            'permission_callback' => '__return_true',
        ));
        register_rest_route($this->namespace, '/delete-post/(?P<post_id>\d+)', array(
            'methods' => 'POST',
            'callback' => array($this, 'delete_post'),
            'permission_callback' => function ($request) {
                if (!is_user_logged_in()) {
                    return new WP_Error('rest_forbidden', 'You must be logged in to perform this action.', array('status' => 401));
                }
                if (!current_user_can('edit_posts')) {
                    return new WP_Error('rest_forbidden', 'You do not have permission to perform this action.', array('status' => 403));
                }
                return true;
            },
        ));
        register_rest_route($this->namespace, '/delete-posts', array(
            'methods' => 'POST',
            'callback' => array($this, 'delete_posts'),
            'permission_callback' => function ($request) {
                return current_user_can('edit_posts');
            },
        ));
        register_rest_route($this->namespace, '/video-settings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_video_settings'),
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
                    'title' => $this->clean_html_entities(get_the_title($post_id)),
                    'sales_price' => get_post_meta($post_id, 'deal_sales_price', true),
                    'original_price' => get_post_meta($post_id, 'deal_original_price', true),
                    'rating' => get_post_meta($post_id, 'deal_rating', true),
                    'image_url' => get_post_meta($post_id, 'deal_image_url', true),
                    'product_url' => get_post_meta($post_id, 'deal_url', true),
                    'promo_code' => $this->clean_html_entities(get_post_meta($post_id, 'deal_promo_code', true)),
                    'seller' => $this->clean_html_entities(get_post_meta($post_id, 'deal_seller', true)),
                    'description' => get_post_meta($post_id, 'deal_description', true),
                    'background_image' => get_post_meta($post_id, 'deal_background_image', true),
                    'categories' => wp_get_post_terms($post_id, 'deal_category', array('fields' => 'all')),
                    'date_added' => get_the_date('Y-m-d H:i:s', $post_id),
                    'date_updated' => get_the_modified_date('Y-m-d H:i:s', $post_id),
                );

                $deals[] = $deal;
            }
        }
        wp_reset_postdata();

        return new WP_REST_Response($deals, 200);
    }

    public function get_categories($request)
    {
        $categories = get_terms(array(
            'taxonomy' => 'deal_category',
            'hide_empty' => false,
        ));

        return new WP_REST_Response($categories, 200);
    }

    public function delete_post($request)
    {
        $post_id = $request->get_param('post_id');
        wp_delete_post($post_id, true);
        return new WP_REST_Response('Post deleted successfully', 200);
    }

    public function delete_posts($request)
    {
        $post_ids = $request->get_param('post_ids');
        
        // Check if we're deleting all deals
        if ($post_ids === 'all') {
            // Get all deal post IDs
            $all_deals = get_posts(array(
                'post_type' => 'honey_hole_deal',
                'post_status' => 'any',
                'posts_per_page' => -1,
                'fields' => 'ids'
            ));
            
            $post_ids = implode(',', $all_deals);
        }
        
        $post_ids = explode(',', $post_ids);
        foreach ($post_ids as $post_id) {
            wp_delete_post($post_id, true);
        }
        return new WP_REST_Response('Posts deleted successfully', 200);
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

    /**
     * Clean HTML entities from text
     * 
     * @param string $text The text to clean
     * @return string Cleaned text
     */
    private function clean_html_entities($text)
    {
        // Decode HTML entities
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        // Handle specific problematic entities
        $text = str_replace('&#8217;', "'", $text); // Right single quotation mark
        $text = str_replace('&#8216;', "'", $text); // Left single quotation mark
        $text = str_replace('&#8220;', '"', $text); // Left double quotation mark
        $text = str_replace('&#8221;', '"', $text); // Right double quotation mark
        $text = str_replace('&#39;', "'", $text);   // Apostrophe
        $text = str_replace('&apos;', "'", $text);  // Apostrophe
        $text = str_replace('&quot;', '"', $text);  // Quote
        $text = str_replace('&amp;', '&', $text);   // Ampersand
        $text = str_replace('&lt;', '<', $text);    // Less than
        $text = str_replace('&gt;', '>', $text);    // Greater than
        
        return $text;
    }

    /**
     * Get video settings
     * 
     * @param WP_REST_Request $request The request object
     * @return WP_REST_Response
     */
    public function get_video_settings($request)
    {
        $video_url = get_option('honey_hole_video_url', 'https://www.youtube.com/embed/SMiEJ0qDJ8I?si=y-zCwgrDLO7z7NUO');
        
        return new WP_REST_Response(array(
            'video_url' => $video_url
        ), 200);
    }
}
