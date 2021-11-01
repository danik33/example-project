
import React from "react";
import "./Algorithms.scss"

import { makeStyles } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";

import ButtonBase from '@mui/material/ButtonBase';
import { ClassNames } from "@emotion/react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    button: {
        
    }
  });


function ListItem(props)
{
    const selectedStyle = {'backgroundColor' : 'rgba(0, 255, 0, 0.5)'}
    const classes = useStyles();
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