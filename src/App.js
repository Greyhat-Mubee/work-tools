import React, {useEffect, useState, SyntheticEvent} from 'react';
import { Column, Row } from 'simple-flexbox';
import { useGlobalEvent } from "beautiful-react-hooks";
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import lscache from 'lscache';
import './App.css';
import Sidebar from './Content/SIdebar/SideBar';
import HeaderComponent from './Content/Header/HeaderComponent';
import MainPage from './Content/mainPage';
import Login from './Content/Login/Login/Login';
import {login, change_selectedItem} from './redux_features/authSlice';
import Card from './Content/MainPage/Cards/Dashboard/Cards';
import { loadState } from './redux_features/localStorage';


const styles = StyleSheet.create({
  container: {
      height: '100%',
      minHeight: '100vh',
      width: '100%'
  },
  content: {
      marginTop: 54
  },
  mainBlock: {
      backgroundColor: '#F7F8FC',
      marginLeft: 255,
      paddingLeft: 30,
      paddingRight: 30,
      borderBottom: '30px',
      '@media(max-width: 768px)':{
        marginLeft:0
      }
  }
});

function App () {
  const dispatch = useDispatch()
  // function usePersistedState(key, defaultValue) {
  //   const [state, setState] = React.useState(
  //     () => JSON.parse(lscache.get(key)) || defaultValue
  //   );
  //   useEffect(() => {
  //     lscache.set(key, JSON.stringify(state), 90);
  //   }, [key, state]);
  //   return [state, setState];
  // }
  const loginVars = useSelector(login).payload.authentication.auth
  const [selectedItem, setselectedItem] = useState("");
  const [, setWindowWidth] = useState(window.innerWidth);
  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((event: SyntheticEvent) => {
    setWindowWidth(window.innerWidth);
  });
  
  return (
    <BrowserRouter>
      <div>
        <Row className={css(styles.container)}>
                  <Sidebar selectedItem={loadState("selectedItem")}
                          isSignedIn={loginVars.loginStatus} 
                          onChange={(selectedItem) => setselectedItem(selectedItem)}/>
                  <Column flexGrow={1} className={css(styles.mainBlock)}>
                  <HeaderComponent title={useSelector(login).payload.authentication.auth.SelectedItem}
                          auth_token={loginVars.token}
                          isSignedin={loginVars.loginStatus}
                          user_name = {loginVars.name}
                          />
                      {
                        loginVars.loginStatus === "true" || loginVars.loginStatus === true ?
                        <MainPage />
                        :<div>
                          <Login ClassName={css(styles.content)}/>
                        </div>
                      }
                  </Column>
              </Row>
      </div>
    </BrowserRouter>
      );
    }

export default App;