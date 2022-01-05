import React from 'react';
import "./Header.css";
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'simple-flexbox';
import user_pic from './userpic.png';
import { Link } from "react-router-dom";
import {logout, login,change_selectedItem} from '../../redux_features/authSlice';
 
function HeaderComponent (props) {
    const dispatch = useDispatch()
    const loginVars = useSelector(login).payload.authentication.auth
    const onItemClicked = (item) => {
        dispatch(change_selectedItem(item));    
    }
    const onLogoutClick = (item) => {
        onItemClicked('Login');
        dispatch(logout())
        localStorage.clear()
        return props.onChange(item)
    }
    return(
        <div>
            {
                loginVars.loginStatus === true || loginVars.loginStatus === 'true' ?
                <Row
                className="container"
                vertical="center"
                horizontal="space-between"
                >
                    <span className="title">
                        {loginVars.SelectedItem}
                    </span>
                    <Row vertical="center">
                        <div className="separator"></div>
                        <Row vertical="center">
                        <img src={user_pic} style={{height:"30px", marginRight:"15px"}} alt="avatar"/>
                        <p style={{fontFamily:"Muli", fontWeight:"bold",fontSize:"20px",paddingTop:"20px"}}>{loginVars.name}</p> 
                        <Link to="/login">
                            <button className="iconStyles"
                                onClick= {() => onLogoutClick(false)}
                            >
                            <img src="https://img.icons8.com/material/64/000000/exit.png" alt="avatar" className="avatar" />
                            <span className="name">Sign Out</span>
                            </button>
                        </Link>
                        </Row>
                    </Row>
                </Row>
                :<div>
                    <Row
                    className="container"
                    vertical="center"
                    horizontal="space-between"
                    >
                    <span className="title">{loginVars.SelectedItem}</span>
                    <Row vertical="center">
                        <div className="separator"></div>
                        <Row vertical="center">
                        <Link to="/login">
                        <button className="hideButton"
                         onClick= {() => onItemClicked('Login')}
                         id = 'login'
                        >
                            <img src="https://img.icons8.com/dotty/80/000000/login-rounded-right.png" alt="avatar" className="avatar" />
                            <span className="name">Login</span>
                            </button>
                        </Link>
                        </Row>
                    </Row>
                    </Row>
                </div>
            }  
        </div> 
    )}

export default HeaderComponent;
