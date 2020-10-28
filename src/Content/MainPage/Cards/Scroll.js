import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'auto', height: '800px', overflowX: "hidden"}}>
            {props.children}
        </div>
    )
};

export default Scroll;