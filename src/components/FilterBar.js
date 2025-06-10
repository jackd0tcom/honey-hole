const FilterBar = ({ filters, onFilterChange }) => {
    const handleCategoryChange = (category) => {
        onFilterChange(prev => ({ ...prev, category }));
    };

    const handleSortChange = (sortBy) => {
        onFilterChange(prev => ({ ...prev, sortBy }));
    };

    return (
        <div className="honey-hole-filter-bar">
            <div className="honey-hole-categories">
                <button
                    className={`honey-hole-category ${filters.category === '' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('')}
                >
                    All
                </button>
                <button
                    className={`honey-hole-category ${filters.category === 'clothing' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('clothing')}
                >
                    Clothing
                </button>
                <button
                    className={`honey-hole-category ${filters.category === 'footwear' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('footwear')}
                >
                    Footwear
                </button>
                <button
                    className={`honey-hole-category ${filters.category === 'equipment' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('equipment')}
                >
                    Equipment
                </button>
            </div>
            <div className="honey-hole-sort">
                <select
                    value={filters.sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="date">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar; 