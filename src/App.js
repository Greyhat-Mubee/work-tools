import React, {Component} from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import './App.css';
import Scroll from './Content/MainPage/Scroll'
import Sidebar from './Content/SIdebar/SideBar';
import HeaderComponent from './Content/Header/HeaderComponent'
import Card from './Content/MainPage/Cards/Dashboard/Cards';
import SaasCard from './Content/MainPage/Cards/Sophosaas/SaasCard';
import Login from './Content/Login/Login/Login';
import FwbCards from './Content/MainPage/Cards/Fixed-wireless/fwbCard';

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
      borderBottom: '30px'
  }
});

class App extends Component{
  state = { selectedItem: '',
            isSignedIn: true,
            auth_token: ""
    };
    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();
  render(){
    const { selectedItem, isSignedIn, auth_token } = this.state;
  return (
    <div>
      <Row className={css(styles.container)}>
                <Sidebar selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                <Column flexGrow={1} className={css(styles.mainBlock)}>
                    <HeaderComponent title={selectedItem} 
                        onChange={(selectedItem) => this.setState({ selectedItem })} 
                        isSignedin={isSignedIn}
                        onSignChange={(isSignedIn) => this.setState({ isSignedIn })}
                        />
                     {
                       selectedItem === 'Login'? 
                       <Login ClassName={css(styles.content)} 
                          isSignedIn={isSignedIn}
                          auth_token={auth_token} 
                          onChange={(isSignedIn) => this.setState({ isSignedIn })}
                          tokenChange={(auth_token) => this.setState({auth_token})}
                          />
                      : selectedItem === 'Sophos as a Service' && isSignedIn === true ? 
                      <SaasCard ClassName={css(styles.content)}
                        auth_token={auth_token}
                      />
                      : selectedItem === 'Dashboard' && isSignedIn === true?
                      <Card ClassName={css(styles.content)}/>
                      : selectedItem === 'Fixed Wireless Broadband' && isSignedIn === true?
                      <FwbCards/>
                      :<Login ClassName={css(styles.content)} 
                      isSignedIn={isSignedIn}
                      auth_token={auth_token} 
                      onChange={(isSignedIn) => this.setState({ isSignedIn })}
                      tokenChange={(auth_token) => this.setState({auth_token})}
                      />
                     }
                </Column>
            </Row>
    </div>
    );
  }
}

export default App;