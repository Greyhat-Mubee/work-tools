import React from 'react';
import Imageicon from './saasicon.png';
import { StyleSheet, css } from 'aphrodite';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import wireless_img from './wireless.png'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SaasCard from '../Sophosaas/SaasCard'
import FwbCards from '../Fixed-wireless/fwbCard'

const styles = StyleSheet.create({
    imageicons:{
        height:'190px',
        width: '110px',
        justifyContent:'center',
        borderRadius:'10px',
        paddingTop:"30px",
        paddingBottom:"80px",
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
        paddingTop:'30px',
        fontFamily: 'Muli',
        fontSize: '20px',
        fontWeight:'bold',
        textAlignLast:'center',
        lineHeight: '12px',
        letterSpacing: '0.2px',
        color: 'black',
    }
    }
)

const Card = (props) => { 
    return (
        <Router>
        <Row>
        <Link to="/sophosaas">
        <div className= 'tc dib br3 ba b--light-gray pa3 ma2 bw2 pointer w5'>
            <img alt='robots' src= {Imageicon} className={css(styles.imageicons)}/>
            <div className={css(styles.separator)}></div>
            <div>
                <p className={css(styles.text)}>Sophos as a service</p>
            </div>
        </div>
        </Link>
        <Link to="/fwb" onClick={props.selectedItem === 'Fixed Wireless Broadband'}>
        <div className= 'tc dib br3 ba b--light-gray pa3 ma2 bw2 pointer w5'>
            <img alt='robots' src= {wireless_img} className={css(styles.imageicon)}/>
            <div className={css(styles.separator)}></div>
            <div>
                <p className={css(styles.text)}>Fixed Wireless</p>
            </div>
        </div>
        </Link>
        </Row>
        </Router>
    )
}
export default Card;