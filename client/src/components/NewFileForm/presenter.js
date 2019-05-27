import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import FileList from '../FileList';

const propTypes = {
    isFileType: PropTypes.bool,
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
        name,
        handleCloseForm,
        handleNameChange,
        handleClickConfirm,
        handleNameKeyPress,
        handleDoubleClickFile,
        files,
        selectedFile,
        type,
    } = props;

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open
            onClose={handleCloseForm}
        >
            <Paper
                className={classNames(classes.wrapPaper, (type === 'directory') ? classes.directoryWrap : classes.fileWrap)}
                elevation={0}
            >
                <Typography variant="h6" className={classes.title}>
                    New {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
                {(type === 'directory') ?
                    <TextField
                        margin="dense"
                        className={classes.textField}
                        helperText="Enter a New File Name"
                        fullWidth
                        autoFocus
                        inputProps={{
                            onChange: handleNameChange,
                            onKeyPress: handleNameKeyPress,
                            value: name
                        }}
                    /> : <List dense className={classes.folderList}>
                        <FileList
                            {...props}
                            files={files}
                            selectedFile={selectedFile}
                            handleDoubleClickFile={handleDoubleClickFile}
                        />
                    </List>
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

export default presenter;