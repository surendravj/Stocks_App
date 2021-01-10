import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../App.css";

const Navbar = ({ history }) => {
  const changeColor = (history, path) => {
    if (history.location.pathname === path) {
      return {
        color: "#26d7ab",
        borderBottom: "3px solid #26d7ab",
        fontFamily: "Roboto",
        fontWeight: "400",
        display: "flex",
        justifyContent: "space-evenly",
      };
    }
    return null;
  };

  return (
    <div className="container">
      <div className="col-md-8 mt-5">
        <ul className="nav-list">
          <li>
            <Link to="/" style={changeColor(history, "/")} className="nav-link">
              Stocks
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/funds"
              style={changeColor(history, "/funds")}
              className="nav-link"
            >
              Mutual Funds
            </Link>
          </li>
          <li>
            <Link
              to="/Sip"
              style={changeColor(history, "/Sip")}
              className="nav-link"
            >
              Sip Calculator
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/Lumpsum"
              style={changeColor(history, "/Lumpsum")}
              className="nav-link"
            >
              Lumpsum Calculator
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
