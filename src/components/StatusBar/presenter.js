import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { Button } from '@material-ui/core';

const propTypes = {
    time: PropTypes.string.isRequired,
    messageSpeed: PropTypes.string.isRequired,
    messageCount: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
};

const defaultProps = {};

const presenter = (props) => {
    const { time, messageSpeed, messageCount, views, handleClick } = props;
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button className={classes.clearBtn}
                    onClick={handleClick}
                    variant="outlined"
                    size='small'
                    disableFocusRipple>
                CLEAR
            </Button>
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
                    <span className="num">{messageCount}</span>
                    <span className="label">messages</span>
                </div>
                <div className={classes.status}>
                    <span className="num">{views}</span>
                    <span className="label">views</span>
                </div>
            </Paper>
        </div>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;