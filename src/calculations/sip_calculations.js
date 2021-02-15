import { monthCalculator, dateFinder } from "../util/util";
import data from "../data.json";

var month = 0;
var investedAmount = [];
var dates = [];
var units = [];
var prices = [];
var investedMoney = 0;
var currentValue = 0;
var absoluteReturns = 0;
var companyReturns = [];

export const onCalculatSubmit = async (dateFrom, dateTo, amount, company) => {
  dates = [];
  units = [];
  prices = [];
  investedAmount = [];
  companyReturns = [];
  currentValue = 0;
  absoluteReturns = 0;
  var x = amount / 1000;
  month = monthCalculator(dateFrom, dateTo);
  for (var i = 1; i <= month; i++) {
    var value = amount * i;
    investedAmount.push(value);
  }
  investedMoney = investedAmount[investedAmount.length - 1];
  for (var k = 0; k < data.length; k++) {
    var check = new Date(JSON.parse(JSON.stringify(data[k].Date)));
    var cReturn = JSON.parse(JSON.stringify(data[k][`R${company}`]));
    companyReturns.push(Math.ceil(cReturn * x));
    if (dateFinder(new Date(dateFrom), new Date(dateTo), check)) {
      var unit = JSON.parse(JSON.stringify(data[k][`U${company}`]));
      var price = JSON.parse(JSON.stringify(data[k][`${company}`]));
      dates.push(new Date(check).getTime());
      units.push(unit);
      prices.push(price);
    }
  }
  var unitsSum = 0;
  for (var m = 0; m < units.length; m++) {
    // calculating the units accumalated here as unitssum
    unitsSum = unitsSum + parseFloat(units[m]);
  }
  //calculating the currentvalue by multiplying with the today stock price
  currentValue = unitsSum * data[data.length - 1][`${company}`];
  // calculating the obsolute returns 
  absoluteReturns = ((currentValue - investedMoney) / investedMoney) * 100;
};

export const calculatedValues = () => {
  return {
    month,
    units,
    prices,
    investedAmount,
    dates,
    investedMoney,
    companyReturns,
    currentValue: Math.floor(currentValue),
    returns: Math.floor(absoluteReturns),
  };
};
