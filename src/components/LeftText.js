import React from 'react';

import './LeftText.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';



function LeftText() {

    return (
        <div class="holder">
            <Typography variant="h2">
                Portfolio
            </Typography>
            <Typography  variant="h2">
                Cats
            </Typography>
            <Typography  variant="h2">
                Videos
            </Typography>
            <Typography variant="h2">
                About
            </Typography>


        </div> 
        );
}

export default LeftText;