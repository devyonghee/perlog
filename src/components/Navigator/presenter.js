import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";


const fileList = (fileName, onClick) => (
    <ListItem>
        <ListItemText primary="Starred"/>
        <Switch/>
    </ListItem>
);


const presenter = (prop) => {
    const {classes, handlePathChange, handlePathKeyPress, path, files} = prop;

    return (
        <Drawer anchor="left" variant="persistent" open={true}>
            <div className={classes.toolbar}>
                <Typography className={classes.title}>
                    pdev2
                </Typography>
            </div>
            <Divider/>
            <TextField
                label="path"
                className={classnames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                value={path}
                inputProps={{
                    onChange: handlePathChange,
                    onKeyPress: handlePathKeyPress,
                    value: path
                }}
            />
            <List className={classes.list}>
                {
                    files.map((file, index) =>
                        <ListItem key={index}>
                            <ListItemText primary={file.path}/>
                            <Switch/>
                        </ListItem>)
                }
            </List>
        </Drawer>
    );
};


export default withStyles(styles)(presenter);