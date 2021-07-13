
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import Geocode from "react-geocode";
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { API } from './googleApi'
import axios from 'axios'
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

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
Geocode.setApiKey(API);
Geocode.enableDebug();

const Index = (props) => {
  const [busesData, setBusesData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [assignedBusses,setAssignedBusses] = useState([]);
  const [editBus, setEditBus] = useState("")
  const [editStudent, setEditStudent] = useState("")
  const [editDriver, setEditDriver] = useState("")
  const [busStartTime,setBusStartTime] = useState("")
  const [busEndTime,setBusEndTime] = useState("")
  useEffect(() => {
    const fetchDash = async () => {
      const { data } = await axios.get("http://localhost:3001/dashtics/buses")
      const students = await axios.get("http://localhost:3001/dashtics/students");
      const drivers = await axios.get("http://localhost:3001/dashtics/drivers");
      console.log(drivers)
      setBusesData(data?.busesData)
      setStudentsData(students?.data?.studentsData)
      setDriversData(drivers?.data);

     setAssignedBusses(drivers.data.filter((b,i)=>{
       return  b.bussNo !== "null" && b.bussNo !== null  
      }))

      console.log("ALLL SET",assignedBusses)
    }

    fetchDash()
  }, [])

  
  // console.log(busesData)
  const updateBusNumber = async () => {
    try {
      await axios.post(`http://localhost:3001/dashtics/buses`, {
        id: editBus,
        busStartTime,
        busEndTime
      })
      setBusesData(busesData.map(bus => {
        return bus._id === editBus ? { ...bus, startingTime: busStartTime,endingTime:busEndTime } : bus
      }))
      setEditBus("")
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateStudentNumber = async (regNumber) => {
    console.log(regNumber)
    console.log(editStudent)
    try {
      await axios.patch(`http://localhost:3001/dashtics/students`, {
        id: editStudent,
        studentRegNumber: regNumber
      })
      setStudentsData(studentsData.map(bus => {
        return bus._id === editStudent ? { ...bus, regNumber } : bus
      }))
      setEditStudent("")
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateBuss = async (bussNumber) => {
    console.log(bussNumber)
    console.log(editDriver)
    try {
      await axios.patch(`http://localhost:3001/dashtics/drivers`, {
        id: editDriver,
        busNo: bussNumber
      })
      setDriversData(driversData.map(driver => {
        return driver._id === editDriver ? { ...driver, bussNo : bussNumber } : driver
      }))
      setAssignedBusses(driversData.filter((b,i)=>{
        return  b.bussNo !== "null" 
       }))
        setEditDriver("")
    }  
    catch (error) {
      console.log(error)
    }
  }

  console.log(assignedBusses,"====> ***")

  const checkBussAvailability = (id) =>{
    setEditDriver(id);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <b>  Buses Data </b>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Bus Number</th>
                    <th scope="col">Starting Point</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Timing</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    busesData?.map(bus => {
                      console.log(bus)
                      return <tr>
                        <td>
                          {/* {editBus === bus?._id ?
                            <input type="text" onBlur={(e) => updateBusNumber(e.target.value)} />
                            : */}
                            {bus?.busNumber}
                        </td>
                        <td>{bus?.startingAddress}</td>
                        <td>{bus?.endingAddress}</td>

                        <td>
                        {editBus === bus?._id ?
                          <>
                            <input type="time" onChange={(e) => setBusStartTime(e.target.value)} />
                            <input type="time" onBlur={(e) => setBusEndTime(e.target.value)} />
                            <button onClick={(e) => updateBusNumber()} >
                              Confirm
                            </button>
                          </>  
                            :
                            <>
                            {bus?.startingTime} to 
                            {bus?.endingTime}
                            </>
                        }
                        </td>
                        <td><button onClick={() => setEditBus(bus?._id)} >Edit</button></td>
                      </tr>
                    })
                  }

                </tbody>
              </Table>
            </Card>
          </Col>

          <Col className="mb-5 mt-4 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <b>  Students Data </b>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Register Number</th>
                    <th scope="col">CNIC</th>
                    <th scope="col">FEE Paid</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    studentsData?.map(bus => {
                      return <tr>
                        <td>
                          {editStudent === bus?._id ?
                            <input type="text" onBlur={(e) => updateStudentNumber(e.target.value)} />
                            :
                            bus?.regNumber}
                        </td>
                        <td>{bus?.nic}</td>
                        <td>{bus?.isfee}</td>
                        <td><button onClick={() => setEditStudent(bus?._id)} >Edit</button></td>
                      </tr>
                    })
                  }

                </tbody>
              </Table>
            </Card>
          </Col>

          <Col className="mb-5 mt-4 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <b>  Drivers Data </b>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Buss No.</th>
                    <th scope="col">Email</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    driversData?.map(driver => {
                      return <tr>
                        <td>
                          {editDriver === driver?._id ?
                            <select onChange={(e) => updateBuss(e.target.value)}>
                              <option value="null">--- select buss ---</option>
                              {
                                busesData.map((bus, i) => {
                                  return (
                                    <option value={bus.busNumber} key={i} selected={bus.busNumber === driver.bussNo} >{bus.busNumber}</option>
                                  )
                                })
                              }
                            </select>
                            //  <input type="text" onBlur={(e)=>updateDriver(e.target.value)} />
                            :
                            driver?.bussNo === null  || driver?.bussNo === "null" ? "-- Not Assigned yet --" : driver?.bussNo}
                        </td>
                        <td>{driver?.email}</td>
                        <td>{driver?.name}</td>
                        <td><button onClick={() => checkBussAvailability(driver?._id)} >Edit</button></td>
                      </tr>
                    })
                  }

                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default Index;
