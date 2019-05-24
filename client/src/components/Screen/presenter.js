import React from 'react';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";

const presenter = (props) => {
    const {messages} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paper} square elevation={0}>
            {
                messages.map((message, index) => (
                    <div className={classes.message} key={index}>
                        <Typography inline className={classnames(classes.name, classes[`fileName${message.color}`])} >{message.file}</Typography>
                        <Typography inline className={classes.contents}>{message.contents}</Typography>
                    </div>
                ))
            }
        </Paper>
    );
};


export default presenter;