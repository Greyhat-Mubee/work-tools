import React, {useState} from 'react';
import './CreateSubscriber.css';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/HashLoader";
import SaasCard from '../SaasCard';


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

const Decommission = (props) => {
    const {auth_token} =props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [subscriberName, setsubscriberName] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [apiResponse, setapiResponse] = useState("")

    function validateForm() {
        return subscriberName.length > 0;
      }

      function handleSubmit(event) {
        event.preventDefault();
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
         }) .then(function(response){
                 setapiResponse(response.data['message']);
                 sethasLoaded('loaded');
                 handleShow();             
         }) .catch(err=>{
                  sethasLoaded('loadingError');
                  handleShow();
         })
     }
 
     function handleSubmit(event) {
       sethasLoaded("loading");
       apiRequest();
       event.preventDefault();
     }

    return (
        <div className='contentpage'>
           {
          hasLoaded === 'loading' ?
            <div>
          <MyVerticallyCenteredModal
            show={true}
          />
          </div>
          : hasLoaded === 'loaded' ?
          <div>
            <SaasCard/>
            <Modal show={show} className='otherModal' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Sucess</Modal.Title>
              </Modal.Header>
              <Modal.Body>{apiResponse}</Modal.Body>
          </Modal>
          </div>
          : hasLoaded === 'loadingError' ?
          <div>
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
                <Button block disabled={!validateForm()} type="submit">
                  Decommission
                </Button>
              </form>
            <Modal show={show} className='otherModal' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Failed</Modal.Title>
              </Modal.Header>
              <Modal.Body>Subscriber not found check your input and try again</Modal.Body>
          </Modal>
          </div>
          :<form onSubmit={handleSubmit}>
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
              <Button block disabled={!validateForm()} type="submit">
                Decommission
              </Button>
            </form>
        }
        
    </div>
    );
};
export default Decommission;