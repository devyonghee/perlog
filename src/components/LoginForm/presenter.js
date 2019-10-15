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
        showPassword: PropTypes.boolean,
    }),
    open: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleConfirmClick: PropTypes.func.isRequired,
    handleClickShowPassword: PropTypes.func.isRequired,
};

const defaultProps = {
    open: false,
};

const presenter = (props) => {
    const {
        open,
        values,
        loading,
        closeForm,
        handleKeyPress,
        handleTextChange,
        handleConfirmClick,
        handleClickShowPassword
    } = props;

    const classes = useStyles();

    return (
        <Dialog
            classes={{paper: classes.dialogPaper}}
            open={open}
            disableBackdropClick
            transitionDuration={{exit: 0}}
            maxWidth='xs'
            onClose={closeForm}
        >
            <DialogTitle className={classes.title}>
                    Login
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
                                onKeyUp: handleKeyPress,
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
                    </>
                }
            </DialogContent>
            {!loading ?
                < DialogActions>
                    <Button color="primary" size="large" onClick={handleConfirmClick}>
                        CONNECT
                    </Button>
                    <Button color="secondary" size="large" onClick={closeForm}>
                        CANCLE
                    </Button>
                </DialogActions> : null}
        </Dialog>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;