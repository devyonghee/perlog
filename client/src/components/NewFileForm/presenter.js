import React, {Fragment} from 'react';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import styles from './styles';
import FileList from '../FileList';

const NewFolder = (props) => {
    const {
        classes,
        name,
        handleCloseForm,
        handleNameChange,
        handleNameKeyPress,
        handleDoubleClickFile,
        handleSelectFile,
        files,
        selectedFile,
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
                <Typography variant="h6" className={classes.title}>
                    New {!!isFileType ? 'File' : 'Directory'}
                </Typography>
                {(!!isFileType) ?
                    <List dense className={classes.folderList}>
                        <FileList
                            files={files}
                            selectedFile={selectedFile}
                            handleSelectFile={handleSelectFile}
                            handleDoubleClickFile={handleDoubleClickFile}
                        />
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