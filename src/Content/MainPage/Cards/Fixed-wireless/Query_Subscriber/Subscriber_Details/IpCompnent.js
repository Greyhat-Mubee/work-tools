import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormGroup, FormControl} from "react-bootstrap";
import "react-toggle/style.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  


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
    const [, setapiResponse] = useState("");
    const [pop, setpop] = useState("Select POP");
    const [changeLoading, setchangeLoading] = useState("Change")
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
                       <Col>
                        <FormGroup controlId="pop">
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
                    <Row xs lg="4" style={{display:'flex',justifyContent:'flex-end', paddingRight:'20px'}}>
                            <Button block disabled={!validateForm()} type="submit">
                                {changeLoading}
                            </Button>
                       </Row> 
                    
                </form> 
              </Modal.Body>
          </Modal>  

          <Snackbar open={Errorshow} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                An error occured please try again later
                </Alert>
            </Snackbar>

          {/* <Modal show={Errorshow} className='otherModal' 
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
          </Modal>  */}

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
