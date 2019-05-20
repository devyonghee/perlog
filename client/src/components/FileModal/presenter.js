import React, {useEffect, useRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles';


const AddDirectory = (props) => (
    <TextField
        id="standard-name"
        margin="dense"
        className={props.classes.textField}
        value={props.name}
        helperText="Enter a New File Name"
        fullWidth
        inputProps={{
            onChange: props.handleNameChange,
            onKeyPress: props.handleNameKeyPress,
            value: props.name
        }}
    />
);

const AddFile = (props) => {
    props.search('home');
    return null;
};

const NewFolder = (props) => {
    const {
        classes,
        name,
        handleNameChange,
        handleNameKeyPress,
        isOpen,
        close,
        type
    } = props;


    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableAutoFocus
            open={isOpen}
            onClose={close}
        >
            <div className={classes.paper}>
                <Typography variant="h6">
                    New {type}
                </Typography>
                {(type === 'directory') ? <AddDirectory {...props}/> : <AddFile {...props}/>}
                <div className={classes.buttonsWrap}>
                    <Button color="primary" size="small" className={classes.button}>
                        OK
                    </Button>
                    <Button color="secondary" size="small" className={classes.button}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};


export default withStyles(styles)(NewFolder);