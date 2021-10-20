import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MenuItem, Menu} from '@mui/material';




const useStyles = makeStyles((theme) => ({
        
    main: {
        cursor: 'pointer',
        textAlign: 'left',
        marginLeft: '7px',
        marginRight: '7px',
        marginTop: '5px'
        
        
    },
    btn: {
        fontWeight: 600
    }
}));




function DropdownText(props) {

    const classes = useStyles();

  
    const [anchor, setAnchor] = React.useState(null);
    
    function handleClick(event)
    {
        setAnchor(event.currentTarget);
    }


      
    return (
        <div className={classes.main} >
            <Button
                className={classes.btn}
                variant="text"
                onClick={handleClick}
                >
                {props.text}
                <ArrowDropDownIcon />
                
            </Button>
            <Menu
                anchorEl={anchor}
                open={anchor != null}
            >
                <MenuItem onClick={() => setAnchor(null)}>
                    hey
                </MenuItem>
                <MenuItem onClick={() => setAnchor(null)}>
                    hey
                </MenuItem>
                <MenuItem onClick={() => setAnchor(null)}>
                    hey
                </MenuItem>
                <MenuItem onClick={() => setAnchor(null)}>
                    hey
                </MenuItem>

            </Menu>
            
            
        </div>

    );
}


export default DropdownText;