import React from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';

const presenter = ({time, messageSpeed, messages, files}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.statusPaper} elevation={0}>
            <div className={classes.status}>
                <span className="num">{messageSpeed}</span>
                <span className="label">messages/sec</span>
            </div>
            <div className={classes.status}>
                <span className="num">{time}</span>
                <span className="label">time</span>
            </div>
            <div className={classes.status}>
                <span className="num">{messages}</span>
                <span className="label">messages</span>
            </div>
            <div className={classes.status}>
                <span className="num">{files}</span>
                <span className="label">views</span>
            </div>
        </Paper>
    );
};


export default presenter;