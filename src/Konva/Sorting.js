import { PinDropTwoTone } from '@material-ui/icons';
import { Calculate } from '@mui/icons-material';
import Konva from 'konva';
import { Checkbox, FormControlLabel, FormGroup, Slider } from '@material-ui/core';
import React, { useEffect, useState} from 'react';
import { Layer, Line, Rect, Stage } from 'react-konva';
import { Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

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
var shouldUpdate = false;
function Sorting(props)
{

    const [arrSize, setArrSize] = useState(DEFAULT_ARRAY_SIZE);
    const [min, setMin] = useState(DEFAULT_MIN);
    const [max, setMax] = useState(DEFAULT_MAX);
    const [interval, setInterval] = useState(1);
    const [animation, setAnimation] = useState(true);
    const [animationDuration, setAnimationDuration] = useState(0.2);
    const [stepTime, setStepTime] = useState(0.1);

    var offSetTop = 30, offSetBottom = 0;
    var leftOffset = 3, rightOffset = 2;
    var maxHeight = props.height-offSetBottom-offSetTop;

    var nextArrSize = null;
    var nextMax = null, nextMin = null;
    

    
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

    function calcX(index)
    {
        if(index == arrSize-1)
            console.log("X: " + (leftOffset+(calcWidth()*index + interval*index)));
        return leftOffset+(calcWidth()*index + interval*index);
        // return  leftOffset+((props.width-leftOffset-rightOffset)/arrSize + interval)*index
        // return ((props.width-interval-(arrSize-1) * interval)/arrSize)*index + interval*index;
    }

    function calcWidth()
    {
        return ((props.width-leftOffset-rightOffset)-interval*(arrSize-1))/arrSize;
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

        let tempX1 = calcX(index1); 
        let tempX2 = calcX(index2);
        
        
        let tempX = rectRefs[index1].attrs.x;

        rectRefs[index1].attrs.x = rectRefs[index2].attrs.x;
        rectRefs[index2].attrs.x = tempX;
        let dur = (duration != null) ? duration : animationDuration;
        rectRefs[index1].to({
            x: tempX1,
            duration: dur

            
        });
        rectRefs[index2].to({
            x: tempX2,
            duration: dur
        });
        
    }

    async function clickHandle(e)
    {
        for(let i = 0; i < arrSize-1; i++)
        {
            if(animation)
            {
                swapRectsWithAnimation(i, i+1, animationDuration);
                await sleep(animationDuration*1000 + 50 );
            }
            else
            {
                swapRects(i, i+1);
                if(stepTime > 0)
                    await sleep(stepTime*1000);
            }
            
        }
    }
    
    function generateArrayBtn(e)
    {

        if(nextArrSize != null)
        {
            setArrSize(nextArrSize);
            nextArrSize = null;
        }
        if(nextMin != null)
        {
            setMin(nextMin);
            nextMin = null;
        }
        if(nextMax != null)
        {
            setMax(nextMax);
            nextMax = null;
        }
        shouldUpdate = true;
    }

    useEffect(() => {  //Waiting on generateArrayButton states to take effect
        if(shouldUpdate)
        {
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
        nextMin = value;
    }

    function maxValueSlider(e, value)
    {
        nextMax = value;
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
                    Minimum value:
                </Typography>
                <Slider
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    onChange={minValueSlider}
                />
                <Typography>
                    Maximum value:
                </Typography>
                <Slider
                    defaultValue={1000}
                    valueLabelDisplay="auto"
                    min={1}
                    max={1000}
                    onChange={maxValueSlider}
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
                    max={5}
                    onChange={intervalSlider}
                />

                <FormGroup>
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
                                    // width={(props.width/(arrSize) - interval)}
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