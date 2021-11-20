import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "react-toggle/style.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; 
import axios from 'axios';
import {login} from '../../../../../../redux_features/authSlice';


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
    paper_map: {
        marginLeft:'8em',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '80%'
        },
        Formlabel: {
        fontStyle: 'Muli',
        fontWeight: 'bold',
        
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



const IpComponent = (props) => {
    const {subscriber_name} = props;
    const {authen_token} = useSelector(login).payload.authentication.auth.token;
    const {ip} = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setErrorshow(false);
    const handleClose1 = () => setShow(false);
    const [NewIPAddress, setNewIPAddress] = useState("");
    const [Errorshow, setErrorshow] = useState(false);
    const [SubIp , setSubIp] = useState(ip);
    const [, setapiResponse] = useState("");
    const [pop, setpop] = useState("Select POP");
    const [changeLoading, setchangeLoading] = useState("Change")
    const classes = useStyles();
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
                "new_ip": NewIPAddress,
                "new_subnetID": pop

             },
             headers:{
               'Authorization': 'Bearer '+ authen_token
             }
         }) 
         .then(function(response){
                 setapiResponse(response.data);
                 setchangeLoading("Change")
                 setSubIp(NewIPAddress);
                 handleClose1()

                 
         }) 
         .catch(err=>{
                 setErrorshow(true)
                 setchangeLoading("Change")
         })
     }
    function handleSubmit(event) {
        setchangeLoading("Processing")
        ChangeSubscriberIPapi();
        event.preventDefault();
        }
    function validateForm() {
        return NewIPAddress.length > 0 ;
        }

    return (
        <div>
                 <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={show}
                onClose={handleClose1}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={show}>
                <div className={classes.paper_map}>
                <form onSubmit={handleSubmit}>
                    <h2 id="spring-modal-title" style={{textAlign:'center', fontFamily:'Muli', fontWeight:'bold'}}>Map New IP Address</h2>
                    <div style={{paddingTop: '20px', marginTop: '10px'}}></div>
                    <Row style={{padding:'30px'}}>
                       <Col>
                       <FormLabel className={classes.Formlabel}>IP Address</FormLabel>
                        <FormControl
                                autoFocus
                                type="text"
                                value={NewIPAddress}
                                onChange={e => setNewIPAddress(e.target.value)}
                            />
                       </Col>
                      </Row>

                      <Row style={{paddingTop:'0',paddingLeft:'30px',paddingRight:'30px',paddingBottom:'10px'}}>
                       <Col>
                        <FormGroup controlId="pop">
                            <FormLabel className={classes.Formlabel}>POP Location</FormLabel>
                            <FormControl as="select"  value={pop}
                                onChange={e => setpop(e.target.value)}
                                >
                                <option>VI POP</option>
                                <option>NETCOM POP</option>
                                <option>CBN LAGOS POP</option>
                                <option>ABUJA POP</option>
                                <option>BCN FIBER POP</option>
                                <option>LEKKI POP</option>
                                <option>IKOTA POP</option>
                                <option>TANGO POP</option>
                                <option>CRESTVIEW POP</option>
                                <option>AIM POP</option>
                                <option>SAKA 18 POP</option>
                                <option>SAKA 25 POP</option>
                                <option>IJORA POP</option>
                                <option>IKORODU POP</option>
                                <option>ACME IKEJA POP</option>
                                <option>RADICAL WIRELESS POP</option>
                                <option>SETRACO POP</option>
                                <option>ASO POP</option>
                                <option>CBN ABUJA POP</option>
                                <option>KANO POP</option>
                                <option>PH POP</option>
                                <option>BLACK-DIAMOND POP</option>
                                <option>KARAMEH POP</option>
                            </FormControl>
                        </FormGroup>
                       </Col>
                    </Row>
                    <Row xs lg="4" style={{display:'flex',justifyContent:'flex-end', paddingRight:'20px'}}>
                            <Button block disabled={!validateForm()} type="submit">
                                {changeLoading}
                            </Button>
                       </Row> 
                    
                </form> 
                </div>
                </Fade>
        </Modal>
        <Snackbar open={Errorshow} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
            An error occured please try again later
            </Alert>
        </Snackbar>

        <form onSubmit={IPchangeModal}>
            <Row style={{padding:"5px"}}>
            <Col>{SubIp}</Col>
            <Col style={{display:'flex', justifyContent:'flex-end'}}>
                <Button style={{padding:"7px", fontSize:'15px', fontWeight:"bold"}} type="submit">Change</Button>
            </Col>
            </Row>                         
        </form>
    </div>
    )
}

export default IpComponent;
