// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';

// Create a root and render the App component
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
