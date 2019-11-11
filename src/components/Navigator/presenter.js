import React from 'react';
import { List, Paper } from '@material-ui/core';
import useStyle from './styles';
import PropTypes from 'prop-types';
import FileList from '../FileList';

const propTypes = {
    files: PropTypes.array,
    width: PropTypes.number,
    selectedTarget: PropTypes.object,
    handleClickList: PropTypes.func.isRequired,
    handleChangeSwitch: PropTypes.func.isRequired,
    handleDoubleClickFile: PropTypes.func.isRequired,
    handleContextMenuList: PropTypes.func.isRequired,
};

const defaultProps = {
    files: [],
    width: 250,
    selectedTarget: null,
    isOpenedNewForm: false,
};

const presenter = props => {
    const {
        files,
        width,
        selectedIndex,
        handleClickList,
        handleChangeSwitch,
        handleDoubleClickFile,
        handleContextMenuList
    } = props;

    const classes = useStyle({ width });
    return (
        <Paper className={classes.root} elevation={0} onClick={handleClickList()}>
            <List className={classes.list}>
                <FileList
                    files={files}
                    switchable
                    selectedIndex={selectedIndex}
                    handleClickFile={handleClickList}
                    handleChangeSwitch={handleChangeSwitch}
                    handleDoubleClickFile={handleDoubleClickFile}
                    handleContextMenuList={handleContextMenuList}
                />
            </List>
        </Paper>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;