import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import useStyle from "./styles";
import PropTypes from "prop-types";
import NewFileForm from '../NewFileForm';
import FileList from '../FileList';

const propTypes = {
    newFileForm: PropTypes.shape({
        opened: PropTypes.bool,
        type: PropTypes.string
    }).isRequired,
    handleClickList: PropTypes.func.isRequired,
    handleContextMenuList: PropTypes.func.isRequired,
};

const defaultProps = {
    directories: {},
    isOpenedNewForm : false,
};

const presenter = props => {
    const {
        newFileForm,
        handleClickList,
        handleContextMenuList,
        serverFiles,
        watchedFiles
    } = props;

    const classes = useStyle();
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
                        {...props}
                        invisibleLoading
                        watchedFiles={watchedFiles}
                        handleClickFile={handleClickList}
                        handleContextMenuList={handleContextMenuList}
                    />
                </List>
            </List>
            {
                newFileForm.opened &&
                <NewFileForm
                    {...props}
                    files={serverFiles}
                    type={newFileForm.type}
                />
            }
        </Drawer>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;