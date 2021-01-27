import React, {useState} from 'react';
import './CreateSubscriber.css';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import RingLoader from "react-spinners/GridLoader";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FwbCards from '../fwbCard';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'transparent',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FwbCreate = (props) => {
    const {auth_token} =props;
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [subscriberName, setsubscriberName] = useState("");
    const [vlanID, setvlanID] = useState("");
    const [pop, setpop] = useState("");
    const [lanSubnetAddress, setlanSubnetAddress] = useState("");
    const [SubscriberPlan, setSubscriberPlan] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [apiResponse, setapiResponse] = useState("");
    const [loadingModal, setloadingModal] = useState(false);
    const [errorModal, seterrorModal] = useState(false);
    const handleClose = () => seterrorModal(false);
    const handleSuccessClose = () => setShow(false);
    const classes = useStyles();

    
    function validateForm() {
        return subscriberName.length > 0 && pop.length > 0;
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
                setloadingModal(false);
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
          
          <Backdrop className={classes.backdrop} open={loadingModal}>
                <RingLoader
                        size={42}
                        color={"#3678D7"}
                        loading={true}
                    />  
          </Backdrop>

          {
          hasLoaded === 'loaded' ?
          <div>
            <FwbCards/>

            <Snackbar open={show} autoHideDuration={6000} onClose={handleSuccessClose}>
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
                        <option>MEDALLION POP</option>
                        <option>SAKA 18 POP</option>
                        <option>SAKA 25 POP</option>
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
