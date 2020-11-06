import React, {useState,Compnent} from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import './QuerySubscriber.css';
import searchimg from './search.png';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SubscriberDetails from './Subscriber_Details/SubscriberDetails'
const QuerySubscriber = (props) =>{
    const {auth_token} =props;
    const [searchName, setsearchName] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [apiResponse, setapiResponse] = useState("")
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
         }) .then(function(response){
                 setapiResponse(response.data);
                 sethasLoaded('loaded');
                 
         }) .catch(err=>{
                 sethasLoaded('loadingError');
                 
         })
     }
    
     function validateForm() {
        return searchName.length > 0 ;
      }
    function handleSubmit(event) {
    apiRequest();
    event.preventDefault();
    }
    return(
        <Router>
        <div className='contentpage'>
            <Row className='centered'>
                
                <form className="formstyle" onSubmit={handleSubmit}>
                <input onChange={e => setsearchName(e.target.value)}
                    className="ml-3 w-50 searchinput" type="text" placeholder="Subscriber Name" aria-label="Search" />
                <button className="searchbtn" block disabled={!validateForm()} type="submit">
                    <img src= {searchimg} className=""/>
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

