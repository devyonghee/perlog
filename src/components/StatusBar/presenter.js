import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { Button } from '@material-ui/core';
import classnames from 'classnames';
import { Stop as StopIcon, PlayArrow as PlayArrowIcon } from '@material-ui/icons';

const propTypes = {
    time: PropTypes.string.isRequired,
    messageSpeed: PropTypes.string.isRequired,
    messageCount: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
};

const defaultProps = {};

const presenter = (props) => {
    const { time, messageSpeed, messageCount, views, stop, handleClearClick, handleStopClick } = props;
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button className={classes.actionBtn}
                    onClick={handleClearClick}
                    variant="outlined"
                    size='small'
                    disableFocusRipple>
                CLEAR
            </Button>
            <Button className={stop ? classnames(classes.actionBtn, classes.stoppedBtn) : classes.actionBtn}
                    onClick={handleStopClick}
                    variant="outlined"
                    size='small'
                    disableFocusRipple>
                {stop ?
                    <><StopIcon className={classes.actionBtnIcon}/>STOP</> :
                    <><PlayArrowIcon className={classes.actionBtnIcon}/>PLAY</>}
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