const Hero = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div class="honey-hole-hero">
        <div class="honey-hole-hero-content">
            <div class="honey-hole-hero-image">
                <img src="https://outdoorempire.com/wp-content/uploads/2025/02/the-honey-hole-transparent.png" alt=""/></div>
            <div class="honey-hole-hero-copy">
                <h2>We Find the Best Outdoor Gear Deals to Save You Time and Money!</h2>
                <p>We manually crawl catalogs, ads, and websites of top outdoor gear brands and retailers in search of discounted outdoor gear to create this curated list that will save you hours of shopping around.
                </p>
                <p>We update this page all the time with the best deals we find on gear for camping, hiking, backpacking, hunting, fishing, and more.
                </p>
                <p>Bookmark this page and check back often!</p>
                <p>Deal prices are valid at time of posting, but could change at any moment.</p>
                <p id="honey-hole-updated">Last Updated: {formattedDate}</p>
            </div>
        </div>
    </div>
    );
};

export default Hero;