const API_BASE = '/wp-json/honey-hole/v1';

export const fetchDeals = async (category = 'all', search = '') => {
    const params = new URLSearchParams();
    if (category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const response = await fetch(`${API_BASE}/deals?${params.toString()}`, {
        headers: {
            'X-WP-Nonce': window.honeyHoleAdmin.nonce
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch deals');
    }

    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE}/categories`, {
        headers: {
            'X-WP-Nonce': window.honeyHoleAdmin.nonce
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    return response.json();
};

export const updateDealVisibility = async (dealId, visibility) => {
    const response = await fetch(`${API_BASE}/deals/${dealId}/visibility`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.honeyHoleAdmin.nonce
        },
        body: JSON.stringify({ visibility })
    });

    if (!response.ok) {
        throw new Error('Failed to update deal visibility');
    }

    return response.json();
};

export const deleteDeal = async (dealId) => {
    const response = await fetch(`${API_BASE}/deals/${dealId}`, {
        method: 'DELETE',
        headers: {
            'X-WP-Nonce': window.honeyHoleAdmin.nonce
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete deal');
    }

    return response.json();
}; 