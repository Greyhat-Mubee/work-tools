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
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import SubMenu from './SubMenu';
import IconBurger from '../../assets/icon-burger';
import { NavLink } from "react-router-dom";
import { change_selectedItem, login } from '../../redux_features/authSlice';

function Sidebar (props) {
    const [expanded, setexpanded] = useState(false);
    const dispatch = useDispatch()
    let location = useLocation();
    function onItemClicked(item) {

        setexpanded(false);
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
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="cardToggle">
                                <NavLink to="/">
                                    <Menu
                                        title="Dashboard"
                                        onClick={() => onItemClicked('Dashboard')}
                                        active={selectedItem === 'Dashboard'}
                                    />
                                </NavLink>
                                </Accordion.Toggle>
                                </Card.Header>
                            </Card>
                            <Card bsPrefix="sidebarCard">
                                <Card.Header bsPrefix="sidebarCardHeader">
                                <Accordion.Toggle as={Button} variant="link" eventKey="1" className="cardToggle">
                                <NavLink to="/sophosaas">
                                    <Menu
                                        title="Sophos as a Service"
                                        onClick={() => onItemClicked('Sophos as a Service')}
                                        active={selectedItem === 'Sophos as a Service'}
                                    />
                                </NavLink>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1" className="cardToggle">
                                <Card.Body bsPrefix="sidebarCardSubmenu">
                                    <NavLink to="/sophosaas/create subscriber">
                                        <SubMenu
                                            icon = {createlogoSaas}
                                            title="Create Subscriber"
                                            onClick={() => onItemClicked('Sophos > Create Subscriber')}
                                            active={selectedItem === 'Sophos > Create Subscriber'}
                                        />
                                    </NavLink>
                                    <NavLink to="/sophosaas/decommission">
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
                                <Accordion.Toggle as={Button} variant="link" eventKey="2" className="cardToggle">
                                <NavLink to="/fwb">
                                    <Menu
                                        title="Fixed Wireless"
                                        onClick={() => onItemClicked('Fixed Wireless Broadband')}
                                        active={selectedItem === 'Fixed Wireless Broadband'}
                                    />
                                </NavLink>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2" className="cardToggle">
                                <Card.Body bsPrefix="sidebarCardSubmenu">
                                    <NavLink to="/fwb/create subscriber">
                                        <SubMenu
                                            icon = {createlogo}
                                            title="Create Subscriber"
                                            onClick={() => onItemClicked('Fwb > Create Subscriber')}
                                            active={selectedItem === 'Fwb > Create Subscriber'}
                                        />
                                    </NavLink>
                                    <NavLink to="/fwb/query subscriber">
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

export default Sidebar;