/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TopSection from "../components/top-section";
import Navbar from "../components/Navbar";
import "../App.css";
import Chart from "react-apexcharts";
import DatePicker from "react-date-picker";
import {
  onCalculatSubmit,
  calculatedValues,
} from "../calculations/sip_calculations";
import data from "../data.json";
import { numberWithCommas } from "../util/util";

const SIPCalculator = () => {
  const [startDate, setstartDate] = useState(
    new Date(JSON.parse(JSON.stringify(data[0]["Date"])))
  );
  const [endDate, setendDate] = useState(
    new Date(JSON.parse(JSON.stringify(data[data.length - 1]["Date"])))
  );
  const [Sdate, setSdate] = useState(startDate);
  const [Edate, setEdate] = useState(endDate);
  const [company, setcompany] = useState("");
  const [amount, setamount] = useState(1000);
  const [result, setresult] = useState({
    month: 0,
    investedMoney: 0,
    currentValue: 0,
    returns: 0,
    investedAmount: [],
    dates: [],
    Creturns: [],
  });

  const calculate = async () => {
    await onCalculatSubmit(startDate, endDate, amount, company);
    setresult({
      ...result,
      month: calculatedValues().month,
      investedMoney: calculatedValues().investedMoney,
      currentValue: calculatedValues().currentValue,
      returns: calculatedValues().returns,
      investedAmount: calculatedValues().investedAmount,
      dates: calculatedValues().dates,
      Creturns: calculatedValues().companyReturns,
    });
  };

  const series = [
    {
      name: "Invested Amount",
      type: "line",
      data: result.investedAmount,
    },
    {
      name: `${company} Returns`,
      type: "line",
      data: result.Creturns,
    },
  ];

  const options = {
    chart: {
      id: "apexchart-example",
      tools: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: result.dates,
      type: "datetime",
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      show: true
    },
   
  };

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
        <br />
        <div className="stats-header">
          <input
            className="ml-2"
            min="1000"
            max="50000"
            value={amount}
            step="1000"
            type="range"
            class="custom-range"
            id="customRange1"
            name="returns"
            onChange={(e) => setamount(e.target.value)}
          ></input>
          <p className="ml-3 mr-3 returns-text">{amount} </p>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4" className="sip-label">
              Start Date
            </label>
            <br />
            <DatePicker
              maxDate={Edate}
              onChange={setstartDate}
              value={startDate}
              required={true}
              minDate={Sdate}
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
              maxDate={Edate}
              required={true}
              minDate={Sdate}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={calculate}
            class="btn rounded waves-effect sip-btn"
            type="submit"
            style={{ boxShadow: "0px 0px 0px 0px" }}
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
      </div>
    );
  };

  const table = () => {
    return (
      <div className="">
        <table class="table table-hover">
          <tbody className="table-text">
            <tr>
              <th scope="row" className="table-text">
                1
              </th>
              <td className="table-text">Company Name</td>
              <td className="table-text">{company}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Investment Duration</td>
              <td>{result.month} months</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Total Current Invested</td>
              <td>{numberWithCommas(result.investedMoney)}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Current Value</td>
              <td>{numberWithCommas(result.currentValue)}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Absolute Returns</td>
              <td>{numberWithCommas(result.returns)}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Number of times Capital has grown</td>
              <td>{numberWithCommas(Math.floor(result.returns / 100))}</td>
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
      <div className="graph-div col-md-8 offset-md-2">
        {result.investedAmount.length === 0 ? null : (
          <Chart options={options} series={series} type="line" height="350" />
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;
