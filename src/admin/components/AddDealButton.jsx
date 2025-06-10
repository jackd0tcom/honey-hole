import React from 'react';

const AddDealButton = () => {
    const handleClick = () => {
        window.location.href = '/wp-admin/admin.php?page=honey-hole-add-deal';
    };

    return (
        <div className='honey-hole-actions'>
                    <button
            className="hh-add-deal-button button button-primary"
            onClick={handleClick}
        >
            Add Deal
        </button>
        </div>
    );
};

export default AddDealButton; 