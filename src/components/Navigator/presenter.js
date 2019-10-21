import React, {Fragment} from 'react';
import { Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import {
    Computer as ComputerIcon,
    ArrowRight as ArrowRightIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@material-ui/icons';
import useStyle from './styles';
import PropTypes from 'prop-types';
import FileList from '../FileList';
import { SERVER } from 'src/modules/file/reducer';

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
        handleClickList,
        selectedTarget,
        handleDoubleClickFile,
        handleContextMenuList
    } = props;

    const classes = useStyle();
    return (
        <Paper className={classes.root} elevation={0} onClick={handleClickList(-1)}>
            <List className={classes.list}>
                {files.filter(file => file.type === SERVER).map(server => (
                    <Fragment key={server}>
                        <ListItem
                            selected={selectedTarget === server}
                            onClick={handleClickList(server)}
                            onContextMenu={handleContextMenuList(server)}
                            onDoubleClick={handleDoubleClickFile(server)}
                        >
                            <ListItemIcon>
                                {server.extended ?
                                    <ArrowDropDownIcon className={classes.arrowIcon}/> :
                                    <ArrowRightIcon className={classes.arrowIcon}/>
                                }
                                <ComputerIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography className={classes.text}>
                                        {server.name}
                                    </Typography>
                                }/>
                        </ListItem>
                        {server.extended &&
                        <List className={classes.list}>
                            <FileList
                                files={files.filter(file => file.type !== SERVER)}
                                switchable
                                handleClickFile={handleClickList}
                                // handleContextMenuList={handleContextMenuList}
                            />
                        </List>
                        }
                    </Fragment>
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