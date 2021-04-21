import React, {useEffect, useState, SyntheticEvent} from 'react';
import { Column, Row } from 'simple-flexbox';
import { useGlobalEvent } from "beautiful-react-hooks";
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter } from 'react-router-dom';
import lscache from 'lscache';
import './App.css';
import Sidebar from './Content/SIdebar/SideBar';
import HeaderComponent from './Content/Header/HeaderComponent';
import MainPage from './Content/mainPage';
import Login from './Content/Login/Login/Login';


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

function App () {
  
  function usePersistedState(key, defaultValue) {
    const [state, setState] = React.useState(
      () => JSON.parse(lscache.get(key)) || defaultValue
    );
    useEffect(() => {
      lscache.set(key, JSON.stringify(state), 90);
    }, [key, state]);
    return [state, setState];
  }
  const [selectedItem, setselectedItem] = usePersistedState('selectedItem','Login');
  const [isSignedIn, setisSignedIn] = usePersistedState('isSignedIn',false);;
  const [auth_token, setauth_token] = usePersistedState('auth_token',"");
  const [name, setname] = usePersistedState('name',"");
  const [, setWindowWidth] = useState(window.innerWidth);
  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((event: SyntheticEvent) => {
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    const path_dict = {
      '/':'Dashboard',
      '/sophosaas' : 'Sophos as a Service',
      '/sophosaas/create subscriber' : 'Sophos > Create Subscriber',
      '/sophosaas/decommission': 'Sophos > Decommission',
      '/fwb' : 'Fixed Wireless Broadband',
      '/fwb/create subscriber' : 'Fwb > Create Subscriber',
      '/fwb/query subscriber' : 'Fwb > Query Subscriber'
    }
    if (isSignedIn===true && document.location.pathname in path_dict) {
      setselectedItem(path_dict[document.location.pathname])
    }
  },[document.location.pathname])

  return (
    <BrowserRouter>
      <div>
        <Row className={css(styles.container)}>
                  <Sidebar selectedItem={selectedItem} 
                          onChange={(selectedItem) => setselectedItem(selectedItem)}
                          isSignedIn={isSignedIn} />
                  <Column flexGrow={1} className={css(styles.mainBlock)}>
                  <HeaderComponent title={selectedItem} 
                          onChange={(selectedItem) => setselectedItem(selectedItem)} 
                          auth_token={auth_token} 
                          isSignedin={isSignedIn}
                          user_name = {name}
                          onSignChange={(isSignedIn) => setisSignedIn(isSignedIn)}
                          />
                      {
                        isSignedIn === false ? 
                        <Login ClassName={css(styles.content)} 
                            isSignedIn={isSignedIn}
                            auth_token={auth_token} 
                            onChange={(isSignedIn) => setisSignedIn(isSignedIn)}
                            tokenChange={(auth_token) => setauth_token(auth_token)}
                            onSignChange={(selectedItem)=> setselectedItem(selectedItem)}
                            nameChange={(name) => setname(name)}
                            />
                        
                        :<div>
                          <MainPage 
                            isSignedIn={isSignedIn}
                            auth_token={auth_token}
                            selectedItem={selectedItem}
                            onChange={(selectedItem) => setselectedItem(selectedItem)}
                          />
                        </div> 
                      }
                  </Column>
              </Row>
      </div>
    </BrowserRouter>
      );
    }


export default App;