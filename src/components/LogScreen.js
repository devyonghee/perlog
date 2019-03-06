import React from 'react';
import Message from "./Message";


const LogScreen = ()=> {
        const messages = this.props.messages.reduce(
            () => <Message stream={{}}/>
            , <div className="msg"/>);

        return (
            <div className="log_screen">
                <div className="controls">
                    <a className="clear">clear</a>
                    <a className="filter">filter <input type="text" placeholder='Filter...'/></a>
                </div>
                <div className="messages" style={{height: "918px"}}/>
            </div>
        );
};

export default LogScreen;