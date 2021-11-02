import { Button } from "@material-ui/core";
import React, { useState, useEffect} from 'react';
import './Algorithms.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import ListItem from "./ListItem"

import Minesweeper from "./Minesweeper"





var previousTarget;
var selectedAlgorithm; 

class listItem {
    constructor(text, id, customClassName)
    {
        this.text = text;
        this.id = id;
        this.className = customClassName;
    }

    
}

function resize(){
    const placeholder = document.getElementsByClassName("placeholder")[0];
    if(window.innerWidth < 1145)
    {
        placeholder.style.width = "0px";
    }
    else
    {
        placeholder.style.width = "10%";
    }
    
}
function Algorithms()
{
    let items = [];
    items.push(new listItem("A* pathfinding", "pathfinding"));
    items.push(new listItem("Sorting visualisation", "sorting", "srt"));
    items.push(new listItem("Travelling Salesperson", "sales", "trv"));



    function itemClick(arg){
        if(previousTarget != null)
        {
            previousTarget.style.backgroundColor = "transparent";
        }
        previousTarget = arg.currentTarget;
        arg.currentTarget.style.backgroundColor = "white";
        console.log(arg.currentTarget.id);
    }


    useEffect(()=>{
        
        resize();
        window.addEventListener('resize', resize);
    })

    console.log(items);
    let itemList = items.map((item) => 
        <ListItem
            id = {item.id}
            className = {item.className}
            onClick={itemClick}
        >
            {item.text}
        </ListItem>
    );

    
    return (
        <Router>
            <div className="page"> 
                <div className="placeholder">

                </div>
                <div className="list">
                    {itemList}
                </div>
                <div className="content">
                    <Switch>
                        <Route path="/algorithms/sorting">
                            <div className="canvas">
                                <Minesweeper/>
                            </div>
                        </Route>
                    </Switch>
                    
                </div>
            </div>
        </Router>
        
        

    );
}

export default Algorithms;