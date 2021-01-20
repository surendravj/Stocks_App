import React, { useState } from "react";
import TopSection from "../components/top-section";
import Navbar from "../components/Navbar";
import "../App.css";
import data from "../demo.json";
import Chart from "react-apexcharts";
import { numberWithCommas } from "../util/util";

const SIPCalculator = () => {
  const years = [
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];

  // const months = [
  //   {
  //     month: "Jan",
  //     num: 1,
  //   },
  //   {
  //     month: "Feb",
  //     num: 2,
  //   },
  //   {
  //     month: "Mar",
  //     num: 3,
  //   },
  //   {
  //     month: "Apr",
  //     num: 4,
  //   },
  //   {
  //     month: "May",
  //     num: 5,
  //   },
  //   {
  //     month: "Jun",
  //     num: 6,
  //   },
  //   {
  //     month: "Jul",
  //     num: 7,
  //   },
  //   {
  //     month: "Aug",
  //     num: 8,
  //   },
  //   {
  //     month: "Sept",
  //     num: 9,
  //   },
  //   {
  //     month: "Oct",
  //     num: 10,
  //   },
  //   {
  //     month: "Nov",
  //     num: 11,
  //   },
  //   {
  //     month: "Dec",
  //     num: 12,
  //   },
  // ];

  const [values, setvalues] = useState({
    amount: 0,
    period: 0,
    returns: 0,
    startYear: 0,
    endYear: 0,
    result: 0,
  });

  const [isCalculated, setisCalculated] = useState(false);
  const [buttonText, setbuttonText] = useState("Calculate");

  const [graph, setgraph] = useState({
    xAxis: [],
    yAxis: [],
    invested: [],
  });

  const onHandleChange = (name) => (e) => {
    setvalues({ ...values, [name]: e.target.value });
    setisCalculated(false);
  };

  const calculateSIP = (e) => {
    e.preventDefault();
    var IReturns = values.returns / 100 / 12;
    var n = values.endYear - values.startYear;
    var finalAmount =
      parseInt(values.amount) *
      [Math.pow(IReturns + 1, n * 12) - 1] *
      ((IReturns + 1) / IReturns);
    setvalues({ ...values, result: Math.ceil(finalAmount) });
    setbuttonText("Calculating...");
    var x = [];
    var y = [];
    var k = [];
    for (var i = 0; i < data.length; i++) {
      var year = new Date(data[i].Date).getFullYear();
      if (
        parseInt(values.startYear) <= year &&
        parseInt(values.endYear) >= year
      ) {
        var date = new Date(JSON.parse(JSON.stringify(data[i].Date))).getTime();
        x.push(date);
        y.push(JSON.parse(JSON.stringify(data[i].gained)));
        k.push(JSON.parse(JSON.stringify(data[i].invested)));
      }
    }
    setgraph({ ...graph, xAxis: x, yAxis: y, invested: k });
    setbuttonText("Calculate");
    setisCalculated(true);
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
        <div class="row mb-4">
          <div class="col">
            <label for="startyear" className="sip-label">
              Start Year <span className="text-danger">*</span>
            </label>
            <select
              onChange={onHandleChange("startYear")}
              class="custom-select"
            >
              <option value={null} selected>
                Select Start Year
              </option>
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
          </div>
          <div class="col">
            <label for="endyear" className="sip-label">
              End Year<span className="text-danger">*</span>
            </label>
            <select onChange={onHandleChange("endYear")} class="custom-select">
              <option value={null} selected>
                Select the end year
              </option>
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        {/* <div class="row mb-4">
          <div class="col">
            <label for="startmonth" className="sip-label">
              Start Month <span className="text-danger">*</span>
            </label>
            <select
              onChange={onHandleChange("startMonth")}
              class="custom-select"
            >
              <option value={null} selected>
                Select Start Year
              </option>
              {months.map((month) => {
                return <option value={month.num}>{month.month}</option>;
              })}
            </select>
          </div>
          <div class="col">
            <label for="endmonth" className="sip-label">
              End Month<span className="text-danger">*</span>
            </label>
            <select onChange={onHandleChange("endMonth")} class="custom-select">
              <option value={null} selected>
                Select the end month
              </option>
              {months.map((month) => {
                return <option value={month.num}>{month.month}</option>;
              })}
            </select>
          </div>
        </div> */}

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
            onClick={calculateSIP}
          >
            {buttonText}
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
              <td className="returns-text">
                Rs.{numberWithCommas(values.amount)}
              </td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                2
              </th>
              <td className="returns-text">Investment Duration</td>
              <td className="returns-text">
                {isCalculated?values.endYear - values.startYear:0} Years
              </td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                3
              </th>
              <td className="returns-text">Expected Returns Rate</td>
              <td className="returns-text">{values.returns}%</td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                4
              </th>
              <td className="returns-text">Total money invested</td>
              <td className="returns-text">
                Rs.{" "}
                {isCalculated?numberWithCommas(
                  (values.endYear - values.startYear) * 12 * values.amount
                ):0}
              </td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                5
              </th>
              <td className="returns-text">Total future amount:</td>
              <td className="returns-text">
                Rs. {isCalculated?numberWithCommas(values.result):0}
              </td>
            </tr>
            <tr>
              <th className="returns-text" scope="row">
                6
              </th>
              <td className="returns-text">Returns Gained:</td>
              <td className="returns-text">
                Rs.{" "}
                {isCalculated?numberWithCommas(
                  values.result -
                    (values.endYear - values.startYear) * 12 * values.amount
                ):0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const options = {
    chart: {
      id: "apexchart-example",
      zoom: false,
      tools: false,
    },
    xaxis: {
      categories: graph.xAxis,
      type: "datetime",
    },
  };

  const series = [
    {
      name: "Invested Amount",
      type: "area",
      data: graph.yAxis,
    },
    {
      name: "Gained Amount",
      type: "line",
      data: graph.invested,
    },
  ];

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
      <div className="graph-div">
        {isCalculated ? (
          <div className="center">
            <Chart options={options} series={series} width="600px" />
          </div>
        ) : null}
        <div></div>
      </div>
    </div>
  );
};

export default SIPCalculator;
