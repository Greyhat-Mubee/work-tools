import React,{Component} from 'react';
import {Row} from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Logo from './logo.jpg';

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: 'white',
        opacity: 0.7,
        marginLeft: 12
    },
    logoimg: {
        height:'50px',
        width: '50px',
        borderRadius:'130px',
        marginRight: 16
        
    }
});

class LogoComponent extends Component {
    
    render(){
        return(
            <Row className={css(styles.container)} horizontal="center" vertical="center">
                <img src={Logo} className={css(styles.logoimg)} alt='Logo'/>
                <span className={css(styles.title)}>Work Tools</span>
            </Row>
        )
    }
}

export default LogoComponent;