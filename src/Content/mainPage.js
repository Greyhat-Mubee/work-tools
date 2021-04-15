import React, {Component, useEffect, useState, SyntheticEvent} from 'react';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Card from './MainPage/Cards/Dashboard/Cards';
import SaasCard from './MainPage/Cards/Sophosaas/SaasCard';
import FwbCards from './MainPage/Cards/Fixed-wireless/fwbCard';
import CreateSubscriber from './MainPage/Cards/Sophosaas/CreateSubscriber/CreateSubscriber.1';
import Decommission from './MainPage/Cards/Sophosaas/Decommission/Decommision';
import FwbCreate from './MainPage/Cards/Fixed-wireless/Create_Subscriber/CreateSubscriber.1';
import QuerySubscriber from './MainPage/Cards/Fixed-wireless/Query_Subscriber/querySub'

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        marginLeft: 255,
        padding: 30,
        borderBottom: '30px',
        '@media(max-width: 768px)':{
          marginLeft:0
        }
    }
  });
  

const MainPage = (props) => {
    const {selectedItem , isSignedIn, auth_token} = props;
    const [SelectedItem, setSelectedItem] = useState(selectedItem);
    const [issignedin, setissignedin] = useState(isSignedIn);
    const [auth_Token, setauth_Token] = useState(auth_token);
    return(
        <div>
            
                <Switch>
                    {/* <Route path='/dashboard'>
                        <Card ClassName={css(styles.content)} selectedItem={selectedItem} 
                        onChange={(selectedItem) => setSelectedItem({ selectedItem })} 
                        auth_token={auth_token}/>
                    </Route>
                    <Route path='/fwb'>
                        <FwbCards auth_token={auth_token}/>
                    </Route>
                    <Route path='/sophosaas'>
                        <SaasCard ClassName={css(styles.content)}
                            auth_token={auth_token}
                            />
                    </Route>            */}
                        {
                            selectedItem === 'Sophos as a Service' && isSignedIn === true ? 
                            <Route path='/sophosaas'>
                                <SaasCard ClassName={css(styles.content)}
                                auth_token={auth_token}
                                />
                            </Route> 
                            : selectedItem === 'Dashboard' && isSignedIn === true?
                            <Route path='/dashboard'>
                                <Card ClassName={css(styles.content)} selectedItem={selectedItem} 
                                onChange={(selectedItem) => setSelectedItem({ selectedItem })} 
                                auth_token={auth_token}/>
                            </Route>
                            : selectedItem === 'Fixed Wireless Broadband' && isSignedIn === true?
                            <Route path='/fwb'>
                                <FwbCards auth_token={auth_token}/>
                            </Route>    
                            : selectedItem === 'Sophos > Create Subscriber' && isSignedIn === true?
                            <Route path='/sophosaas/create subscriber'>    
                                <CreateSubscriber auth_token={auth_token}/>
                            </Route>
                            : selectedItem === 'Sophos > Decommission' && isSignedIn === true?
                            <Route path='/sophosaas/decommission'>
                                <Decommission auth_token={auth_token}/>
                            </Route>
                            : selectedItem === 'Fwb > Create Subscriber' && isSignedIn === true?
                            <Route path='/fwb/create subscriber'>
                                <FwbCreate auth_token={auth_token}
                                onChange={(selectedItem) => setSelectedItem(selectedItem)}
                                />
                            </Route>
                            : selectedItem === 'Fwb > Query Subscriber' && isSignedIn === true?
                            <Route path='/fwb/query subscriber'>
                                <QuerySubscriber auth_token={auth_token}/>
                            </Route>
                            : <div></div>
                        }
                </Switch>
        </div>
    )
}

export default MainPage