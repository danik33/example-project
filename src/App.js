
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
import Link from 'react-router-dom/Link';



const useStyles = makeStyles((theme) => ({
    page: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: "url(/img.jpg) no-repeat center center fixed",
        backgroundSize: "cover"
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
                            <LeftText>
                                <Link exact to="/portfolio">
                                    Portfolio
                                </Link>
                                <Link  exact to="/gallery/cats">
                                    Cats
                                </Link>
                                <Link  exact to="/videos">
                                    Videos
                                </Link>
                                <Link exact to="/algorithms">
                                    Algorithm showcase
                                </Link>
                                <Link exact to="/about">
                                    About
                                </Link>
                            </LeftText>
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
