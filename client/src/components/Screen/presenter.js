import React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";

const presenter = (props) => {
    const {messages} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={2}>
            {
                messages.map(({file, message}, index) => (
                    <div className={classes.message} key={index}>
                        <Typography inline className={classNames(classes.name, classes[`fileName${file.color}`])} >{file.route}</Typography>
                        <Typography inline className={classes.contents}>{message}</Typography>
                    </div>
                ))
            }
        </Paper>
    );
};


export default presenter;