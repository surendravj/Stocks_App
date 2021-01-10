import React, { useState } from "react";
import TopSection from "../components/top-section";
import Navbar from "../components/Navbar";
import "../App.css";
import Test from "../test";

const SIPCalculator = () => {
  const [values, setvalues] = useState({
    amount: 0,
    period: 0,
    returns: 0,
  });

  const onHandleChange = (name) => (e) => {
    setvalues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  const sipForm = () => {
    return (
      <div className="sip-form text-left">
        <label className="sip-label" htmlFor="sip-amount">
          SIP Amount (Monthly) <span className="text-danger">*</span>
        </label>
        <input
          className="form-control mb-4 sip-input"
          type="tel"
          name="amount"
          id="sip-amount"
          value={values.amount}
          onChange={onHandleChange("amount")}
        />
        <label className="sip-label" htmlFor="sip-duration">
          Investment Duration (Years) <span className="text-danger">*</span>
        </label>
        <input
          className="form-control mb-4"
          type="tel"
          name="period"
          id="sip-duration"
          value={values.period}
          onChange={onHandleChange("period")}
        />

        <label for="customRange1" className="sip-label">
          Expected Annual Returns (%) <span className="text-danger">*</span>
        </label>
        <div className="stats-header">
          <input
            className="ml-2"
            min="1"
            max="30"
            value={values.returns}
            step="1"
            type="range"
            class="custom-range"
            id="customRange1"
            name="returns"
            onChange={onHandleChange("returns")}
          ></input>
          <p className="ml-3 mr-3 returns-text">{values.returns}%</p>
        </div>
        <div className="text-center">
          <button
            class="btn rounded waves-effect sip-btn"
            style={{ boxShadow: "0px 0px 0px 0px" }}
          >
            Calculate
          </button>
        </div>
      </div>
    );
  };

  const dataShow = () => {
    return (
      <div className="sip-data-holder text-center px-5">
        <div class="text-left">
          <h4 className="sip-header">Details</h4>
        </div>

        <table class="table table-white table-hover">
          <tbody>
            <tr>
              <th className="returns-text" scope="row">
                1
              </th>
              <td className="returns-text">Invested Amount</td>
              <td className="returns-text">Rs.{values.amount}</td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                2
              </th>
              <td className="returns-text">Investment Duration</td>
              <td className="returns-text">{values.period} Years</td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                3
              </th>
              <td className="returns-text">Expected Annual Returns</td>
              <td className="returns-text">{values.returns}%</td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                4
              </th>
              <td className="returns-text">Total money invested</td>
              <td className="returns-text">
                Rs. {values.period * 12 * values.amount}
              </td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                5
              </th>
              <td className="returns-text">Total future amount:</td>
              <td className="returns-text">{values.returns}%</td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                6
              </th>
              <td className="returns-text">Returns Gained:</td>
              <td className="returns-text">{values.returns}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <TopSection />
      <Navbar />
      <hr />
      <div className="container text-center">
        <h2 className="sip-header">
          SIP Calculator -Systematic Investment Plan Calculator Online
        </h2>
        <div className="row mt-5 mb-5">
          <div className="col-md-6 col-sm-8 p-4 sip-div">{sipForm()}</div>
          <div className="col-md-6 col-sm-8 ">{dataShow()}</div>
        </div>
      </div>
      <div className="container">
      <div className=" px-5 text-center col-md-6 offset-md-3">
        <Test />
      </div>
      </div>
    
    </div>
  );
};

export default SIPCalculator;
