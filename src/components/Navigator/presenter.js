import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import useStyle from './styles';
import PropTypes from 'prop-types';
import NewFileForm from '../NewFileForm';
import FileList from '../FileList';

const propTypes = {
    serverName: PropTypes.string,
    serverFiles: PropTypes.array,
    handleClickList: PropTypes.func.isRequired,
    handleContextMenuList: PropTypes.func.isRequired,
};

const defaultProps = {
    serverName: '',
    serverFiles: [],
    isOpenedNewForm: false,
};

const presenter = props => {
    const {
        handleClickList,
        handleContextMenuList,
        serverFiles,
    } = props;

    const classes = useStyle();
    return (
        <Paper className={classes.root} elevation={0}>
            <List className={classes.list} onContextMenu={handleContextMenuList} onClick={handleClickList}>
                <FileList
                    {...props}
                    invisibleLoading
                    handleClickFile={handleClickList}
                    handleContextMenuList={handleContextMenuList}
                />
            </List>
            <Divider className={classes.divider}/>
            <NewFileForm
                {...props}
                files={serverFiles}
            />
        </Paper>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;