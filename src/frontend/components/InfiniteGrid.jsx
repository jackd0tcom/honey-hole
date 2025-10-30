import DealCard from "./DealCard";

const InfiniteGrid = ({ dealsArray, categories }) => {
  return (
    <div className="deals-grid">
      {dealsArray.map((deal) => (
        <DealCard
          promo={deal.promo_code}
          key={deal.id}
          deal={deal}
          categories={categories}
          seller={deal.seller}
        />
      ))}
    </div>
  );
};
export default InfiniteGrid;
