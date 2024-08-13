import React from 'react';
import { Link } from 'react-router-dom';
//import '../styles/HomePage.css';
const HomePage = () => {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src="../images/hotel2.jpg" alt="Banner" className="banner-image" />
      </div>
      <div className="button-container">
        <Link to="/register" className="nav-link">
          <button className="home-button">Insert Page</button>
        </Link>
        <Link to="/Query1" className="nav-link">
          <button className="home-button">Query 1</button>
        </Link>
        <Link to="/Query2" className="nav-link">
          <button className="home-button">Query 2</button>
        </Link>
        <Link to="/Query3" className="nav-link">
          <button className="home-button">Query 3</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
