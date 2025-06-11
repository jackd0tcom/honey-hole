import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './components/styles.css';

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Find the container
    const container = document.getElementById('honey-hole-app');
    
    if (container) {
        // Create a root
        const root = createRoot(container);
        
        // Render the app
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    }
}); 