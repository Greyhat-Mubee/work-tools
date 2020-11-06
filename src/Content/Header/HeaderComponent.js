import React, {Component} from 'react';
import { string } from 'prop-types';
import { Row, Column } from 'simple-flexbox';
import user_pic from './userpic.png';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const styles = StyleSheet.create({
    avatar: {
        height: 20,
        width: 20,
        borderRadius: 50,
        border: '1px solid #DFE0EB'
    },
    container: {
        height: 40,
    },
    cursorPointer: {
        cursor: 'pointer',
        paddingLeft:'5px'
    },
    name: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '10px',
        textAlign: 'right',
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3,
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 1366px)': {
            marginLeft: 40
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        },
    hideButton:{
       visibility:"hidden", 
    }
    }
});

class HeaderComponent extends Component {
    onItemClicked = (item) => {
        return this.props.onChange(item);    
    }

    onLogoutClick = (item) => {
        this.onItemClicked('Login')
        return this.props.onSignChange(item)
    }
       
    render (){
        const { icon, title,isSignedin, user_name} = this.props;
        if (isSignedin === true) {
            return (
                <Router>
                    <Row
                    className={css(styles.container)}
                    vertical="center"
                    horizontal="space-between"
                    >
                    <span className={css(styles.title)}>{title}</span>
                    <Row vertical="center">
                        <div className={css(styles.separator)}></div>
                        <Row vertical="center">
                        <img src={user_pic} style={{height:"30px", marginRight:"15px"}}/>
                        <p style={{fontFamily:"Muli", fontWeight:"bold",fontSize:"20px",paddingTop:"20px"}}>{user_name}</p> 
                        <Link to="/logout">
                            <button className={css(styles.iconStyles)}
                              onClick= {() => this.onLogoutClick(false)}
                            >
                            <img src="https://img.icons8.com/material/64/000000/exit.png" alt="avatar" className={css(styles.avatar)} />
                            <span className={css(styles.name, styles.cursorPointer)}>Sign Out</span>
                            </button>
                        </Link>
                        </Row>
                    </Row>
                    </Row>
                </Router>
            )
        } else {
            return (
                <Router>
                <Row
                    className={css(styles.container)}
                    vertical="center"
                    horizontal="space-between"
                >
                    <span className={css(styles.title)}>{title}</span>
                    <Row vertical="center">
                        <div className={css(styles.separator)}></div>
                        <Row vertical="center">
                        <Link to="/login">
                        <button className={css(styles.hideButton)}
                         onClick= {() => this.onItemClicked('Login')}
                         id = 'login'
                        >
                            <img src="https://img.icons8.com/dotty/80/000000/login-rounded-right.png" alt="avatar" className={css(styles.avatar)} />
                            <span className={css(styles.name, styles.cursorPointer)}>Login</span>
                            </button>
                        </Link>    
                        
                        </Row>
                    </Row>
                    </Row>
                </Router>
                )
        }
        
    }
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
