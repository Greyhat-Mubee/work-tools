import React from 'react';
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
    return (
        <div style={{marginTop:'60px'}}>
            <Row>
                <div className= ' dib br3 ba b--light-gray pa3 ml3 ma3 mt4 shadow pointer' style={{width:'370px', height:'180px'}}>
                    <Row>
                        <img alt='robots' src={Icontotal} style={{width:'25px',height:'25px', padding:'2px'}}/>
                        <p className={css(styles.text)}>Total Subscribers</p>
                    </Row>
                    <Row>
                        <p style={{paddingLeft:'45px', fontFamily:'Muli', fontWeight:'bold'}}> Number of Subscribers</p>
                    </Row>
                    <Row style={{display:'flex',justifyContent:'flex-end'}}>
                        <p style={{fontFamily:'Muli', fontWeight:'bold', fontSize:'55px',paddingRight:'24px' }}> {67} </p>
                    </Row>
                </div>
                <TopCard
                subscriber_no = {34}
                service_name = 'Server Load'
                service_img = {Iconload} 
                />
                <TopCard
                subscriber_no = {12}
                service_name = 'RAM Usage'
                service_img = {Iconram} 
                />
                <TopCard
                subscriber_no = {12}
                service_name = 'Average Bandwidth'
                service_img = {Iconband} 
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
                            <th>Bandwidth Usage</th>
                            <th>Top application</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Row>
                </div>
            </Row>

                
        </div>
    )
}
export default Card;