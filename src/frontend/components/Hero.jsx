const Hero = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="honey-hole-hero-wrapper">
      <div class="honey-hole-hero">
        <div class="honey-hole-hero-content">
          <div class="honey-hole-hero-image">
            <img
              src="https://outdoorempire.com/wp-content/uploads/2025/02/the-honey-hole-transparent.png"
              alt=""
            />
          </div>
          <div class="honey-hole-hero-copy">
            <h2>
              We Find the Best Outdoor Gear Deals to Save You Time and Money!
            </h2>
            <p className="honey-hole-hero-copy-text">
              We manually crawl catalogs, ads, and websites of top outdoor gear
              brands and retailers in search of discounted outdoor gear to
              create this curated list that will save you hours of shopping
              around.
            </p>
            <p className="honey-hole-hero-copy-text">
              Deal prices are valid at time of posting, but could change at any
              moment.
            </p>
            <p id="honey-hole-updated">Last Updated: {formattedDate}</p>
          </div>
        </div>
      </div>
      <div className="hh-banner">
        <a href="https://outdoorempire.com/100k-giveaway-signup/">
          <img
            src="https://outdoorempire.com/wp-content/uploads/2025/11/100k-giveaway-homepage-banner-1.png"
            alt="outdoor empire 100k giveaway banner"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
