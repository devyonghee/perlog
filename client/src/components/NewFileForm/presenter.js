import React, {Fragment} from 'react';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowRightIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import styles from './styles';


const generateFileList = (directories, handleDoubleClickFile) => {
    if (!Object.keys(directories).length) {
        return (<ListItem><ListItemText primary={'...loading'}/></ListItem>);
    }

    return Object.entries(directories).map(([name, file], index) => {
        return (
            <Fragment key={index}>
                <ListItem
                    onDoubleClick={(e) => handleDoubleClickFile(e, file.path)}
                    style={{paddingLeft: `${file.depth * 20}px`}}
                >
                    <ListItemIcon>
                        {file.isDirectory ?
                            (<Fragment>
                                {file.isExtended ? <ArrowDropDownIcon/> : <ArrowRightIcon/>}
                                <FolderIcon/>
                            </Fragment>) :
                            <FileIcon style={{marginLeft: '23px'}}/>
                        }
                    </ListItemIcon>
                    <ListItemText primary={name}/>
                </ListItem>
                {file.isExtended ? generateFileList(file.child, handleDoubleClickFile) : null}
            </Fragment>
        )
    });
};

const NewFolder = (props) => {
    const {
        classes,
        name,
        handleCloseForm,
        handleNameChange,
        handleNameKeyPress,
        handleDoubleClickFile,
        directory,
        isFileType
    } = props;

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableAutoFocus
            open
            onClose={handleCloseForm}
        >
            <Paper
                className={classnames(classes.wrapPaper, (!!isFileType) ? classes.fileWrap : classes.directoryWrap)}
                elevation={0}
            >
                <Typography variant="h6">
                    New {!!isFileType ? 'File' : 'Directory'}
                </Typography>
                {(!!isFileType) ?
                    <List dense className={classes.folderList}>
                        {
                            generateFileList(directory, handleDoubleClickFile)
                        }
                    </List> :
                    <TextField
                        id="standard-name"
                        margin="dense"
                        className={classes.textField}
                        helperText="Enter a New File Name"
                        fullWidth
                        inputProps={{
                            onChange: handleNameChange,
                            onKeyPress: handleNameKeyPress,
                            value: name
                        }}
                    />
                }
                <div className={classes.buttonsWrap}>
                    <Button color="primary" size="small">
                        OK
                    </Button>
                    <Button color="secondary" size="small">
                        Cancel
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
};


export default withStyles(styles)(NewFolder);