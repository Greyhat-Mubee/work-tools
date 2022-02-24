import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/COl';
const styles = StyleSheet.create({
    text:{
        paddingTop:"7px",
        fontFamily: 'Muli',
        fontSize: '17px',
        fontWeight:'bold',
        lineHeight: '12px',
        letterSpacing: '0.2px',
        color: 'black',
    }    }
)


const TopCard = (props) => {
    const {subscriber_no} = props
    const {service_name} = props
    const{service_img} = props
    return(
        <div className= ' dib br3 ba b--light-gray pa3 ma3 mt4 shadow' style={{width:'350px', height:'180px'}}>
            <Row>
                <Col md={2}><img alt='robots' src= {service_img} style={{height:'30px',width:'30px'}}/></Col>
                <Col><p className={css(styles.text)}>{service_name}</p></Col>
            </Row>
            <Row>
                <p style={{paddingLeft:'70px', fontFamily:'Muli', fontWeight:'bold'}}> Number of Subscribers</p>
            </Row>
            <Row>
                <p style={{fontFamily:'Muli', fontWeight:'bold', fontSize:'55px',paddingRight:'24px',display:'flex',justifyContent:'flex-end' }}> {subscriber_no} </p>
            </Row>
        </div>
    )
}

export default TopCard;