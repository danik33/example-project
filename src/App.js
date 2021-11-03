
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


import TopBar from "./components/TopBar";
import LeftText from "./components/LeftText";

import { makeStyles } from '@material-ui/core/styles';
import Algorithms from './Algorithms/Algorithms';



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
