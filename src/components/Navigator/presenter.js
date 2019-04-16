import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Switch from '@material-ui/core/Switch';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";
import ArrowDropDownRounded from '@material-ui/icons/ArrowDropDownRounded';

const presenter = ({classes}) => {
    return (
        <Drawer anchor="left" variant="persistent" open={true}>
            <FormControl style={{'align-items': 'center', "margin-bottom": '20px'}}>
                <ButtonBase
                    focusRipple
                    style={{"height": '100%', "width": '100%', 'margin': '10px'}}>
                        <span>
                             <Typography variant="subtitle" color="inherit">
                                pdev2
                            </Typography>
                        </span>
                    <span>
                            <Typography variant="subtitle" color="inherit">
                                shiw111
                            </Typography>
                        </span>
                    <span>
                            <ArrowDropDownRounded/>
                        </span>
                </ButtonBase>
            </FormControl>
            <Button size='small' variant='text'>
            </Button>
            <Divider/>

            <List component="nav" disablePadding>
                <ListItem style={{height: '50px'}} button dense alignItems='center'>
                    <ListItemIcon style={{height: 'inherit', 'align-items': 'center'}}>
                        <FolderIcon fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText primary="test"/>
                    <IconButton aria-label="Delete">
                        <DeleteIcon fontSize='small'/>
                    </IconButton>
                </ListItem>

                <Collapse in timeout="auto">
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="Starred"/>
                            <Switch/>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};


export default withStyles(styles)(presenter);