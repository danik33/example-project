
import React from "react";
import "./Algorithms.scss"

import { makeStyles } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";

import ButtonBase from '@mui/material/ButtonBase';
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles({
    button: {
        width: '100%',
        height: '80px',
        fontWeight: 800,
        fontSize: 'max(2vw, 18px)'
    }
  });


function ListItem(props)
{
    const selected = {'backgroundColor' : 'green!important'}
    const classes = useStyles();
    return (
        <div class="wrapper"> 
            <ButtonBase
            className={classes.button}
            sx={props.selected != null ? selected : null}
             >
                {props.children}
            </ButtonBase>
        </div>
        
        

    );
}

export default ListItem;