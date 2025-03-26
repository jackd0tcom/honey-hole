jQuery(document).ready(function ($) {
  // Initialize WordPress media uploader
  var mediaUploader;

  $("#upload-image-button").on("click", function (e) {
    e.preventDefault();

    if (mediaUploader) {
      mediaUploader.open();
      return;
    }

    mediaUploader = wp.media({
      title: "Choose Deal Image",
      button: {
        text: "Use this image",
      },
      multiple: false,
    });

    mediaUploader.on("select", function () {
      var attachment = mediaUploader.state().get("selection").first().toJSON();
      $("#deal-image").val(attachment.id);
      $("#image-preview").html(
        '<img src="' + attachment.url + '" alt="' + attachment.title + '">'
      );
    });

    mediaUploader.open();
  });

  // Handle image source toggle
  $('input[name="image_source"]').on("change", function () {
    if ($(this).val() === "upload") {
      $("#deal-image-url").prop("required", false);
      $("#deal-image").prop("required", true);
    } else {
      $("#deal-image-url").prop("required", true);
      $("#deal-image").prop("required", false);
    }
  });

  // Format price input
  $('.honey-hole-form-field input[type="number"]').on("input", function () {
    let value = $(this).val();
    if (value) {
      value = parseFloat(value).toFixed(2);
      $(this).val(value);
    }
  });

  // Validate URL input
  $('.honey-hole-form-field input[type="url"]').on("blur", function () {
    let url = $(this).val();
    if (url && !isValidUrl(url)) {
      alert("Please enter a valid URL");
      $(this).val("");
    }
  });

  // Handle tags input
  let tags = [];
  $(".honey-hole-tags-input").on("keydown", function (e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      let tag = $(this).val().trim();
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
        updateTagsDisplay();
        $(this).val("");
      }
    }
  });

  function updateTagsDisplay() {
    let container = $(".honey-hole-tags-container");
    container.empty();
    tags.forEach((tag, index) => {
      container.append(`
        <span class="honey-hole-tag">
          ${tag}
          <span class="remove-tag" data-index="${index}">×</span>
        </span>
      `);
    });
    $(".honey-hole-tags-input").val(tags.join(", "));
  }

  $(document).on("click", ".remove-tag", function () {
    let index = $(this).data("index");
    tags.splice(index, 1);
    updateTagsDisplay();
  });

  // Helper function to validate URLs
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Handle form submission
  $("#honey-hole-deal-form").on("submit", function (e) {
    let originalPrice = $("#deal-original-price").val();
    let salesPrice = $("#deal-sales-price").val();
    let url = $("#deal-url").val();
    let imageSource = $('input[name="image_source"]:checked').val();
    let image =
      imageSource === "upload"
        ? $("#deal-image").val()
        : $("#deal-image-url").val();
    let category = $("#deal-category").val();

    if (!originalPrice || !salesPrice || !url || !image || !category) {
      e.preventDefault();
      alert("Please fill in all required fields");
      return false;
    }

    // Validate prices
    if (parseFloat(salesPrice) >= parseFloat(originalPrice)) {
      e.preventDefault();
      alert("Sales price must be less than the original price");
      return false;
    }
  });

  // Show success message if deal was added
  if (window.location.search.indexOf("message=deal_added") !== -1) {
    $(".wrap h1").after(
      '<div class="notice notice-success is-dismissible"><p>Deal added successfully!</p></div>'
    );
  }

  // Function to calculate and display discount
  function calculateDiscount() {
    const originalPrice = parseFloat($("#deal-original-price").val()) || 0;
    const salesPrice = parseFloat($("#deal-sales-price").val()) || 0;

    if (originalPrice > 0 && salesPrice > 0 && salesPrice < originalPrice) {
      const discount = ((originalPrice - salesPrice) / originalPrice) * 100;
      $("#discount-percentage").text(Math.round(discount));
    } else {
      $("#discount-percentage").text("0");
    }
  }

  // Event listeners for price inputs
  $("#deal-original-price, #deal-sales-price").on("input", function () {
    calculateDiscount();
  });

  // Validate that sales price is less than original price
  $("#deal-sales-price").on("change", function () {
    const originalPrice = parseFloat($("#deal-original-price").val()) || 0;
    const salesPrice = parseFloat($(this).val()) || 0;

    if (salesPrice >= originalPrice && originalPrice > 0) {
      alert("Sales price must be less than the original price");
      $(this).val("");
      calculateDiscount();
    }
  });

  // Validate that original price is greater than sales price
  $("#deal-original-price").on("change", function () {
    const originalPrice = parseFloat($(this).val()) || 0;
    const salesPrice = parseFloat($("#deal-sales-price").val()) || 0;

    if (salesPrice >= originalPrice && salesPrice > 0) {
      alert("Original price must be greater than the sales price");
      $(this).val("");
      calculateDiscount();
    }
  });

  // Handle visibility toggle
  let visibilityChanges = {};

  // Create and append the visibility save popup
  const visibilityPopup = $(
    '<div class="honey-hole-save-popup visibility-popup"><span class="save-message">You have unsaved visibility changes</span><div class="button-group"><button type="button" class="button button-primary">Save Changes</button><button type="button" class="button cancel">Cancel</button></div></div>'
  );
  $("body").append(visibilityPopup);

  // Create and append the bulk delete popup
  const bulkDeletePopup = $(
    '<div class="honey-hole-save-popup bulk-delete-popup"><span class="save-message">Selected deals will be deleted</span><div class="button-group"><button type="button" class="button button-link-delete confirm-delete">Delete Selected</button><button type="button" class="button cancel">Cancel</button></div></div>'
  );
  $("body").append(bulkDeletePopup);

  // Create and append the notification
  const notification = $('<div class="honey-hole-notification"></div>');
  $("body").append(notification);

  function showNotification(message, duration = 3000) {
    notification.text(message).addClass("visible");
    setTimeout(() => {
      notification.removeClass("visible");
    }, duration);
  }

  function updateVisibilityPopupVisibility() {
    const hasChanges = Object.keys(visibilityChanges).length > 0;
    visibilityPopup.toggleClass("visible", hasChanges);
    $("body").toggleClass("has-sticky-save", hasChanges);
  }

  $(".visibility-checkbox").on("change", function () {
    const dealId = $(this).data("deal-id");
    const visibility = $(this).prop("checked");
    const statusSpan = $(this).siblings(".visibility-status");
    const originalState =
      $(this).data("original-state") === undefined
        ? visibility
        : $(this).data("original-state");

    // If toggling back to original state, remove from changes
    if (visibility === originalState) {
      delete visibilityChanges[dealId];
    } else {
      // Store the change
      visibilityChanges[dealId] = visibility;
    }

    // Update the display
    statusSpan.text(visibility ? "Visible" : "Hidden");
    statusSpan.css("color", visibility ? "#2271b1" : "#666");

    // Update visibility popup visibility
    updateVisibilityPopupVisibility();
  });

  // Store original state when page loads
  $(".visibility-checkbox").each(function () {
    $(this).data("original-state", $(this).prop("checked"));
  });

  // Handle save visibility changes
  visibilityPopup.find("button.button-primary").on("click", function () {
    const $button = $(this);
    $button.prop("disabled", true).text("Saving...");

    // Create array of changes
    const changes = Object.entries(visibilityChanges).map(
      ([dealId, visibility]) => ({
        deal_id: dealId,
        visibility: visibility,
      })
    );

    $.ajax({
      url: honeyHoleAdmin.ajaxurl,
      type: "POST",
      data: {
        action: "honey_hole_save_visibility_changes",
        changes: changes,
        nonce: honeyHoleAdmin.visibility_nonce,
      },
      success: function (response) {
        if (response.success) {
          // Clear the changes object
          visibilityChanges = {};
          updateVisibilityPopupVisibility();
          showNotification("Visibility changes saved successfully!");
        } else {
          showNotification(
            "Failed to save visibility changes. Please try again.",
            5000
          );
        }
      },
      error: function () {
        showNotification(
          "An error occurred while saving changes. Please try again.",
          5000
        );
      },
      complete: function () {
        $button.prop("disabled", false).text("Save Changes");
      },
    });
  });

  // Handle cancel button for visibility popup
  visibilityPopup.find("button.cancel").on("click", function () {
    // Revert all visibility changes
    Object.entries(visibilityChanges).forEach(([dealId, visibility]) => {
      const $checkbox = $(`.visibility-checkbox[data-deal-id="${dealId}"]`);
      const $status = $checkbox.siblings(".visibility-status");

      // Revert checkbox state
      $checkbox.prop("checked", !visibility);

      // Revert status text and color
      $status.text(!visibility ? "Visible" : "Hidden");
      $status.css("color", !visibility ? "#2271b1" : "#666");
    });

    // Clear changes and hide popup
    visibilityChanges = {};
    updateVisibilityPopupVisibility();
  });

  // Handle image uploads
  $(".upload-image-button").on("click", function () {
    var dealId = $(this).data("deal-id");
    $('.deal-image-upload[data-deal-id="' + dealId + '"]').click();
  });

  $(".deal-image-upload").on("change", function () {
    var dealId = $(this).data("deal-id");
    var file = this.files[0];
    var $button = $('.upload-image-button[data-deal-id="' + dealId + '"]');
    var $imageContainer = $(this).closest(".column-image");

    if (file) {
      // Show loading state
      $button.prop("disabled", true).text("Uploading...");

      // Create form data
      var formData = new FormData();
      formData.append("action", "honey_hole_upload_image");
      formData.append("deal_id", dealId);
      formData.append("image", file);
      formData.append("nonce", honeyHoleAdmin.nonce);

      // Send AJAX request
      $.ajax({
        url: honeyHoleAdmin.ajaxurl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          if (response.success) {
            // Update the image
            var $img = $imageContainer.find(".deal-thumbnail-image");
            if ($img.length === 0) {
              $imageContainer.find(".no-image").remove();
              $imageContainer.prepend(
                '<img src="' +
                  response.data.image_url +
                  '" alt="Deal image" class="deal-thumbnail-image">'
              );
            } else {
              $img.attr("src", response.data.image_url);
            }
          } else {
            alert("Error uploading image: " + response.data);
          }
        },
        error: function () {
          alert("Error uploading image. Please try again.");
        },
        complete: function () {
          // Reset button state
          $button.prop("disabled", false).text("Upload Image");
          // Clear the file input
          $('.deal-image-upload[data-deal-id="' + dealId + '"]').val("");
        },
      });
    }
  });

  // Handle bulk selection
  $(".deal-checkbox").on("change", function () {
    const selectedCount = $(".deal-checkbox:checked").length;
    const $bulkActions = $(".honey-hole-bulk-actions-float");

    if (selectedCount > 0) {
      $bulkActions.addClass("visible");
      $bulkActions
        .find(".selected-count")
        .text(`${selectedCount} deals selected`);
    } else {
      $bulkActions.removeClass("visible");
    }
  });

  // Create and append the bulk actions UI if it doesn't exist
  if (!$(".honey-hole-bulk-actions-float").length) {
    const bulkActionsUI = $(
      '<div class="honey-hole-bulk-actions-float"><span class="selected-count"></span><button type="button" class="button delete bulk-delete-button">Delete Selected</button></div>'
    );
    $("body").append(bulkActionsUI);
  }

  // Handle bulk delete button click
  $(".bulk-delete-button").on("click", function () {
    const selectedDeals = Array.from(
      document.querySelectorAll(".deal-checkbox:checked")
    ).map((checkbox) => checkbox.value);

    if (selectedDeals.length === 0) {
      showNotification("Please select at least one deal to delete", 3000);
      return;
    }

    // Hide the bulk actions UI and show the confirmation popup
    $(".honey-hole-bulk-actions-float").removeClass("visible");
    bulkDeletePopup.addClass("visible");
    $("body").addClass("has-sticky-save");
  });

  // Handle confirm delete button in bulk delete popup
  bulkDeletePopup.find(".confirm-delete").on("click", function () {
    const selectedDeals = Array.from(
      document.querySelectorAll(".deal-checkbox:checked")
    ).map((checkbox) => checkbox.value);

    // Send AJAX request to delete deals
    $.ajax({
      url: honeyHoleAdmin.ajaxurl,
      type: "POST",
      data: {
        action: "honey_hole_bulk_delete_deals",
        deal_ids: selectedDeals,
        nonce: honeyHoleAdmin.bulk_nonce,
      },
      success: function (response) {
        if (response.success) {
          // Remove deleted deals from the DOM
          selectedDeals.forEach((dealId) => {
            const dealCard = document.querySelector(
              `.honey-hole-deal-card[data-deal-id="${dealId}"]`
            );
            if (dealCard) {
              dealCard.remove();
            }
          });

          // Update counts
          updateDealCounts();

          // Hide the popup and bulk actions
          bulkDeletePopup.removeClass("visible");
          $(".honey-hole-bulk-actions-float").removeClass("visible");
          $("body").removeClass("has-sticky-save");

          // Show success message
          showNotification("Selected deals deleted successfully", 3000);
        } else {
          showNotification("Error deleting deals: " + response.data, 5000);
        }
      },
      error: function () {
        showNotification("Error deleting deals. Please try again.", 5000);
      },
    });
  });

  // Handle cancel button for bulk delete popup
  bulkDeletePopup.find("button.cancel").on("click", function () {
    // Deselect all checkboxes
    $(".deal-checkbox").prop("checked", false);

    // Hide both popups
    bulkDeletePopup.removeClass("visible");
    $(".honey-hole-bulk-actions-float").removeClass("visible");
    $("body").removeClass("has-sticky-save");
  });

  // Handle select all checkboxes
  $(".select-all").on("change", function () {
    const category = $(this).data("category");
    const tag = $(this).data("tag");
    const isChecked = $(this).prop("checked");

    $(this)
      .closest("table")
      .find('input[name="deal_ids[]"]')
      .prop("checked", isChecked);
  });

  // Handle bulk action select all
  $("#cb-select-all-1").on("change", function () {
    const isChecked = $(this).prop("checked");
    $(".select-all").prop("checked", isChecked);
    $('input[name="deal_ids[]"]').prop("checked", isChecked);
  });

  // Update bulk action select all state
  $('input[name="deal_ids[]"]').on("change", function () {
    const table = $(this).closest("table");
    const allChecked =
      table.find('input[name="deal_ids[]"]').length ===
      table.find('input[name="deal_ids[]"]:checked').length;
    table.find(".select-all").prop("checked", allChecked);

    // Update main select all
    const allTablesChecked =
      $(".select-all").length === $(".select-all:checked").length;
    $("#cb-select-all-1").prop("checked", allTablesChecked);
  });

  // Create and append the order changes popup
  const orderChangesPopup = $(
    '<div class="honey-hole-save-popup order-changes-popup"><span class="save-message">Confirm New Order?</span><div class="button-group"><button type="button" class="button button-primary">Save Changes</button><button type="button" class="button cancel">Cancel</button></div></div>'
  );
  $("body").append(orderChangesPopup);

  // Initialize sortable for each category's deals grid
  $(".honey-hole-deals-grid").sortable({
    handle: ".drag-handle",
    placeholder: "ui-sortable-placeholder",
    helper: "clone",
    update: function (event, ui) {
      // Show the popup when order changes
      orderChangesPopup.addClass("visible");
      $("body").addClass("has-sticky-save");
    },
  });

  // Handle save order button click in popup
  orderChangesPopup.find("button.button-primary").on("click", function () {
    const $button = $(this);
    $button.prop("disabled", true).text("Saving...");

    // Get all deal cards and their new positions
    const orderUpdates = [];
    $(".honey-hole-deals-grid").each(function () {
      const $grid = $(this);
      const $cards = $grid.find(".honey-hole-deal-card");

      $cards.each(function (index) {
        const dealId = $(this).data("deal-id");
        orderUpdates.push({
          deal_id: dealId,
          new_order: index + 1,
        });
      });
    });

    // Send AJAX request to update all orders
    $.ajax({
      url: honeyHoleAdmin.ajaxurl,
      type: "POST",
      data: {
        action: "honey_hole_update_order",
        updates: orderUpdates,
        nonce: honeyHoleAdmin.order_nonce,
      },
      success: function (response) {
        if (response.success) {
          showNotification("Deal order saved successfully", 3000);
          orderChangesPopup.removeClass("visible");
          $("body").removeClass("has-sticky-save");
        } else {
          showNotification("Error saving deal order: " + response.data, 5000);
        }
      },
      error: function () {
        showNotification("Error saving deal order. Please try again.", 5000);
      },
      complete: function () {
        $button.prop("disabled", false).text("Save Changes");
      },
    });
  });

  // Handle cancel button for order changes popup
  orderChangesPopup.find("button.cancel").on("click", function () {
    // Revert the order changes by reloading the page
    window.location.reload();
  });

  // Function to update deal counts
  function updateDealCounts() {
    const totalDeals = document.querySelectorAll(
      ".honey-hole-deal-card"
    ).length;
    const hiddenDeals = document.querySelectorAll(
      ".visibility-checkbox:not(:checked)"
    ).length;

    // Update the counts in the UI if they exist
    const activeCountElement = document.querySelector(
      ".stat-box:nth-child(1) p"
    );
    const inactiveCountElement = document.querySelector(
      ".stat-box:nth-child(2) p"
    );

    if (activeCountElement) {
      activeCountElement.textContent = totalDeals - hiddenDeals;
    }
    if (inactiveCountElement) {
      inactiveCountElement.textContent = hiddenDeals;
    }
  }
});
