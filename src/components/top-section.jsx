import React from "react";
import "../App.css";
import logo from '../assets/logo.svg';

const TopSection = () => {
  return (
    <div className="container brand-section">
    <div className="brand-actions">
      <img
        src={logo}
        width="50"
        height="40"
        className="img-fluid mr-2"
        alt="logo"
      />
      <h3 className="brand-name">Company</h3>
    </div>
    <div className="brand-actions">
      <input
        placeholder="Search stocks and mutual funds"
        className="form-control mr-3 ml-3 shadow-sm bg-white rounded search-input"
        type="search"
        name=""
        id=""
      />
      <button className="btn rounded login-btn">Login/Register</button>
    </div>
  </div>
  );
};

export default TopSection;
