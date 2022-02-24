import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import "./Login.css";
import {login} from '../../../redux_features/authSlice';

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState("Login");
  let history = useHistory();

    function validateForm() {
      return email.length > 0 && password.length > 0;
    }

  function handleSubmit(event) {
    setLoginCheck('Loading');
    var bodyFormData = new FormData();
    bodyFormData.append('username',email);
    bodyFormData.append('password', password);
    dispatch(login(bodyFormData)) 
    event.preventDefault();
  }

  useEffect(() =>{
    history.push("/login")
  },[])
  useEffect(() => {
    setLoginCheck('Login')
  }, [useSelector(login).payload.authentication.auth.loginRetry])

    return (
        <div className="Login">
          <form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </Form.Group>
            <div className="loginButton">
              <Button block disabled={!validateForm()} className="buttons" type="submit">
                {loginCheck}
              </Button>
            </div>
            {
              useSelector(login).payload.authentication.auth.loginRetry === true ? 
              <p style={{color:'red', paddingTop:'20px'}}>Incorrect username or password</p>
              :<div></div>
            }
          </form>
        </div>
      );
}