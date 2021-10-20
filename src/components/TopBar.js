import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import DropdownText from './DropdownText';
import Logo from '../res/logo.png';







const useStyles = makeStyles((theme) => ({

    toolbar: {
        background: 'linear-gradient(90deg, #049359 60%,  #61E786)',
        height: '70px'
    },
    title: {
        color: 'white',
        WebkitTextStroke: '1px #f75c03',
        marginRight: 100
    },
    logo: {
        marginLeft: 10,
        marginTop: -10,
        width: 70,
        height: 70
    },
    holder: {
        marginTop: 10,
        display: 'inline-flex',
        width: '100%'

      
    },

}));


function hey() {
    
}

function TopBar() {

    const classes = useStyles();

    const [title, setTitle] = React.useState("Example Project");

   

    return (

        <div className={classes.toolbar} >
            <div className={classes.holder}>
                <img className={classes.logo} src={Logo} alt="Logo" />
                <Typography variant="h4" className={classes.title} onClick={() => setTitle("fuckoff")} > {title} </Typography >
                <DropdownText text="Gallery" />
                <DropdownText text="Games" />
            </div>
        </div>
    );
}


export default TopBar;

//                
