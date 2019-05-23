import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";
import PropTypes from "prop-types";
import FileList from '../FileList';

const propTypes = {
    path: PropTypes.string,
    classes: PropTypes.object.isRequired,
    handlePathChange: PropTypes.func.isRequired,
    handlePathKeyPress: PropTypes.func.isRequired,
    handleClickList: PropTypes.func.isRequired,
    handleContextMenuList: PropTypes.func.isRequired,
};

const defaultProps = {
    directories: {},
    path: ''
};

const presenter = (prop) => {
    const {
        classes,
        handleClickList,
        handleContextMenuList,
    } = prop;

    return (
        <Drawer anchor="left" variant="persistent" className={classes.drawer} open={true}>
            <div className={classes.toolbar}>
                <Typography className={classes.title}>
                    pdev2
                </Typography>
            </div>
            <Divider/>
            <List className={classes.list} onContextMenu={handleContextMenuList} onClick={handleClickList}>
                <List className={classes.folderList}>
                    <FileList
                        {...prop}
                        handleClickFile={handleClickList}
                        handleContextMenuList={handleContextMenuList}
                    />
                </List>
            </List>
        </Drawer>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default withStyles(styles)(presenter);