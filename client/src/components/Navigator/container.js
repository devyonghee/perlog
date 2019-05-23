import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    watchFile: PropTypes.func.isRequired,
    addFile: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    openNewFileForm: PropTypes.func.isRequired,
    setSelectTarget: PropTypes.func.isRequired,
    selectedFile: PropTypes.object,
};

const defaultProps = {};

const container = (props) => {
    const {connect, watchFile, addFile, openNewFileForm, setSelectTarget, selectedFile} = props;
    const [path, setPath] = useState('');

    useEffect(() => {
        connect('http://127.0.0.1:50000');
    }, []);

    const handleFileWatchSwitch = (checked, file) => watchFile(file, !!checked);
    const handlePathChange = ({target: {value}}) => setPath(value);
    const handlePathKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !path) return;
        e.preventDefault();
        addFile(path);
        setPath('');
    };

    const handleClickList = (e, file = null) => {
        e.stopPropagation();
        selectedFile !== file && setSelectTarget(file);
    };

    const handleContextMenuList = (e, file = null) => {
        e.stopPropagation();
        selectedFile !== file && setSelectTarget(file);
        const {Menu, MenuItem} = window.remote;
        const menu = new Menu();
        if (!file || file.isDirectory) {
            menu.append(new MenuItem({label: 'New File', click: () => openNewFileForm('file')}));
            menu.append(new MenuItem({label: 'New Directory', click: () => openNewFileForm('directory')}));
            if (!file) return menu.popup({window: window.remote.getCurrentWindow()});
            menu.append(new MenuItem({type: 'separator'}));
        }
        menu.append(new MenuItem({label: 'Delete...', click: () => openNewFileForm('file')}));
        return menu.popup({window: window.remote.getCurrentWindow()})
    };


    return <Presenter
        {...props}
        handlePathChange={handlePathChange}
        handlePathKeyPress={handlePathKeyPress}
        handleFileWatchSwitch={handleFileWatchSwitch}
        handleContextMenuList={handleContextMenuList}
        handleClickList={handleClickList}
        path={path}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;