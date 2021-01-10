const csv = require("csv-parser");
const fs = require("fs");

var data = [];

fs.createReadStream("./src/Trail_1.csv")
  .pipe(csv())
  .on("data", (row) => {
    data.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    fs.writeFileSync("demo.json", JSON.stringify(data));
  });
