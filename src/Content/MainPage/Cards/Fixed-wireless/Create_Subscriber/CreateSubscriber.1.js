import React, {useState} from 'react';
import './CreateSubscriber.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button, FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/HashLoader";
import FwbCards from '../fwbCard';

const FwbCreate = (props) => {
    const {auth_token} =props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const errorClose = () => seterrorModal(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [subscriberName, setsubscriberName] = useState("");
    const [vlanID, setvlanID] = useState("");
    const [pop, setpop] = useState("");
    const [lanSubnetAddress, setlanSubnetAddress] = useState("");
    const [SubscriberPlan, setSubscriberPlan] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [apiResponse, setapiResponse] = useState("")
    const [loadingModal, setloadingModal] = useState(false)
    const [errorModal, seterrorModal] = useState(false)
    
    function validateForm() {
        return subscriberName.length > 0 && pop.length > 0;
      }

    function MyVerticallyCenteredModal(props) {

        const override = css`
        position:fixed;
        margin-left:12%;
      }
      `;
        return (
            <Modal show={loadingModal}
              backdrop={false}
              centered
              className='my-modal'
            >
                <Modal.Header>
                  <RingLoader
                    css={override}
                    size={120}
                    color={"#3678D7"}
                    loading={true}
                  />
                </Modal.Header>
              </Modal>         
        );
      }
      
    
      async function apiRequest(){
       axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios({
            method: 'POST',
            url:'http://192.168.6.253:32598/fwb/newsubscriber',
            data:{
              "name": subscriberName,
              "subnet": lanSubnetAddress,
              "master_subnet": pop,
              "vlan": vlanID,
              "plan": SubscriberPlan
            },
            headers:{
              'Authorization': 'Bearer '+ auth_token
            }
        }) .then(function(response){
                setapiResponse(response.data['message']);
                sethasLoaded('loaded');
                handleShow();
        }) .catch(err=>{
                setloadingModal(false);
                seterrorModal(true);
                handleShow();
        })
    }

    function handleSubmit(event) {
      sethasLoaded("loading");
      setloadingModal(true);
      apiRequest();
      event.preventDefault();
    }

    return (
        <div className='contentpage3'>
          {
          hasLoaded === 'loaded' ?
          <div>
            <FwbCards/>
            <Modal show={show} className='otherModal' onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{apiResponse}</Modal.Body>
            </Modal>
          </div>
          :
          <div>
            <MyVerticallyCenteredModal
              show={loadingModal}
            />
            
          <Modal show={errorModal} className='otherModal' onHide={errorClose}>
              <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body>Unable to create subscriber. Please try again.</Modal.Body>
          </Modal>

          <form onSubmit={handleSubmit}>
              <p className="f3 fw6 ph0 mh0 pt4">Create Subscriber</p>
                <FormGroup controlId="subscriberName">
                  <FormLabel>Subscriber Name</FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={subscriberName}
                    onChange={e => setsubscriberName(e.target.value)}
                  />
                </FormGroup>
                <Row>
                    <Col>
                    <FormGroup controlId="vlanID">
                    <FormLabel>VLAN ID</FormLabel>
                    <FormControl
                      value={vlanID}
                      onChange={e => setvlanID(e.target.value)}
                      type="number"
                    />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup controlId="pop">
                      <FormLabel>POP</FormLabel>
                      <FormControl as="select"  value={pop}
                        onChange={e => setpop(e.target.value)}
                        >
                        <option>VI POP</option>
                        <option>LEKKI POP</option>
                        <option>IKOTA POP</option>
                        <option>TANGO POP</option>
                        <option>CRESTVIEW POP</option>
                        <option>NETCOM POP</option>
                        <option>CBN POP</option>
                        <option>ABUJA POP</option>
                        <option>CBN ABUJA POP</option>
                        <option>AIM POP</option>
                        <option>SAKA POP</option>
                        <option>IJORA POP</option>
                        <option>IKORODU POP</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup controlId="pop">
                      <FormLabel>Subnet</FormLabel>
                      <FormControl as="select"  value={lanSubnetAddress}
                        onChange={e => setlanSubnetAddress(e.target.value)}
                        >
                        <option> /29</option>
                        <option> /30</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup controlId="pop">
                      <FormLabel>Subscriber Plan</FormLabel>
                      <FormControl as="select"  value={SubscriberPlan}
                        onChange={e => setSubscriberPlan(e.target.value)}
                        >
                        <option>1/1 Mbps</option>
                        <option>2/2 Mbps</option>
                        <option>3/3 Mbps</option>
                        <option>4/4 Mbps</option>
                        <option>5/5 Mbps</option>
                        <option>6/6 Mbps</option>
                        <option>7/7 Mbps</option>
                        <option>8/8 Mbps</option>
                        <option>10/10 Mbps</option>
                        <option>12/12 Mbps</option>
                        <option>15/15 Mbps</option>
                        <option>20/20 Mbps</option>
                        <option>28/28 Mbps</option>
                        <option>30/30 Mbps</option>
                        <option>45/45 Mbps</option>
                        <option>50/50 Mbps</option>
                        <option>60/60 Mbps</option>
                        <option>80/80 Mbps</option>
                        <option>100/100 Mbps</option>
                        <option>255/255 Mbps</option>
                        <option>400/400 Mbps</option>
                        <option>2/2 Mbps (Night)</option>
                        <option>4/4 Mbps (Night)</option>
                        <option>8/8 Mbps (Night)</option>
                        <option>16/16 Mbps (Night)</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>              
                <Button block disabled={!validateForm()} type="submit">
                  Create Subscriber
                </Button>
           </form>
          </div>
          
          }
            
        </div>
    );
};
export default FwbCreate;
