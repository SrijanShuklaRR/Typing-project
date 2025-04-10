import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Application Entry Point
 * 
 * This file is the entry point for the React application.
 * It renders the App component into the DOM element with id 'root'.
 */

// Get the root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React's StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 