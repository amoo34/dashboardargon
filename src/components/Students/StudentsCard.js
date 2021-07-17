import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";

/**
 * @author
 * @function Students
 **/

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


const StudentsCard = (props) => {
  const [studentsData, setStudentsData] = useState([]);
  const [editStudent, setEditStudent] = useState("");

  const [studentsDataFilter, setStudentsDataFilter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const [registerationNo,setRegisterationNo] = useState("");
  const [cnicEdit,setCNICEdit] = useState("");
  const [feeStatus,setFeeStatusEdit] = useState("");

  const [modal,setModal] = useState(false);

  useEffect(() => {
    const fetchDash = async () => {
      const students = await axios.get(
        "http://localhost:3001/dashtics/students"
      );

      setStudentsData(students?.data?.studentsData);
    };
    fetchDash();
  }, []);

  const handleEdit = (id) => {
    const res = studentsData.filter((b, i) => b._id == id);
    setEditStudent(id);
    setRegisterationNo(res[0].regNumber)
    setCNICEdit(res[0].nic);
    setFeeStatusEdit(res[0].isfee);
    setModal(true);
  };

  const updateStudent = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/dashtics/students`, {
        id: id,
        regNumber:registerationNo,
        nic: cnicEdit,
        isfee: feeStatus
      });
      const { data } = await axios.get("http://localhost:3001/dashtics/students");
      setStudentsData(data.studentsData);
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
          .post("http://localhost:3001/dashtics/students/delete", data)
          .then(async () => {
            const { data } = await axios.get(
              "http://localhost:3001/dashtics/students"
            );
            setStudentsData(data?.studentsData);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setEditStudent("");
            setRegisterationNo("");
            setCNICEdit("");
            setFeeStatusEdit("");
          })
          .catch(() => {
            setEditStudent("");
            setRegisterationNo("");
            setCNICEdit("");
            setFeeStatusEdit("");
            Swal.fire("Failure!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleSearch = async (value) => {
    const abc = studentsData;
    if (value === "") {
      const { data } = await axios.get("http://localhost:3001/dashtics/students");
      setIsFilter(false);
      setStudentsData(data?.studentsData);
    } else {
      setIsFilter(true);
      setStudentsDataFilter(
        studentsData.filter(
          (bus, id) =>
            bus?.regNumber.includes(value) ||
            bus?.nic.includes(value) ||
            bus?.isfee.includes(value)
        )
      );
    }
  };

  const toggle = () => setModal(!modal);
  const dataToShow = isFilter ? studentsDataFilter : studentsData;

  return (
    <div>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Students</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="font-weight-bold" for="exampleEmail">
                Registeration Number
              </Label>
              <Input
                type="text"
                name="bussNo"
                value={registerationNo}
                onChange={(e) => {
                  setRegisterationNo(e.target.value);
                }}
                placeholder="with a placeholder"
                disabled
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                CNIC
              </Label>
              <Input
                type="text"
                name="cnic"
                value={cnicEdit}
                onChange={(e) => {
                  setCNICEdit(e.target.value);
                }}
                placeholder="enter cnic"
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Fee paid?
              </Label>

              <Input type="select" name="select" id="exampleSelect" onChange={(e)=>{setFeeStatusEdit(e.target.value)}}>
                <option name="val" selected={feeStatus === "yes"}>yes</option>
                <option name="val" selected={feeStatus === "no"}>no</option>
              </Input>
        
              <br />
              
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="btn btn-primary"
            onClick={() => {
              updateStudent(editStudent);
            }}
            disabled={
              registerationNo === "" ||
              cnicEdit === "" ||
              feeStatus === ""
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
      <Row className="mt-5">
        <Col className="mb-5 mt-4 mb-xl-0" xl="12">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
            <div className="col-md-3">
              {" "}
              <b> Students Data </b>
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
                  <th scope="col">Register Number</th>
                  <th scope="col">CNIC</th>
                  <th scope="col">FEE Paid</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {dataToShow?.map((bus) => {
                  return (
                    <tr>
                      <td>{
                          bus?.regNumber
                        }
                      </td>
                      <td>{bus?.nic}</td>
                      <td>{bus?.isfee}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            handleEdit(bus._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleDelete(bus._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentsCard;
