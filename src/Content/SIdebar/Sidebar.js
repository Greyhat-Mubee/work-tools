import React, {useState} from 'react';
import { Column, Row } from 'simple-flexbox';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import LogoComponent from './LogoComponent';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import createlogo from './newSub.png';
import decommlogo from './query.png';
import createlogoSaas from './Create Subscriber.png';
import decommlogoSaas from './Decommission.png';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Menu from './Menu';
import SubMenu from './SubMenu';
import MapIPAddress from '../MainPage/Cards/Fixed-wireless/Query_Subscriber/Subscriber_Details/mapIPAddress';
import IconBurger from '../../assets/icon-burger';
import { NavLink } from "react-router-dom";
import { change_selectedItem, login } from '../../redux_features/authSlice';

function SideBar (props) {
    const [expanded, setexpanded] = useState(false);
    const dispatch = useDispatch()
    let location = useLocation();
    function onItemClicked(item) {

        setexpanded(false);
    }
    
    function CustomAccordion({ name, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey);
        return (
            <Menu
            title={name}
            onClick={() => onItemClicked({name})}
            active={selectedItem === name}
            onClick={decoratedOnClick}
        />
        );
      }
    React.useEffect(() => {
        const path_dict = {
            '/':'Dashboard',
            '/sophosaas' : 'Sophos as a Service',
            '/sophosaas/create subscriber' : 'Sophos > Create Subscriber',
            '/sophosaas/decommission': 'Sophos > Decommission',
            '/fwb' : 'Fixed Wireless Broadband',
            '/fwb/create subscriber' : 'Fwb > Create Subscriber',
            '/fwb/query subscriber' : 'Fwb > Query Subscriber',
            '/login': 'Login'
          }
        const onItemClick = (item) => {
            return props.onChange(path_dict[item]);    
        }
        dispatch(change_selectedItem(path_dict[location.pathname]))    
        onItemClick([location.pathname]);
    }, [location.pathname]);
    
    const isMobile = () => window.innerWidth <= 768;
    const toggleMenu = () => setexpanded(!expanded);
    const renderBurger = () => {
        console.log("isMobile")
        return <div onClick={toggleMenu} className="burgerIcon">
            <IconBurger />
        </div>
    };
    const isSignedIn = useSelector(login).payload.authentication.auth.loginStatus;    
    const selectedItem = useSelector(login).payload.authentication.auth.SelectedItem;
    return(
        <div>
            <Row className="mainContainer" breakpoints={{ 768: ('mainContainerMobile', expanded && 'mainContainerExpanded')}}>
            {(isMobile() && !expanded) && renderBurger()}
                <Column className="containers" breakpoints={{ 768: ('containerMobile', expanded ? 'show' : 'hide')}}>
                    <LogoComponent />
                    {
                        isSignedIn === true || isSignedIn === "true" ?
                        <Column className="menuItemList">     
                        <Accordion defaultActiveKey="0">
                            <Card bsPrefix="sidebarCard">
                                <Card.Header bsPrefix="sidebarCardHeader">
                                    <Accordion.Item eventKey="0" bsPrefix='menuContainer'>
                                            <NavLink to="/" className="linkText">
                                                <Menu
                                                    title="Dashboard"
                                                    onClick={() => onItemClicked('Dashboard')}
                                                    active={selectedItem === 'Dashboard'}
                                                />
                                            </NavLink>
                                    </Accordion.Item>
                                </Card.Header>
                            </Card> 
                            <Card bsPrefix="sidebarCard">
                                <Card.Header bsPrefix="sidebarCardHeader">
                                <Accordion.Item eventKey="1" bsPrefix="menuContainer">
                                <NavLink to="/sophosaas" className="linkText">
                                    <CustomAccordion
                                        name="Sophos as a Service"
                                        eventKey="1"
                                    />
                                </NavLink>
                                </Accordion.Item>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1" className="cardToggle">
                                <Card.Body bsPrefix="sidebarCardSubmenu">
                                    <NavLink to="/sophosaas/create subscriber" className="linkText">
                                        <SubMenu
                                            icon = {createlogoSaas}
                                            title="Create Subscriber"
                                            onClick={() => onItemClicked('Sophos > Create Subscriber')}
                                            active={selectedItem === 'Sophos > Create Subscriber'}
                                        />
                                    </NavLink>
                                    <NavLink to="/sophosaas/decommission" className="linkText">
                                        <SubMenu
                                            icon = {decommlogoSaas}
                                            title="Decommission"
                                            onClick={() => onItemClicked('Sophos > Decommission')}
                                            active={selectedItem === 'Sophos > Decommission'}
                                        />
                                    </NavLink>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card bsPrefix="sidebarCard">
                                <Card.Header bsPrefix="sidebarCardHeader">
                                <Accordion.Item eventKey="2" bsPrefix="menuContainer">
                                <NavLink to="/fwb" className="linkText">
                                <CustomAccordion
                                        name="Fixed Wireless Broadband"
                                        eventKey="2"
                                    />
                                </NavLink>
                                </Accordion.Item>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2" className="cardToggle">
                                <Card.Body bsPrefix="sidebarCardSubmenu">
                                    <NavLink to="/fwb/create subscriber" className="linkText">
                                        <SubMenu
                                            icon = {createlogo}
                                            title="Create Subscriber"
                                            onClick={() => onItemClicked('Fwb > Create Subscriber')}
                                            active={selectedItem === 'Fwb > Create Subscriber'}
                                        />
                                    </NavLink>
                                    <NavLink to="/fwb/query subscriber" className="linkText">
                                        <SubMenu
                                            icon = {decommlogo}
                                            title="Query Subscriber"
                                            onClick={() => onItemClicked('Fwb > Query Subscriber')}
                                            active={selectedItem === 'Fwb > Query Subscriber'}
                                        />
                                    </NavLink>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Column>   
                    :<div></div>
                    }
                    
                </Column>
                {isMobile && expanded && <div className='outsideLayer' onClick={toggleMenu}></div>}
            </Row>
        </div>
    )
}

export default SideBar;