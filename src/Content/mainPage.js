import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Route } from 'react-router-dom';
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
  

const MainPage = () => {
   
    return(
        <div>        
            <Route exact exact path='/sophosaas'>
                <SaasCard ClassName={css(styles.content)} />
            </Route> 
            <Route exact path='/'>
                <Card ClassName={css(styles.content)} />
            </Route>
                <Route exact path='/fwb'>
                <FwbCards/>
            </Route>    
            <Route exact path='/sophosaas/create subscriber'>    
                <CreateSubscriber/>
            </Route>
            <Route exact path='/sophosaas/decommission'>
                <Decommission />
            </Route>
            <Route exact path='/fwb/create subscriber'>
                <FwbCreate />
            </Route>
            <Route exact path='/fwb/query subscriber'>
                <QuerySubscriber />
            </Route>
        </div>
    )
}
export default MainPage