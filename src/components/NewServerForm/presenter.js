import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const propTypes = {
    values: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
    }),
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleConfirmClick: PropTypes.func.isRequired,
};

const defaultProps = {
    url: '',
    name: '',
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
    } = props;

    const classes = useStyles();

    return (
        <Dialog
            className={classes.dialog}
            classes={{ paper: classes.dialogPaper }}
            open={open}
            disableBackdropClick
            transitionDuration={{ exit: 0 }}
            onClose={closeForm}
        >
            <DialogTitle className={classes.title}>
                New Server
            </DialogTitle>

            <DialogContent className={classes.content}>
                {loading ?
                    <CircularProgress/> :
                    <>
                        <TextField
                            label="name"
                            fullWidth
                            margin='normal'
                            autoFocus
                            placeholder="Enter a name"
                            className={classes.nameText}
                            onChange={handleTextChange('name')}
                            value={values.name}
                            inputProps={{
                                classes: { root: classes.textFieldInput },
                                onChange: handleTextChange('name'),
                                onKeyPress: handleKeyPress,
                            }}
                        />
                        <div className={classes.urlWrap}>
                            <Typography className={classes.protocol}>
                                http://
                            </Typography>
                            <TextField
                                label="url"
                                margin='normal'
                                placeholder="Enter a url"
                                className={classes.urlText}
                                onChange={handleTextChange('url')}
                                value={values.url}
                                inputProps={{
                                    classes: { root: classes.textFieldInput },
                                    onChange: handleTextChange('url'),
                                    onKeyPress: handleKeyPress,
                                }}
                            />
                        </div>
                    </>
                }
            </DialogContent>
            {!loading ?
                <DialogActions>
                    <Button color="primary" size="large" onClick={handleConfirmClick}>
                        CONNECT
                    </Button>
                    <Button color='secondary' size="large" onClick={closeForm}>
                        CANCEL
                    </Button>
                </DialogActions> : null}
        </Dialog>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;