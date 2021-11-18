import React, {useState} from 'react';
import {Row, Column} from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { useDispatch, useSelector } from 'react-redux';
import {Route, useLocation} from 'react-router-dom';
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

const styles = StyleSheet.create({
    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        left: 24,
        top: 34
    },
    container: {
        backgroundColor: '#363740',
        width: 255,
        paddingTop: 32,
        height: '100%'
    },
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 255,
        height: 'calc(100% - 32px)',
        zIndex: 901
    },
    mainContainer: {
        height: '100%',
        position:"fixed",
        minHeight: '100vh'
    },
    mainContainerMobile: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    mainContainerExpanded: {
        width: '100%',
        minWidth: '100vh',
    },
    menuItemList: {
        marginTop: 52
    },
    outsideLayer: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.50)',
        zIndex: 900
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    },
    hide: {
        left: -255
    },
    show: {
        left: 0
    }
});



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
        return <div onClick={toggleMenu} className={css(styles.burgerIcon)}>
            <IconBurger />
        </div>
    };
    const isSignedIn = useSelector(login).payload.authentication.auth.loginStatus;    
    const selectedItem = useSelector(login).payload.authentication.auth.selectedItem;    

    return(
        <div>
            <Row className={css(styles.mainContainer)} breakpoints={{ 768: css(styles.mainContainerMobile, expanded && styles.mainContainerExpanded) }}>
                {(isMobile() && !expanded) && renderBurger()}
                <Column className={css(styles.container)} breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
                    <LogoComponent />
                    {
                        isSignedIn === true || isSignedIn === "true" ?
                        <Column className={css(styles.menuItemList)}>
                        
                        <Accordion defaultActiveKey="0">
                            <Card style={{backgroundColor:"#363740",borderStyle:"none"}}>
                                <Card.Header style={{backgroundColor:"#363740", padding:0,marginTop:0}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{padding:0,margin:0}}>
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
                            <Card style={{backgroundColor:"#363740",borderStyle:"none"}}>
                                <Card.Header style={{backgroundColor:"#363740", padding:0,marginTop:0}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{padding:0,margin:0}}>
                                <NavLink to="/sophosaas">
                                    <Menu
                                        title="Sophos as a Service"
                                        onClick={() => onItemClicked('Sophos as a Service')}
                                        active={selectedItem === 'Sophos as a Service'}
                                    />
                                </NavLink>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1" style={{padding:0,margin:0}}>
                                <Card.Body style={{padding:0, margin:0, backgroundColor:"#535463"}}>
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
                            <Card style={{backgroundColor:"#363740",borderStyle:"none"}}>
                                <Card.Header style={{backgroundColor:"#363740", padding:0,marginTop:0}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{padding:0,margin:0}}>
                                <NavLink to="/fwb">
                                    <Menu
                                        title="Fixed Wireless"
                                        onClick={() => onItemClicked('Fixed Wireless Broadband')}
                                        active={selectedItem === 'Fixed Wireless Broadband'}
                                    />
                                </NavLink>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2" style={{padding:0,margin:0}}>
                                <Card.Body style={{padding:0,margin:0, backgroundColor:"#535463"}}>
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
                {isMobile && expanded && <div className={css(styles.outsideLayer)} onClick={toggleMenu}></div>}
            </Row>
        </div>
    )
}

export default Sidebar;