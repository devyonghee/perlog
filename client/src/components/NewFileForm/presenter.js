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
    name: PropTypes.string,
    handleNameChange: PropTypes.func,
    handleNameKeyPress: PropTypes.func,
    handleClickConfirm: PropTypes.func.isRequired,
    handleCloseForm: PropTypes.func.isRequired,
    newFileForm: PropTypes.shape({
        opened: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
};

const defaultProps = {
    name: '',
    handleNameChange: ()=>null,
    handleNameKeyPress: () => null,
};

const presenter = (props) => {
    const {
        name,
        handleCloseForm,
        handleNameChange,
        handleClickConfirm,
        handleNameKeyPress,
        newFileForm
    } = props;

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={newFileForm.opened}
            onClose={handleCloseForm}
        >
            <Paper
                className={classNames(classes.wrapPaper, (newFileForm.type === 'directory') ? classes.directoryWrap : classes.fileWrap)}
                elevation={0}
            >
                <Typography variant="h6" className={classes.title}>
                    New {newFileForm.type.charAt(0).toUpperCase() + newFileForm.type.slice(1)}
                </Typography>
                {(newFileForm.type === 'directory') ?
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
                            dense
                            invisibleSwitch
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