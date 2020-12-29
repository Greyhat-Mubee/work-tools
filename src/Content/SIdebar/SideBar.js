import React,{Component} from 'react';
import {Row, Column} from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import LogoComponent from './LogoComponent';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import SubMenu from './SubMenu';
import IconBurger from '../../assets/icon-burger';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


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



class Sidebar extends Component {

    state = { expanded: false };

    onItemClicked = (item) => {
        this.setState({ expanded: false });
        return this.props.onChange(item);    
    }

    isMobile = () => window.innerWidth <= 768;

    toggleMenu = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

    renderBurger = () => {
        return <div onClick={this.toggleMenu} className={css(styles.burgerIcon)}>
            <IconBurger />
        </div>
    }
    
    render(){
        const { expanded } = this.state;
        const {isSignedIn} = this.props;
        const isMobile = this.isMobile();
        
        return(
            <div>
                <Row className={css(styles.mainContainer)} breakpoints={{ 768: css(styles.mainContainerMobile, expanded && styles.mainContainerExpanded) }}>
                    {(isMobile && !expanded) && this.renderBurger()}
                    <Column className={css(styles.container)} breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
                        <LogoComponent />
                        {
                            isSignedIn === true ?
                            <Column className={css(styles.menuItemList)}>
                            <Router>
                            <Accordion defaultActiveKey="0">
                                <Card style={{backgroundColor:"#363740",borderStyle:"none"}}>
                                    <Card.Header style={{backgroundColor:"#363740", padding:0,marginTop:0}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{padding:0,margin:0}}>
                                    <Link to="/dashboard">
                                        <Menu
                                            title="Dashboard"
                                            onClick={() => this.onItemClicked('Dashboard')}
                                            active={this.props.selectedItem === 'Dashboard'}
                                        />
                                    </Link>
                                    </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                                <Card style={{backgroundColor:"#363740",borderStyle:"none"}}>
                                    <Card.Header style={{backgroundColor:"#363740", padding:0,marginTop:0}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{padding:0,margin:0}}>
                                    <Link to="/sophosaas">
                                        <Menu
                                            title="Sophos as a Service"
                                            onClick={() => this.onItemClicked('Sophos as a Service')}
                                            active={this.props.selectedItem === 'Sophos as a Service'}
                                        />
                                    </Link>
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1" style={{padding:0,margin:0}}>
                                    <Card.Body style={{padding:0, margin:0, backgroundColor:"#535463"}}>
                                        <Link to="/sophosaas/create subscriber">
                                            <SubMenu
                                                title="Create Subscriber"
                                                onClick={() => this.onItemClicked('Sophos > Create Subscriber')}
                                                active={this.props.selectedItem === 'Sophos > Create Subscriber'}
                                            />
                                        </Link>
                                        <Link to="/sophosaas/decommission">
                                            <SubMenu
                                                title="Decommission"
                                                onClick={() => this.onItemClicked('Sophos > Decommission')}
                                                active={this.props.selectedItem === 'Sophos > Decommission'}
                                            />
                                        </Link>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card style={{backgroundColor:"#363740",borderStyle:"none"}}>
                                    <Card.Header style={{backgroundColor:"#363740", padding:0,marginTop:0}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{padding:0,margin:0}}>
                                    <Link to="/fwb">
                                        <Menu
                                            title="Fixed Wireless"
                                            onClick={() => this.onItemClicked('Fixed Wireless Broadband')}
                                            active={this.props.selectedItem === 'Fixed Wireless Broadband'}
                                        />
                                    </Link>
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2" style={{padding:0,margin:0}}>
                                    <Card.Body style={{padding:0,margin:0, backgroundColor:"#535463"}}>
                                        <Link to="/fwb/create subscriber">
                                            <SubMenu
                                                title="Create Subscriber"
                                                onClick={() => this.onItemClicked('Fwb > Create Subscriber')}
                                                active={this.props.selectedItem === 'Fwb > Create Subscriber'}
                                            />
                                        </Link>
                                        <Link to="/fwb/query subscriber">
                                            <SubMenu
                                                title="Query Subscriber"
                                                onClick={() => this.onItemClicked('Fwb > Query Subscriber')}
                                                active={this.props.selectedItem === 'Fwb > Query Subscriber'}
                                            />
                                        </Link>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                           </Router>
                        </Column>   
                        :<div></div>
                        }
                        
                    </Column>
                    {isMobile && expanded && <div className={css(styles.outsideLayer)} onClick={this.toggleMenu}></div>}
                </Row>
            </div>
        )
    }
}

export default Sidebar;