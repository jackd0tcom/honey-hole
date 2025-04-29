(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	// Category filter functionality
	$('.category-button').on('click', function() {
		const selectedCategory = $(this).data('category');
		
		// Update active button
		$('.category-button').removeClass('active');
		$(this).addClass('active');
		
		// Show loading state
		$('.deals-grid').addClass('loading');
		
		// Make AJAX request
		$.ajax({
			url: honeyHolePublic.ajaxurl,
			type: 'POST',
			data: {
				action: 'honey_hole_filter_deals',
				category: selectedCategory
			},
			success: function(response) {
				if (response.success) {
					$('.deals-grid').html(response.data.html);
				}
			},
			complete: function() {
				$('.deals-grid').removeClass('loading');
			}
		});
	});

})( jQuery );
