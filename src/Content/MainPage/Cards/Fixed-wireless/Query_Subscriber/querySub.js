import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuerySubscriber.css';
import searchimg from './search.png';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Switch, Route,useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import SubscriberDetails from './Subscriber_Details/SubscriberDetails';
import RingLoader from "react-spinners/GridLoader";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {login} from '../../../../../redux_features/authSlice';
import { query, query_success } from '../../../../../redux_features/fwbQuerySlice';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'transparent',
    },
    root: {
        backgroundColor: '#F7F8FC',
        marginTop: '4em',
        marginLeft:'40px'
    },
    tabStyle:{
        fontFamily: 'Muli',
        fontWeight:'bolder',
        fontSize:'17px'
    },
    Panel: {
        borderStyle:'solid',
        borderTopWidth: 0,
        borderWidth: '4px',
        height: '78vh',
        borderColor: '#ebeefa'
    }
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const QuerySubscriber = (props) =>{
    const auth_token = useSelector(login).payload.authentication.auth.token;
    const [searchName, setsearchName] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    let history = useHistory();
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    function apiRequest(){
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios({
            method: 'POST',
            url:'http://192.168.6.253:32598/fwb/querysubscriber/name',
            data:{
            "name": searchName,
            },
            headers:{
            'Authorization': 'Bearer '+ auth_token
            }
        }) 
            .then(function(response){
                dispatch(query_success(response.data))
                handleClose(query_success(response.data));
                history.push(`/fwb/query subscriber/${searchName}`)
                sethasLoaded('loaded');               
                }) 
            .catch(err=>{
                handleClose();
                sethasLoaded('loadingError');
                    
            })
        }

        function apiRequest2(){
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios({
                method: 'POST',
                url:'http://192.168.6.253:32598/fwb/querysubscriber/subip',
                data:{
                "ip_address": searchName,
                },
                headers:{
                'Authorization': 'Bearer '+ auth_token
                }
            }) 
                .then(function(response){
                        dispatch(query_success(response.data))
                        handleClose(query_success(response.data));
                        history.push(`/fwb/query subscriber/${searchName}`)
                        sethasLoaded('loaded');
                }) 
                .catch(err=>{
                    handleClose();
                    sethasLoaded('loadingError');
                        
                })
            }
    
     function validateForm() {
        return searchName.length > 0 ;
      }
    function handleSubmit(event) {
        setOpen(true)
        apiRequest();
        event.preventDefault();
        }
    function handleSubmit2(event) {
        setOpen(true)
        apiRequest2();
        event.preventDefault();
        }
    return(
        <Switch>
        <div className='contentpage'>
            <Backdrop className={classes.backdrop} open={open}>
                <RingLoader
                        size={42}
                        color={"#3678D7"}
                        loading={true}
                    />  
            </Backdrop>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab className={classes.tabStyle}  label="Query by Name" {...a11yProps(0)} />
                    <Tab className={classes.tabStyle}label="Query by IP" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                  <TabPanel value={value} index={0} dir={theme.direction} className={classes.Panel}>
                  <Row className='centered'>  
                    <form className="formstyle" onSubmit={handleSubmit}>
                    <input onChange={e => setsearchName(e.target.value)}
                        className="ml-3 w-50 searchinput" type="text" placeholder="Subscriber Name" aria-label="Search" />
                    {/* Tried to use react router to make to change the url onSubmit but for some reason i get a blank screen if you can please try and fix this. Thanks */}
                    <button className="searchbtn" block disabled={!validateForm()} type="submit">
                        <img src= {searchimg} className="" alt='search icon'/>
                    </button>
                    </form> 
                </Row>
                <Row className='centeredrd'>
                {
                    hasLoaded === 'loadingError' ? 
                    <p style={{color:'red', paddingTop:"20px"}}>Search error check subscriber name and try again</p>
                    :<div></div>
                }
                </Row>
                  </TabPanel>

                  <TabPanel value={value} index={1} dir={theme.direction} className={classes.Panel}>
                    <Row className='centered'>  
                        <form className="formstyle" onSubmit={handleSubmit2}>
                        <input onChange={e => setsearchName(e.target.value)}
                            className="ml-3 w-50 searchinput" type="text" placeholder="Subscriber IP" aria-label="Search" />
                        <button className="searchbtn" block disabled={!validateForm()} type="submit">
                            <img src= {searchimg} className="" alt='search icon'/>
                        </button>
                        </form> 
                    </Row>
                    <Row className='centeredrd'>
                    {
                        hasLoaded === 'loadingError' ? 
                        <p style={{color:'red', paddingTop:"20px"}}>Search error check subscriber name and try again</p>
                        :<div></div>
                    }
                    </Row>                      
                  </TabPanel>
              </div>
            {/* {
                hasLoaded === 'loaded'?
                <div>
                    <SubscriberDetails subscriberdata={apiResponse}/>
                </div>
                :<div></div>
            } */}
                
            
        </div>
        </Switch>
    )
}

export default QuerySubscriber

