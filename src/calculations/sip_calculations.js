import { monthCalculator, dateFinder } from "../util/util";
import data from "../data.json";

var month = 0;
var investedAmount = [];
var dates = [];
var units=[];
var prices=[];


export const onCalculatSubmit = async(dateFrom, dateTo, amount,company) => {
  month = monthCalculator(dateFrom, dateTo);
  for (var i = 1; i <= month; i++) {
    var value = amount * i;
    investedAmount.push(value);
  }
  for (var k = 0; k < data.length; k++) {
    var check = new Date(JSON.parse(JSON.stringify(data[k].Date)));
    if (dateFinder(new Date(dateFrom), new Date(dateTo), check)) {
      var unit=JSON.parse(JSON.stringify(data[k][`U${company}`]));
      var price=JSON.parse(JSON.stringify(data[k][`${company}`]));
      dates.push(new Date(check));
      units.push(unit);
      prices.push(price);
    }
  }
};

export const calculatedValues = () => {
  return {
    units,
    prices,
    investedAmount,
    dates
  };
};
