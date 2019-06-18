import React, {useRef, useEffect, useState} from 'react';
import Presenter from './presenter';

const container = (props) => {
    const {messages} = props;
    const screen = useRef(null);
    const [preScrollHeight, setPreScrollHeight] = useState(0);
    const [filterString, setFilterString] = useState('');
    const handleFilterStringChange = e => e.preventDefault() & setFilterString(e.target.value);

    useEffect(() => {
        const addedMessage = messages[messages.length - 1];
        const regexp = new RegExp(filterString, 'gi');
        if (!!filterString && !!addedMessage && regexp.test(addedMessage.message)) {
            window.ipcRenderer.send('alert-message', addedMessage.file.path, addedMessage.message.slice(0, 200));
        }

        if (!screen.current ||
            !screen.current.scrollHeight ||
            screen.current.scrollHeight <= preScrollHeight ||
            (screen.current.clientHeight + screen.current.scrollTop) < preScrollHeight) {
            return;
        }

        screen.current.scrollTop = screen.current.scrollHeight - screen.current.clientHeight;
        setPreScrollHeight(screen.current.scrollHeight)
    }, [props.messages]);

    return <Presenter
        {...props}
        screenRef={screen}
        filterString={filterString}
        handleFilterStringChange={handleFilterStringChange}
    />;
};

export default container;