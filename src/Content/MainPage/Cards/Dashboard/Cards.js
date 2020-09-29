import React from 'react';
import Imageicon from './saasicon.png';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SaasCard from '../Sophosaas/SaasCard'

const styles = StyleSheet.create({
    imageicons:{
        height:'190px',
        width: '110px',
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

const Card = () => { 
    return (
        
        <Router>
        <Link to="/sophosaas">
        <div className= 'tc dib br3 ba b--light-gray pa3 ma2 bw2 pointer w5'>
            <img alt='robots' src= {Imageicon} className={css(styles.imageicons)}/>
            <div className={css(styles.separator)}></div>
            <div>
                <p className={css(styles.text)}>Sophos as a service</p>
            </div>
        </div>
        </Link>
        <Switch>
            <Route path="/sophosaas/">
                <SaasCard/>
            </Route>    
        </Switch>
        </Router>
    )
}
export default Card;