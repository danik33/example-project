
import './App.css';
import React, { useState } from 'react';


import TopBar from "./components/TopBar";

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';

const theme = {"bluish" : "#5c73d7", "lightg" : "#61e786", "darkg" : "#049359", "gray" : "#454545", "orange" : "#f75c03"};


const useStyles = makeStyles((theme) => ({
    page: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundImage: "url(/img.jpg)"
    },
    image: {
        opacity: '60%'
    },
    content: {
        position: 'static',
        color: 'white'
    },


   
}));
function App() {

    const classes = useStyles();


    return (
        <div className={classes.App}  >
          <TopBar />
            <div className={classes.page}>

                <div className={classes.content}>
                    <Typography id="title" variant="h2">
                        Look at this nerd
                    </Typography>
                   
                </div> 
            </div>
        </div>
  );
}

export default App;
