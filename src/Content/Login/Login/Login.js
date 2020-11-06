import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Login.css";
import Card from '../../MainPage/Cards/Dashboard/Cards';


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const {isSignedIn, auth_token} = props

  function SignInChange (val) {
    return props.onSignChange(val)
  }
   function onItemClicked (item) {   
    return props.onChange(item);    
    }

    function StoreToken(token){
        return props.tokenChange(token)
    }

    function StoreName(token){
      return props.nameChange(token)
    }

    function validateForm() {
      return email.length > 0 && password.length > 0;
    }

  function handleSubmit(event) {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    var bodyFormData = new FormData();
    bodyFormData.append('username',email);
    bodyFormData.append('password', password);
    axios({
        method: 'POST',
        url:'http://192.168.6.253:32598/token',
        data: bodyFormData
    }) .then(function(response){
            onItemClicked(true)
            StoreToken(response.data['access_token'])
            StoreName(response.data['name'])       
            SignInChange('Dashboard')     
    }).catch(err => {
          onItemClicked(false)
          setLoginStatus('false')
          console.log(err)
    }) 
    event.preventDefault();
  }

  if (isSignedIn === false){
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
              Login
            </Button>
            {
              loginStatus === 'false' ? 
              <p style={{color:'red', paddingTop:'20px'}}>Incorrect username or password</p>
              :<div></div>
            }
          </form>
        </div>
      );
  } else {
    return (
        <Card/>
    )
  }
 
}