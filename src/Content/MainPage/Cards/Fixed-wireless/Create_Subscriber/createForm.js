import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function CreateSubForm() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Automatic IP Assignment" {...a11yProps(0)} />
          <Tab label="Manual IP Assignment" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
                
            <form onSubmit={handleSubmit}>
                <p className="f3 fw6 ph0 mh0 pt4">Create Subscriber</p>
                    <FormGroup controlId="subscriberName">
                    <FormLabel>Subscriber Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={subscriberName}
                        onChange={e => setsubscriberName(e.target.value)}
                    />
                    </FormGroup>
                    <Row>
                        <Col>
                        <FormGroup controlId="vlanID">
                        <FormLabel>VLAN ID</FormLabel>
                        <FormControl
                        value={vlanID}
                        onChange={e => setvlanID(e.target.value)}
                        type="number"
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="pop">
                        <FormLabel>POP</FormLabel>
                        <FormControl as="select"  value={pop}
                            onChange={e => setpop(e.target.value)}
                            >
                            <option>VI POP</option>
                            <option>LEKKI POP</option>
                            <option>IKOTA POP</option>
                            <option>TANGO POP</option>
                            <option>CRESTVIEW POP</option>
                            <option>NETCOM POP</option>
                            <option>CBN POP</option>
                            <option>ABUJA POP</option>
                            <option>CBN ABUJA POP</option>
                            <option>MEDALLION POP</option>
                            <option>SAKA 18 POP</option>
                            <option>SAKA 25 POP</option>
                            <option>IJORA POP</option>
                            <option>IKORODU POP</option>
                        </FormControl>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                        <FormGroup controlId="pop">
                        <FormLabel>Subnet</FormLabel>
                        <FormControl as="select"  value={lanSubnetAddress}
                            onChange={e => setlanSubnetAddress(e.target.value)}
                            >
                            <option> /29</option>
                            <option> /30</option>
                        </FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="pop">
                        <FormLabel>Subscriber Plan</FormLabel>
                        <FormControl as="select"  value={SubscriberPlan}
                            onChange={e => setSubscriberPlan(e.target.value)}
                            >
                            <option>1/1 Mbps</option>
                            <option>2/2 Mbps</option>
                            <option>3/3 Mbps</option>
                            <option>4/4 Mbps</option>
                            <option>5/5 Mbps</option>
                            <option>6/6 Mbps</option>
                            <option>7/7 Mbps</option>
                            <option>8/8 Mbps</option>
                            <option>10/10 Mbps</option>
                            <option>12/12 Mbps</option>
                            <option>15/15 Mbps</option>
                            <option>20/20 Mbps</option>
                            <option>28/28 Mbps</option>
                            <option>30/30 Mbps</option>
                            <option>45/45 Mbps</option>
                            <option>50/50 Mbps</option>
                            <option>60/60 Mbps</option>
                            <option>80/80 Mbps</option>
                            <option>100/100 Mbps</option>
                            <option>255/255 Mbps</option>
                            <option>400/400 Mbps</option>
                            <option>2/2 Mbps (Night)</option>
                            <option>4/4 Mbps (Night)</option>
                            <option>8/8 Mbps (Night)</option>
                            <option>16/16 Mbps (Night)</option>
                        </FormControl>
                        </FormGroup>
                    </Col>
                    </Row>              
                    <Button block disabled={!validateForm()} type="submit">
                    Create Subscriber
                    </Button>
            </form>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
