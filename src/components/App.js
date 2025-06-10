import { render, useState, useEffect } from '@wordpress/element';
import DealGrid from './DealGrid';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import Hero from './Hero';

const App = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        sortBy: 'date',
        searchQuery: ''
    });

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            setLoading(true);
            const response = await fetch(honeyHoleData.apiUrl, {
                headers: {
                    'X-WP-Nonce': honeyHoleData.nonce
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch deals');
            }

            const data = await response.json();
            setDeals(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="honey-hole-deals">
            <Hero />
            <div className="deals-filter">
                <FilterBar 
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>
            {error && <div className="honey-hole-error">{error}</div>}
            {loading ? (
                <div className="honey-hole-loading">Loading deals...</div>
            ) : (
                <DealGrid deals={deals} />
            )}
        </div>
    );
};

export default App; 