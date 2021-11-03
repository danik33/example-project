
import React, { useState} from 'react';
import './KonvaStyles.scss';

import { Layer, Line, Rect, Stage, Text } from "react-konva";


function Minesweeper(props)
{
    const [clicked, setClicked] = useState(false);
    const [mouseDown, mouseState] = useState(false);

    
    function handleClick(evt) 
    {
        console.log(evt);
        if(evt.type === "mouseup")
        {
            mouseState(false)
            setClicked(false);
        }
        if(evt.type === "mousedown")
        {
            mouseState(true)
            if(evt.target.attrs.id === "rect") 
            {
                setClicked(true);
            }
        }
        console.log("Click position: [" + evt.evt.clientX + ", " + evt.evt.clientY + "]");
    }


    
    
    return (
        <div className="konvacanvas">
            <Stage
                width={props.width}
                height={props.height}
                onMouseDown={handleClick}
                onMouseUp={handleClick}
                >
                <Layer >
                    <Text x={100} y={10}  text="trying text"/>
                    <Rect
                        id="rect"
                        x={props.width/10}
                        y={props.height/10}
                        width={props.width/10}
                        height={props.width/10}
                        fill={clicked ? "red" : "black"}
                        onMouseDown={() => {setClicked(true)}}
                        onMouseUp={() => {setClicked(false)}}
                        onMouseOver={() => (mouseDown) ? setClicked(true) : setClicked(false)}
                        onMouseLeave={() => setClicked(false)}
                        onClick={handleClick}
                        draggable
                        />
                    <Line
                        x={0}
                        y={0}
                        points={[0, 0, props.width, 0, props.width, props.height, 0, props.height, 0, 0]}
                        stroke="black"
                        strokeWidth={10}
                    />
                    
                </Layer>
            </Stage>
        </div>
       

        
        

    );
}

export default Minesweeper;