export const numberWithCommas = (x) => {
    if (x === undefined || x === null) {
      return null;
    }
    return x.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  };