# Big Sale Category Feature

## Overview

The Honey Hole plugin now supports a special "Big Sale" category that displays deals with a completely different structure than standard deals. This feature allows for more prominent, visually striking deal presentations.

## How It Works

### 1. **Dynamic Form Fields**
- **Add Deal Page**: When creating a new deal, users first select a category
- **Big Sale Selection**: If "Big Sale" is selected, only relevant fields are shown:
  - Title
  - Description (required)
  - Background Image URL (optional)
  - Common fields (Deal URL, Promo Code, Tags, Deal Image)
- **Standard Deal Selection**: If any other category is selected, standard fields are shown:
  - Title
  - Original Price
  - Sales Price
  - Rating
  - Seller
  - Common fields

### 2. **Field Structure**

#### Big Sale Deals
- `deal_title` - The deal title
- `deal_description` - Detailed description (required)
- `deal_background_image` - Background image URL (optional)
- `deal_url` - Product URL
- `deal_image_url` - Main product image
- `deal_promo_code` - Promotional code (optional)
- `deal_tags` - Associated tags

#### Standard Deals
- `deal_title` - The deal title
- `deal_original_price` - Original price
- `deal_sales_price` - Sale price
- `deal_rating` - Deal rating (0-5)
- `deal_seller` - Seller information
- `deal_url` - Product URL
- `deal_image_url` - Main product image
- `deal_promo_code` - Promotional code (optional)
- `deal_tags` - Associated tags

### 3. **Frontend Display**

The frontend automatically detects Big Sale deals and renders them differently:
- Uses the `DealCard.jsx` component with conditional rendering
- Big Sale deals show: title, description, image, and background image
- Standard deals show: title, pricing, rating, seller, and image

### 4. **REST API**

The REST API endpoint `/honey-hole/v1/deals` now includes:
- `description` field for Big Sale deals
- `background_image` field for Big Sale deals
- All existing fields remain unchanged

## Technical Implementation

### Backend Changes
1. **Meta Boxes**: Updated to show different fields based on category
2. **Form Handlers**: Modified to process different field sets
3. **REST API**: Extended to include new Big Sale fields
4. **Database**: New meta fields added without breaking existing data

### Frontend Changes
1. **React Components**: Updated to handle new data structure
2. **Conditional Rendering**: Different display logic for Big Sale vs standard deals
3. **Styling**: Enhanced CSS for dynamic form sections

## Usage

### For Administrators
1. Go to **Honey Hole > Add New Deal**
2. Select **"Big Sale"** as the category
3. Fill in the Big Sale specific fields
4. Save the deal

### For Developers
The system automatically handles field switching based on the selected category. No additional code is needed to support the feature.

## Benefits

1. **Flexible Deal Types**: Support for both standard and promotional deals
2. **Better UX**: Cleaner forms with only relevant fields
3. **Enhanced Display**: Big Sale deals can have more prominent presentations
4. **Backward Compatible**: Existing deals continue to work unchanged
5. **Extensible**: Easy to add more specialized categories in the future

## Future Enhancements

The dynamic field system can easily be extended to support:
- Additional specialized categories
- Custom field sets per category
- Category-specific validation rules
- Category-specific display templates
