const DealCard = ({ deal }) => {
    const {
        title,
        image_url,
        original_price,
        sales_price,
        rating,
        product_url
    } = deal;

    const discount_percentage = Math.round(((original_price - sales_price) / original_price) * 100);

    const getDiscountClass = (percentage) => {
        if (percentage >= 50) return 'discount-high';
        if (percentage >= 30) return 'discount-medium';
        return 'discount-low';
    };

    const getPriceClass = (percentage) => {
        if (percentage >= 50) return 'sales-price-high';
        if (percentage >= 30) return 'sales-price-medium';
        return 'sales-price-low';
    };

    const star = <span className="star">★</span>

    return (
            <div className="deal-card">
                <a href={product_url} className="deal-card-link" target="_blank" rel="noopener noreferrer">
                <div className="deal-image">
                    {image_url ? (
                        <img src={image_url} alt={title} />
                    ) : (
                        <div className="no-image">No Image Available</div>
                    )}
                </div>
                <div className="deal-content">
                    <h3 className="deal-title">{title}</h3>
                    <div className="deal-pricing">
                        <span className={`sales-price ${getPriceClass(discount_percentage)}`}>
                                ${sales_price}
                            </span>
                        {original_price && (
                            <span className="original-price">${original_price}</span>
                        )}
                        {discount_percentage > 0 && (
                            <span className={`discount ${getDiscountClass(discount_percentage)}`}>
                                {discount_percentage}% OFF
                            </span>
                        )}
                    </div>
                    <div className="deal-rating">
                        <div className="rating-stars">
                            {Array.from({length: 5}, (_, i) => (
                                <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="rating-value">{rating}.0</span>
                    </div>
                </div>
                </a>
            </div>
    );
};

export default DealCard; 