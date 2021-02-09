
export const numberWithCommas = (x) => {
  if (x === undefined || x === null) {
    return null;
  }
  return x.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
};

export const monthCalculator = (dateFrom, dateTo) => {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

export const dateFinder=(from,to,check)=>
{
  // console.log(from,to,check);
  if((check.getTime() <= to.getTime() && check.getTime() >= from.getTime()))
  {
    return true;
  }
  return false;
}