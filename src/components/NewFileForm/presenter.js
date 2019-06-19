import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';
import FileList from '../FileList';

const propTypes = {
    name: PropTypes.string,
    filterString: PropTypes.string,
    handleNameChange: PropTypes.func,
    handleNameKeyPress: PropTypes.func,
    handleClickConfirm: PropTypes.func.isRequired,
    handleCloseForm: PropTypes.func.isRequired,
    handleFilterStringChange: PropTypes.func.isRequired,
    newFileForm: PropTypes.shape({
        opened: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
};

const defaultProps = {
    name: '',
    filterString: '',
    handleNameChange: () => null,
    handleNameKeyPress: () => null,
};

const presenter = (props) => {
    const {
        name,
        filterString,
        newFileForm,
        handleCloseForm,
        handleNameChange,
        handleClickConfirm,
        handleNameKeyPress,
        handleFilterStringChange,
    } = props;

    const classes = useStyles();

    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="simple-modal-description"
            open={newFileForm.opened}
            onClose={handleCloseForm}
            transitionDuration={{exit: 0}}
            fullWidth
            classes={(newFileForm.type === 'directory') ? null : {paper: classes.wrapPaper}}
            maxWidth={(newFileForm.type === 'directory') ? 'xs' : 'sm'}
        >
            <DialogTitle id="alert-dialog-title">
                {`New ${newFileForm.type.charAt(0).toUpperCase()}${newFileForm.type.slice(1)}`}
            </DialogTitle>
            <DialogContent>
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
                    /> :
                    <Fragment>
                        <div className={classes.wrapNewFileForm}>
                            <TextField
                                margin="dense"
                                placeholder="search"
                                fullWidth
                                variant="outlined"
                                inputProps={{
                                    onChange: handleFilterStringChange,
                                    value: filterString
                                }}
                                InputLabelProps={{shrink: true}}
                            />
                            <List dense className={classes.folderList}>
                                <FileList
                                    {...props}
                                    regexp={!!filterString ? new RegExp(filterString, 'gi') : null}
                                    dense
                                    invisibleSwitch
                                />
                            </List>
                        </div>
                    </Fragment>
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" size="small" onClick={handleClickConfirm}>
                    OK
                </Button>
                <Button color="secondary" size="small" onClick={handleCloseForm}>
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;