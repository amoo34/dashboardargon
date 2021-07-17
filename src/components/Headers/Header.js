/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import {Link, NavLink,Redirect} from 'react-router-dom'
import axios from "axios";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [dasticsData, setDasticsData] = useState({});
  useEffect(() => {
    const fetchDash = async () => {
      const data = await axios.get("http://localhost:3001/dashtics");
      setDasticsData(data);
    };
    fetchDash();
  }, []);

  console.log(dasticsData)
const isShowBusses = window.location.href.includes("/showBusses");
const isShowStudents = window.location.href.includes("/showStudents");
const isShowDrivers = window.location.href.includes("/showDrivers");


{localStorage.getItem('user-token') === null ?  window.location.href="/auth/login" : <></>}

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row >
              <Col lg="6" xl="6" hidden={isShowBusses || isShowDrivers}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <NavLink tag={Link} to="/admin/showStudents">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Students
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {dasticsData?.data?.studentsData}
                          </span>
                        </NavLink>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="6" hidden={isShowStudents || isShowDrivers}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                      <NavLink tag={Link} to="/admin/showBusses">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Buses
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dasticsData?.data?.busesData}
                        </span>
                        </NavLink>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
<br/><br/>
            <Row >
              
            <Col lg="6" xl="6" hidden={isShowBusses || isShowStudents}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                      <NavLink tag={Link} to="/admin/showDrivers">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Drivers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dasticsData?.data?.driversData}
                        </span>
                        </NavLink>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
         
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
