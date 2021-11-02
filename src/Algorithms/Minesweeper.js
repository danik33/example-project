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
import { Layer, Line, Rect, Stage, Text } from "react-konva";


function Minesweeper()
{
    const [clicked, setClicked] = useState(false);
    const [mouseDown, mouseState] = useState(false);


    function mouseHandle()
    {
        
    }
    
    function handleClick(evt) 
    {
        console.log(evt);
        if(evt.type == "mouseup")
        {
            mouseState(false)
            setClicked(false);
        }
        if(evt.type == "mousedown")
        {
            mouseState(true)
            if(evt.target._id == 4)
            {
                setClicked(true);
            }
        }
        console.log("Click position: [" + evt.evt.clientX + ", " + evt.evt.clientY + "]");
    }


    
    
    return (
        <div className="konvacanvas">
            <Stage
                width={640}
                height={480}
                onMouseDown={handleClick}
                onMouseUp={handleClick}
                >
                <Layer >
                    <Text text="trying text"/>
                    <Line
                        x={0}
                        y={0}
                        points={[0, 0, 640, 480]}
                        stroke="black"
                        draggable
                    />
                    <Rect
                        className="TEST"
                        x={100}
                        y={100}
                        width={50}
                        height={50}
                        fill={clicked ? "red" : "black"}
                        onMouseDown={handleClick}
                        onMouseUp={handleClick}
                        onMouseOver={() => (mouseDown) ? setClicked(true) : setClicked(false)}
                        onMouseLeave={() => setClicked(false)}
                        />
                </Layer>
            </Stage>
        </div>
       

        
        

    );
}

export default Minesweeper;