import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from "./styles";

const presenter = (props) => {
    const {classes, messages} = props;

    return (
        <Paper className={classes.paper} square elevation={0}>
            {
                messages.map((message, index) => (
                    <div className={classes.message} key={index}>
                        <Typography inline variant='subtitle1' className={classes.name} style={{'color': message.color}}>{message.file}</Typography>
                        <Typography inline variant='subtitle2' className={classes.contents}>{message.contents}</Typography>
                    </div>
                ))
            }
        </Paper>
    );
};


export default withStyles(styles)(presenter);