import axios from 'axios';
import Header from 'components/Headers/Header';
import React, { useEffect, useState } from 'react'

/**
* @author
* @function BussesCard
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

const BussesCard = (props) => {

  const [busesData, setBusesData] = useState([]);
  const [editBus,setEditBus] = useState("")
  useEffect(()=>{
    const fetchDash =async()=>{
      const {data} = await axios.get("http://localhost:3001/dashtics/buses")
      
      setBusesData(data?.busesData)
    }
    fetchDash()
  },[])

  const updateBusNumber =async(id)=>{
    console.log(id)
    console.log(editBus)
    try{
     await axios.post(`http://localhost:3001/dashtics/buses`,{
       id:editBus,
      busId:id
     })
      setBusesData(busesData.map(bus=>{
        return bus._id === editBus ? { ...bus ,busNumber:id} : bus 
      }))
      setEditBus("")
    }
    catch(error){
      console.log(error)
    }
    }

  return(
    <div>
      <Header />
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
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                     busesData?.map(bus=>{
                       return <tr>
                       <td>
                         {editBus === bus?._id ?
                         <input type="text" onBlur={(e)=>updateBusNumber(e.target.value)} />
                         : 
                         bus?.busNumber}
                         </td>
                       <td>{bus?.startingAddress}</td>
                       <td>{bus?.endingAddress}</td>
                       <td><button className="btn btn-info" onClick={()=>setEditBus(bus?._id)} >Edit</button></td>
                     </tr>
                     })
                  }
                  
                </tbody>
              </Table>
            </Card>
         
    </div>
   )

 }

export default BussesCard