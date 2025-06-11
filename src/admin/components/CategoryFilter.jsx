import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="hh-admin-filter-bar">
            <div className="hh-categories">
            <button
                className={`button ${selectedCategory === 'all-deals' ? 'active' : ''}`}
                onClick={() => onCategoryChange('all-deals')}
            >
                All Deals
            </button>
            {categories.map(category => (
                <button
                    key={category.id}
                    className={`button ${selectedCategory === category.slug ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category.slug)}
                >
                    {category.name}
                </button>
            ))}
            </div>
        </div>
    );
};

export default CategoryFilter; 