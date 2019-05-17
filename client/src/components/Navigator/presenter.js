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
import PropTypes from "prop-types";

const propTypes = {
    directories: PropTypes.object,
    path: PropTypes.string,
    handlePathChange: PropTypes.func.isRequired,
    handlePathKeyPress: PropTypes.func.isRequired,
    handleFileWatchSwitch: PropTypes.func.isRequired,
    handleListContextMenu: PropTypes.func.isRequired
};

const defaultProps = {
    directories: {},
    path: ''
};

const presenter = (prop) => {
    const {classes, handlePathChange, handlePathKeyPress, handleFileWatchSwitch, handleListContextMenu, path, directories} = prop;

    return (
        <Drawer anchor="left" variant="persistent" open={true} >
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
            <List className={classes.list} onContextMenu={handleListContextMenu}>
                {
                    Object.entries(directories).map(([path, file]) =>
                        <ListItem key={path} button>
                            <ListItemText primary={path}/>
                            <Switch onChange={e => handleFileWatchSwitch(e.target.checked, path)}
                                    checked={file.watch}/>
                        </ListItem>
                    )
                }
            </List>
        </Drawer>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default withStyles(styles)(presenter);