import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FormPage from './components/Form';
import RenderedOutput from './components/RenderedOutput';
import './styles/main.scss';

const App = () => {
  return (
    <Router>
      <div>
        <h1>My Vite App</h1>
        {/* Commenting out the navigation links */}
        {/* <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/form">Form</Link></li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/output" element={<RenderedOutput />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
