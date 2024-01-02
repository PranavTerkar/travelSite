// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Travel App</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/destinations">destinations</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
