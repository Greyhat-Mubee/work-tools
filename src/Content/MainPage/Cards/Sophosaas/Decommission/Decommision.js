import React, {useState} from 'react';
import './CreateSubscriber.css';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import RingLoader from "react-spinners/GridLoader";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SaasCard from '../SaasCard';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'transparent',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Decommission = (props) => {
    const {auth_token} =props;
    const [show, setShow] = useState(false);
    const handleClose = () => seterrorModal(false);
    const [subscriberName, setsubscriberName] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [, setapiResponse] = useState("");
    const [loadingModal, setloadingModal] = useState(false);
    const [errorModal, seterrorModal] = useState(false);
    const handleSuccessClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const classes = useStyles();


    function validateForm() {
        return subscriberName.length > 0;
      }


    async function apiRequest(){
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios({
            method: 'POST',
            url:'http://192.168.6.253:32598/sophosaas/decommission',
            data:{
            subscriberName: subscriberName,
                
            },
            headers:{
            'Authorization': 'Bearer '+ auth_token
            }
        }) 
          .then(function(response){
                  setapiResponse(response.data['message']);
                  sethasLoaded('loaded');
                  handleShow();             
          }) 
          .catch(err=>{
                  setloadingModal(false);
                  seterrorModal(true)
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
        <div className='contentpage2'>
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
                  <p className="f3 fw6 ph0 mh0 pt4">Decommission</p>
                  <FormGroup controlId="subscriberName">
                    <FormLabel>Subscriber Name</FormLabel>
                    <FormControl
                      autoFocus
                      type="text"
                      value={subscriberName}
                      onChange={e => setsubscriberName(e.target.value)}
                    />
                  </FormGroup>
                  <Button block disabled={!validateForm()} 
                  type="submit"
                  style={{display:"flex",width:"100%", justifyContent:"center",fontFamily:"Muli",fontWeight:"bold", backgroundColor:"#b80202"}}
                  >
                    Decommission
                  </Button>
                </form>
          </div>
          
        }
        
    </div>
    );
};
export default Decommission;