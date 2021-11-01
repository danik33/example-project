import { Button } from "@material-ui/core";
import React, { useState, useEffect} from 'react';
import './Algorithms.scss';

import ListItem from "./ListItem"









function Algorithms()
{


    useEffect(()=>{
        function resize(){
            const placeholder = document.getElementsByClassName("placeholder")[0];
            if(window.innerWidth < 1145)
            {
                placeholder.style.width = "0px";
            }
            else
            {
                placeholder.style.width = "10%";
            }
            
        }
        window.addEventListener('resize', resize);
    })

    
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