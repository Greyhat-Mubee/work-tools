import React from "react";
import RingLoader from "react-spinners/GridLoader";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'transparent',
  },
}));

function MyVerticallyCenteredModal(props) {
  const classes = useStyles();

    return (
      <Backdrop className={classes.backdrop} {...props}>
        <RingLoader
                size={42}
                color={"#3678D7"}
                loading={true}
            />  
    </Backdrop>
    );
  }

export default MyVerticallyCenteredModal;