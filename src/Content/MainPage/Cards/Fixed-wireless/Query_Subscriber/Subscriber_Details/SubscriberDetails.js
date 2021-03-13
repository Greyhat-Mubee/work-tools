import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './SubscriberDetails.css';
import Toggle from 'react-toggle'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "react-toggle/style.css";
import Scroll from '../../../Scroll';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import IpComponent from './IpCompnent';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    paper: {
      marginLeft:'25em',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '60%'
    },
  }));
  
  const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };


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
        "suspend": "Suspended",
        "PLAN25": "25/25 Mbps"
    }
    
    const check_attr = (attr_val) => {
        return (attr_val === 'true')
    }

    const {subscriberdata} = props;
    const {auth_token} = props;
    const subscriber_name = subscriberdata['name'];
    const subscriber_ip = subscriberdata['ip address'];
    const sub_plan = subscriberdata['attributes']['Plan']
    const [SubscriberPlan, setSubscriberPlan] = useState(subscriber_plans[sub_plan] || 'None')
    const [FilterStreaming, setFilterStreaming] = useState(check_attr(subscriberdata['attributes']['filterStreaming']) || false)
    const [FilterAppleUpdate, setFilterAppleUpdate] = useState(check_attr(subscriberdata['attributes']['filterappleupdate']) || false)
    const [FilterItunes, setFilterItunes] = useState(check_attr(subscriberdata['attributes']['filteritunes']) || false)
    const [FilterMicrosoftUpdate, setFilterMicrosoftUpdate] = useState(check_attr(subscriberdata['attributes']['filtermicrosoftupdate']) || false)
    const [FilterMovies, setFilterMovies] = useState(check_attr(subscriberdata['attributes']['filtermovies']) || false)
    const [FilterP2P, setFilterP2P] = useState(check_attr(subscriberdata['attributes']['filterp2p']) || false)
    const [FilterYoutube, setFilterYoutube] = useState(check_attr(subscriberdata['attributes']['filteryoutube']) || false)
    const [show, setShow] = useState(false);
    const [Decommisionshow, setDecommisionshow] = useState(false);
    const [Errorshow, setErrorshow] = useState(false);
    const [NewIPAddress, setNewIPAddress] = useState("");
    const [apiResponse, setapiResponse] = useState("");
    const [open, setOpen] = useState(false);
    const [attrbuteChange, setattrbuteChange] = useState(false);
    const [decommmissionValidate, setdecommmissionValidate] = useState("")
    const handleClose = () => setErrorshow(false);
    const handleClose_Decomm = () => setDecommisionshow(false);
    const handleShow = () => setShow(false);
    const decommModalOpen = () => setOpen(true);
    const decommModalClose = () => setOpen(false);
    const classes = useStyles();

    function DecommissionSubscriberapi(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://192.168.6.253:32598/fwb/deletesubscriber',
             data:{
               "name": subscriber_name,
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) .then(function(response){
                 setapiResponse(response.data);
                 setOpen(false)
                 setDecommisionshow(true);
                 
                 
         }) .catch(err=>{
                 setErrorshow(true)
         })
     }
     async function change_attr_api(attribute_name, attribute_val){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://192.168.6.253:32598/fwb/changeattribute',
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
                 setShow(true);
                 
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
        setSubscriberPlan("Suspended")
        event.preventDefault();
    }
    const ChangeSubscriberPlan = (newValue) => {
        setSubscriberPlan(newValue);
        change_attr_api('Plan', newValue);
    }
    const DecommissionSusbscriber = (newValue) => {
        DecommissionSubscriberapi();
    }

     function validateForm() {
        return decommmissionValidate === subscriber_name ;
      }
    

    return(
        <div>            
            <Snackbar open={Decommisionshow} autoHideDuration={6000} onClose={handleClose_Decomm}>
                <Alert onClose={handleClose_Decomm} severity="success">
                Subscriber Successfully Deleted
                </Alert>
            </Snackbar>

            <Snackbar open={Errorshow} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                An error occured please try again later
                </Alert>
            </Snackbar>

            <Snackbar open={show} autoHideDuration={6000} onClose={handleShow}>
                <Alert onClose={handleShow} severity="success">
                Subscriber attribute successfully changed
                </Alert>
            </Snackbar>

        <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={decommModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="spring-modal-title" style={{textAlign:'center', fontFamily:'Muli', fontWeight:'bold'}}>Confirm Delete</h2>
                    <p id="spring-modal-description" style={{fontFamily:'Muli'}}>
                        This action cannot be undone. This will permanently delete the subscriber <mark>{subscriber_name}</mark> and remove all associations from coollink network management devices.
                    </p>
                    <p style={{textAlign:'center', fontFamily:'Muli', fontWeight:'bold'}}>
                        Please type <mark>{subscriber_name}</mark> to confirm.
                    </p>
                    <form onSubmit={DecommissionSusbscriber}>
                        <FormGroup controlId="subscriberName">
                            <FormControl
                            autoFocus
                            type="text"
                            value={decommmissionValidate}
                            onChange={e => setdecommmissionValidate(e.target.value)}
                            />
                        </FormGroup>
                        <Button block disabled={!validateForm()} type="submit" variant="danger">
                            I understand. Delete subscriber
                        </Button>
                    </form>
                </div>
                </Fade>
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
                            <div>
                                {
                                    subscriber_ip.map((user, i) => {
                                    return(<IpComponent key = {i} 
                                                ip={subscriber_ip[i]}
                                                authen_token = {auth_token}
                                                subscriber_name = {subscriberdata['name']}
                                                />)
                                })
                            }
                            </div>
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
                                    <Col sm={8}>Filter Streaming</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id='filterStreaming'
                                        defaultChecked={FilterStreaming}
                                        onChange={UpdateFilterStreaming} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col sm={8}>Filter Apple Update</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id='filterappleupdate'
                                        defaultChecked={FilterAppleUpdate}
                                        onChange={UpdateFilterAppleUpdate} />
                                    </Col>                                
                                </Row>
                                <Row className="ma3">
                                    <Col sm={8}>Filter Itunes</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id='filteritunes'
                                        defaultChecked={FilterItunes}
                                        onChange={UpdateFilterItunes} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col sm={8}>Filter Microsoft Update</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id='filtermicrosoftupdates'
                                        defaultChecked={FilterMicrosoftUpdate}
                                        onChange={UpdateFilterMicrosoftUpdate} />
                                    </Col>                                
                                </Row>
                                <Row className="ma3">
                                    <Col sm={8}>Filter Movies</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id='filtermovies'
                                        defaultChecked={FilterMovies}
                                        onChange={UpdateFilterMovies} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col sm={8}>Filter P2P</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id='filterp2p'
                                        defaultChecked={FilterP2P}
                                        onChange={UpdateFilterP2P} />
                                    </Col>
                                </Row>
                                <Row className="ma3">
                                    <Col sm={8}>Filter Youtube</Col>
                                    <Col sm={4}>
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
                        onClick={decommModalOpen}>
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