import React from 'react';
import { Route } from 'react-router-dom';
import Card from './MainPage/Cards/Dashboard/Cards';
import SaasCard from './MainPage/Cards/Sophosaas/SaasCard';
import FwbCards from './MainPage/Cards/Fixed-wireless/fwbCard';
import CreateSubscriber from './MainPage/Cards/Sophosaas/CreateSubscriber/CreateSubscriber.1';
import Decommission from './MainPage/Cards/Sophosaas/Decommission/Decommision';
import FwbCreate from './MainPage/Cards/Fixed-wireless/Create_Subscriber/CreateSubscriber.1';
import QuerySubscriber from './MainPage/Cards/Fixed-wireless/Query_Subscriber/querySub';
import SubscriberDetails from './MainPage/Cards/Fixed-wireless/Query_Subscriber/Subscriber_Details/SubscriberDetails';
import "./mainPage.css"

const MainPage = () => {   
    return(
        <div>        
            <Route exact exact path='/sophosaas'>
                <SaasCard ClassName="mainPagecontent" />
            </Route> 
            <Route exact path='/'>
                <Card ClassName="mainPagecontent" />
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
            <Route path='/fwb/query subscriber/:username'>
                <SubscriberDetails/>
            </Route>
        </div>
    )
}
export default MainPage