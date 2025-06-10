const SearchBar = ({ value, onChange }) => {
    return (
        <div className="honey-hole-search">
            <input
                type="text"
                placeholder="Search deals..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="honey-hole-search-input"
            />
        </div>
    );
};

export default SearchBar; 