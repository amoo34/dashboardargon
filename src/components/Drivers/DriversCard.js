import axios from 'axios';
import Header from 'components/Headers/Header';
import React, { useEffect, useState } from 'react'

/**
* @author
* @function DriversCard
**/
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
const DriversCard = (props) => {

    const [busesData, setBusesData] = useState([]);
    const [editBus,setEditBus] = useState("")
    useEffect(()=>{
      const fetchDash =async()=>{
        const {data} = await axios.get("http://localhost:3001/dashtics/drivers")
        setBusesData(data)
      }
      fetchDash()
    },[])

  return(
    <div>    <Header />
        <Card className="shadow">
              <CardHeader className="border-0">
                <b>  Drivers Data </b>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  <th scope="col">Drivar Name</th>
                  <th scope="col">Driver Email </th>
                    <th scope="col">Bus Number</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                     busesData?.map(dr=>{
                       return <tr>
                       <td>
                         {editBus === dr?._id ?
                         <input type="text"  />
                         : 
                         dr?.name}
                         </td>
                       <td>{dr?.email}</td>
                       <td>{dr?.bussNo}</td>
                       <td><button className="btn btn-info" onClick={()=>setEditBus(dr?._id)} >Edit</button></td>
                     </tr>
                     })
                  }
                  
                </tbody>
              </Table>
            </Card>
  </div>
   )

 }

export default DriversCard