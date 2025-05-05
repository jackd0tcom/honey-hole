import { render } from '@wordpress/element';
import App from './components/App.jsx';

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('honey-hole-app');
    if (container) {
        render(<App />, container);
    }
}); 