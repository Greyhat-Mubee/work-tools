import React, {useState} from 'react';
import './QuerySubscriber.css';
import searchimg from './search.png';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import SubscriberDetails from './Subscriber_Details/SubscriberDetails';
import RingLoader from "react-spinners/GridLoader";


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1
    },
  }));

const QuerySubscriber = (props) =>{
    const {auth_token} =props;
    const [searchName, setsearchName] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [apiResponse, setapiResponse] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const classes = useStyles();

    
    async function apiRequest(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios({
            method: 'POST',
            url:'http://192.168.6.253:32598/fwb/querysubscriber',
            data:{
            "name": searchName,
            },
            headers:{
            'Authorization': 'Bearer '+ auth_token
            }
        }) 
            .then(function(response){
                    setapiResponse(response.data);
                    handleClose();
                    sethasLoaded('loaded');

                    
            }) 
            .catch(err=>{
                handleClose();
                sethasLoaded('loadingError');
                    
            })
        }
    
     function validateForm() {
        return searchName.length > 0 ;
      }
    function handleSubmit(event) {
    setOpen(true)
    apiRequest();
    event.preventDefault();
    }
    return(
        <Router>
        <div className='contentpage'>

            <Backdrop className={classes.backdrop} open={open}>
                <RingLoader
                        size={42}
                        color={"#3678D7"}
                        loading={true}
                    />  
            </Backdrop>

            <Row className='centered'>
                
                <form className="formstyle" onSubmit={handleSubmit}>
                <input onChange={e => setsearchName(e.target.value)}
                    className="ml-3 w-50 searchinput" type="text" placeholder="Subscriber Name" aria-label="Search" />
                {/* Tried to use react router to make to change the url onSubmit but for some reason i get a blank screen if you can please try and fix this. Thanks */}
                <button className="searchbtn" block disabled={!validateForm()} type="submit">
                    <img src= {searchimg} className="" alt='search icon'/>
                </button>
                </form> 
            </Row>
            <Row className='centeredrd'>
            {
                hasLoaded === 'loadingError' ? 
                <p style={{color:'red', paddingTop:"20px"}}>Search error check subscriber name and try again</p>
                :<div></div>
            }
            </Row>
            {
                hasLoaded === 'loaded'?
                <div>
                    <SubscriberDetails subscriberdata={apiResponse} auth_token={auth_token}/>
                </div>
                :<div></div>
            }
                
            
        </div>
        </Router>
    )
}

export default QuerySubscriber

