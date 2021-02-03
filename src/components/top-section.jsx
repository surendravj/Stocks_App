import React from "react";
import "../App.css";
import logo from "../assets/logo.svg";
import { Link,useHistory } from "react-router-dom";
import { isAuthenticated } from "../util/db";

const TopSection = () => {
  const history=useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/login')
  };

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
        {isAuthenticated() ? (
          <button onClick={logout} className="text-white btn rounded login-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white btn rounded login-btn">
            Login/Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopSection;
