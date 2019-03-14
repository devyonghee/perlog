import React from 'react';
import Stat from './Stat'
import {useState, useEffect,useLayoutEffect} from "react";


const start = new Date().getTime();

const StatusBar = () => {
    const [now, setNow] = useState(new Date().getTime());

    useLayoutEffect(()=>{
        setInterval(() => setNow(new Date().getTime()), 1000)
    });

    const elapsed = (now - start) / 1000;
    const minutes = Number(elapsed / 60).toFixed(0);
    let seconds = Number(elapsed % 60).toFixed(0);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    const prettyTime = minutes + ":" + seconds;
    const messageSpeed = (elapsed !== 0) ? (1 / elapsed).toFixed(2) : Number(0).toFixed(2);

    return (
        <div className="status_bar">
            <div className="stats">
                <div className="stats">
                    <Stat name='messages/sec' value={messageSpeed}/>
                    <Stat name='elapsed' value={prettyTime}/>
                    <Stat name='messages' value={0}/>
                    <Stat name='Nodes' value={0}/>
                    <Stat name='Streams' value={0}/>
                </div>
            </div>
            <div style={{clear: 'both'}}/>
        </div>
    );
};

const propTypes = {};

const defaultProps = {};

asd.propTypes = propTypes;
asd.defaultProps = defaultProps;

export default asd;

export default StatusBar;