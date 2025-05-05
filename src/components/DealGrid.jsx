import DealCard from './DealCard.jsx';

const DealGrid = ({ deals }) => {
    if (!deals || deals.length === 0) {
        return <div className="honey-hole-empty">No deals found</div>;
    }

    return (
        <div className="deals-grid">
            {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
            ))}
        </div>
    );
};

export default DealGrid; 