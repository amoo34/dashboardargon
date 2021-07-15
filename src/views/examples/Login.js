
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
  const handleSubmit=(e)=>{
    e.preventDefault();

    if(email=="" ||  password==""){
        toast.error("Each field is mandatory",{
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: true,
            closeOnClick: false,
        });
        alert('Email or Password cant be empty')

    }else{
        let data={
            email,
            password
        }
        axios.post("http://localhost:3001/api/adminLogin",data)
        .then((res)=>{
            toast.success("Admin Logged in successfully",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: true,
            });
            window.location="/admin/index";

        })
        .catch((err)=>{
            toast.error(err.response.data.message,{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
            });
            alert('Invalid username or password.')
        })

    }
}

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  return (
    <>
    {/* <ToastContainer /> */}
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
          
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   value={password}
                   onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="/auth/register"
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
