import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './components/AdminApp';
import './styles/admin.css';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('honey-hole-admin-root');
    if (container) {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <AdminApp />
            </React.StrictMode>
        );
    }
}); 