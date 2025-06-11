import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    // Debounce the search to avoid too many re-renders
    const debouncedSearch = useCallback(
        debounce((value) => {
            onSearch(value);
        }, 300),
        [onSearch]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedSearch(value);
    };

    return (
        <div className="honey-hole-search">
            <input
                type="text"
                className="honey-hole-search-input"
                placeholder="Search deals..."
                value={searchValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar; 