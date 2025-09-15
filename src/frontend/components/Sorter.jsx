const Sorter = ({ sort, setSort }) => {
  return (
    <>
      <div className="sorter-wrapper">
        <select
          name="sort"
          id="sort"
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
          <option value="savings">Savings % Off</option>
          <option value="rating">Deal Rating</option>
        </select>
      </div>
    </>
  );
};

export default Sorter;
