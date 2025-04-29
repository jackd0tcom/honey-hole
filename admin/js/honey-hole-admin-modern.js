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
        let notification = document.querySelector('.honey-hole-notification');
        
        // Create notification element if it doesn't exist
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'honey-hole-notification';
            document.body.appendChild(notification);
        }

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

    // Handle image upload in grid view
    document.querySelectorAll('.upload-image-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const dealId = button.dataset.dealId;
            document.querySelector(`.deal-image-upload[data-deal-id="${dealId}"]`).click();
        });
    });

    document.querySelectorAll('.deal-image-upload').forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const dealId = input.dataset.dealId;
            const formData = new FormData();
            formData.append('action', 'honey_hole_upload_image');
            formData.append('nonce', honeyHoleAdmin.image_upload_nonce);
            formData.append('deal_id', dealId);
            formData.append('image', file);

            fetch(honeyHoleAdmin.ajaxurl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update the image in the grid
                    const dealCard = document.querySelector(`.honey-hole-deal-card[data-deal-id="${dealId}"]`);
                    const imageContainer = dealCard.querySelector('.deal-image');
                    imageContainer.innerHTML = `
                        <img src="${data.data.image_url}" alt="Deal Image" class="deal-thumbnail-image">
                        <div class="image-overlay">
                            <button type="button" class="button upload-image-button" data-deal-id="${dealId}">Replace Image</button>
                        </div>
                        <input type="file" class="deal-image-upload" data-deal-id="${dealId}" accept="image/*" style="display: none;">
                    `;
                } else {
                    alert('Error uploading image: ' + data.data);
                }
            })
            .catch(error => {
                alert('Error uploading image. Please try again.');
            });
        });
    });

    // Drag and drop functionality for deal ordering
    const dealsGrid = document.querySelector('.honey-hole-deals-grid');
    if (dealsGrid) {
        let draggedItem = null;
        let draggedIndex = null;
        let originalOrder = [];

        // Load initial order from database
        fetch(honeyHoleAdmin.ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'honey_hole_get_order',
                nonce: honeyHoleAdmin.order_nonce
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Sort cards based on the order from database
                const cards = Array.from(dealsGrid.children);
                data.data.forEach(deal => {
                    const card = cards.find(c => c.dataset.dealId === deal.id.toString());
                    if (card) {
                        dealsGrid.appendChild(card);
                    }
                });
                
                // Update originalOrder array
                originalOrder = Array.from(dealsGrid.children).map(card => card.dataset.dealId);
            }
        })
        .catch(error => {
            showNotification('Error loading deal order. Please try again.', 5000);
        });

        // Initialize drag and drop
        document.querySelectorAll('.honey-hole-deal-card').forEach((card, index) => {
            card.setAttribute('draggable', 'true');
            card.dataset.order = index;
        });

        // Drag start
        dealsGrid.addEventListener('dragstart', (e) => {
            if (!e.target.classList.contains('honey-hole-deal-card')) return;
            
            draggedItem = e.target;
            draggedIndex = Array.from(dealsGrid.children).indexOf(draggedItem);
            e.target.classList.add('dragging');
            dealsGrid.classList.add('sorting');
        });

        // Drag end
        dealsGrid.addEventListener('dragend', (e) => {
            if (!e.target.classList.contains('honey-hole-deal-card')) return;
            
            e.target.classList.remove('dragging');
            dealsGrid.classList.remove('sorting');
            
            // Get new order
            const newOrder = Array.from(dealsGrid.children).map(card => card.dataset.dealId);
            
            // Check if order changed
            if (JSON.stringify(newOrder) !== JSON.stringify(originalOrder)) {
                // Create updates array
                const updates = newOrder.map((dealId, index) => ({
                    deal_id: dealId,
                    new_order: index
                }));

                // Send AJAX request to update order
                fetch(honeyHoleAdmin.ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'honey_hole_update_order',
                        nonce: honeyHoleAdmin.order_nonce,
                        updates: JSON.stringify(updates)
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        showNotification('Error updating deal order: ' + data.data, 5000);
                        // Revert to original order
                        originalOrder.forEach((dealId, index) => {
                            const card = document.querySelector(`.honey-hole-deal-card[data-deal-id="${dealId}"]`);
                            if (card) {
                                card.dataset.order = index;
                                dealsGrid.appendChild(card);
                            }
                        });
                    } else {
                        // Update original order
                        originalOrder = newOrder;
                        showNotification('Deal order updated successfully!');
                    }
                })
                .catch(error => {
                    showNotification('Error updating deal order. Please try again.', 5000);
                    // Revert to original order
                    originalOrder.forEach((dealId, index) => {
                        const card = document.querySelector(`.honey-hole-deal-card[data-deal-id="${dealId}"]`);
                        if (card) {
                            card.dataset.order = index;
                            dealsGrid.appendChild(card);
                        }
                    });
                });
            }
        });

        // Drag over
        dealsGrid.addEventListener('dragover', (e) => {
            e.preventDefault();
            const card = e.target.closest('.honey-hole-deal-card');
            if (!card || card === draggedItem) return;

            const cards = Array.from(dealsGrid.children);
            const draggedRect = draggedItem.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const draggedCenter = draggedRect.top + draggedRect.height / 2;
            const cardCenter = cardRect.top + cardRect.height / 2;

            if (draggedCenter < cardCenter) {
                card.parentNode.insertBefore(draggedItem, card);
            } else {
                card.parentNode.insertBefore(draggedItem, card.nextSibling);
            }
        });
    }
}); 