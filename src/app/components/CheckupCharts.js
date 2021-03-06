import React from "react";
import { Bar, Line } from "react-chartjs-2";

const CheckupCharts = ({ info, fromDate, toDate }) => {
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
        label: "# of Votes",
        data: info.first,

        backgroundColor: "#e67e22",
        borderColor: "#e67e22",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "# of Vote",
        data: info.second,
        backgroundColor: "#10ac84",
        borderColor: "#10ac84",

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
            fontSize: 14,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 14,
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

  console.log(data);
  console.log(info.fromDate);
  console.log(info.toDate);

  return (
    <>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> لاین چارت چک آپ</h4>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">بار چارت چک آپ</h4>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
      {info.fromDate && info.toDate ? (
        <div className="col-md-12 grid-margin">
          <div
            className="card-body"
            style={{ display: "flex", marginRight: "auto" }}
          >
            <p className="" style={{ display: "flex", marginRight: "auto" }}>
              <span>
                Changes From{" "}
                <span style={{ color: "#e67e22" }}>{info.fromDate}</span>
                <span> to </span>
                <span style={{ color: "#10ac84" }}>{info.toDate}</span>
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CheckupCharts;
