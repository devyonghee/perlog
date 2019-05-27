import React, {useState, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import fileReducer, {types as fileActionTypes} from './fileReducer';

const propTypes = {
    serverFiles: PropTypes.array,
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    watchFile: PropTypes.func.isRequired,
};

const defaultProps = {
    serverFiles: []
};

const container = props => {
    const {connect, disconnect, watchFile, serverFiles, search} = props;
    const [newFileForm, setOpenNewFileForm] = useState({opened: false, type: ''});
    const [selectedFile, setSelectedTarget] = useState(null);
    const [watchedFiles, setWatchedFiles] = useState([]);
    const [extendedDirectories, setExtendDirectory] = useState([]);
    const [files, dispatchFiles] = useReducer(fileReducer, [{
        name: 'D://test1.txt',
        color: 1,
        path: 'D://test1.txt',
        isDirectory: false,
        child: []
    }]);

    useEffect(() => {
        connect('http://127.0.0.1:50000');
    }, []);

    const addFile = target => {
        (newFileForm.type === 'directory') ?
            dispatchFiles({type: fileActionTypes.ADD_DIRECTORY, name: target, parent: selectedFile}) :
            dispatchFiles({type: fileActionTypes.ADD_FILE, file: target, parent: selectedFile});
        setExtendDirectory([...extendedDirectories, selectedFile])
    };

    const closeNewFileForm = () => setOpenNewFileForm({opened: false, type: ''});

    const handleFileWatchSwitch = (checked, file) => {
        if (checked) {
            setWatchedFiles([...watchedFiles, file])
        } else {
            watchedFiles.splice(watchedFiles.indexOf(file), 1);
            setWatchedFiles([...watchedFiles]);
        }
        return watchFile(file, !!checked);
    };

    const handleClickList = (e, file = null) => e.stopPropagation() | (selectedFile !== file && setSelectedTarget(file));

    const handleDoubleClickFile = (e, file) => {
        e.preventDefault();
        selectedFile !== file && setSelectedTarget(file);
        if (!file.isDirectory) return;

        if (extendedDirectories.includes(file)) {
            extendedDirectories.splice(extendedDirectories.indexOf(file), 1);
            return setExtendDirectory([...extendedDirectories]);
        }
        setExtendDirectory([...extendedDirectories, file]);
    };

    const handleContextMenuList = (e, file = null) => {
        e.stopPropagation();
        selectedFile !== file && setSelectedTarget(file);
        const {Menu, MenuItem} = window.remote;
        const menu = new Menu();
        if (!file || file.isDirectory) {
            menu.append(new MenuItem({
                label: 'New File',
                click: () => setOpenNewFileForm({opened: true, type: 'file'}) | (!serverFiles.length && search())
            }));
            menu.append(new MenuItem({
                label: 'New Directory',
                click: () => setOpenNewFileForm({opened: true, type: 'directory'})
            }));
            if (!file) return menu.popup({window: window.remote.getCurrentWindow()});
            menu.append(new MenuItem({type: 'separator'}));
        }
        menu.append(new MenuItem({
            label: 'Delete...', click: () => {
            }
        }));
        return menu.popup({window: window.remote.getCurrentWindow()})
    };


    return <Presenter
        files={files}
        serverFiles={serverFiles}
        addFile={addFile}
        newFileForm={newFileForm}
        selectedFile={selectedFile}
        watchedFiles={watchedFiles}
        extendedDirectories={extendedDirectories}
        closeNewFileForm={closeNewFileForm}
        handleClickList={handleClickList}
        handleDoubleClickFile={handleDoubleClickFile}
        handleFileWatchSwitch={handleFileWatchSwitch}
        handleContextMenuList={handleContextMenuList}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;