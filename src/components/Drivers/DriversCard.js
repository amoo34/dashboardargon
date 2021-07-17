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
  Modal,
  ModalHeader,
  ModalFooter,
  Label,
  Input,
  ModalBody,
  Form,
  FormGroup,

} from "reactstrap";

import Swal from "sweetalert2";
const DriversCard = (props) => {


    const [driversData, setDriversData] = useState([]);
    const [editDriver, setEditDriver] = useState("");
  
    const [driversDataFilter, setDriversDataFilter] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    const [nameEdit,setNameEdit] = useState("");
    const [emailEdit,setEmailEdit] = useState("");
    const [bussNo,setBussNoEdit] = useState("");

    const [busses,setBusesData] = useState([]);
  
    const [modal,setModal] = useState(false);

    useEffect(()=>{
      const fetchDash =async()=>{
        const {data} = await axios.get("http://localhost:3001/dashtics/drivers")
        const busses = await axios.get("http://localhost:3001/dashtics/buses");
        setBusesData(busses?.data?.busesData);
        setDriversData(data)

      }
      fetchDash()
    },[])

    const handleEdit = (id) => {
      const res = driversData.filter((b, i) => b._id == id);
      setEditDriver(id);
      setNameEdit(res[0].name)
      setEmailEdit(res[0].email);
      setBussNoEdit(res[0].bussNo);
      setModal(true);
    };
  
    const updateDriver = async (id) => {
      try {
        await axios.patch(`http://localhost:3001/dashtics/drivers`, {
          id: id,
          bussNo:bussNo,
          name: nameEdit,
          email: emailEdit
        });
        const { data } = await axios.get("http://localhost:3001/dashtics/drivers");
        console.log(data)
        setDriversData(data);
        setModal(false);
        Swal.fire("Updated!", "Record has been Updated.", "success");
      } catch (error) {
        Swal.fire("Failure!", "Something went wrong.", "error");
        console.log(error);
      }
    };
  
    
    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            id: id,
          };
          await axios
            .post("http://localhost:3001/dashtics/drivers/delete", data)
            .then(async () => {
              const { data } = await axios.get(
                "http://localhost:3001/dashtics/drivers"
              );
              setDriversData(data);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setEditDriver("");
              setNameEdit("");
              setEmailEdit("");
              setBussNoEdit("");
            })
            .catch(() => {
              setEditDriver("");
              setNameEdit("");
              setEmailEdit("");
              Swal.fire("Failure!", "Something went wrong.", "error");
            });
        }
      });
    };

  const toggle = () => setModal(!modal);
  const handleSearch = async (value) => {
    const abc = driversData;
    if (value === "") {
      const { data } = await axios.get("http://localhost:3001/dashtics/drivers");
      setIsFilter(false);
      setDriversData(data);
    } else {
      setIsFilter(true);
      setDriversDataFilter(
        driversData.filter(
          (bus, id) =>
            bus?.bussNo.includes(value) ||
            bus?.email.includes(value) ||
            bus?.name.includes(value)
        )
      );
    }
  };

  const dataToShow = isFilter ? driversDataFilter : driversData;


  return(
    <div>    
         <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Driver</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="font-weight-bold" for="exampleEmail">
                Buss Number
              </Label>
              <Input type="select" name="select" id="exampleSelect" onChange={(e)=>{setBussNoEdit(e.target.value)}}>
               {
                 busses.map((bus,id)=> {return(<option name="val" selected={bus.busNumber}>{bus.busNumber}</option>)})
               } 
              </Input>

              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                value={nameEdit}
                onChange={(e) => {
                  setNameEdit(e.target.value);
                }}
                placeholder="enter cnic"
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={emailEdit}
                onChange={(e) => {
                  setEmailEdit(e.target.value);
                }}
                placeholder="enter email"
              />
        
              <br />
              
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="btn btn-primary"
            onClick={() => {
              updateDriver(editDriver);
            }}
            disabled={
              bussNo === "" ||
              nameEdit === "" ||
              emailEdit === ""
            }
          >
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

<Header />
        <Card className="shadow">
              <CardHeader className="border-0">
              <Row>
            <div className="col-md-3">
              {" "}
              <b> Drivers Data </b>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-3">
              <Input
                type="text"
                id="search"
                placeholder="Search Here"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                />
            </div>
                </Row>
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
                     dataToShow?.map(dr=>{
                       return <tr>
                       <td>
                         {
                         dr?.name}
                         </td>
                       <td>{dr?.email}</td>
                       <td>{dr?.bussNo}</td>
                       <td>
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            handleEdit(dr._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleDelete(dr._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
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