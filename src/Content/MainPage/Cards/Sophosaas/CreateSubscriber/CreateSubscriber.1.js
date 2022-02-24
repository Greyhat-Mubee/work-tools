import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import './CreateSubscriber.css';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { Button } from "react-bootstrap";
import SaasCard from '../SaasCard';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import RingLoader from "react-spinners/GridLoader";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { login } from '../../../../../redux_features/authSlice';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'transparent',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CreateSubscriber = () => {
    const {auth_token} = useSelector(login).payload.authentication.auth.token;
    const [show, setShow] = useState(false);
    const [subscriberName, setsubscriberName] = useState("");
    const [vlanID, setvlanID] = useState("");
    const [lanIpAddress, setlanIpAddress] = useState("");
    const [lanSubnetAddress, setlanSubnetAddress] = useState("");
    const [wanIpAddress, setwanIpAddress] = useState("");
    const [wanSubnetAddress, setwanSubnetAddress] = useState("");
    const [wanGatewayAddress, setwanGatewayAddress] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [, setapiResponse] = useState("");
    const [loadingModal, setloadingModal] = useState(false);
    const [errorModal, seterrorModal] = useState(false);
    const handleSuccessClose = () => setShow(false);
    const handleClose = () => seterrorModal(false);
    const handleShow = () => setShow(true);
    const classes = useStyles();


    function validateForm() {
        return subscriberName.length > 0 && lanIpAddress.length > 0;
      }

    async function apiRequest(){
       axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios({
            method: 'POST',
            url:'http://192.168.6.253:32598/sophosaas/createsubscriber',
            data:{
                "name": subscriberName,
                "lanIP": lanIpAddress,
                "lanSubnet": lanSubnetAddress,
                "wanIP": wanIpAddress,
                "wanSubnet": wanSubnetAddress,
                "wanGateway": wanGatewayAddress,
                "vlan_ID": vlanID
            },
            headers:{
              'Authorization': 'Bearer '+ auth_token
            }
        }) 
          .then(function(response){
                  setapiResponse(response.data['message']);
                  setloadingModal(false);
                  sethasLoaded('loaded');
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

    return (
        <div className='contentpage1'>
          {
        hasLoaded === 'loaded' ?
          <div>
            <SaasCard/>
 
            <Snackbar open={show} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success">
                Subscriber Successfully Created
                </Alert>
            </Snackbar>
          </div>
         :
         <div>

          <Backdrop className={classes.backdrop} open={loadingModal}>
            <RingLoader
                    size={42}
                    color={"#3678D7"}
                    loading={true}
                />  
          </Backdrop>

          <Snackbar open={errorModal} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
              An error occured please try again later
              </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit}>
            <p className="f3 fw6 ph0 mh0 pt4">Create Subscriber</p>
            <Row>
              <Col>
              <FloatingLabel
                  controlId="subscriberName"
                  label="Subscriber Name"
                  className="mb-3"
                >
                  <Form.Control
                    placeholder="Demo Account" 
                    type="text"
                    value={subscriberName}
                    onChange={e => setsubscriberName(e.target.value)}
                  />
                </FloatingLabel>    
              </Col>
              <Col>
                <FloatingLabel
                    controlId="vlanID"
                    label="VLAN ID"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder={99}
                      value={vlanID}
                      onChange={e => setvlanID(e.target.value)}
                      type="number"
                    />
                  </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                      controlId="lanIPAddress"
                      label="LAN IP Address"
                      className="mb-3"
                    >
                      <Form.Control
                        placeholder="1.1.1.1"
                        value={lanIpAddress}
                        onChange={e => setlanIpAddress(e.target.value)}
                        type="text"
                      />
                  </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lanSubnetAddress"
                  label="LAN Subnet Address"
                  className="mb-3"
                >
                  <Form.Control
                    placeholder="255.255.255.255"
                    value={lanSubnetAddress}
                    onChange={e => setlanSubnetAddress(e.target.value)}
                    type="text"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                    controlId="wanIpAddress"
                    label="WAN IP Address"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="1.1.1.1"
                      value={wanIpAddress}
                      onChange={e => setwanIpAddress(e.target.value)}
                      type="text"
                    />
                  </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                      controlId="wanSubnetAddress"
                      label="WAN Subnet Address"
                      className="mb-3"
                    >
                      <Form.Control
                        placeholder="255.255.255.255"
                        value={wanSubnetAddress}
                        onChange={e => setwanSubnetAddress(e.target.value)}
                        type="text"
                      />
                    </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
              <FloatingLabel
                controlId="wanGatewayAddress"
                label="WAN Gateway Address"
                className="mb-3"
              >
                <Form.Control
                  placeholder="2.2.2.2"
                  value={wanGatewayAddress}
                  onChange={e => setwanGatewayAddress(e.target.value)}
                  type="text"
                />
              </FloatingLabel>
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
export default CreateSubscriber;
