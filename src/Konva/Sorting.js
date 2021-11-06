import { PinDropTwoTone } from '@material-ui/icons';
import { Calculate } from '@mui/icons-material';
import Konva from 'konva';
import React, { useState} from 'react';
import { Layer, Rect, Stage } from 'react-konva';


const DEFAULT_ARRAY_SIZE = 20;
const DEFAULT_MIN = 0, DEFAULT_MAX = 1000;

function rand(min, max)
{
    return parseInt(Math.random()*(max-min+1)+min);
}

function initArray()
{
    var temparray = [];
    for(let i = 0; i < DEFAULT_ARRAY_SIZE; i++)
    {
        temparray[i] = {id: i, value: rand(DEFAULT_MIN, DEFAULT_MAX)};
    }
    return temparray;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function Sorting(props)
{

    const [entries, setEntries] = useState(DEFAULT_ARRAY_SIZE);
    
    var min = DEFAULT_MIN;
    var max = DEFAULT_MAX; 
    var arrSize = entries;
    var offSetTop = 30, offSetBottom = 0;
    var interval = 1;
    var maxHeight = props.height-offSetBottom-offSetTop;
    var rectRefs = [];

    
    const [rectArray, setRectArray] = useState(initRectArray());

    function initRectArray()
    {
        let arr = Array.from({length: arrSize}, () => rand(min, max));

        let rectArr = arr.map((val, index) => ({
            key: index,
            refID: index,
            value: val,
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
    }

    function swapRects(index1, index2)
    {
        let tempRectArr = [...rectArray];
        let tempObj = {...tempRectArr[index1]};
        tempRectArr[index1] = {...tempRectArr[index2]}
        tempRectArr[index2] = tempObj;
        setRectArray(tempRectArr);

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
            swapRectsWithAnimation(i, i+1, 0.1);
            await sleep(200);
        }
        

    }

 

    var rectClick = e => {
        e.target.to({
            x: 100,
            y: 100,
            duration: 2
        });
    }

    

    


        
    
    
    return (
        <div className="konvacanvas">
            <Stage
                width={props.width}
                height={props.height}
            >
                <Layer>
                    
                    <Rect
                    x={0}
                    y={0}
                    width={props.width}
                    height={props.height}
                    stroke="black" 
                    />
                    <Rect
                        x={0}
                        y={offSetTop}
                        height={props.height-offSetTop-offSetBottom}
                        width={props.width}
                        stroke="red"
                        onClick={clickHandle}
                        />
                    {
                        rectArray.map((e, index) => (
                            <Rect
                                ref={setRectRefs}
                                key={e.id}
                                refID={e.refID}
                                x={((props.width+1-(arrSize-1) * interval)/arrSize)*index + interval*index}
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

    );
}

export default Sorting;