
import './App.css';
import React, { useState } from 'react';


import TopBar from "./components/TopBar";

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const theme = {"bluish" : "#5c73d7", "lightg" : "#61e786", "darkg" : "#049359", "gray" : "#454545", "orange" : "#f75c03"};


const useStyles = makeStyles((theme) => ({

   
}));
function App() {

    const classes = useStyles();


  return (
        <div className="App">
          <TopBar />
        </div>
  );
}

export default App;
