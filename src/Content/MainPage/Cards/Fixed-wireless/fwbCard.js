import React, {useState, useEffect} from 'react';
import './fwbCard.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TopCard from '../Dashboard/TopCard';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Icontotal from './totalSubscribers.png';
import Iconactive from './activeSub.png';
import Iconsus from './suspendSub.png';
import {login} from '../../../../redux_features/authSlice';

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
        "suspend": "Suspended",
        "movamo": "Movamo",
        "PLAN25": "25/25 Mbps"
    }
    const [apiResponse, setapiResponse] = useState("");
    const [apiResponse2, setapiResponse2] = useState([]);
    const [apiResponse3, setapiResponse3] = useState([]);
    
    const auth_token = useSelector(login).payload.authentication.auth.token;
    function apiRequest(){
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
             axios({
                 method: 'GET',
                 url:'http://192.168.6.253:32598/fwb/dashboardstats',
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
                url:'http://192.168.6.253:32598/fwb/topplans',
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
    function apiRequest3(){
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
                    setapiResponse3(response.data);                                 
            }) 
            .catch(err=>{
                
            })
        }
    useEffect(()=>{
        apiRequest()
        apiRequest2()
        apiRequest3()
    },[])

    return (
        <div className='cardsRow'>
            <Row>
                <TopCard
                    subscriber_no = {apiResponse['total']}
                    service_name = 'Total Subscribers'
                    service_img = {Icontotal} 
                    />
                <TopCard
                    subscriber_no = {apiResponse['active']}
                    service_name = 'Active Subscribers'
                    service_img = {Iconactive} 
                    />
                <TopCard
                    subscriber_no = {apiResponse['suspend']}
                    service_name = 'Suspended Subscribers'
                    service_img = {Iconsus} 
                    />
            </Row>

            <Row style={{width:'98%'}}>
            <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow pointer tableRow'>
                    <Row>
                        <p className='tableHeader'>Top Subscriber Plans</p>
                    </Row>
                    <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Bandwidth</th>
                            <th>Number of Subscribers</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                    apiResponse2.map((userdetstable, i) => {
                                    return(
                                        <tr>
                                        <td>{i+1}</td>
                                        <td>{subscriber_plans[userdetstable['Plan']]}</td>
                                        <td>{userdetstable['Subscribers']}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    </Row>
                </div>
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
                            <th>PLAN</th>
                            <th>DATE </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            apiResponse3.map((userdetstables, i) => {
                            return(
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{userdetstables[0]}</td>
                                    <td>{subscriber_plans[userdetstables[1]]}</td>
                                    <td>{userdetstables[2]}</td>
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