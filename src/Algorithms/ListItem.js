
import React from "react";
import "./Algorithms.scss"


import ButtonBase from '@mui/material/ButtonBase';
import { Link } from "react-router-dom";

const selectedStyle = {'backgroundColor' : 'rgba(0, 255, 0, 0.5)'}

const ListItem = React.forwardRef((props, ref) => {

    return (
        <div className="wrapper" > 
            <ButtonBase 
 
            component={Link}
            to={"/algorithms/" + props.id}
            className={"button " + props.className}
            sx={props.selected != null ? selectedStyle : null}
            onClick={props.onClick}
            id={props.id}
            ref={ref}
            index={props.index}
             >
                {props.children}
            </ButtonBase>
        </div>
        
        

    );

});


export default ListItem;