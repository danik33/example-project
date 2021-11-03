
import React from "react";
import "./Algorithms.scss"


import ButtonBase from '@mui/material/ButtonBase';
import { Link } from "react-router-dom";



function ListItem(props)
{
    const selectedStyle = {'backgroundColor' : 'rgba(0, 255, 0, 0.5)'}
    return (
        <div className="wrapper"> 
            <ButtonBase 
 
            component={Link}
            to={"/algorithms/" + props.id}
            className={"button " + props.className}
            sx={props.selected != null ? selectedStyle : null}
            onClick={props.onClick}
            id={props.id}
             >
                {props.children}
            </ButtonBase>
        </div>
        
        

    );
}

export default ListItem;