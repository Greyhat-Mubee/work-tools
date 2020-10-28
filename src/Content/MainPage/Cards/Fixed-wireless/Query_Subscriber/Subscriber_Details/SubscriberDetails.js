import React, {useState} from 'react';
import './SubscriberDetails.css';
import Toggle from 'react-toggle'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "react-toggle/style.css"
import Scroll from '../../../Scroll'
import RingLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


const SubscriberDetails = (props) => {
    const subscriber_plans = {
        "PLAN1": "1/1 Mbps",
        "PLAN2": "2/2 Mbps",
        "PLAN3": "3/3 Mbps",
        "PLAN4": "4/4 Mbps",
        "PLAN5": "5/5 Mbps",
        "PLAN6": "6/6 Mbps",
        "PLAN7": "7/7 Mbps",
        "PLAN8": "8/8 Mbps",
        "PLAN10": "10/10 Mbps",
        "PLAN12": "12/12 Mbps",
        "PLAN15": "15/15 Mbps",
        "PLAN20": "20/20 Mbps",
        "PLAN28": "28/28 Mbps",
        "PLAN30": "30/30 Mbps",
        "PLAN45": "45/45 Mbps",
        "PLAN50": "50/50 Mbps",
        "PLAN60": "60/60 Mbps",
        "PLAN80": "80/80 Mbps",
        "PLAN100": "100/100 Mbps",
        "PLAN255": "255/255 Mbps",
        "PLAN400": "400/400 Mbps",
        "Night2": "2/2 Mbps (Night)",
        "Night4": "4/4 Mbps (Night)",
        "Night8": "8/8 Mbps (Night)",
        "Night16": "16/16 Mbps (Night)",
        "suspend": "Suspended"
    }
    
    const check_attr = (attr_val) => {
        return (attr_val === 'true')
    }

    const {subscriberdata} = props;
    const {auth_token} = props;
    const subscriber_name = subscriberdata['name'];
    const subscriber_ip = subscriberdata['ip address'];
    const sub_plan = subscriberdata['attributes'][0]['attribute value']
    const [SubscriberPlan, setSubscriberPlan] = useState(subscriber_plans[sub_plan])
    const [FilterStreaming, setFilterStreaming] = useState(check_attr(subscriberdata['attributes'][1]['attribute value']))
    const [FilterAppleUpdate, setFilterAppleUpdate] = useState(check_attr(subscriberdata['attributes'][2]['attribute value']))
    const [FilterItunes, setFilterItunes] = useState(check_attr(subscriberdata['attributes'][3]['attribute value']))
    const [FilterMicrosoftUpdate, setFilterMicrosoftUpdate] = useState(check_attr(subscriberdata['attributes'][4]['attribute value']))
    const [FilterMovies, setFilterMovies] = useState(check_attr(subscriberdata['attributes'][5]['attribute value']))
    const [FilterP2P, setFilterP2P] = useState(check_attr(subscriberdata['attributes'][6]['attribute value']))
    const [FilterYoutube, setFilterYoutube] = useState(check_attr(subscriberdata['attributes'][7]['attribute value']))
    const [toggleActive, settoogleActive] = useState(false)
    const [show, setShow] = useState(false);
    const [Decommisionshow, setDecommisionshow] = useState(false);
    const [Errorshow, setErrorshow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [NewIPAddress, setNewIPAddress] = useState("");
    const [apiResponse, setapiResponse] = useState("");
 
    async function ChangeSubscriberIPapi(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://localhost:8000/fwb/changeipaddress',
             data:{
                "name": subscriber_name,
                "Old_ip": subscriber_ip,
                "new_ip": NewIPAddress
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) .then(function(response){
                 setapiResponse(response.data);
                 
         }) .catch(err=>{
                 setErrorshow(true)
         })
     }
    
    function DecommissionSubscriberapi(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://localhost:8000/fwb/deletesubscriber',
             data:{
               "name": subscriber_name,
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) .then(function(response){
                 setapiResponse(response.data);
                 
         }) .catch(err=>{
                 setErrorshow(true)
         })
     }
     async function change_attr_api(attribute_name, attribute_val){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://localhost:8000/fwb/changeattribute',
             data:{
                    "name": subscriber_name,
                    "attr_name": attribute_name,
                    "value": attribute_val
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) .then(function(response){
                 setapiResponse(response.data);
                 
         }) .catch(err=>{
                setErrorshow(true)
         })
     }


    const UpdateFilterStreaming = () => {
        setFilterStreaming(!FilterStreaming);
        change_attr_api('filterStreaming',`${!FilterStreaming}`);
  }
    const UpdateFilterAppleUpdate = () => {
        setFilterAppleUpdate(!FilterAppleUpdate);
        change_attr_api('filterappleupdate',`${!FilterAppleUpdate}`);
  }
    const UpdateFilterItunes = () => {
        setFilterItunes(!FilterItunes);
        change_attr_api('filteritunes',`${!FilterItunes}`);
  }
    const UpdateFilterMicrosoftUpdate = () => {
        setFilterMicrosoftUpdate(!FilterMicrosoftUpdate);
        change_attr_api('filtermicrosoftupdate',`${!FilterMicrosoftUpdate}`);
  }
    const UpdateFilterMovies = () => {
        setFilterMovies(!FilterMovies);
        change_attr_api('filtermovies',`${!FilterMovies}`);
  }
    const UpdateFilterP2P = () => {
        setFilterP2P(!FilterP2P);
        change_attr_api('filterp2p',`${!FilterP2P}`);
  }
    const UpdateFilterYoutube = () => {
        setFilterYoutube(!FilterYoutube);
        change_attr_api('filteryoutube',`${!FilterYoutube}`);
  }
    const SuspendSubscriber = (event) => {
        change_attr_api('Plan', 'suspend');
        event.preventDefault();
    }
    const ChangeSubscriberPlan = (newValue) => {
        setSubscriberPlan(newValue);
        change_attr_api('Plan', newValue);
    }
    const DecommissionSusbscriber = (newValue) => {
        DecommissionSubscriberapi();
        setDecommisionshow(true);
    }

    const IPchangeModal = (event) => {
        setShow(true)
        event.preventDefault();
    }

     function validateForm() {
        return NewIPAddress.length > 0 ;
      }
    function handleSubmit(event) {
    ChangeSubscriberIPapi();
    event.preventDefault();
    }

    function MyVerticallyCenteredModal(props) {

        const override = css`
        position:fixed;
        margin-left:12%;
      }
      `;
        return (
            <Modal show={true}
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

    return(
        <div>
             <Modal show={show} className='otherModal' 
              onHide={handleClose} centered backdrop="static" 
              style={{padding:"300px"}} animation={false}
              >
              <Modal.Body> 
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <p style={{fontFamily:"Muli", paddingBottom:"20px", paddingLeft:"5px", fontWeight:"bold", fontSize:"17px"}}>Change IP Address</p>
                        </Col>
                        <Col>
                            <Button variant="secondary" style={{backgroundColor:"transparent", borderStyle:"none", marginLeft:"80%", fontSize:"10px"}} onClick={handleClose}>
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
          <Modal show={Decommisionshow} className='otherModal' 
              onHide={handleClose} 
              style={{padding:"300px"}}
              >
              <Modal.Body> 
                    <Row>
                        <Col>
                            <p style={{fontFamily:"Muli", paddingBottom:"20px", paddingLeft:"5px", fontWeight:"bold", fontSize:"17px"}}>Subscriber Successfully Deleted</p>
                        </Col>
                        <Col>
                            <Button variant="secondary" style={{backgroundColor:"transparent", borderStyle:"none", marginLeft:"80%", fontSize:"10px"}} onClick={handleClose}>
                            ✖
                            </Button>
                        </Col>      
                    </Row>
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

        <div className='contentpager'>      
            <Scroll>
            <Col className='centerdets'>  
                <Row>
                    <img alt='robots' className="roboimg" src= {`https://robohash.org/${subscriber_name}`}/>
                </Row>
                <div className="subcard">
                <Row>
                    <Col>Subscriber Name</Col>
                    <Col style={{textAlign:"right"}}>{subscriber_name}</Col>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="1">
                        <Card className="accordioncard">
                            <Card.Header>
                            <Row>
                                <Col>IP Address</Col>
                                <Col style={{textAlign:"right"}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    ✚
                                    </Accordion.Toggle>
                                </Col>
                            </Row>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <form onSubmit={IPchangeModal}>
                                    <Row>
                                    <Col>{subscriber_ip}</Col>
                                    <Col></Col>
                                    <Col><Button style={{height:"90%", padding:"1px", marginTop:"1px"}} type="submit">Change</Button></Col>
                                    </Row>
                                                                        
                                </form>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="1">
                        <Card className="accordioncard">
                            <Card.Header>
                            <Row>
                                <Col>Subscriber Attributes</Col>
                                <Col style={{textAlign:"right"}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    ✚
                                    </Accordion.Toggle>
                                </Col>
                            </Row>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Row className="">
                                    <Col>Plan</Col>
                                    <Col> 
                                        <FormGroup controlId="pop">
                                            <FormControl as="select"  value={SubscriberPlan}
                                                onChange={e => ChangeSubscriberPlan(e.target.value)}
                                                >
                                                <option>Suspended</option>
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
                                                <option>2/2 Mbps (Night)</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col>Filter Streaming</Col>
                                    <Col style={{marginLeft:"90px"}}>
                                    <Toggle
                                        id='filterStreaming'
                                        defaultChecked={FilterStreaming}
                                        onChange={UpdateFilterStreaming} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col md={90} style={{marginLeft:"15px"}}>Filter Apple Update</Col>
                                    <Col style={{marginLeft:"80px"}}>
                                    <Toggle
                                        id='filterappleupdate'
                                        defaultChecked={FilterAppleUpdate}
                                        onChange={UpdateFilterAppleUpdate} />
                                    </Col>                                
                                </Row>
                                <Row className="ma3">
                                    <Col>Filter Itunes</Col>
                                    <Col style={{marginLeft:"90px"}}>
                                    <Toggle
                                        id='filteritunes'
                                        defaultChecked={FilterItunes}
                                        onChange={UpdateFilterItunes} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col md={90} style={{marginLeft:"15px"}}>Filter Microsoft Update</Col>
                                    <Col style={{marginLeft:"55px"}}>
                                    <Toggle
                                        id='filtermicrosoftupdates'
                                        defaultChecked={FilterMicrosoftUpdate}
                                        onChange={UpdateFilterMicrosoftUpdate} />
                                    </Col>                                
                                </Row>
                                <Row className="ma3">
                                    <Col>Filter Movies</Col>
                                    <Col style={{marginLeft:"90px"}}>
                                    <Toggle
                                        id='filtermovies'
                                        defaultChecked={FilterMovies}
                                        onChange={UpdateFilterMovies} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col>Filter P2P</Col>
                                    <Col style={{marginLeft:"90px"}}>
                                    <Toggle
                                        id='filterp2p'
                                        defaultChecked={FilterP2P}
                                        onChange={UpdateFilterP2P} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col>Filter Youtube</Col>
                                    <Col style={{marginLeft:"90px"}}>
                                    <Toggle
                                        id='filteryoutube'
                                        defaultChecked={FilterYoutube}
                                        onChange={UpdateFilterYoutube} />
                                    </Col>                                
                                </Row>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Row>
                <div>
                    <Row className="pt4">
                        <Button style={{display:"flex",width:"100%", justifyContent:"center",fontFamily:"Muli",fontWeight:"bold", backgroundColor:"#ffd969"}}
                        onClick={SuspendSubscriber}>
                            Suspend Subscriber</Button>
                    </Row>
                    <Row className="pt4">
                        <Button style={{display:"flex",width:"100%", justifyContent:"center",fontFamily:"Muli",fontWeight:"bold", backgroundColor:"#b80202"}}
                        onClick={DecommissionSusbscriber}>
                            Decommision Subscriber</Button>
                    </Row>
                </div>                
                </div>
            </Col>
            </Scroll>
        </div>
        </div>       
    )
}

export default SubscriberDetails;