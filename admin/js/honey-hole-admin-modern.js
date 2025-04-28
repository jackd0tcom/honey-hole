document.addEventListener('DOMContentLoaded', () => {
    // Media Uploader
    let mediaUploader;
    const uploadButton = document.querySelector('#upload-image-button');
    
    if (uploadButton) {
        uploadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (mediaUploader) {
                mediaUploader.open();
                return;
            }
            
            mediaUploader = wp.media({
                title: 'Choose Deal Image',
                button: { text: 'Use this image' },
                multiple: false
            });
            
            mediaUploader.on('select', () => {
                const attachment = mediaUploader.state().get('selection').first().toJSON();
                document.querySelector('#deal-image').value = attachment.id;
                document.querySelector('#image-preview').innerHTML = 
                    `<img src="${attachment.url}" alt="${attachment.title}">`;
            });
            
            mediaUploader.open();
        });
    }

    // Image source toggle
    const imageSourceInputs = document.querySelectorAll('input[name="image_source"]');
    imageSourceInputs.forEach(input => {
        input.addEventListener('change', () => {
            const dealImageUrl = document.querySelector('#deal-image-url');
            const dealImage = document.querySelector('#deal-image');
            
            if (input.value === 'upload') {
                dealImageUrl.required = false;
                dealImage.required = true;
            } else {
                dealImageUrl.required = true;
                dealImage.required = false;
            }
        });
    });

    // Price formatting and validation
    const priceInputs = document.querySelectorAll('.honey-hole-form-field input[type="number"]');
    priceInputs.forEach(input => {
        input.addEventListener('input', () => {
            let value = input.value;
            if (value) {
                value = parseFloat(value).toFixed(2);
                input.value = value;
            }
        });
    });

    // URL validation
    const urlInputs = document.querySelectorAll('.honey-hole-form-field input[type="url"]');
    urlInputs.forEach(input => {
        input.addEventListener('blur', () => {
            let url = input.value;
            if (url && !isValidUrl(url)) {
                alert('Please enter a valid URL');
                input.value = '';
            }
        });
    });

    // Tags management
    const tags = [];
    const tagsInput = document.querySelector('.honey-hole-tags-input');
    const tagsContainer = document.querySelector('.honey-hole-tags-container');

    if (tagsInput) {
        tagsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                let tag = tagsInput.value.trim();
                if (tag && !tags.includes(tag)) {
                    tags.push(tag);
                    updateTagsDisplay();
                    tagsInput.value = '';
                }
            }
        });
    }

    function updateTagsDisplay() {
        if (!tagsContainer) return;
        
        tagsContainer.innerHTML = '';
        tags.forEach((tag, index) => {
            const tagElement = document.createElement('span');
            tagElement.className = 'honey-hole-tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="remove-tag" data-index="${index}">×</span>
            `;
            tagsContainer.appendChild(tagElement);
        });

        if (tagsInput) {
            tagsInput.value = tags.join(', ');
        }
    }

    // Tag removal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-tag')) {
            const index = e.target.dataset.index;
            tags.splice(index, 1);
            updateTagsDisplay();
        }
    });

    // Form submission validation
    const dealForm = document.querySelector('#honey-hole-deal-form');
    if (dealForm) {
        dealForm.addEventListener('submit', (e) => {
            const originalPrice = document.querySelector('#deal-original-price').value;
            const salesPrice = document.querySelector('#deal-sales-price').value;
            const url = document.querySelector('#deal-url').value;
            const imageSource = document.querySelector('input[name="image_source"]:checked')?.value;
            const image = imageSource === 'upload' 
                ? document.querySelector('#deal-image').value 
                : document.querySelector('#deal-image-url').value;
            const category = document.querySelector('#deal-category').value;

            if (!originalPrice || !salesPrice || !url || !image || !category) {
                e.preventDefault();
                alert('Please fill in all required fields');
                return false;
            }

            if (parseFloat(salesPrice) >= parseFloat(originalPrice)) {
                e.preventDefault();
                alert('Sales price must be less than the original price');
                return false;
            }
        });
    }

    // Success message display
    if (window.location.search.includes('message=deal_added')) {
        const notice = document.createElement('div');
        notice.className = 'notice notice-success is-dismissible';
        notice.innerHTML = '<p>Deal added successfully!</p>';
        document.querySelector('.wrap h1').after(notice);
    }

    // Discount calculation
    function calculateDiscount() {
        const originalPrice = parseFloat(document.querySelector('#deal-original-price').value) || 0;
        const salesPrice = parseFloat(document.querySelector('#deal-sales-price').value) || 0;

        if (originalPrice > 0 && salesPrice > 0 && salesPrice < originalPrice) {
            const discount = ((originalPrice - salesPrice) / originalPrice) * 100;
            document.querySelector('#discount-percentage').textContent = Math.round(discount);
        } else {
            document.querySelector('#discount-percentage').textContent = '0';
        }
    }

    // Price input event listeners
    const priceInputElements = document.querySelectorAll('#deal-original-price, #deal-sales-price');
    priceInputElements.forEach(input => {
        input.addEventListener('input', calculateDiscount);
    });

    // Sales price validation
    const salesPriceInput = document.querySelector('#deal-sales-price');
    if (salesPriceInput) {
        salesPriceInput.addEventListener('change', () => {
            const originalPrice = parseFloat(document.querySelector('#deal-original-price').value) || 0;
            const salesPrice = parseFloat(salesPriceInput.value) || 0;

            if (salesPrice >= originalPrice && originalPrice > 0) {
                alert('Sales price must be less than the original price');
                salesPriceInput.value = '';
                calculateDiscount();
            }
        });
    }

    // Original price validation
    const originalPriceInput = document.querySelector('#deal-original-price');
    if (originalPriceInput) {
        originalPriceInput.addEventListener('change', () => {
            const originalPrice = parseFloat(originalPriceInput.value) || 0;
            const salesPrice = parseFloat(document.querySelector('#deal-sales-price').value) || 0;

            if (salesPrice >= originalPrice && salesPrice > 0) {
                alert('Original price must be greater than the sales price');
                originalPriceInput.value = '';
                calculateDiscount();
            }
        });
    }

    // Visibility toggle system
    let visibilityChanges = {};
    const visibilityCheckboxes = document.querySelectorAll('.visibility-checkbox');
    
    visibilityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const dealId = checkbox.dataset.dealId;
            const visibility = checkbox.checked;
            const statusSpan = checkbox.nextElementSibling;
            const originalState = checkbox.dataset.originalState === undefined 
                ? visibility 
                : checkbox.dataset.originalState;

            if (visibility === originalState) {
                delete visibilityChanges[dealId];
            } else {
                visibilityChanges[dealId] = visibility;
            }

            statusSpan.textContent = visibility ? 'Visible' : 'Hidden';
            statusSpan.style.color = visibility ? '#2271b1' : '#666';

            updateVisibilityPopupVisibility();
        });

        // Store original state
        checkbox.dataset.originalState = checkbox.checked;
    });

    // Notification system
    function showNotification(message, duration = 3000) {
        const notification = document.querySelector('.honey-hole-notification');
        if (!notification) return;

        notification.textContent = message;
        notification.classList.add('visible');
        
        setTimeout(() => {
            notification.classList.remove('visible');
        }, duration);
    }

    // Search functionality
    let searchTimeout;
    const searchInput = document.querySelector('#deal-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value;
            
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const currentUrl = new URL(window.location.href);
                if (searchQuery) {
                    currentUrl.searchParams.set('s', searchQuery);
                } else {
                    currentUrl.searchParams.delete('s');
                }
                
                window.location.href = currentUrl.toString();
            }, 500);
        });

        // Set initial search value from URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('s');
        if (searchQuery) {
            searchInput.value = searchQuery;
        }
    }

    // Helper function to validate URLs
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
}); 