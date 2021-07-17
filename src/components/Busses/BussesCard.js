import axios from "axios";
import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";

/**
 * @author
 * @function BussesCard
 **/

import Swal from "sweetalert2";

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
  Input,
  Label,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const BussesCard = (props) => {
  const [busesData, setBusesData] = useState([]);
  const [editBus, setEditBus] = useState("");
  const [modal, setModal] = useState(false);

  const [busNoEdit, setBusNoEdit] = useState("");
  const [startEdit, setStartEdit] = useState("");
  const [destinationEdit, setDestinationEdit] = useState("");

  const [startTimeEdit, setStartTimeEdit] = useState("");
  const [endTimeEdit, setEndTimeEdit] = useState("");

  useEffect(() => {
    const fetchDash = async () => {
      const { data } = await axios.get("http://localhost:3001/dashtics/buses");

      setBusesData(data?.busesData);
    };
    fetchDash();
  }, []);

  const updateBus = async (id) => {
    try {
      await axios.post(`http://localhost:3001/dashtics/buses`, {
        id: id,
        busNumber: busNoEdit,
        startingAddress: startEdit,
        endingAddress: destinationEdit,
        startTime: startTimeEdit,
        endTime: endTimeEdit,
      });
      const { data } = await axios.get("http://localhost:3001/dashtics/buses");
      setBusesData(data?.busesData);
      setModal(false);
      Swal.fire("Updated!", "Record has been deleted.", "success");
    } catch (error) {
      Swal.fire("Failure!", "Something went wrong.", "error");
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    const res = busesData.filter((b, i) => b._id == id);
    setEditBus(id);
    setBusNoEdit(res[0].busNumber);
    setStartEdit(res[0].startingAddress);
    setDestinationEdit(res[0].endingAddress);
    setStartTimeEdit(res[0].startingTime);
    setEndTimeEdit(res[0].endingTime)
    setModal(true);
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
          .post("http://localhost:3001/dashtics/buses/delete", data)
          .then(async () => {
            const { data } = await axios.get(
              "http://localhost:3001/dashtics/buses"
            );
            setBusesData(data?.busesData);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setEditBus("");
            setBusNoEdit("");
            setStartEdit("");
            setDestinationEdit("");
          })
          .catch(() => {
            setEditBus("");
            setBusNoEdit("");
            setStartEdit("");
            setDestinationEdit("");
            Swal.fire("Failure!", "Something went wrong.", "error");
          });
      }
    });
  };

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Buss</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="font-weight-bold" for="exampleEmail">
                Buss No
              </Label>
              <Input
                type="text"
                name="bussNo"
                value={busNoEdit}
                onChange={(e) => {
                  setBusNoEdit(e.target.value);
                }}
                placeholder="with a placeholder"
                disabled
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Start
              </Label>
              <Input
                type="text"
                name="start"
                value={startEdit}
                onChange={(e) => {
                  setStartEdit(e.target.value);
                }}
                placeholder="enter destination"
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Destination
              </Label>
              <Input
                type="text"
                name="destination"
                placeholder="enter destination"
                value={destinationEdit}
                onChange={(e) => {
                  setDestinationEdit(e.target.value);
                }}
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Start Time
              </Label>
              <Input
                type="text"
                name="startTiming"
                value={startTimeEdit}
                onChange={(e) => {
                  setStartTimeEdit(e.target.value);
                }}
                placeholder="enter start timing"
              />
              <br />
              <Label className="font-weight-bold" for="exampleEmail">
                Ending Time
              </Label>
              <Input
                type="text"
                name="endingTime"
                placeholder="enter ending time"
                value={endTimeEdit}
                onChange={(e) => {
                  setEndTimeEdit(e.target.value);
                }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="btn btn-primary"
            onClick={() => {
              updateBus(editBus);
            }}
            disabled={
              startEdit === "" ||
              destinationEdit === "" ||
              startTimeEdit === "" ||
              endTimeEdit === ""
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
          <b> Buses Data </b>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Bus Number</th>
              <th scope="col">Starting Point</th>
              <th scope="col">Destination</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {busesData?.map((bus) => {
              return (
                <tr>
                  <td>{bus?.busNumber}</td>
                  <td title={bus.startingAddress}>
                    {bus?.startingAddress.length < 30
                      ? bus?.startingAddress.length
                      : bus?.startingAddress.slice(0, 29) + "..."}
                  </td>
                  <td title={bus.endingAddress}>
                    {bus?.endingAddress.length < 30
                      ? bus?.endingAddress.length
                      : bus?.endingAddress.slice(0, 29) + "..."}
                  </td>
                  <td>{bus?.startingTime}</td>
                  <td>{bus?.endingTime}</td>
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
    </div>
  );
};

export default BussesCard;
