import Header from 'components/Headers/Header'
import React, { useEffect, useState } from 'react'

/**
* @author
* @function Students
**/

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

const StudentsCard = (props) => {

  const [studentsData,setStudentsData] = useState([])
  const [editStudent,setEditStudent] = useState("")
  useEffect(()=>{
    const fetchDash =async()=>{
      const students = await axios.get("http://localhost:3001/dashtics/students")
      
      setStudentsData(students?.data?.studentsData)
    }
    fetchDash()
  },[])
  
  const updateStudentNumber =async(regNumber)=>{
    console.log(regNumber)
    console.log(editStudent)
    try{
     await axios.patch(`http://localhost:3001/dashtics/students`,{
       id:editStudent,
       studentRegNumber:regNumber
     })
      setStudentsData(studentsData.map(bus=>{
        return bus._id === editStudent ? { ...bus ,regNumber} : bus 
      }))
      setEditStudent("")
    }
    catch(error){
      console.log(error)
    }
    }
  return(
    <div><Header />
    <Row className="mt-5">
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
                     studentsData?.map(bus=>{
                       return <tr>
                       <td>
                         {editStudent === bus?._id ?
                         <input type="text" onBlur={(e)=>updateStudentNumber(e.target.value)} />
                         : 
                         bus?.regNumber}
                         </td>
                       <td>{bus?.nic}</td>
                       <td>{bus?.isfee}</td>
                       <td><button className="btn btn-info" onClick={()=>setEditStudent(bus?._id)} >Edit</button></td>
                     </tr>
                     })
                  }
                  
                </tbody>
              </Table>
            </Card>
          </Col>
          </Row>
          </div>
   )

 }

export default StudentsCard