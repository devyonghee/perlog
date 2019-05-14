import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";

const presenter = (props) => {
    const {classes, messages} = props;

    return (
        <div className={classes.screen}>
            {
                messages.map((message, index) => (
                    <div key={index}>
                        <span style={{'color': message.color}}>{message.path}</span>
                        <span>{message.message}</span>
                    </div>

                ))
            }
        </div>
    );
};


export default withStyles(styles)(presenter);