import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import useStyles from './styles';

const propTypes = {
    time: PropTypes.string.isRequired,
    messageSpeed: PropTypes.string.isRequired,
    messagesCount: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
};

const defaultProps = {};

const presenter = ({time, messageSpeed, messagesCount, views}) => {
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
                <span className="num">{messagesCount}</span>
                <span className="label">messages</span>
            </div>
            <div className={classes.status}>
                <span className="num">{views}</span>
                <span className="label">views</span>
            </div>
        </Paper>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;