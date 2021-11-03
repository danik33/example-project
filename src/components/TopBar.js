import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Logo from '../res/logo.png';
import { MenuItem, Menu } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'react-router-dom/Link';








const useStyles = makeStyles((theme) => ({

    toolbar: {
        background: 'linear-gradient(90deg, #5398BE 10%,  #61E786)',
        height: '70px'
    },
    title: {
        color: '#f74843',
        WebkitTextStroke: '1px #f75c03',
        
        whiteSpace: 'nowrap',
        display: 'inline',
        position: 'relative',
        top: -20
        
    },
    logo: {
        marginLeft: 10,
        marginTop: 10,
        width: 70,
        height: 70
    },
    holder: {
        marginTop: 10,
        display: 'inline-flex',
        width: '100%'

      
    },
    btn: {
        fontWeight: 600,
        height: '100%',
        marginTop: '5px',
        margin: '5px 5px'
    },
    titleHolder: {
        position: 'static',
        marginTop: -20,
        cursor: 'pointer',
        height: '100%',
        marginRight: 100,
        whiteSpace: 'nowrap'
    }


}));




function TopBar() {
    const classes = useStyles();


    const [anchor, setAnchor] = React.useState(null);
    const [currentMenu, setMenu] = React.useState(null);

    const gamesMenu = (
        <div>
            <MenuItem>
                Snake
            </MenuItem>
            <MenuItem>
                Minesweeper
            </MenuItem>
            <MenuItem>
                Chess
            </MenuItem>
        </div> 
        );

  

    function handleClick(event) {
        console.log(event);
        console.log(event.currentTarget.id);
        switch (event.currentTarget.id) {
            case "about":
                console.log("about");
                break;
            case "games":
                setMenu(gamesMenu);
                setAnchor(event.currentTarget);
                break;
            default:

        }
    }

    function closeMenu(arg, a1) {
        setAnchor(null);
    }

   

   

   

    return (

        <div className={classes.toolbar} >
            <div className={classes.holder}>
                <div className={classes.titleHolder} >
                    <Link to="/">
                        <img className={classes.logo} src={Logo} alt="Logo" />
                        <Typography variant="h4" className={classes.title}  > Example Project </Typography >
                    </Link>
                </div> 

                <Button
                    id="about"
                    className={classes.btn}
                    variant="text"
                    onClick={handleClick}
                >
                    About
                </Button>

                <Button
                    id="maps"
                    className={classes.btn}
                    variant="text"
                    onClick={handleClick}
                >
                    Maps
                </Button>

                <Button
                    id="games"
                    className={classes.btn}
                    variant="text"
                    onClick={handleClick}
                >
                    Games
                    <ArrowDropDownIcon/>
                </Button>

                <Button
                    id="portf"
                    className={classes.btn}
                    variant="text"
                    onClick={handleClick}
                >
                    Portoflio
                </Button>
                

                


                <Menu
                    anchorEl={anchor}
                    open={anchor != null}
                    onClose={closeMenu}
                >
                    {currentMenu}
                </Menu> 


            </div>
        </div>
    );
}


export default TopBar;

//                
