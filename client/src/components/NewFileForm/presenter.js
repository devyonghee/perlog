import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import styles from './styles';
import FileList from '../FileList';

const propTypes = {
    isFileType: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    handleCloseForm: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleClickConfirm: PropTypes.func.isRequired,
    handleNameKeyPress: PropTypes.func.isRequired,
    handleDoubleClickFile: PropTypes.func.isRequired,
    selectedFile: PropTypes.object,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.array,
            name: PropTypes.string,
            path: PropTypes.string,
            isDirectory: PropTypes.bool,
            isExtended: PropTypes.bool,
        })),
};

const defaultProps = {
    isFileType: false,
    files: [],
};

const presenter = (props) => {
    const {
        classes,
        name,
        handleCloseForm,
        handleNameChange,
        handleClickConfirm,
        handleNameKeyPress,
        handleDoubleClickFile,
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
                className={classNames(classes.wrapPaper, (!!isFileType) ? classes.fileWrap : classes.directoryWrap)}
                elevation={0}
            >
                <Typography variant="h6" className={classes.title}>
                    New {!!isFileType ? 'File' : 'Directory'}
                </Typography>
                {(!!isFileType) ?
                    <List dense className={classes.folderList}>
                        <FileList
                            {...props}
                            files={files}
                            selectedFile={selectedFile}
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
                    <Button color="primary" size="small" onClick={handleClickConfirm}>
                        OK
                    </Button>
                    <Button color="secondary" size="small" onClick={handleCloseForm}>
                        Cancel
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;


export default withStyles(styles)(presenter);