import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import './fwbCard.css'
import createlogo from './Create Subscriber.png';
import decommlogo from './Decommission.png';
import {Row, Coloum} from 'simple-flexbox';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Create_Subscriber from './Create_Subscriber/CreateSubscriber.1';
 
const styles = StyleSheet.create({
    contentpage:{
        position:"absolute",
        paddingTop:"40px"
    }
    ,imageicons:{
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

const FwbCards = (props) => {
    const {auth_token} = props
    return(
    <div className={css(styles.contentpage)}>   
    <Row>
        <Router>
            <Link to="/fwb/createsubscriber">
                <div className= 'tc dib br3 backcolor ba b--light-gray pa3 ma2 bw2 pointer w5'>
                    <img alt='robots' src= {createlogo} className={css(styles.imageicons)}/>
                    <div className={css(styles.separator)}></div>
                    <div>
                        <p className={css(styles.text)}>Create Subscriber</p>
                    </div>
                </div>
            </Link>
            <Link to="/fwb/querysubscriber">
            <div className= 'tc dib br3 ba b--light-gray pa3 ma2 bw2 pointer w5'>
                <img alt='robots' src= {decommlogo} className={css(styles.imageicons)}/>
                <div className={css(styles.separator)}></div>
                <div>
                    <p className={css(styles.text)}>Query Subscriber</p>
                </div>
            </div>
            </Link>
            <Switch>
                <Route path="/fwb/createsubscriber">
                    <Create_Subscriber auth_token={auth_token}/>
                </Route>
                <Route path="/fwb/querysubscriber" >
                </Route>
            </Switch>
        </Router>
    </Row>
    </div> 
    )
}

export default FwbCards;