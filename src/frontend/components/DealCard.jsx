const DealCard = ({ deal }) => {
  const {
    title,
    image_url,
    original_price,
    sales_price,
    rating,
    product_url,
    promo_code,
    seller,
    categories,
    background_image,
    description,
  } = deal;

  const discount_percentage = Math.round(
    ((original_price - sales_price) / original_price) * 100
  );

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getDiscountClass = (percentage) => {
    if (percentage >= 60) return "red-discount";
    if (percentage >= 50) return "orange-discount";
    if (percentage >= 40) return "yellow-discount";
    if (percentage >= 30) return "blue-discount";
    return "green-discount";
  };

  const getDealMeter = (percentage) => {
    if (percentage >= 60)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Red-Deal-O-Meter.png";
    if (percentage >= 50)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Orange-Deal-O-Meter.png";
    if (percentage >= 40)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Yellow-Deal-O-Meter.png";
    if (percentage >= 30)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Blue-Deal-O-Meter.png";
    return "https://outdoorempire.com/wp-content/uploads/2025/07/Green-Deal-O-Meter.png";
  };

  const getPriceClass = (percentage) => {
    if (percentage >= 60) return "red-deal";
    if (percentage >= 50) return "orange-deal";
    if (percentage >= 40) return "yellow-deal";
    if (percentage >= 30) return "blue-deal";
    return "green-deal";
  };

  const star = <span className="star">★</span>;

  if (categories[0].name === "Big Sale") {
    return (
      <div
        className="deal-card big-sale"
        style={{ backgroundImage: `url(${background_image})` }}
      >
        {promo_code ? (
          <div className="hh-promo-code-wrapper">
            <p>Use Code {promo_code}</p>
          </div>
        ) : (
          <></>
        )}
        <a
          href={product_url}
          className="deal-card-link big-sale-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="big-sale-title-wrapper">
            <h4 className="big-sale-title">{title}</h4>
          </div>
          <div className="deal-image-wrapper big-sale-img">
            {image_url ? (
              <div
                className="deal-image"
                style={{ backgroundImage: `url(${image_url})` }}
              ></div>
            ) : (
              // <img src={image_url} alt={title} />
              <div className="no-image">No Image Available</div>
            )}
          </div>
          <div className="big-sale-title-wrapper">
            <h4 className="big-sale-description">{description}</h4>
          </div>
        </a>
      </div>
    );
  }
  return (
    <div className="deal-card">
      {promo_code ? (
        <div className="hh-promo-code-wrapper">
          <p>Use Code {promo_code}</p>
        </div>
      ) : (
        <></>
      )}
      <a
        href={product_url}
        className="deal-card-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="deal-o-meter-card">
          <img
            className="deal-o-meter-card-img"
            src={getDealMeter(discount_percentage)}
            alt=""
          />
        </div>
        <div className="deal-image-wrapper">
          {image_url ? (
            <div
              className="deal-image"
              style={{ backgroundImage: `url(${image_url})` }}
            ></div>
          ) : (
            // <img src={image_url} alt={title} />
            <div className="no-image">No Image Available</div>
          )}
        </div>
        <div className="deal-content">
          <h3 className="deal-title">{title}</h3>
          <div className="deal-pricing">
            <span
              className={`sales-price ${getPriceClass(discount_percentage)}`}
            >
              {USDollar.format(sales_price)}
            </span>
            {original_price && (
              <span className="original-price">
                {USDollar.format(original_price)}
              </span>
            )}
            {discount_percentage > 0 && (
              <span
                className={`discount ${getDiscountClass(discount_percentage)}`}
              >
                {discount_percentage}% OFF
              </span>
            )}
          </div>
          <div className="deal-seller">{seller}</div>
        </div>
      </a>
    </div>
  );
};

export default DealCard;
