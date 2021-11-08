import { PinDropTwoTone } from '@material-ui/icons';
import { Calculate } from '@mui/icons-material';
import Konva from 'konva';
import { Slider } from '@material-ui/core';
import React, { useEffect, useState} from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Button, Typography } from '@mui/material';


const DEFAULT_ARRAY_SIZE = 20;
const DEFAULT_MIN = 10, DEFAULT_MAX = 1000;

function rand(min, max)
{
    return parseInt(Math.random()*(max-min+1)+min);
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


var rectRefs = [];

function Sorting(props)
{

    const [arrSize, setArrSize] = useState(DEFAULT_ARRAY_SIZE);
    const [min, setMin] = useState(DEFAULT_MIN);
    const [max, setMax] = useState(DEFAULT_MAX);
    const [interval, setInterval] = useState(1);

    var offSetTop = 30, offSetBottom = 0;
    var maxHeight = props.height-offSetBottom-offSetTop;
    

    
    const [rectArray, setRectArray] = useState(initRectArray());
    

    function initRectArray()
    {
        let arr = Array.from({length: arrSize}, () => rand(min, max));

        let rectArr = arr.map((val, index) => ({
            key: index,
            value: val,
            refID: index,
            fill: "black"

        }));
        return rectArr;
    }

    
    function calcY(val)
    {
        return props.height - offSetBottom -calculateHeight(val);
    }
    
    function calculateHeight(val)
    {
        let pixelsPerobj = maxHeight/max;
        
        return pixelsPerobj*val;
    }

    function setRectRefs(ref)
    { 
        if(ref != null)
            rectRefs[ref.attrs.refID] = ref;
        else
            rectRefs = [];
    }

    function swapRects(index1, index2)
    {


        let tempArray = [...rectArray];
        let temp = tempArray[index1].value;
        tempArray[index1].value = tempArray[index2].value;
        tempArray[index2].value = temp;


        setRectArray(tempArray);
 

    }


    function swapRectsWithAnimation(index1, index2, duration)
    { 
        swapRects(index1, index2);

        let tempX1 = rectRefs[index1].attrs.x; 
        let tempX2 = rectRefs[index2].attrs.x;

        

        rectRefs[index1].attrs.x = tempX2;
        rectRefs[index2].attrs.x = tempX1;
        let dur = (duration != null) ? duration : 0.2;
        rectRefs[index1].to({
            x: tempX1,
            duration: dur,

            
        });
        rectRefs[index2].to({
            x: tempX2,
            duration: dur
        });
        
    }

    async function clickHandle(e)
    {
        let dur = 0.2;
        for(let i = 0; i < arrSize-1; i++)
        {
            swapRectsWithAnimation(i, i+1, dur);
            await sleep(dur*1000 + 50 );
        }
    }

    function generateArrayBtn(e)
    {
        console.log("AAA");
    }



    

    


        
    
    
    return (
        <div className="container">
            <div className="sliders">
                <Typography>
                    Array size:
                </Typography>
                <Slider
                    defaultValue={20}
                    valueLabelDisplay="auto"
                    min={2}
                    max={100}
                />
                <Typography>
                    Minimum value:
                </Typography>
                <Slider
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />
                <Typography>
                    Maximum value:
                </Typography>
                <Slider
                    defaultValue={1000}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />
                <Typography>
                    Interval:
                </Typography>
                <Slider
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                />
                <Button
                    variant="contained"
                    onClick={generateArrayBtn}
                >
                    Generate array
                </Button>
            </div>
            <div className="konvacanvas">
            
                <Stage
                    width={props.width}
                    height={props.height}
                >
                    <Layer>
                        
                        
                        <Rect
                            x={0}
                            y={0}
                            height={props.height}
                            width={props.width}
                            stroke="black"
                            strokeWidth={3}
                            onClick={clickHandle}
                            />
                        {
                            rectArray.map((e, index) => (
                                <Rect
                                    refID={e.refID}
                                    ref={setRectRefs}
                                    key={e.key}
                                    
                                    x={((props.width-3-(arrSize-1) * interval)/arrSize)*index + interval*index}
                                    y={calcY(e.value)}
                                    value={e.value}
                                    width={(props.width/(arrSize) - interval)}
                                    height={calculateHeight(e.value)}
                                    fill={e.fill}
                                
                                />

                            ))
                        }
                            
                    </Layer>
                </Stage>
            </div>
        </div>

    );
}

export default Sorting;