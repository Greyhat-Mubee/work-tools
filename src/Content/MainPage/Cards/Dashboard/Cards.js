import React, {useState, useEffect} from 'react';
import Imageicon from './saasicon.png';
import ServiceIcon from './all_services.png';
import TopCard from './TopCard';
import WifiIcon from './cll-wifi.png';
import { StyleSheet, css } from 'aphrodite';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'
import wireless_img from './wireless.png'
import axios from 'axios'

const styles = StyleSheet.create({
    imageicons:{
        height:'25px',
        width: '33px',
        borderRadius:'10px',
        },
    imageicon:{
        height:'190px',
        width: '80px',
        justifyContent:'center',
        borderRadius:'10px',
        paddingTop:"30px",
        paddingBottom:"80px",
        },
    separator: {
        paddingTop: '20px',
        borderTop: '0.5vh solid ',
        padding:0,
        left:0,
        marginTop: '10px',
        opacity: 0.06
    },
    text:{
        paddingTop:"7px",
        paddingLeft:"10px",
        fontFamily: 'Muli',
        fontSize: '17px',
        fontWeight:'bold',
        lineHeight: '12px',
        letterSpacing: '0.2px',
        color: 'black',
    }
    }
)


const Card = (props) => { 
    const subscriber_plans = {
        "PLAN1": "1/1 Mbps",
        "PLAN2": "2/2 Mbps",
        "PLAN3": "3/3 Mbps",
        "PLAN4": "4/4 Mbps",
        "PLAN5": "5/5 Mbps",
        "PLAN6": "6/6 Mbps",
        "PLAN7": "7/7 Mbps",
        "PLAN8": "8/8 Mbps",
        "PLAN10": "10/10 Mbps",
        "PLAN12": "12/12 Mbps",
        "PLAN15": "15/15 Mbps",
        "PLAN20": "20/20 Mbps",
        "PLAN28": "28/28 Mbps",
        "PLAN30": "30/30 Mbps",
        "PLAN45": "45/45 Mbps",
        "PLAN50": "50/50 Mbps",
        "PLAN60": "60/60 Mbps",
        "PLAN80": "80/80 Mbps",
        "PLAN100": "100/100 Mbps",
        "PLAN255": "255/255 Mbps",
        "PLAN400": "400/400 Mbps",
        "Night2": "2/2 Mbps (Night)",
        "Night4": "4/4 Mbps (Night)",
        "Night8": "8/8 Mbps (Night)",
        "Night16": "16/16 Mbps (Night)",
        "suspend": "Suspended"
    }
    const {auth_token} =props;
    const [apiResponse, setapiResponse] = useState("");
    const [apiResponse2, setapiResponse2] = useState([]);
    const [apiResponse3, setapiResponse3] = useState([]);
    async function apiRequest(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'GET',
             url:'http://192.168.6.253:32598/dashboardstats',
             data:{
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) 
            .then(function(response){
                    setapiResponse(response.data);
            }) 
            .catch(err=>{
                
            })
        }
     async function apiRequest2(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'GET',
             url:'http://192.168.6.253:32598/fwb/topsubscribers',
             data:{
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) 
            .then(function(response){
                    setapiResponse2(response.data);                                 
            }) 
            .catch(err=>{
                
            })
        }
     async function apiRequest3(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'GET',
             url:'http://192.168.6.253:32598/sophosaas/saasstats',
             data:{
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) 
            .then(function(response){
                    setapiResponse3(response.data);                                 
            }) 
            .catch(err=>{
                
            })
        }
    useEffect(()=>{
        apiRequest()
        apiRequest2()
        apiRequest3()
    },[apiResponse2])
    return (
        <div style={{marginTop:'60px'}}>
            <Row>
                <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow pointer' style={{width:'370px', height:'180px'}}>
                    <Row>
                        <img alt='robots' src= {ServiceIcon} style={{width:'25px',height:'25px', padding:'2px'}}/>
                        <p className={css(styles.text)}>All Services</p>
                    </Row>
                    <Row>
                        <p style={{paddingLeft:'45px', fontFamily:'Muli', fontWeight:'bold'}}> Number of Subscribers</p>
                    </Row>
                    <Row style={{display:'flex',justifyContent:'flex-end'}}>
                        <p style={{fontFamily:'Muli', fontWeight:'bold', fontSize:'55px',paddingRight:'24px' }}> {apiResponse['total']} </p>
                    </Row>
                </div>
                <TopCard
                subscriber_no = {apiResponse['saas']}
                service_name = 'Sophos as a Service'
                service_img = {Imageicon}
                />
                <TopCard
                subscriber_no = {apiResponse['fwb']}
                service_name = 'Fixed Wireless'
                service_img = {wireless_img} 
                />
                <TopCard
                subscriber_no = {apiResponse['antamedia']}
                service_name = 'Coollink Wifi'
                service_img = {WifiIcon} 
                />
                
            </Row>

            <Row>
            <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow pointer' style={{width:'100%'}}>
                    <Row>
                        <p style={{fontFamily:'Muli',fontWeight:'bold',fontSize:'20px', paddingLeft:'12px'}}>Top Fixed Wireless Users</p>
                    </Row>
                    <Row>
                    <Table>
                        <thead>
                            <tr>
                            <th></th>
                            <th>SOLID - ID</th>
                            <th>PLAN</th>
                            <th>DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                    apiResponse2.map((userdetstable, i) => {
                                    return(
                                        <tr>
                                        <td>{i+1}</td>
                                        <td>{userdetstable[0]}</td>
                                        <td>{subscriber_plans[userdetstable[1]]}</td>
                                        <td>{userdetstable[2]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    </Row>
                </div>
            </Row>

            <Row>
            <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow' style={{width:'100%'}}>
                    <Row>
                        <p style={{fontFamily:'Muli',fontWeight:'bold',fontSize:'20px', paddingLeft:'12px'}}>Top Sophos as Services Users</p>
                    </Row>
                    <Row>
                    <Table>
                        <thead>
                            <tr>
                            <th></th>
                            <th>SOLID - ID</th>
                            <th>PUBLIC IP</th>
                            <th>VLAN ID</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                    apiResponse3.map((usersaastable, i) => {
                                    return(
                                        <tr>
                                        <td>{i+1}</td>
                                        <td>{usersaastable[0]}</td>
                                        <td>{usersaastable[1]}</td>
                                        <td>{usersaastable[2]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    </Row>
                </div>
            </Row>

                
        </div>
    )
}
export default Card;