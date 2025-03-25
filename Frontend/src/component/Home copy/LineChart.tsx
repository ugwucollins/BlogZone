// import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
  RadialLinearScale,
} from "chart.js";
import { Getheme } from "../../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineGraph = () => {
  const sampleData = [43, 40, 50, 40, 70, 40, 45, 33, 40, 60, 40, 50, 36];

  const canvasData = {
    datasets: [
      {
        label: "Home",
        borderColor: "navy",
        pointRadius: 0,
        fill: true,
        backgroundColor: "yellow",
        lineTension: 0.4,
        data: sampleData,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        ticks: {
          color: "red",
          font: {
            family: "Nunito",
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        min: 0,
        max: 80,
        ticks: {
          stepSize: 10,
          color: "green",
          font: {
            family: "Nunito",
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const graphStyle = {
    // minHeight: "10rem",
    // maxWidth: "540px",
    width: "100%",
    border: "1px solid #C4C4C4",
    borderRadius: "0.375rem",
    padding: "1.5rem",
  };

  return (
    <div style={graphStyle}>
      <Line id="home" options={options} data={canvasData} />
    </div>
  );
};

export default LineGraph;

export const registerCharts = () => {
  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    RadialLinearScale,
    Filler
  );
};

export const LineChart = () => {
  const { darkMode } = Getheme();

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },

      title: {
        display: true,
        color: darkMode ? "white" : "black",

        text: "Line Chart: Monthly Sales Trend for Products A & B",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const productASales = [120, 135, 125, 145, 160, 150, 170];

  const productBSales = [80, 75, 95, 100, 110, 105, 120, 115];

  const data = {
    labels,

    datasets: [
      {
        label: "Product A Sales",

        data: productASales,

        borderColor: "rgb(255, 99, 132)",

        backgroundColor: "rgba(255, 99, 132)",
      },

      {
        label: "Product B Sales",

        data: productBSales,

        // borderColor: "rgb(53, 162, 235)",
        borderColor: darkMode ? "lightgray" : "rgb(53, 162, 235)",

        backgroundColor: "rgba(53, 162, 235)",
      },
    ],
  };

  registerCharts();
  return (
    <>
      {/* <div className="flex justify-center flex-row items-center bg-[#f4f4f4]">
        <div className="p-10 shadow-md m-10"></div>
      </div> */}
      <div className="w-full h-auto text-black dark:text-white flex justify-center flex-row items-center">
        <Line options={options} data={data} />
      </div>
    </>
  );
};
