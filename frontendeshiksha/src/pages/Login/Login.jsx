// import Styles from "./login.module.css";
import { Button, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Alert_Comp from "../../components/Alert/Alert_Comp";
import Spinner_comp from "../../components/Spinner/Spinner_comp";
import Toast_Comp from "../../components/Toast/Toast_Comp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// axios
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useNavigate();
  const {user} = useSelector((state) => state.auth);
  //console.log(user);

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // console.log(result);
        if (result.errors) {
          setError(result.errors);
        } else {
          
          setToast(true);
          setError(null);
             setTimeout(() => {
              dispatch({ type: "SET__USER", payload: result.userInfo });
              localStorage.setItem("auth_token", result.token);
              localStorage.setItem("user", JSON.stringify(result.userInfo));
             }, 3000);
             clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(user)
    if(user && user.role==="Student")
    {
      history('/dashboard')
    }
    else if(user && user.role==="Admin")
    {
      history('/admin-dashboard')
    }
    else if(user && user.role==="Teacher")
    {
      history('/teacher-dashboard')
    }
  }, [user])
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Container>
        <Toast_Comp
          setToast={setToast}
          renderToast={toast}
          msg="Login Success"
        />
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col md={6} className="mx-auto mt-5">
            <Paper className="p-4 shadow rounded">
              <Typography
                className="text-center text-primary mb-3"
                variant="h5"
              >
                Login Here
              </Typography>
              {loading && <Spinner_comp />}
              {error && error.userExist && (
                <Alert_Comp variant="danger" msg={error.userExist} />
              )}

              <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                  />
                  <span style={{ color: "red" }}>{error && error.email}</span>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <span style={{ color: "red" }}>
                    {error && error.password}
                  </span>
                </Form.Group>

                <Typography style={{ color: "GrayText", marginTop:'13px' }} variant="subtitle2">
                  Don't Have an account?
                  <Link to="/register">Register Here</Link>
                </Typography>
                <Button
                  className="mt-2 d-flex"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
