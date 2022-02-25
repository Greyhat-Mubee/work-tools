import React, {useEffect, useState} from 'react';
import './CreateSubscriber.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types';
import Mybackdrop from "../../../backdrop/backdrop";
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FwbCards from '../fwbCard';
import {login} from '../../../../../redux_features/authSlice';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const FwbCreate = (props) => {
  const auth_token = useSelector(login).payload.authentication.auth.token;
  const [, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [subscriberName, setsubscriberName] = useState("");
  const [manualPublicIP, setmanualPublicIP] = useState("");
  const [vlanID, setvlanID] = useState("");
  const [pop, setpop] = useState("VI POP");
  const [pop_array, setpop_array] = useState([]);
  const [lanSubnetAddress, setlanSubnetAddress] = useState("/30");
  const [lanSubnetAddress_array, setlanSubnetAddress_array] = useState([]);
  const [SubscriberPlan, setSubscriberPlan] = useState("1/1 Mbps");
  const [SubscriberPlan_array, setsetSubscriberPlan_array] = useState([]);
  const [hasLoaded, sethasLoaded] = useState("");
  const [, setapiResponse] = useState("");
  const [loadingModal, setloadingModal] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const handleClose = () => seterrorModal(false);
  const handleSuccessClose = () => setShow(false);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const onItemClicked = (item) => {
      return props.onChange(item);    
  }
  const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://work-tools-d6176-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    useEffect(() => {
      const Plans = ref(database, '/FWB/create_subscriber/Plan');
      const POP = ref(database, '/FWB/create_subscriber/POP');
      const subnet = ref(database, '/FWB/create_subscriber/Subnet');
      onValue(Plans, (snapshot) => {
        const data = snapshot.val();
        setsetSubscriberPlan_array(data)
      });
      onValue(POP, (snapshot) => {
        const data = snapshot.val();
        setpop_array(data)
      });
      onValue(subnet, (snapshot) => {
        const data = snapshot.val();
        setlanSubnetAddress_array(data)
      });
    }, [])

    function validateForm() {
        return subscriberName.length > 0 && pop.length > 0 && SubscriberPlan.length > 0;
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
              "plan": SubscriberPlan,
              "manualIP": false
            },
            headers:{
              'Authorization': 'Bearer '+ auth_token
            }
        }) 
        .then(function(response){
                setapiResponse(response.data['message']);
                setloadingModal(false);
                sethasLoaded('loaded');
                setShow(true)
                onItemClicked("Fixed Wireless Broadband")
                handleShow();
        }) 
        .catch(err=>{
                setloadingModal(false);
                seterrorModal(true);
                handleShow();
        })
    }

    async function apiRequestManual(){
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
       axios({
           method: 'POST',
           url:'http://192.168.6.253:32598/fwb/newsubscriber',
           data:{
             "name": subscriberName,
             "subnet": lanSubnetAddress,
             "master_subnet": pop,
             "vlan": vlanID,
             "plan": SubscriberPlan,
             "manualIP": true,
             "manualIPAddress":manualPublicIP
           },
           headers:{
             'Authorization': 'Bearer '+ auth_token
           }
       }) 
       .then(function(response){
               setapiResponse(response.data['message']);
               setloadingModal(false);
               sethasLoaded('loaded');
               setShow(true)
               handleShow();
       }) 
       .catch(err=>{
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

    function handleSubmitManual(event) {
      sethasLoaded("loading");
      setloadingModal(true);
      apiRequestManual();
      event.preventDefault();
    }

    return (
        <div>
          <Mybackdrop open={loadingModal}/>
          {
          hasLoaded === 'loaded' ?
          <div>
            <FwbCards/>
            <Snackbar open={true} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success">
                Subscriber Successfully Created
                </Alert>
            </Snackbar>
          </div>
          :
          <div>
          <Snackbar open={errorModal} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
              An error occured please try again later
              </Alert>
          </Snackbar>
              <p className="f3 fw6 ph0 mh0 pt4">Create Subscriber</p>
              <div className="tabroot">
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab className="tabStyle" label="Automatic IP Assignment" {...a11yProps(0)} />
                    <Tab className="tabStyle" label="Manual IP Assignment" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <form onSubmit={handleSubmit}>
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
                            {pop_array.map((option, id) =>
                              (
                                <option>{option}</option>
                              ))}
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
                            {lanSubnetAddress_array.map((option, id) =>
                              (
                                <option>{option}</option>
                              ))}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup controlId="pop">
                          <FormLabel>Subscriber Plan</FormLabel>
                          <FormControl as="select"  value={SubscriberPlan}
                            onChange={e => setSubscriberPlan(e.target.value)}
                            >
                            {SubscriberPlan_array.map((option, id) =>
                              (
                                <option>{option}</option>
                              ))}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>              
                    <Button block disabled={!validateForm()} type="submit">
                      Create Subscriber
                    </Button>
                </form>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                      <form onSubmit={handleSubmitManual}>
                          <Row>
                            <Col>
                              <FormGroup controlId="subscriberName">
                              <FormLabel>Subscriber Name</FormLabel>
                                <FormControl
                                  autoFocus
                                  type="text"
                                  value={subscriberName}
                                  onChange={e => setsubscriberName(e.target.value)}
                                />
                                </FormGroup>
                              </Col>
                              <Col>
                              <FormGroup controlId="subscriberManualIP">
                              <FormLabel>IP Address</FormLabel>
                                <FormControl
                                  type="text"
                                  value={manualPublicIP}
                                  onChange={e => setmanualPublicIP(e.target.value)}
                                />
                                </FormGroup>
                              </Col>
                          </Row>
                          
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
                                {pop_array.map((option, id) =>
                              (
                                <option>{option}</option>
                              ))}
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
                                {lanSubnetAddress_array.map((option, id) =>
                                  (
                                    <option>{option}</option>
                                  ))}
                              </FormControl>
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup controlId="pop">
                              <FormLabel>Subscriber Plan</FormLabel>
                              <FormControl as="select"  value={SubscriberPlan}
                                onChange={e => setSubscriberPlan(e.target.value)}
                                >
                                {SubscriberPlan_array.map((option, id) =>
                                (
                                  <option>{option}</option>
                                ))}
                              </FormControl>
                            </FormGroup>
                          </Col>
                        </Row>              
                        <Button block disabled={!validateForm()} type="submit">
                          Create Subscriber
                        </Button>
                    </form>
                  </TabPanel>
              </div>
          </div>
          
          }
            
        </div>
  );
};
export default FwbCreate;
