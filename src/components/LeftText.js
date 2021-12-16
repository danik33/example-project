import React from 'react';

import './LeftText.scss';



function LeftText(props) {

    return (
        <div className="holder">
            {props.children}
        </div> 
        );
}

export default LeftText;