import React, { useState } from "react";
import TopSection from "../components/top-section";
import Navbar from "../components/Navbar";
import "../App.css";
import DatePicker from "react-date-picker";

const SIPCalculator = () => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [company, setcompany] = useState("");
  const [amount, setamount] = useState();

  const sipForm = () => {
    return (
      <div className="sip-form text-left">
        <label className="sip-label" htmlFor="sip-amount">
          Select Company <span className="text-danger">*</span>
        </label>
        <select
          onChange={(e) => setcompany(e.target.value)}
          class="form-control mb-2"
          aria-label="Default select example"
          value={company}
        >
          <option selected>Select the company</option>
          <option value="company1">Company-1</option>
          <option value="company2">Company-2</option>
          <option value="company3">Company-3</option>
          <option value="company4">Company-4</option>
          <option value="company5">Company-5</option>
        </select>
        <label className="sip-label" htmlFor="sip-amount">
          SIP Amount (Monthly) <span className="text-danger">*</span>
        </label>
        <input
          className="form-control mb-2 sip-input"
          type="tel"
          name="amount"
          id="sip-amount"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4" className="sip-label">
              Start Date
            </label>
            <br />
            <DatePicker
              maxDate={new Date()}
              onChange={setstartDate}
              value={startDate}
              required={true}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4" className="sip-label">
              End Date
            </label>
            <br />
            <DatePicker
              onChange={setendDate}
              value={endDate}
              maxDate={new Date()}
              required={true}
            />
          </div>
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
        </div>
      </div>
      <div className="graph-div">
        <div></div>
      </div>
    </div>
  );
};

export default SIPCalculator;
