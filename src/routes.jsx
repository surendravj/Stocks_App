import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Store/store";
import MutualFundPage from "./pages/MutualFundPage";
import SIPCalculator from "./pages/SIPCalculator";
import LumpsumCalculator from "./pages/LumpsumCalculator";
import LoginPage from "./pages/LoginPage";

const Routes = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/funds" component={MutualFundPage} />
          <Route path="/Sip" component={SIPCalculator} />
          <Route path="/Lumpsum" component={LumpsumCalculator} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
