import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
// import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import Geocode from "react-geocode";
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { API } from "./googleApi";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Chart from "react-apexcharts";

import Header from "components/Headers/Header.js";
Geocode.setApiKey(API);
Geocode.enableDebug();

const Index = (props) => {
  const [busesData, setBusesData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [assignedBusses, setAssignedBusses] = useState([]);
  const [editBus, setEditBus] = useState("");
  const [editStudent, setEditStudent] = useState("");
  const [editDriver, setEditDriver] = useState("");
  const [busStartTime, setBusStartTime] = useState("");
  const [busEndTime, setBusEndTime] = useState("");
  useEffect(() => {
    const fetchDash = async () => {
      const { data } = await axios.get("http://localhost:3001/dashtics/buses");
      const students = await axios.get(
        "http://localhost:3001/dashtics/students"
      );
      const drivers = await axios.get("http://localhost:3001/dashtics/drivers");
      console.log(drivers);
      setBusesData(data?.busesData);
      setStudentsData(students?.data?.studentsData);
      setDriversData(drivers?.data);

      setAssignedBusses(
        drivers.data.filter((b, i) => {
          return b.bussNo !== "null" && b.bussNo !== null;
        })
      );

      console.log("ALLL SET", assignedBusses);
    };

    fetchDash();
  }, []);

  // console.log(busesData)
const options = {
  series: [busesData.length,studentsData.length, driversData.length],
  labels: ['Total Students', 'Total Buses', 'TotalDrivers'],
  chart: {
    type: 'donut'
  },
}


  return (
    <>
      <Header />

      <div class="card">
        {/* <!-- Card header --> */}
        <div class="card-header">
          {/* <!-- Title --> */}

          <h5 class="h3 mb-0">Statistics</h5>
        </div>
        {/* <!-- Card body --> */}
        <div class="card-body">
          <div class="chart">
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={options}
                    series={options.series}
                    type="pie"
                    width="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page content */}
    </>
  );
  }

export default Index;
