import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    node: PropTypes.object.isRequired,
    stream: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
};

const defaultProps = {
    nodes: {name: '', color: 0},
    streams: {name: '', color: 0},
    messages: '',
};

const Message = ({node, stream, message}) => {
    return (<p>
        <span className={`stream color${node.color}`}>{node.name}</span>
        <span className={`node color${stream.color}`}>{stream.name}</span>
        <span className="message">{message}</span>
    </p>);
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;