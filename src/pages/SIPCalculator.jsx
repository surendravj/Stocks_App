import React, { useState } from "react";
import TopSection from "../components/top-section";
import Navbar from "../components/Navbar";
import "../App.css";
import DatePicker from "react-date-picker";
import {
  onCalculatSubmit,
  calculatedValues,
} from "../calculations/sip_calculations";
import data from "../data.json";

const SIPCalculator = () => {
  const [startDate, setstartDate] = useState(
    new Date(JSON.parse(JSON.stringify(data[0]["Date"])))
  );
  const [endDate, setendDate] = useState(
    new Date(JSON.parse(JSON.stringify(data[data.length - 1]["Date"])))
  );
  const [company, setcompany] = useState("");
  const [amount, setamount] = useState();

  const calculate = async () => {
    await onCalculatSubmit(startDate, endDate, amount, company);
    console.log(calculatedValues());
  };

  const sipForm = () => {
    return (
      <div className="sip-form text-left">
        <form action="">
          <label className="sip-label" htmlFor="sip-amount">
            Select Company <span className="text-danger">*</span>
          </label>
          <select
            onChange={(e) => setcompany(e.target.value)}
            class="form-control mb-2"
            aria-label="Default select example"
            value={company}
            required={true}
          >
            <option selected value="">
              Select the company
            </option>
            <option value="A">Company-A</option>
            <option value="B">Company-B</option>
            <option value="C">Company-C</option>
            <option value="D">Company-D</option>
            <option value="E">Company-E</option>
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
            required={true}
          />
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4" className="sip-label">
                Start Date
              </label>
              <br />
              <DatePicker
                maxDate={endDate}
                onChange={setstartDate}
                value={startDate}
                required={true}
                minDate={startDate}
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
                maxDate={endDate}
                required={true}
                minDate={startDate}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              class="btn rounded waves-effect sip-btn"
              style={{ boxShadow: "0px 0px 0px 0px" }}
              onClick={calculate}
              disabled={
                company === "" ||
                company === undefined ||
                amount === "" ||
                amount === undefined
              }
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    );
  };

  const table = () => {
    return (
      <div className="">
        <table class="table table-hover">
          <tbody className="table-text">
            <tr>
              <th scope="row" className="table-text">1</th>
              <td className="table-text">Company Name</td>
              <td className="table-text">Soon</td>
            </tr>
            <tr>
              <th scope="row"  >2</th>
              <td>Investment Duration</td>
              <td>Otto</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Total Current Invested</td>
              <td>Otto</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Current Value</td>
              <td>Otto</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Absolute Returns</td>
              <td>Otto</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Annual Returns</td>
              <td>Otto</td>
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
          <div className="col-md-6 col-sm-8 p-4 sip-div">{table()}</div>
        </div>
      </div>
      <div className="graph-div">
        <div></div>
      </div>
    </div>
  );
};

export default SIPCalculator;
