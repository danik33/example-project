import { PinDropTwoTone } from '@material-ui/icons';
import { Calculate } from '@mui/icons-material';
import React, { useState} from 'react';
import { Layer, Rect, Stage } from 'react-konva';


const DEFAULT_ARRAY_SIZE = 20;
const DEFAULT_MIN = 0, DEFAULT_MAX = 1000;

function rand(min, max)
    {
        return parseInt(Math.random()*(max-min+1)+min);
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

    var array; 
    array = [];
    for(let i = 0; i < arrSize; i++)
    {
        // array[i] = (i+1)*100;
        array[i] = rand(min, max);
    }
    // array[0] = max;
    
    // array[9] = min+100;
    function calculateHeight(value)
    {
        let pixelsPerValue = maxHeight/max;
        return pixelsPerValue*value;
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
                        />
                    {

                        array.map((value, index) => (
                            <Rect
                                key={index}
                                x={((props.width+1-(arrSize-1) * interval)/arrSize)*index + interval*index}
                                y={props.height - offSetBottom -calculateHeight(value)  }
                                width={(props.width/(arrSize) - interval)}
                                height={calculateHeight(value) }
                                fill="black"
                            />

                        ))
                    }
                        
                </Layer>
            </Stage>
        </div>

    );
}

export default Sorting;