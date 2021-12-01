import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: '50%', height: '800px', overflowX: "hidden"}}>
            {props.children}
        </div>
    )
};

export default Scroll;