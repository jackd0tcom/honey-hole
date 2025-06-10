const DealCard = ({ deal }) => {
    const {
        title,
        image_url,
        original_price,
        sale_price,
        discount_percentage,
        rating,
        affiliate_link
    } = deal;

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

    return (
        <a href={affiliate_link} className="deal-card-link" target="_blank" rel="noopener noreferrer">
            <div className="deal-card">
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
                        {original_price && (
                            <span className="original-price">${original_price}</span>
                        )}
                        <span className={`sales-price ${getPriceClass(discount_percentage)}`}>
                            ${sale_price}
                        </span>
                        {discount_percentage > 0 && (
                            <span className={`discount ${getDiscountClass(discount_percentage)}`}>
                                {discount_percentage}% OFF
                            </span>
                        )}
                    </div>
                    {rating && (
                        <div className="deal-rating">
                            <div className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="rating-value">{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
};

export default DealCard; 