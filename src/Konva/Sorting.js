import { Checkbox, FormControlLabel, FormGroup, Slider } from '@material-ui/core';
import React, { useEffect, useState, useRef} from 'react';
import { Layer, Line, Rect, Stage, Text } from 'react-konva';
import { Button, StyledEngineProvider, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

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
var shouldCreate = false, readyToCreate = false;


var arrSize = DEFAULT_ARRAY_SIZE;
var min = DEFAULT_MIN, max = DEFAULT_MAX;
var scale = 1; //TODO 

var changedArrSize = false; 

var nextMax = null, nextMin = null;
var nextScale = null;  //TODO 
var threads = 0;
var stop = false;

const sortingAlgorithms = ["Bubble sort", "Selection sort", "Merge sort"];

function Sorting(props)
{

    const [interval, setInterval] = useState(1);
    const [animation, setAnimation] = useState(true);
    const [animationDuration, setAnimationDuration] = useState(0.2);
    const [stepTime, setStepTime] = useState(0.1);
    const [minmax, setMinMax] = useState([0, 1000]);
    const [sThread, setThreads] = useState(0);
    const [nextArrSize, setNextArrSize] = useState(arrSize);
    const [algorithmIndex, setAlgorithmIndex] = useState(0);
    const [algorithmName,  setAlgName] = useState(sortingAlgorithms[0]);
    const [shouldUpdate, setUpdate] = useState(false);
    const [algorithmLink, setAlgorithmLink] = useState("https://en.wikipedia.org/wiki/Bubble_sort");

    var offSetTop = 30, offSetBottom = 0;
    var leftOffset = 3, rightOffset = 2;
    var maxHeight = props.height-offSetBottom-offSetTop;


    const sortingFunctions = [bubbleSort, selectionSort, mergeSort];


    

    
    

    
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

    function calcWidth(inter, arrsize)
    {
        let interv = (inter == null) ? interval : inter;
        let arrS = (arrsize == null) ? arrSize : arrsize;
        return ((props.width-leftOffset-rightOffset)-interv*(arrS-1))/arrS;
        

    }

    
    
    function calculateHeight(val)
    {
        let pixelsPerobj = maxHeight/(100*scale);
        
        return pixelsPerobj*val;
    }

   
    
    function setRectRefs(ref)
    { 
        if(ref != null)
        {
            rectRefs[ref.attrs.refID] = ref;
            
        }
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
                if(stepTime > 0)
                    await sleep(stepTime*1000);
            }
        }
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
            fill(index1, "red");
            fill(index2, "red"); 

        }
        rectRefs[index1].to({
            x: tempX1,
            duration: dur

            
        });
        rectRefs[index2].to({
            x: tempX2,
            duration: dur,
            onFinish: () => {
                fill(index1, "black");
                fill(index2, "black"); 
            }
        });
        
    }

    async function sortButtonHandle(e)
    {
        setThreads(sThread+1);
        threads++;


        await sortingFunctions[algorithmIndex]();
        // switch(algorithmName)  
        // {
        //     case "Bubble sort":
        //         await bubbleSort();
        //         break;
        //     case "Selection sort":
        //         await selectionSort();
        //         break;
        //     case "Merge sort":
        //         await mergeSort();
        //         break;
        // }


        threads--;
        setThreads(sThread-1);
        if(!stop && threads === 0)
        {

            rectRefs.forEach(e => e.attrs.fill = "green");
            await sleep(500);
            rectRefs.forEach(e => e.attrs.fill = "black");
  
        }
        else if(shouldCreate && threads === 0)
        {
            readyToCreate = true;
            
        }
    
        setThreads(sThread); //Kinda pointless, but helps to refresh colors 
        
        
        
        if(threads === 0)
            stop = false;

    }

    function fill(index, color, dur)
    {
        let dr = 0;
        if(dur != null)
            dr = dur;
        rectRefs[index].to({
            fill: color,
            duration: dr
        });
    }

    async function mergeSort()
    {

    }

    async function selectionSort()
    {
        

        for(let i = 0; i < rectArray.length && !stop; i++)
        {
            let minIndex = i;
            for(let j = i+1; j < rectArray.length && !stop;  j++)
            {
                if(animation)
                {
                    for(let x = 0; x < rectArray.length && !stop; x++)
                    {
                        if(x < i)
                        {
                            fill(x, "green");
                        }
                        else if(rectRefs[x].fill != "rgba(0,128,0,1)")
                        {
                            fill(x, "black");

                        }
                    }
                    fill(i, "red");
                    fill(minIndex, "green");
                    fill(j, "yellow");
                    await sleep(animationDuration*500);
                }

                if(rectArray[j].value < rectArray[minIndex].value)
                    minIndex = j;
            }
            if(i != minIndex)
                await swap(i, minIndex, true);
            
        }

    }


    async function bubbleSort()
    {
        
        let swapped = true;
        let n = 0;
        while(swapped && !stop)
        {
            swapped = false;
            for(let i = 0; i < arrSize-n-1 && !stop; i++)
            {
                if(animation)
                {
                    
                    for(let x = 0; x < rectArray.length && !stop; x++)
                    {
                        
                        if((!swapped && x < i) || x > rectArray.length-n-1)
                            fill(x, "green");
                        else
                            fill(x, "black");
                    }
                    fill(i, "yellow");
                    if(rectArray[i].value > rectArray[i+1].value)
                        fill(i+1, "red");
                    else
                        fill(i+1, "green");

                    await sleep(animationDuration*500);
                }
                if(rectArray[i].value > rectArray[i+1].value)
                {
                    await swap(i, i+1, true);
                    swapped = true;
                }
                
            }
            n++;
        }
        
    }

  
    function generateArray()
    {
        setRectArray(initRectArray());
    }

    async function shuffleArray()
    {
        
        for(let i = 0; i < rectArray.length && !stop; i++)
        {
            await sleep(50);
            try
            {
                await swap(i, rand(0, rectArray.length), true);
            }
            catch(err)
            {
                
            }
            
        }
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
        if(changedArrSize)
        {
            arrSize = nextArrSize;
        }
        if(threads > 0)
            shouldCreate = true;
        else 
            generateArray();
        

    }

    useEffect(() => 
    { 
        if(readyToCreate)
        {
            shouldCreate = false;
            readyToCreate = false;
            generateArray();
            
            for(let i = 0; i < rectRefs.length; i++) //Easy fix for rects getting out of position after unexpected generate press while sorting is ongoing
            {
                rectRefs[i].attrs.x = calcX(i);
                fill(i, "black");
            }
        }
    });

    function checkboxToggle(e)
    {
        let checked = e.target.checked;
        setAnimation(checked);
    }

    function arraySlider(e, value)
    {
        console.log(value);
        console.log("Width: " + calcWidth(null, value));
        if(calcWidth(null, value) >= 1)
            setNextArrSize(value);
        changedArrSize = true;
        // nextArrSize = value;
    }

    function minValueSlider(e, value)
    {
        nextMin = value[0];
        nextMax = value[1];
        setMinMax(value);
    }

    function intervalSlider(e, value)
    {
        if(calcWidth(value) >= 1)
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

    function selectionChange(e)
    {
        let val = e.target.value;
        setAlgorithmIndex(val);
        setAlgName(sortingAlgorithms[val]);
        switch(sortingAlgorithms[val])
        {
            case "Bubble sort":
                setAlgorithmLink("https://en.wikipedia.org/wiki/Bubble_sort");
                break;
            case "Selection sort":
                setAlgorithmLink("https://en.wikipedia.org/wiki/Selection_sort");
                break;
            case "Merge sort":
                setAlgorithmLink("https://en.wikipedia.org/wiki/Merge_sort");
                break;
            default:
                setAlgorithmLink("https://en.wikipedia.org/wiki/Bubble_sort");
                
        }
        
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
                    value={nextArrSize}
                    min={2}
                    max={200}
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
                {(threads === 0) ? 
                <Button
                    variant='contained'
                    onClick={shuffleArray}
                    className="btn"
                    >
                        Shuffle
                    </Button> 
                    :null
                }
                <Typography>
                    Interval:
                </Typography>
                <Slider
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    min={0}
                    max={20}
                    value={interval}
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

                            />

                        <Text
                            x={props.width/2}
                            y={30}
                            text={"Sorting threads: " + threads}
                            />
                        
                        {
                            rectArray.map((e, index) => 
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
                                    shouldUpdate={shouldUpdate}
                                
                                />

                            )
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
                <FormControl variant="standard" className="select">
                    <InputLabel id="algorithm"> Algorithm </InputLabel>
                    <Select
                        value={algorithmIndex}
                        label={algorithmName}
                        onChange={selectionChange}
                    >
                        {
                            sortingAlgorithms.map((alg, index) => 
                                 <MenuItem value={index}> {alg} </MenuItem> 
                            )
                        }
                        
                        
                    </Select>

                </FormControl>
                
                <Button 
                variant="contained"
                className="sortBtn"
                onClick={sortButtonHandle}
                >
                    Sort
                </Button>
                {(threads > 0) ?
                    <Button
                        variant="contained"
                        className="pauseBtn"
                        onClick={() => stop = true}
                        >
                            Pause
                    </Button> : null
                }
                <div class="explanation">
                    <Typography variant="h4" >
                        <a href={algorithmLink} target="_blank" rel="noreferrer" className="algorithmTitle">
                            {algorithmName} 
                        </a>
                         
                    </Typography>
                </div>
            </div>
        </div>

    );
}

export default Sorting;