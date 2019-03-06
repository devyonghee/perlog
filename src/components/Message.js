import React from 'react';

const Message = () => {
    return (
        <p>
            <span className={`stream color${this.props.stream.color}`}>{this.props.stream.name}</span>
            <span className={`node color${this.props.node.color}`}>{this.props.node.name}</span>
            <span className="message">{this.props.message}</span>
        </p>
    );
};


export default Message;