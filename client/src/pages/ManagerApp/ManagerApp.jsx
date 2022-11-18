import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Line } from "react-chartjs-2";
import "./ManagerApp.css";
import ManagerConfig from "../../components/ManagerConfig/ManagerConfig";

export default function ManagerApp() {
  const missHittRateData = {
    labels: ["miss rate", "hit rate"],
    datasets: [
      {
        label: "ratio is",
        data: [50, 50],
        backgroundColor: ["red", "green"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const NO_OF_WORKERS = {
    labels: ["#-of-worker", "none"],
    datasets: [
      {
        label: "# of workers",
        data: [30, 70],
        backgroundColor: ["blue", "white"],
        borderColor: ["rgba(75, 192, 192, 1)", "#8eaaaa"],
        borderWidth: 1,
      },
    ],
  };
  const NO_OF_ITEM_IN_CACHE = {
    labels: ["#-of-item-in-cache", "none"],
    datasets: [
      {
        label: "# of workers",
        data: [70, 30],
        backgroundColor: ["#4e4946", "white"],
        borderColor: ["#464e4e", "#8eaaaa"],
        borderWidth: 1,
      },
    ],
  };
  const SIZE_OF_CACHE = {
    labels: ["#-of-item-in-cache", "none"],
    datasets: [
      {
        label: "# of workers",
        data: [40, 60],
        backgroundColor: ["#cc641f", "white"],
        borderColor: ["rgba(75, 192, 192, 1)", "#8eaaaa"],
        borderWidth: 1,
      },
    ],
  };

  const LINE_CHART_1 = {
    labels: [
      "miss rate",
      "hit rate",
      "#-of-worker",
      "#-of-item-in-cache",
      "size-of-cache",
    ],
    datasets: [
      {
        label: "data for last 30 minutes",
        data: [30, 70, 50, 90, 20],
        backgroundColor: ["red", "green", "blue", "#4e4946", "#cc641f"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const LINE_CHART_2 = {
    labels: [
      "miss rate",
      "hit rate",
      "#-of-worker",
      "#-of-item-in-cache",
      "size-of-cache",
    ],
    datasets: [
      {
        label: "data for last 30 minutes at 1 minute",
        data: [30 / 30, 70 / 30, 50 / 30, 90 / 30, 20 / 30],
        backgroundColor: ["red", "green", "blue", "#4e4946", "#cc641f"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="charts">
        <div
          className="pie__charts"
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <div
            className="pie__chart"
            style={{ width: "100px", height: "200px" }}
          >
            <Pie
              data={missHittRateData}
              lineWidth={10}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div
            className="pie__chart"
            style={{ width: "100px", height: "200px" }}
          >
            <Pie
              data={NO_OF_WORKERS}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div
            className="pie__chart"
            style={{ width: "100px", height: "200px" }}
          >
            <Pie
              data={NO_OF_ITEM_IN_CACHE}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div
            className="pie__chart"
            style={{ width: "100px", height: "200px" }}
          >
            <Pie
              data={SIZE_OF_CACHE}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="line__chart" style={{ width: "50%", margin: "0 auto" }}>
          <p>data for last 30 minutes</p>
          <Line data={LINE_CHART_1} />
        </div>
        <div
          className="line__chart"
          style={{ width: "50%", margin: "8rem auto 0" }}
        >
          <p>data for last 30 minutes at 1 minute granularity</p>
          <Line data={LINE_CHART_2} />
        </div>
      </div>
      <ManagerConfig />
    </>
  );
}
