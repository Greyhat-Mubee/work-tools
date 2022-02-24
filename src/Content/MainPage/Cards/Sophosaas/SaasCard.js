import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TopCard from '../Dashboard/TopCard';
import SaasTopCard from './TopCard';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Icontotal from './totalSubscribers.png';
import Iconload from './systemload.png';
import Iconram from './systemram.png';
import {login} from '../../../../redux_features/authSlice';

const Card = (props) => { 
    const auth_token = useSelector(login).payload.authentication.auth.token;
    const [apiResponse, setapiResponse] = useState("");
    const [apiResponse2, setapiResponse2] = useState([]);
    function apiRequest(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
         axios({
             method: 'GET',
             url:'http://192.168.6.253:32598/sophosaas/dashboardstats',
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
    function apiRequest2(){
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
                    setapiResponse2(response.data);                                 
            }) 
            .catch(err=>{
                
            })
        }
    useEffect(()=>{
        apiRequest()
        apiRequest2()
    },[])
    return (
        <div className='cardsRow'>
            <Row>
                <TopCard
                    subscriber_no = {apiResponse['subscriber']}
                    service_name = 'Total Subscribers'
                    service_img = {Iconload} 
                />
                <SaasTopCard
                    subscriber_no = {apiResponse['cpu']+'%'}
                    service_name = 'Server Load'
                    service_img = {Iconload} 
                />
                <SaasTopCard
                    subscriber_no = {apiResponse['memory']+'%'}
                    service_name = 'RAM Usage'
                    service_img = {Iconram} 
                />
            </Row>
            <Row style={{width:'98%'}}>
            <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow pointer tableRow'>
                    <Row>
                        <p className='tableHeader'>Top Subscribers</p>
                    </Row>
                    <Row>
                    <Table striped bordered hover>
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