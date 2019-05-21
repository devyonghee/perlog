import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    directories: PropTypes.object.isRequired,
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    watchFile: PropTypes.func.isRequired,
    forgetFile: PropTypes.func.isRequired,
    addFile: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    openNewFileForm: PropTypes.func.isRequired,
};

const defaultProps = {};

const container = (props) => {
    const {connect, watchFile, forgetFile, addFile, openNewFileForm} = props;
    const [path, setPath] = useState('');

    useEffect(() => {
        connect('http://127.0.0.1:50000');
    }, []);

    const handleFileWatchSwitch = (checked, path) => (!!checked) ? watchFile(path) : forgetFile(path);
    const handlePathChange = ({target: {value}}) => setPath(value);
    const handlePathKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !path) return;
        e.preventDefault();
        addFile(path);
        setPath('');
    };

    const handleListContextMenu = (e) => {
        e.preventDefault();
        const {Menu, MenuItem} = window.remote;
        const menu = new Menu();
        menu.append(new MenuItem({label: 'New File', click: () => openNewFileForm('file')}));
        menu.append(new MenuItem({label: 'New Directory', click: () => openNewFileForm('directory')}));
        menu.popup({window: window.remote.getCurrentWindow()})
    };

    return <Presenter
        handlePathChange={handlePathChange}
        handlePathKeyPress={handlePathKeyPress}
        handleFileWatchSwitch={handleFileWatchSwitch}
        handleListContextMenu={handleListContextMenu}
        path={path}
        {...props}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;