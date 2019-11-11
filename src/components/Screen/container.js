import React, { useEffect, useRef, useState } from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const { ipcRenderer, clipboard } = window.require('electron');

const propTypes = {
    messages: PropTypes.array,
};

const defaultProps = {
    messages: [],
};

const container = (props) => {
    const { messages, filter } = props;

    const screen = useRef(null);
    const [preScrollHeight, setPreScrollHeight] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopyClick = message => e => {
        e.preventDefault();
        clipboard.writeText(message);
        setCopied(true);
    };

    const initialCopiedState = () => setCopied(false);

    useEffect(() => {
        const addedMessage = messages[messages.length - 1];
        if (filter && addedMessage && filter.test(addedMessage.message)) {
            ipcRenderer.send('alert-message', addedMessage.name, addedMessage.message.slice(0, 20));
        }

        if (!screen.current ||
            !screen.current.scrollHeight ||
            screen.current.scrollHeight <= preScrollHeight ||
            (screen.current.clientHeight + screen.current.scrollTop) < preScrollHeight - 50) {
            return;
        }

        screen.current.scrollTop = screen.current.scrollHeight - screen.current.clientHeight;
        setPreScrollHeight(screen.current.scrollHeight);
    }, [messages]);

    return <Presenter
        messages={messages}
        screenRef={screen}
        filter={filter}
        copied={copied}
        handleCopyClick={handleCopyClick}
        initialCopiedState={initialCopiedState}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;