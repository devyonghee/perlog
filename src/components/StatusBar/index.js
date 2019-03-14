import React from 'react';
import Stat from '../Status'
import {useState, useEffect} from "react";
import PropTypes from 'prop-types';

const propTypes = {
    nodes: PropTypes.number.isRequired,
    streams: PropTypes.number.isRequired,
    messages: PropTypes.number.isRequired,
};

const defaultProps = {
    nodes: 0,
    streams: 0,
    messages: 0,
};

const start = new Date().getTime();

const StatusBar = ({nodes, streams, messages}) => {
    const [now, setNow] = useState(new Date().getTime());

    useEffect(() => {
        setInterval(() => setNow(new Date().getTime()), 1000)
    }, []);

    const elapsed = (now - start) / 1000;
    const minutes = Number(elapsed / 60).toFixed(0);
    let seconds = Number(elapsed % 60).toFixed(0);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    const prettyTime = minutes + ":" + seconds;
    const messageSpeed = (elapsed !== 0 && messages !== 0) ? (messages / elapsed).toFixed(2) : Number(0).toFixed(2);

    return (
        <div className="status_bar">
            <div className="stats">
                <div className="stats">
                    <Stat name='messages/sec' value={messageSpeed}/>
                    <Stat name='elapsed' value={prettyTime}/>
                    <Stat name='messages' value={messages}/>
                    <Stat name='Nodes' value={nodes}/>
                    <Stat name='Streams' value={streams}/>
                </div>
            </div>
            <div style={{clear: 'both'}}/>
        </div>
    );
};


StatusBar.propTypes = propTypes;
StatusBar.defaultProps = defaultProps;

export default StatusBar;