import { Button } from "@material-ui/core";
import React from "react";
import './Algorithms.scss';

import ListItem from "./ListItem"

function Algorithms()
{

    
    return (
        <div class="page"> 
            <div class="placeholder">

            </div>
            <div class="list">

                <ListItem>
                    A* Pathfinding
                </ListItem>
                <ListItem className="srt">
                    Sorting visualisation
                </ListItem>
            </div>
            <div class="content">
            </div>
        </div>
        
        

    );
}

export default Algorithms;