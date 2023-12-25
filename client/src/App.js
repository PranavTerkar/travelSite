// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import ItineraryComponent from './components/ItineraryComponent';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Auth Component</Link>
            </li>
            <li>
              <Link to="/itinerary">Itinerary Component</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthComponent />} />
          <Route path="/itinerary" element={<ItineraryComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h2>Home</h2>;
};

export default App;
