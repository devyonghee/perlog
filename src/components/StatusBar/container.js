import React, { useEffect, useState } from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    messages: PropTypes.array,
};

const defaultProps = {
    messages: [],
};

const container = (props) => {
    const { messageCount, watchCount, clear, stop, setStop } = props;
    const [now, setNow] = useState(new Date().getTime());
    const [start] = useState(new Date().getTime());

    useEffect(() => {
        setInterval(() => setNow(new Date().getTime()), 1000)
    }, []);

    const handleClearClick = e => {
        e.preventDefault();
        clear();
    };

    const handleStopClick = e => {
        e.preventDefault();
        setStop(!stop);
    };

    const elapsed = (now - start) / 1000;
    const minutes = Math.floor(Number(elapsed / 60));
    let seconds = Number(elapsed % 60).toFixed(0);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    const prettyTime = minutes + ":" + seconds;
    const messageSpeed = (elapsed !== 0) ? (messageCount / elapsed).toFixed(2) : Number(0).toFixed(2);

    return <Presenter
        stop={stop}
        time={prettyTime}
        views={watchCount}
        messageSpeed={messageSpeed}
        messageCount={messageCount}
        handleStopClick={handleStopClick}
        handleClearClick={handleClearClick}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;