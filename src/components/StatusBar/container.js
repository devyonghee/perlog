import React, {useState, useEffect} from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    messages: PropTypes.array.isRequired,
};

const defaultProps = {};

const container = (props) => {
    const [now, setNow] = useState(new Date().getTime());
    const [start] = useState(new Date().getTime());
    const [messagesCount, setMessageCount] = useState(0);

    useEffect(() => {
        if (!!props.messages && !!props.messages.length) setMessageCount(messagesCount + 1);
    }, [props.messages]);


    useEffect(() => {
        setInterval(() => setNow(new Date().getTime()), 1000)
    }, []);

    const elapsed = (now - start) / 1000;
    const minutes = Number(elapsed / 60).toFixed(0);
    let seconds = Number(elapsed % 60).toFixed(0);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    const prettyTime = minutes + ":" + seconds;
    const messageSpeed = (elapsed !== 0) ? (messagesCount / elapsed).toFixed(2) : Number(0).toFixed(2);

    return <Presenter
        {...props}
        time={prettyTime}
        messageSpeed={messageSpeed}
        messagesCount={messagesCount}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;