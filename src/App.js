import React, {useEffect, useState, SyntheticEvent} from 'react';
import { Row ,Column } from 'simple-flexbox';
import { useGlobalEvent } from "beautiful-react-hooks";
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './App.css';
import Sidebare from './Content/SIdebar/Sidebar';
import HeaderComponent from './Content/Header/HeaderComponent';
import MainPage from './Content/mainPage';
import Login from './Content/Login/Login/Login';
import {login} from './redux_features/authSlice';
import { loadState } from './redux_features/localStorage';


function App () {
  let history = useHistory()
  const loginVars = useSelector(login).payload.authentication.auth
  const [, setselectedItem] = useState("");
  const [, setWindowWidth] = useState(window.innerWidth);
  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((event: SyntheticEvent) => {
    setWindowWidth(window.innerWidth);
  });
  useEffect(() => {
    if (loginVars.SelectedItem === 'Dashboard'){
      history.push("/")
    }
  }, [loginVars.loginStatus])

  return (
      <div>
          <Row className="containerss">
            <Sidebare selectedItem={loadState("selectedItem")}
                    isSignedIn={loginVars.loginStatus} 
                    onChange={(selectedItem) => setselectedItem(selectedItem)}/>
            <Column flexGrow={1} className='mainBlock'>
              <HeaderComponent
                      onChange={(selectedItem) => setselectedItem(selectedItem)}
                      />
                  {
                    loginVars.loginStatus === "true" || loginVars.loginStatus === true ?
                    <MainPage />
                    :<div>
                      <Login ClassName="content"/>
                    </div>
                  }
            </Column>
          </Row>
      </div>
      );
    }

export default App;