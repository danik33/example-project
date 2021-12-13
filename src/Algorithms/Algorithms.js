import React, { useEffect, useState} from 'react';
import './Algorithms.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import ListItem from "./ListItem"

import Minesweeper from "../Konva/Minesweeper"
import Sorting from '../Konva/Sorting';






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
    const content = document.getElementsByClassName("content")[0]; 
    if(window.innerWidth < 1290)
    {
        placeholder.style.width = "0px";
        content.style.left = "max(20%, 180px)";
    }
    else
    {
        placeholder.style.width = "10%";
        content.style.left = "30%";
    }
    
}
function Algorithms()
{
    let items = [];
    items.push(new listItem("A* pathfinding", "pathfinding"));
    items.push(new listItem("Sorting visualisation", "sorting", "srt"));
    items.push(new listItem("Travelling Salesperson", "sales", "trv"));

    
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(480);

    var refList = [];

    function setRefs(arg)
    {
        if(arg != null)
        {
            let index = parseInt(arg.attributes.index.value);
            refList[index] = arg;
        }
    }


    function selectTab(index)
    {
        for(let i = 0; i < refList.length; i++)
        {
            refList[i].style.backgroundColor = "transparent";
        }
        refList[index].style.backgroundColor = "white";
    }

    function itemClick(arg){
        let index = parseInt(arg.currentTarget.attributes.index.value);
        selectTab(index);
    }


    useEffect(()=>{
        
        resize();
        window.addEventListener('resize', resize);
        for(let i = 0; i < items.length; i++)
        {
            if(window.location.toString().endsWith(items[i].id))
            {
                selectTab(i);
            }
        }
    });

    let itemList = items.map((item, index) => 
        <ListItem
            key = {item.id}
            id = {item.id}
            index = {index}
            className = {item.className}
            onClick={itemClick}
            ref = {setRefs}
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
                                <Sorting width={width}height={height}/>
                            </Route>
                        </Switch>
                        
                    </div>
            </div>
        </Router>
        
        

    );
}

export default Algorithms;