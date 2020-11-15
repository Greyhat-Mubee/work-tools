import React, {useState} from 'react';
import Toggle from 'react-toggle'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "react-toggle/style.css";
import Scroll from '../../../Scroll';
import RingLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const IpComponent = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setErrorshow(false);
    const handleClose1 = () => setShow(false);
    const [NewIPAddress, setNewIPAddress] = useState("");
    const [Errorshow, setErrorshow] = useState(false);
    const {subscriber_name} = props;
    const {authen_token} = props;
    const {ip} = props;
    const [SubIp , setSubIp] = useState(ip);
    const [apiResponse, setapiResponse] = useState("");
    const IPchangeModal = (event) => {
        setShow(true)
        event.preventDefault();
    }

    function ChangeSubscriberIPapi(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://192.168.6.253:32598/fwb/changeipaddress',
             data:{
                "name": subscriber_name,
                "Old_ip": SubIp,
                "new_ip": NewIPAddress
             },
             headers:{
               'Authorization': 'Bearer '+ authen_token
             }
         }) .then(function(response){
                 setapiResponse(response.data);
                 setSubIp(NewIPAddress);
                 handleClose1()

                 
         }) .catch(err=>{
                 setErrorshow(true)
         })
     }
    function handleSubmit(event) {
        ChangeSubscriberIPapi();
        event.preventDefault();
        }
    function validateForm() {
        return NewIPAddress.length > 0 ;
        }

    return (
        <div>
            <Modal show={show} className='otherModal' 
              onHide={handleClose1} centered backdrop="static" 
              style={{padding:"300px"}} animation={false}
              >
              <Modal.Body> 
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <p style={{fontFamily:"Muli", paddingBottom:"20px", paddingLeft:"5px", fontWeight:"bold", fontSize:"17px"}}>Change IP Address</p>
                        </Col>
                        <Col>
                            <Button variant="secondary" style={{backgroundColor:"transparent", borderStyle:"none", marginLeft:"80%", fontSize:"10px"}} onClick={handleClose1}>
                            ✖
                            </Button>
                        </Col>      
                    </Row>
                    <Row>
                       <Col>
                        <FormControl
                                autoFocus
                                type="text"
                                value={NewIPAddress}
                                onChange={e => setNewIPAddress(e.target.value)}
                            />
                       </Col>
                       <Col xs lg="4">
                            <Button block disabled={!validateForm()} type="submit">
                                Change
                            </Button>
                       </Col> 
                    </Row>                    
                </form> 
              </Modal.Body>
          </Modal>  

          <Modal show={Errorshow} className='otherModal' 
              onHide={handleClose} 
              style={{padding:"300px"}}
              >
              <Modal.Body> 
                    <Row>
                        <Col>
                            <p style={{fontFamily:"Muli", paddingBottom:"20px", paddingLeft:"5px", fontWeight:"bold", fontSize:"17px"}}>
                                An error occured please try again later
                            </p>
                        </Col>
                        <Col>
                            <Button variant="secondary" style={{backgroundColor:"transparent", borderStyle:"none", marginLeft:"80%", fontSize:"10px"}} onClick={handleClose}>
                            ✖
                            </Button>
                        </Col>      
                    </Row>
              </Modal.Body>
          </Modal> 

            <form onSubmit={IPchangeModal}>
                <Row style={{padding:"5px"}}>
                <Col>{SubIp}</Col>
                <Col></Col>
                <Col><Button style={{height:"90%", padding:"3px", marginTop:"1px", fontWeight:"bold"}} type="submit">Change</Button></Col>
                </Row>                         
             </form>
        </div>
    )
}

export default IpComponent;
