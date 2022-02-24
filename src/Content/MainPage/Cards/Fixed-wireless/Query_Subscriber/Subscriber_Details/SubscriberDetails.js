import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './SubscriberDetails.css';
import Toggle from 'react-toggle'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Form,FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import FloatingLabel  from 'react-bootstrap/FloatingLabel';
import "react-toggle/style.css";
import Scroll from '../../../Scroll';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import MapIPAddress from './mapIPAddress';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import IpComponent from './IpCompnent';
import {login} from '../../../../../../redux_features/authSlice';
import { change_selectedItem } from '../../../../../../redux_features/authSlice';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    const firebaseConfig = {
        apiKey: "apiKey",
        authDomain: "projectId.firebaseapp.com",
        databaseURL: "https://work-tools-d6176-default-rtdb.firebaseio.com/",
        storageBucket: "bucket.appspot.com"
      };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);    
    const subdata= useSelector(state => {
            return state.query_subscriber.query;
          })
    
    function CustomAccordion({ eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey);
        return (
            <div onClick={decoratedOnClick}>
                ✚
            </div>
            
        );
    }

    const dispatch = useDispatch()
    dispatch(change_selectedItem(subdata.subscriber_data['name']))
    
    const subscriberdata = subdata.subscriber_data
    const auth_token = useSelector(login).payload.authentication.auth.token;
    const subscriber_name = subscriberdata['name'];
    const subscriber_ip = subscriberdata['ip address'];
    const sub_plan = subscriberdata['attributes']['Plan'];
    const [SubscriberPlan_array, setSubscriberPlan_array] = useState([]);
    const [subscriberAttributes, setsubscriberAttributes] = useState({})
    const [Sub_ip] = useState(subscriber_ip || []);
    const [SubscriberPlan, setSubscriberPlan] = useState('None')
    const [pop_array, setpop_array] = useState([]);
    const [NewIPAddress, setNewIPAddress] = useState("");
    const [pop, setpop] = useState("Select POP");
    const [vlanID, setvlanID] = useState("");
    const [changeLoading] = useState("Add");
    const [show, setShow] = useState(false);
    const [Decommisionshow, setDecommisionshow] = useState(false);
    const [Errorshow, setErrorshow] = useState(false);
    const [, setapiResponse] = useState("");
    const [open, setOpen] = useState(false);
    const [decommmissionValidate, setdecommmissionValidate] = useState("")
    const [mapshow, setmapshow] = useState(false)
    const handleClose = () => setErrorshow(false);
    const handleClose_Decomm = () => setDecommisionshow(false);
    const handleShow = () => setShow(false);
    const decommModalOpen = () => setOpen(true);
    const decommModalClose = () => setOpen(false);
    const mapshowClose = () => setmapshow(false);
    const mapIPModal = (event) => {
        setmapshow(true)
        event.preventDefault();
    }
    
    useEffect(() => {
        const Plans = ref(database, '/FWB/create_subscriber/Plan');
        const Plan = ref(database, '/FWB/subscriber_details/Plans');
        const POP = ref(database, '/FWB/create_subscriber/POP');
        const Attributes = ref(database, '/FWB/subscriber_details/Attributes')
        onValue(Plans, (snapshot) => {
          const data = snapshot.val();
          setSubscriberPlan_array(data)
        });
        onValue(Plan, (snapshot) => {
          const data = snapshot.val();
          setSubscriberPlan(data[sub_plan])
        });
        onValue(POP, (snapshot) => {
            const data = snapshot.val();
            setpop_array(data)
          });
        onValue(Attributes, (snapshot) => {
            const data = snapshot.val()
            setsubscriberAttributes(data)
        })
      }, [])
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
        }) 
        .then(function(response){
                setapiResponse(response.data);
                setOpen(false)
                setDecommisionshow(true);
                
                
        }) 
        .catch(err=>{
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
         }) 
         .then(function(response){
                 setapiResponse(response.data);
                 setShow(true);
                 
         }) 
         .catch(err=>{
                setErrorshow(true)
         })
     }

     async function map_new_ip(e){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'POST',
             url:'http://192.168.6.253:32598/fwb/querysubscriber/subscriberdetails/addip',
             data:{
                "name": subscriber_name,
                "ip_address": NewIPAddress,
                "pop": pop,
                "vlan": vlanID
              },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) 
         .then(function(response){
                 setShow(true);
                 subscriber_ip.push(NewIPAddress)
                 mapshowClose()
                 
         }) 
         .catch(err=>{
                setErrorshow(true)
         })
        e.preventDefault();
     }

    const generateAttributeState = (state) => {
        if (state === 'true'){
            return true
        } else {
            return false
        }
    }

    const changeSubAttribute = (currentState, attributeName) => {
        change_attr_api(attributeName, currentState)
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
    const DecommissionSusbscriber = () => {
        DecommissionSubscriberapi();
    }

     function validateForm() {
        return decommmissionValidate === subscriber_name ;
      }

      function validateForm1() {
        return NewIPAddress.length > 0 ;
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
                className="modal"
                open={open}
                onClose={decommModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className="paper">
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
            <div>
            <Col className='centerdets'>  
                <div className='image-layout'>
                    <img alt='robots' className="roboimg" src= {`https://robohash.org/${subscriber_name}`}/>
                </div>
                <div className="subcard">
                <Row>
                    <Col >Subscriber Name</Col>
                    <Col style={{textAlign:"right"}}>{subscriber_name}</Col>
                </Row>
                <Row>
                    <Accordion>
                        <Card className="accordioncard">
                            <Card.Header>
                            <Row>
                                <Col md={9}><div className='accordion-card-text'>IP Address</div></Col>
                                <Col>
                                    <div className='accordion-expand'>
                                        <CustomAccordion eventKey="0"/>
                                    </div>
                                    
                                </Col>
                            </Row>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            <div>
                                <div className='map-ip-button'>
                                    <MapIPAddress name="New">
                                    <div className="new-ip">
                                        <Form onSubmit={map_new_ip}>
                                            <h2 className='sidebar-title'>Map New IP Address</h2>
                                            <div className='sidebar-body'>
                                            <FloatingLabel
                                                controlId="IPAddress"
                                                label="IP Address"
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    placeholder="4.4.4.4"
                                                    type="text"
                                                        value={NewIPAddress}
                                                        onChange={e => setNewIPAddress(e.target.value)}
                                                />
                                            </FloatingLabel>
                                           
                                            <FloatingLabel
                                                    controlId="vlanID"
                                                    label="VLAN ID"
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                    placeholder={1024}
                                                    value={vlanID}
                                                    onChange={e => setvlanID(e.target.value)}
                                                    type="number"
                                                    />
                                                </FloatingLabel>
                                            <Row>
                                            <Col>
                                                <FloatingLabel
                                                    controlId="pop"
                                                    label="POP Location"
                                                    className="mb-3"
                                                >
                                                    <Form.Select
                                                    value={pop}
                                                    onChange={e => setpop(e.target.value)}
                                                    >
                                                    {pop_array.map((option, id) =>
                                                        (
                                                        <option>{option}</option>
                                                        ))}
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                            </Row>
                                            </div>
                                            <div className='sidebar-button-div'>
                                                    <Button className='sidebar-button' block disabled={!validateForm1()} type="submit">
                                                        {changeLoading}
                                                    </Button>
                                            </div> 
                                            
                                        </Form> 
                                        </div>
                                    </MapIPAddress>
                                </div>
                                <div style={{paddingTop: '20px', borderTop: '0.5vh solid ', padding:3 , left:0, marginTop: '10px', opacity: 0.06}}></div>
                                {
                                    Sub_ip.map((user, i) => {
                                    return(<IpComponent key = {i} 
                                                ip={subscriber_ip[i]}
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
                    <Accordion>
                        <Card className="accordioncard">
                            <Card.Header>
                            <Row>
                            <Col md={9}><div className='accordion-card-text'>Subscriber Attributes</div></Col>
                            <Col>
                                    <div className='accordion-expand'>
                                        <CustomAccordion eventKey="0"/>
                                    </div>
                                    
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
                                                {SubscriberPlan_array.map((option, id) =>(
                                                    <option>{option}</option>
                                                ))}
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                               <div className='attribute-display'>
                                    {
                                    
                                    Object.keys(subscriberAttributes).map((attribute, id) =>(
                                    <Row className="ma3">
                                    <Col sm={8}>{attribute}</Col>
                                    <Col sm={4}>
                                    <Toggle
                                        id={attribute}
                                        defaultChecked={generateAttributeState(subscriberdata['attributes'][`${subscriberAttributes[attribute]}`])}
                                        onChange={e => changeSubAttribute(e.target.checked, subscriberAttributes[attribute])} />
                                    </Col>
                                    </Row>  
                                    ))}
                               </div>
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
            </div>
        </div>
        </div>       
    )
}

export default SubscriberDetails;