import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

const propTypes = {
    values: PropTypes.shape({
        id: PropTypes.string,
        password: PropTypes.string,
        url: PropTypes.string,
        showPassword: PropTypes.boolean,
    }),
    name: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleConfirmClick: PropTypes.func.isRequired,
    handleClickShowPassword: PropTypes.func.isRequired,
};

const defaultProps = {
    url: '',
    name: '',
};

const presenter = (props) => {
    const {
        values,
        loading,
        handleKeyPress,
        handleTextChange,
        handleConfirmClick,
        handleClickShowPassword
    } = props;

    const classes = useStyles();

    return (
        <Dialog
            classes={{paper: classes.dialogPaper}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="simple-modal-description"
            open={true}
            disableEscapeKeyDown
            disableBackdropClick
            transitionDuration={{exit: 0}}
            fullWidth
            maxWidth='xs'
        >
            <DialogTitle className={classes.title} id="alert-dialog-title">
                    Server
            </DialogTitle>

            <DialogContent className={classes.content}>
                {loading ?
                    <CircularProgress/> :
                    <>
                        <TextField
                            label="Id"
                            margin="normal"
                            fullWidth
                            autoFocus
                            placeholder="Enter a Id"
                            className={classes.textField}
                            onChange={handleTextChange('id')}
                            value={values.id}
                            inputProps={{
                                classes: {root: classes.textFieldInput},
                                onChange: handleTextChange('id'),
                                onKeyPress: handleKeyPress,
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            margin="normal"
                            fullWidth
                            autoFocus
                            placeholder="Enter a Password"
                            onChange={handleTextChange('password')}
                            className={classes.textField}
                            value={values.password}
                            InputProps={{
                                classes: {root: classes.textFieldInput},
                                onKeyPress: handleKeyPress,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={e => e.preventDefault()}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            type={values.showPassword ? 'text' : 'password'}
                            />
                        <TextField
                            label="Url"
                            margin="normal"
                            fullWidth
                            autoFocus
                            placeholder="Enter a Url"
                            className={classes.textField}
                            value={values.url}
                            onChange={handleTextChange('url')}
                            inputProps={{
                                classes: {root: classes.textFieldInput},
                                onKeyPress: handleKeyPress,
                            }}
                        />
                    </>
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