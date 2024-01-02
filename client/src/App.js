// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './comonents/Header';
import Home from './comonents/Home';
import Login from './comonents/Login';
import Register from './comonents/Register';
import Destination from './comonents/Destination';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login  />} />
          <Route path="/destinations" element={<Destination  />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
