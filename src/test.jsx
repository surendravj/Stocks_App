import React from "react";
import Chart from "react-apexcharts";

const Test = () => {
  const options = {
    chart: {
      id: "apexchart-example",
      zoom: false,
      menu: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    fill: {
      type: 'gradient'
    },
    xaxis: {
      categories: [
        new Date("2018-02-12").getTime(),
        new Date("2018-02-24").getTime(),
        new Date("2018-02-25").getTime(),
        new Date("2018-03-02").getTime(),
        new Date("2018-03-12").getTime(),
        new Date("2018-03-18").getTime(),
      ],
      type: "datetime",
    },
    markers: {
      size: 4,
    },
  };

  const series = [
    {
      name: "Invested Amount",
      type: "line",
      data: [30, 40, 50, 60, 70, 80],
    },
    {
      name: "Gained Amount",
      type: "line",
      data: [60, 80, 100, 120, 140, 160],
    },
  ];

  return (
    <div className="center">
      <Chart options={options} series={series} width="500px" />
    </div>
  );
};

export default Test;
