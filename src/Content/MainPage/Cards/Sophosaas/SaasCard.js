import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TopCard from '../Dashboard/TopCard';
import { StyleSheet, css } from 'aphrodite';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Icontotal from './totalSubscribers.png';
import Iconload from './systemload.png';
import Iconram from './systemram.png';
import Iconband from './systembandwidth.png';

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
    const {auth_token} =props;
    const [apiResponse, setapiResponse] = useState("");
    const [apiResponse2, setapiResponse2] = useState([]);
    const [apiResponse3, setapiResponse3] = useState([]);
    async function apiRequest(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'GET',
             url:'http://192.168.6.253:32598/sophosaas/dashboardstats',
             data:{
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) .then(function(response){
                setapiResponse(response.data);
         }) .catch(err=>{
            
         })
     }
     async function apiRequest2(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'GET',
             url:'http://192.168.6.253:32598/sophosaas/saasstats',
             data:{
             },
             headers:{
               'Authorization': 'Bearer '+ auth_token
             }
         }) .then(function(response){
                setapiResponse2(response.data);                                 
         }) .catch(err=>{
            
         })
     }
    useEffect(()=>{
        apiRequest()
        apiRequest2()
    },[apiResponse2])
    return (
        <div style={{marginTop:'60px'}}>
            <Row>
                <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow' style={{width:'370px', height:'180px'}}>
                    <Row>
                        <img alt='robots' src={Icontotal} style={{width:'25px',height:'25px', padding:'2px'}}/>
                        <p className={css(styles.text)}>Total Subscribers</p>
                    </Row>
                    <Row>
                        <p style={{paddingLeft:'45px', fontFamily:'Muli', fontWeight:'bold'}}> Number of Subscribers</p>
                    </Row>
                    <Row style={{display:'flex',justifyContent:'flex-end'}}>
                        <p style={{fontFamily:'Muli', fontWeight:'bold', fontSize:'55px',paddingRight:'24px' }}> {apiResponse['subscriber']} </p>
                    </Row>
                </div>
                <TopCard
                subscriber_no = {apiResponse['cpu']+'%'}
                service_name = 'Server Load'
                service_img = {Iconload} 
                />
                <TopCard
                subscriber_no = {apiResponse['memory']+'%'}
                service_name = 'RAM Usage'
                service_img = {Iconram} 
                />
            </Row>

            <Row>
            <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow pointer' style={{width:'100%'}}>
                    <Row>
                        <p style={{fontFamily:'Muli',fontWeight:'bold',fontSize:'20px', paddingLeft:'12px'}}>Top Subscribers</p>
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
                                    apiResponse2.map((usersaastable, i) => {
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