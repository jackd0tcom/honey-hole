<?php

/**
 * Import Deals Page
 *
 * This page allows users to import deals from a CSV file.
 *
 * @package Honey_Hole
 */

// Check if user has manage_options capability
if (!current_user_can('manage_options')) {
    wp_die(__('You do not have sufficient permissions to access this page.'));
}

function honey_hole_import_page()
{
    // Handle the import
    // honey_hole_handle_csv_import();
?>
    <div class="wrap">
        <h1>Import Deals</h1>
        <?php settings_errors('honey_hole_import'); ?>

        <div class="honey-hole-import-section">
            <h2>Import Deals from CSV</h2>
            <p>Upload a CSV file containing your deals. The file should have the following columns (column names are case-insensitive):</p>
            <ul>
                <li><strong>Title</strong> - The deal title (required)</li>
                <li><strong>Promo Code</strong> - The promotional code (optional)</li>
                <li><strong>Original Price</strong> - The original price (required)</li>
                <li><strong>Sales Price</strong> - The sale price (required)</li>
                <li><strong>Rating</strong> - The deal rating (required)</li>
                <li><strong>Deal URL</strong> - The affiliate deal URL (required)</li>
                <li><strong>Normal Link</strong> - The original product URL (required)</li>
                <li><strong>Image URL</strong> - URL to the product image (required)</li>
                <li><strong>Category</strong> - The deal category (required)</li>
            </ul>
            <p><em>Note: Rows with missing required fields will be skipped automatically. Any additional columns in the CSV will be ignored.</em></p>

            <form method="post" action="" enctype="multipart/form-data" id="honey-hole-import-form">
                <?php wp_nonce_field('honey_hole_import_csv'); ?>
                <input type="hidden" name="honey_hole_import_csv" value="1">
                <div class="honey-hole-form-field">
                    <label for="csv_file">Select CSV File</label>
                    <input type="file" id="csv_file" name="csv_file" accept=".csv" required>
                    <p class="description">The file should be a CSV with UTF-8 encoding</p>
                </div>
                <div class="honey-hole-form-actions">
                    <button type="submit" class="button button-primary" id="import-button">Import Deals</button>
                </div>
            </form>

            <div id="import-progress" style="display: none;">
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
                <div class="progress-status">Preparing import...</div>
                <div class="progress-details">
                    <p>Imported: <span id="imported-count">0</span></p>
                    <p>Skipped: <span id="skipped-count">0</span></p>
                    <p>Errors: <span id="error-count">0</span></p>
                </div>
            </div>

            <div class="honey-hole-sample-csv">
                <h3>Sample CSV Format</h3>
                <pre>title,promo_code,original_price,sales_price,rating,deal_url,normal_link,image_url,category
"REI Co-op Flash 22 Pack","SUMMER20",49.95,29.95,4.5,"https://example.com/affiliate","https://example.com/product","https://example.com/image.jpg","Backpacks"
"Patagonia Nano Puff Jacket","",199.00,149.00,4.8,"https://example.com/affiliate2","https://example.com/product2","https://example.com/image2.jpg","Jackets"</pre>
            </div>
        </div>
    </div>

    <script>
        jQuery(document).ready(function($) {
            $('#honey-hole-import-form').on('submit', function(e) {
                e.preventDefault();

                var formData = new FormData(this);
                var $progress = $('#import-progress');
                var $progressFill = $('.progress-fill');
                var $progressText = $('.progress-text');
                var $progressStatus = $('.progress-status');
                var $importedCount = $('#imported-count');
                var $skippedCount = $('#skipped-count');
                var $errorCount = $('#error-count');
                var $importButton = $('#import-button');

                // Show progress bar
                $progress.show();
                $importButton.prop('disabled', true).text('Importing...');

                // Add action for progress tracking
                formData.append('action', 'honey_hole_import_csv_ajax');

                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    xhr: function() {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener('progress', function(e) {
                            if (e.lengthComputable) {
                                var percent = Math.round((e.loaded / e.total) * 100);
                                $progressFill.css('width', percent + '%');
                                $progressText.text(percent + '%');
                            }
                        }, false);
                        return xhr;
                    },
                    success: function(response) {
                        if (response.success) {
                            $progressStatus.text('Import completed successfully!');
                            $importedCount.text(response.data.imported);
                            $skippedCount.text(response.data.skipped);
                            $errorCount.text(response.data.errors.length);

                            // Reload page after 2 seconds to show the imported deals
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000);
                        } else {
                            $progressStatus.text('Import failed: ' + response.data);
                            $importButton.prop('disabled', false).text('Import Deals');
                        }
                    },
                    error: function() {
                        $progressStatus.text('Import failed. Please try again.');
                        $importButton.prop('disabled', false).text('Import Deals');
                    }
                });
            });
        });
    </script>
<?php
}
