import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import { USERADMIN } from "../consts";

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isValid = () => {
    if (USERADMIN.USERNAME === username && USERADMIN.PASSWORD === password) {
      return true;
    }
    return false;
  };

  const checkInputs = () => {
    if (username.trim() === "" || password.trim() === "") return false;
    return true;
  };

  const handleSubmit = () => {
    if (isValid()) {
      onSubmit(username, password);
      navigate("/home");
    } else {
      setFailed(true);
    }
  };

  return (
    <div>
      <h1 className="app-title">Notes App</h1>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            onChange={handleUserChange}
            value={username}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            required
          />
        </Form.Group>
        {checkInputs() ? (
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="button" disabled>
            Submit
          </Button>
        )}
        {failed ? (
          <Form.Text className="error-msg">Invalid Credentials</Form.Text>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
}
