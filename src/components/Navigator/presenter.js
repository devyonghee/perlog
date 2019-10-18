import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useStyle from './styles';
import PropTypes from 'prop-types';
import NewFileForm from '../NewFileForm';
import FileList from '../FileList';
import { SERVER } from 'src/modules/file/reducer';

const propTypes = {
    files: PropTypes.array,
    // handleClickList: PropTypes.func.isRequired,
    // handleContextMenuList: PropTypes.func.isRequired,
};

const defaultProps = {
    files: [],
    isOpenedNewForm: false,
};

const presenter = props => {
    const {
        files,
    } = props;

    const classes = useStyle();
    return (
        <Paper className={classes.root} elevation={0}>
            <List className={classes.list}>
                {files.filter(file => file.type === SERVER).map(server => (
                    <>
                        <ListItem>
                            {server.name}
                        </ListItem>
                        <List className={classes.list}>
                            <FileList
                                files={server.child}
                                {...props}
                                invisibleLoading
                                // handleClickFile={handleClickList}
                                // handleContextMenuList={handleContextMenuList}
                            />
                        </List>
                    </>
                ))}
            </List>


            <Divider className={classes.divider}/>
            {/*<NewFileForm*/}
            {/*    {...props}*/}
            {/*    files={serverFiles}*/}
            {/*/>*/}
        </Paper>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;