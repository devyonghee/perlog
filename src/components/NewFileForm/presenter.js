import React from 'react';
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
import { DIRECTORY } from 'src/modules/utils';

const propTypes = {
    opened: PropTypes.bool,
    type: PropTypes.type,
    name: PropTypes.string,
    filterString: PropTypes.string,
    handleNameChange: PropTypes.func,
    handleNameKeyPress: PropTypes.func,
    handleClickConfirm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleFilterStringChange: PropTypes.func.isRequired,
};

const defaultProps = {
    name: '',
    filterString: '',
    handleNameChange: () => null,
    handleNameKeyPress: () => null,
};

const presenter = (props) => {
    const {
        type,
        name,
        files,
        opened,
        filterString,
        handleClose,
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
            open={opened}
            onClose={handleClose}
            transitionDuration={{exit: 0}}
            fullWidth
            classes={(type === DIRECTORY) ? null : {paper: classes.wrapPaper}}
            maxWidth={(type === DIRECTORY) ? 'xs' : 'sm'}
        >
            <DialogTitle id="alert-dialog-title">
                {`New ${type.charAt(0).toUpperCase()}${type.slice(1)}`}
            </DialogTitle>
            <DialogContent>
                {(type === DIRECTORY) ?
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
                    <>
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
                                    files={[]}
                                    dense
                                    {...props}
                                    regexp={!!filterString ? new RegExp(filterString, 'gi') : null}
                                    invisibleSwitch
                                />
                            </List>
                        </div>
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" size="small" onClick={handleClickConfirm}>
                    OK
                </Button>
                <Button color="secondary" size="small" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;