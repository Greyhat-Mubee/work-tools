import React, {useState} from 'react';
import { StyleSheet, css } from 'aphrodite';
import {  Route, useLocation} from 'react-router-dom';
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
    const {selectedItem , auth_token} = props;
    const [, setSelectedItem] = useState(selectedItem);
    let location = useLocation();
    
    React.useEffect(() => {
        const path_dict = {
            '/':'Dashboard',
            '/sophosaas' : 'Sophos as a Service',
            '/sophosaas/create subscriber' : 'Sophos > Create Subscriber',
            '/sophosaas/decommission': 'Sophos > Decommission',
            '/fwb' : 'Fixed Wireless Broadband',
            '/fwb/create subscriber' : 'Fwb > Create Subscriber',
            '/fwb/query subscriber' : 'Fwb > Query Subscriber'
          }
        const onItemClicked = (item) => {
            return props.onChange(path_dict[item]);    
        }
    
        onItemClicked([location.pathname]);
    }, [location]);
  

    return(
        <div>        
            <Route exact exact path='/sophosaas'>
                <SaasCard ClassName={css(styles.content)}
                auth_token={auth_token}
                />
            </Route> 
            <Route exact path='/'>
                <Card ClassName={css(styles.content)} selectedItem={selectedItem} 
                onChange={(selectedItem) => setSelectedItem({ selectedItem })} 
                auth_token={auth_token}/>
            </Route>
                <Route exact path='/fwb'>
                <FwbCards auth_token={auth_token}/>
            </Route>    
            <Route exact path='/sophosaas/create subscriber'>    
                <CreateSubscriber auth_token={auth_token}/>
            </Route>
            <Route exact path='/sophosaas/decommission'>
                <Decommission auth_token={auth_token}/>
            </Route>
            <Route exact path='/fwb/create subscriber'>
                <FwbCreate auth_token={auth_token}
                onChange={(selectedItem) => setSelectedItem(selectedItem)}
                />
            </Route>
            <Route exact path='/fwb/query subscriber'>
                <QuerySubscriber auth_token={auth_token}/>
            </Route>
        </div>
    )
}

export default MainPage