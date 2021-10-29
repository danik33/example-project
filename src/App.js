
import style from './App.css';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


import TopBar from "./components/TopBar";
import LeftText from "./components/LeftText";

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import Algorithms from './Pages/Algorithms';

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
    }


   
}));
function App() {

    const classes = useStyles();


    return (
        <Router>
            <div className={classes.App} >
            <TopBar />
                <div className={classes.page}>

                    <Switch>
                        <Route exact path="/">
                            <LeftText />
                        </Route>
                        <Route path="/algorithms">
                            <Algorithms/>
                        </Route>
                    </Switch>
                    
                </div>
            </div>
        </Router>
  );
}

export default App;
