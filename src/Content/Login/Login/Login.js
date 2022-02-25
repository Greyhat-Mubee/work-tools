import React, { useEffect, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
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
            <FormGroup controlId="email">
              <FormLabel>Username</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block disabled={!validateForm()} type="submit">
              {loginCheck}
            </Button>
            {
              useSelector(login).payload.authentication.auth.loginRetry === true ? 
              <p style={{color:'red', paddingTop:'20px'}}>Incorrect username or password</p>
              :<div></div>
            }
          </form>
        </div>
      );
}