import { FunctionsOutlined, PinDropTwoTone } from '@material-ui/icons';
import { Calculate } from '@mui/icons-material';
import Konva from 'konva';
import { Checkbox, FormControlLabel, FormGroup, Slider } from '@material-ui/core';
import React, { useEffect, useState} from 'react';
import { Layer, Line, Rect, Stage, Text } from 'react-konva';
import { Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const DEFAULT_ARRAY_SIZE = 20;
const DEFAULT_MIN = 1, DEFAULT_MAX = 100;

function rand(min, max)
{
    return parseInt(Math.random()*(max-min+1)+min);
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


var rectRefs = [];
var shouldUpdate = false;


var arrSize = DEFAULT_ARRAY_SIZE;
var min = DEFAULT_MIN, max = DEFAULT_MAX;
var scale = 1; //TODO 


var nextMax = null, nextMin = null;
var nextArrSize = null;
var nextScale = null;  //TODO 
var threads = 0;
var stop = false;

function Sorting(props)
{

    
    const [interval, setInterval] = useState(1);
    const [animation, setAnimation] = useState(true);
    const [animationDuration, setAnimationDuration] = useState(0.2);
    const [stepTime, setStepTime] = useState(0.1);
    const [minmax, setMinMax] = useState([0, 1000]);
    const [sThread, setThreads] = useState(0);

    var offSetTop = 30, offSetBottom = 0;
    var leftOffset = 3, rightOffset = 2;
    var maxHeight = props.height-offSetBottom-offSetTop;

    
    

    
    const [rectArray, setRectArray] = useState(initRectArray());
    

    function initRectArray()
    {
        let arr = Array.from({length: arrSize}, () => rand(min, max));
        // let arr = Array.from({length: arrSize}, (e, index) => 0.5*((Math.cos(index/10 - 3))*100)+50);
        // console.log(arr);
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

    function calcX(index)
    {
        return leftOffset+(calcWidth()*index + interval*index);
    }

    function calcWidth()
    {
        return ((props.width-leftOffset-rightOffset)-interval*(arrSize-1))/arrSize;
    }

    
    
    function calculateHeight(val)
    {
        let pixelsPerobj = maxHeight/(100*scale);
        
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


    function swapRectsWithAnimation(index1, index2, duration, makered)
    { 
        swapRects(index1, index2);

        let tempX1 = calcX(index1); 
        let tempX2 = calcX(index2);
        
        
        let tempX = rectRefs[index1].attrs.x;

        rectRefs[index1].attrs.x = rectRefs[index2].attrs.x;
        rectRefs[index2].attrs.x = tempX;
        let dur = (duration != null) ? duration : animationDuration;

        if(makered)
        {
            rectRefs[index1].attrs.fill = "red";
            rectRefs[index2].attrs.fill = "red";
        }
        rectRefs[index1].to({
            x: tempX1,
            duration: dur

            
        });
        rectRefs[index2].to({
            x: tempX2,
            duration: dur,
            onFinish: () => {
                rectRefs[index1].attrs.fill = "black";
                rectRefs[index2].attrs.fill = "black";
            }
        });
        
    }

    async function clickHandle(e)
    {
        bubbleSort();

    }

    async function swap(index1, index2, wait)
    {
        if(animation)
        {
            swapRectsWithAnimation(index1, index2, animationDuration, true);
        }
        else 
        {
            swapRects(index1, index2);
        }
        if(wait && !stop)
        {
            if(animation)
            {
                await sleep(animationDuration*1000 + 50);
            }
            else
            {
                await sleep(stepTime*1000);
            }
        }
    }


    async function bubbleSort()
    {
        setThreads(sThread+1);
        threads++;
        let swapped = true;
        while(swapped && !stop)
        {
            swapped = false;
            for(let i = 0; i < arrSize-1 && !stop; i++)
            {
                if(rectArray[i].value > rectArray[i+1].value)
                {
                    await swap(i, i+1, true);
                    swapped = true;
                }
            }
        }
        threads--;
        setThreads(sThread-1);
        if(!stop)
        {
            if(threads == 0)
            {
                rectRefs.forEach(e => e.attrs.fill = "green");
                await sleep(500);
                rectRefs.forEach(e => e.attrs.fill = "black");
            }
            
            

        }
        setThreads(sThread); //Kinda pointless, but helps to refresh colors 

        
        
        if(threads == 0)
            stop = false;
        
    }
    
    async function generateArrayBtn(e)
    {
        stop = true;
        if(nextMax != null)
        {
            max = nextMax;
            nextMax = null;
        }
        if(nextMin != null)
        {
            min = nextMin;
            nextMin = null;
        }
        if(nextArrSize != null)
        {
            arrSize = nextArrSize;
            nextArrSize = null;
        }
        setRectArray(initRectArray());
        

    }

    useEffect(() => {  //Waiting on generateArrayButton states to take effect
        // console.log("UseEffect");
        if(shouldUpdate)
        {
            // console.log("Should update");
            setRectArray(initRectArray());
            shouldUpdate = false;
        }
        // setRectArray(initRectArray());

    });

    function checkboxToggle(e)
    {
        let checked = e.target.checked;
        setAnimation(checked);
    }

    function arraySlider(e, value)
    {
        nextArrSize = value;
    }

    function minValueSlider(e, value)
    {
        console.log("Slider: " + value);
        nextMin = value[0];
        nextMax = value[1];
        setMinMax(value);
    }

    function intervalSlider(e, value)
    {
        setInterval(value);
    }

    function animationTimeSlider(e, value)
    {
        setAnimationDuration(value);
    }

    function stepTimeSlider(e, value)
    {
        setStepTime(value);
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
                    onChange={arraySlider}
                    min={2}
                    max={100}
                />
                <Typography>
                    Range:
                </Typography>
                <Slider
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    min={1}
                    max={100}
                    value={minmax}
                    onChange={minValueSlider}
                />
               
                <Button
                    variant="contained"
                    onClick={generateArrayBtn}
                    className="btn"
                >
                    Generate array
                </Button>
                <Typography>
                    Interval:
                </Typography>
                <Slider
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    min={0}
                    max={20}
                    onChange={intervalSlider}
                />

                <FormGroup
                    className="check">
                    <FormControlLabel 
                        control=
                        {
                            <Checkbox
                                defaultChecked  
                                className="checkbox"
                                onChange={checkboxToggle}
                            /> 
                        }
                        label="Animation"
                        
                        
                        />
                </FormGroup>
                <Typography>
                    Animation time:
                </Typography>
                <Slider
                    defaultValue={0.2}
                    valueLabelDisplay="auto"
                    min={0}
                    step={0.02}
                    max={3}
                    disabled={(!animation)}
                    onChange={animationTimeSlider}
                />
                <Typography>
                    Step time:
                </Typography>
                <Slider
                    defaultValue={0.2}
                    valueLabelDisplay="auto"
                    min={0}
                    step={0.02}
                    max={3}
                    disabled={(animation)}
                    onChange={stepTimeSlider}
                />
                
            </div>
            <div className="konvacanvas">
            
                <Stage
                    width={props.width}
                    height={props.height}
                >
                    <Layer>
                        
                        <Line
                            
                            x={0}
                            y={0}
                            stroke="black"
                            strokeWidth={3}
                            points={[props.width, 0, 0, 0, 0, props.height, props.width, props.height]}
                            />
                        <Rect
                            x={0}
                            y={0}
                            height={props.height}
                            width={props.width}

                            onClick={clickHandle}
                            />

                        <Text
                            x={props.width/2}
                            y={30}
                            text={"Threads: " + threads}
                            />
                        
                        {
                            rectArray.map((e, index) => (
                                <Rect
                                    refID={e.refID}
                                    ref={setRectRefs}
                                    key={e.key}
                                    
                                    x={calcX(index)}
                                    y={calcY(e.value)}
                                    value={e.value}
                                    width={calcWidth()}
                                    height={calculateHeight(e.value)}
                                    fill={e.fill}
                                
                                />

                            ))
                        }
                        <Line
                            x={0}
                            y={0}
                            stroke="black"
                            strokeWidth={1}
                            points={[0, offSetTop, 10, offSetTop]}
                        />
                        <Line
                            x={0}
                            y={0}
                            stroke="black"
                            strokeWidth={1}
                            points={[0, (props.height-offSetTop)/2 + offSetTop , 10, (props.height-offSetTop)/2 + offSetTop]}
                        />
                        <Text
                            text={"" + (100*scale)}
                            x={11}
                            y={offSetTop-5}

                        />
                        <Text
                            text={"" + (100*scale)/2}
                            x={11}
                            y={(props.height)/2-5}
                        />
                            
                    </Layer>
                </Stage>
            </div>
            <div className="undercanvas">
                
            </div>
        </div>

    );
}

export default Sorting;