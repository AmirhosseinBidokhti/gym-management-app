import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { downloadPDF } from "../utils/canvasUtil.js";

const CheckupCharts = ({ info, fromDate, toDate }) => {
  let [chartData, setChartData] = useState(info);

  // setting the prop data to state of current component.
  useEffect(() => {
    setChartData(info);
  }, [info]);

  const data = {
    labels: [
      "وزن",
      "دور سينه",
      "شکم",
      "کمر",
      "باسن",
      "بازو راست",
      "بازو چپ",
      "ران راست",
      "ران چپ",
      "ساق پا راست",
      "ساق پا چپ",
    ],
    datasets: [
      {
        label: "#-",
        data: chartData.first,

        backgroundColor: "#e67e22",
        borderColor: "#e67e23",
        borderWidth: 1,
        fill: false,
        radius: 3,
      },
      {
        label: "#",
        data: chartData.second,
        backgroundColor: "#10ac84",
        borderColor: "#10ac84",
        radius: 3,
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontSize: 16,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 16,
          },
          gridLines: {
            color: "rgba(205, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <>
      {chartData.fromDate && chartData.toDate ? (
        <div className="col-md-12">
          <div
            className="card-body"
            style={{
              display: "flex",
              marginRight: "auto",
              marginBottom: "-25px",
              marginTop: "-28px",
              marginLeft: "-10px",
            }}
          >
            <p className="" style={{ display: "flex", marginRight: "auto" }}>
              <span>
                <button
                  className="btn btn-dark"
                  style={{ marginLeft: "8px", verticalAlign: "center" }}
                  onClick={() => {
                    setChartData([]);
                  }}
                >
                  reset
                </button>
                <button onClick={() => downloadPDF(0)}>print first</button>
                <button onClick={() => downloadPDF(1)}>print second</button>
                Changes From
                <span style={{ color: "#e67e22" }}>{chartData.fromDate}</span>
                <span> to </span>
                <span style={{ color: "#10ac84" }}>{chartData.toDate}</span>
              </span>
            </p>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div
          className="col-md-8 grid-margin stretch-card"
          style={{ margin: "0 auto" }}
        >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> لاین چارت چک آپ</h4>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-md-8 grid-margin stretch-card"
          style={{ margin: "0 auto" }}
        >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">بار چارت چک آپ</h4>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckupCharts;
