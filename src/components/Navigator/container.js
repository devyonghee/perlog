import React, {useState, useEffect} from 'react';
import Presenter from './presenter';
import io from 'socket.io-client'

const container = (props) => {
    const {files, addFile, addMessage, watchFile, forgotFile} = props;
    const [socket, setSocket] = useState(null);
    const [path, setPath] = useState('');

    useEffect(() => {
        const newSocket = io.connect('http://127.0.0.1:50000');
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });

        newSocket.on('@log', (path, message) => {
            addMessage(path, message);
        });
    }, []);

    const handlePathChange = e => {
        const {target: {value}} = e;
        setPath(value);
    };

    const handlePathKeyPress = e => {
        const {key} = e;
        if (key.toLowerCase() !== "enter") return;

        e.preventDefault();
        addFile(path);
        setPath('');
    };

    const handleFileSwitchChange = (checked, path) => {
        if (!checked) return forgotFile(path);
        if (!socket) return;
        watchFile(path);
        socket.emit('data', 'watch', path)
    };

    return <Presenter files={files}
                      handlePathChange={handlePathChange}
                      handlePathKeyPress={handlePathKeyPress}
                      handleFileSwitchChange={handleFileSwitchChange}
                      path={path}/>;
};

export default container;