import React, {useState, useEffect} from 'react';
import Presenter from './presenter';
import io from 'socket.io-client'

const container = (props) => {
    const {files, addFile, addMessage, watchFile, forgetFile} = props;
    const [socket, setSocket] = useState(null);
    const [path, setPath] = useState('');

    useEffect(() => {
        const socket = io.connect('http://127.0.0.1:50000');
        socket.on('connect', () => {
            setSocket(socket);
        });

        socket.on('log', (path, message) => addMessage(path, message));
        socket.on('fileError', (path, message) => {
            console.log(message);
            forgetFile(path);
            window.ipcRenderer.send('get-app-path')
        });
        window.ipcRenderer.on('test', ()=>console.log('zxcvzxcvzvxvcv'));

    }, []);

    const handlePathChange = e => {
        const {target: {value}} = e;
        setPath(value);
    };

    const handlePathKeyPress = e => {
        const {key} = e;
        if (key.toLowerCase() !== "enter" || !path) return;

        e.preventDefault();
        addFile(path);
        setPath('');
    };

    const handleFileSwitchChange = (checked, path) => {
        if (!checked) return forgetFile(path);
        if (!socket) return;
        watchFile(path);
        socket.emit('watch', path)
    };

    return <Presenter files={files}
                      handlePathChange={handlePathChange}
                      handlePathKeyPress={handlePathKeyPress}
                      handleFileSwitchChange={handleFileSwitchChange}
                      path={path}/>;
};

export default container;