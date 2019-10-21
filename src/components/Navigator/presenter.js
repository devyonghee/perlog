import React from 'react';
import { List, Paper } from '@material-ui/core';
import useStyle from './styles';
import PropTypes from 'prop-types';
import FileList from '../FileList';

const propTypes = {
    files: PropTypes.array,
    selectedTarget: PropTypes.Object,
    handleClickList: PropTypes.func.isRequired,
    handleDoubleClickFile: PropTypes.func.isRequired,
    handleContextMenuList: PropTypes.func.isRequired,
};

const defaultProps = {
    files: [],
    isOpenedNewForm: false,
    selectedTargetIndex: null,
};

const presenter = props => {
    const {
        files,
        selectedTarget,
        handleClickList,
        handleDoubleClickFile,
        handleContextMenuList
    } = props;

    const classes = useStyle();
    return (
        <Paper className={classes.root} elevation={0} onClick={handleClickList()}>
            <List className={classes.list}>
                <FileList
                  files={files}
                  switchable
                  selectedTarget={selectedTarget}
                  handleClickFile={handleClickList}
                  handleDoubleClickFile={handleDoubleClickFile}
                  handleContextMenuList={handleContextMenuList}
                />
            </List>
            {/*<Divider className={classes.divider}/>*/}
        </Paper>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;