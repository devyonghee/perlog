import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import io from "socket.io-client";
import {saveServer, getServer} from "../storage";

const propTypes = {
    setSocket: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    setErrorFile: PropTypes.func.isRequired
};

const defaultProps = {};

const container = (props) => {
    const {setSocket, reset, setFiles, addMessage, setErrorFile} = props;

    const server = getServer();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(server.name || '');
    const [url, setUrl] = useState(server.url || '');

    const connect = () => {
        setLoading(true);
        const socket = io.connect(url, {'reconnection': true, 'reconnectionAttempts': 3});
        socket.on('connect', () => {
            saveServer(name, url);
            setLoading(false);
            setSocket(name, socket)
        });

        socket.on('searched', (path, files) => setFiles(path, files));
        socket.on('log', (path, message) => addMessage(path, message));
        socket.on('fileError', (path, message) => {
            window.remote.dialog.showErrorBox('파일이 존재하지 않습니다.', message);
            setErrorFile(path)
        });

        socket.on('reconnect_failed', () => {
            window.remote.dialog.showErrorBox('Error', (loading) ? '주소가 잘못 되었습니다.' : '서버와의 연결이 끊겼습니다.');
            setLoading(false);
            reset();
        });

        socket.on('error', (path, message) => {
            window.remote.dialog.showErrorBox('서버와의 연결이 끊겼습니다.', message);
            setLoading(false);
            reset();
        });
    };

    const handleUrlKeyPress = e => {
        if (e.key.toLowerCase() !== "enter") return;
        e.preventDefault();
        const trimName = name.trim();
        const trimUrl = url.trim();
        if (!trimName || !trimUrl) {
            setName(trimName);
            setUrl(trimUrl);
            return window.remote.dialog.showErrorBox(`${!trimName ? 'Name' : 'Url'} Error`, `${!trimName ? '이름을' : '주소를'} 입력하지 않았습니다.`);
        }
        connect();
        setName('');
        setUrl('');
    };

    const handleTextChange = (e, target) => {
        e.preventDefault();
        (target === 'name') ? setName(e.target.value) : setUrl(e.target.value);
    };
    const handleConfirmClick = e => {
        e.preventDefault();
        const trimName = name.trim();
        const trimUrl = url.trim();
        if (!trimName || !trimUrl) {
            setName(trimName);
            setUrl(trimUrl);
            return window.remote.dialog.showErrorBox(`${!trimName ? 'Name' : 'Url'} Error`, `${!trimName ? '이름을' : '주소를'} 입력하지 않았습니다.`);
        }
        connect();
    };


    return (
        <Presenter
            name={name}
            url={url}
            loading={loading}
            handleUrlChange={handleTextChange}
            handleUrlKeyPress={handleUrlKeyPress}
            handleConfirmClick={handleConfirmClick}
        />
    )

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;