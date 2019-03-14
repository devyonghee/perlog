import React from 'react';

const Message = ({node, stream, message}) => {
    return (<p>
        <span className={`stream color${node.color}`}>{node.name}</span>
        <span className={`node color${stream.color}`}>{stream.name}</span>
        <span className="message">{message}</span>
    </p>);
};


export default Message;