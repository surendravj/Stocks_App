import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TopSection from "./components/top-section";
import { Card } from "ui-neumorphism";
// import Test from "./test";

const App = () => {
  const stats = () => {
    return (
      <div className="container mt-4 px-5">
        <div className="stats-header px-5">
          <div className="stocks">All Stocks</div>
        </div>
        <div className="stats-card p-5">
          <div className="row">
            <div className="col-md-5 col-sm-12 mr-5 text-center ">
              <Card className="bg-white rounded card" elevation={1}>
                <div className="card-holder text-center px-3 py-2">
                  <div className="Cardheader stats-header mt-2">
                    <p className="stats-text">NIFTY</p>
                    <p className="stats-text">14.354.65</p>
                  </div>
                  <div className="CardFooter stats-header">
                    <p className="stats-text2">NSE</p>
                    <p className="stats-text3">21.00 (1.42%)</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-md-5 col-sm-12">
              <Card className="bg-white rounded card" elevation={1}>
                <div className="card-holder text-center px-3 py-2">
                  <div className="Cardheader stats-header mt-2">
                    <p className="stats-text">SENSEX</p>
                    <p className="stats-text">48,782.51</p>
                  </div>
                  <div className="CardFooter stats-header">
                    <p className="stats-text2">BSE</p>
                    <p className="stats-text3">689.19 (1.44%)</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <TopSection />
      <Navbar />
      <hr />
      <div className="container px-5 py-2">{stats()}</div>
    </div>
  );
};

export default App;
