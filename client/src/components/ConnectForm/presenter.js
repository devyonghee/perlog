import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';

const propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    handleUrlKeyPress: PropTypes.func.isRequired,
    handleConfirmClick: PropTypes.func.isRequired,
};

const defaultProps = {
    url: '',
    name: '',
};

const presenter = (props) => {
    const {
        name,
        url,
        loading,
        handleUrlChange,
        handleUrlKeyPress,
        handleConfirmClick
    } = props;

    const classes = useStyles();

    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="simple-modal-description"
            open={true}
            disableEscapeKeyDown
            disableBackdropClick
            transitionDuration={{exit: 0}}
            fullWidth
            maxWidth='xs'
        >
            <DialogTitle id="alert-dialog-title">
                Server
            </DialogTitle>

            <DialogContent className={classes.content}>
                {loading ?
                    <CircularProgress/> :
                    <Fragment>
                        <TextField
                            label="Name"
                            margin="normal"
                            fullWidth
                            autoFocus
                            placeholder="Enter a Name"
                            inputProps={{
                                onChange: e => handleUrlChange(e, 'name'),
                                onKeyPress: handleUrlKeyPress,
                                value: name
                            }}
                        />
                        <TextField
                            label="Url"
                            margin="normal"
                            placeholder="Enter a Url"
                            fullWidth
                            inputProps={{
                                onChange: e => handleUrlChange(e, 'url'),
                                onKeyPress: handleUrlKeyPress,
                                value: url
                            }}
                        />
                    </Fragment>
                }
            </DialogContent>
            {!loading ?
                < DialogActions>
                    < Button color="primary" size="large" onClick={handleConfirmClick}>
                        CONNECT
                    </Button>
                </DialogActions> : null}
        </Dialog>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;