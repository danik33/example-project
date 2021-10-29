import React from 'react';

import './LeftText.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Link from 'react-router-dom/Link';



function LeftText() {

    return (
        <div class="holder">
            <Link exact to="/portfolio">
                Portfolio
            </Link>
            <Link  exact to="/gallery/cats">
                Cats
            </Link>
            <Link  exact to="/videos">
                Videos
            </Link>
            <Link exact to="/algorithms">
                Algorithm showcase
            </Link>
            <Link exact to="/about">
                About
            </Link>


        </div> 
        );
}

export default LeftText;