import React, {useState, useEffect, useReducer, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import fileReducer, {types as fileActionTypes} from './fileReducer';
import {saveFiles, loadFiles} from '../storage';

const fileType = PropTypes.shape({
    child: PropTypes.array,
    parent: PropTypes.object,
    name: PropTypes.string,
    path: PropTypes.string,
    isDirectory: PropTypes.bool,
});

const propTypes = {
    serverName: PropTypes.string,
    serverFiles: PropTypes.array,
    search: PropTypes.func.isRequired,
    watchFile: PropTypes.func.isRequired,
    watchedFiles: PropTypes.arrayOf(fileType),
    errorFiles: PropTypes.arrayOf(fileType),
};

const defaultProps = {
    serverName: '',
    serverFiles: [],
    watchedFiles: [],
    errorFiles: [],
};

const container = props => {
    const {watchFile, serverFiles, search, watchedFiles, errorFiles, serverName} = props;
    const [newFileForm, setOpenNewFileForm] = useState({opened: false, type: ''});
    const [selectedFile, setSelectedTarget] = useState(null);
    const [extendedDirectories, setExtendDirectory] = useState([]);
    const [files, dispatchFiles] = useReducer(fileReducer, loadFiles() || []);

    useEffect(() => {
        saveFiles(files)
    }, [files]);

    const closeNewFileForm = () => setOpenNewFileForm({opened: false, type: ''});

    const addFile = target => {
        const currentDirectory = (!!selectedFile) ? selectedFile.child : files;
        if (!!currentDirectory && currentDirectory.some(file => file.name === target.name && file.isDirectory === (newFileForm.type === 'directory'))) {
            return window.remote.dialog.showErrorBox(newFileForm.type, `이미 존재하는 ${newFileForm.type}입니다.`)
        }

        let parent = null;
        if (!!selectedFile) {
            parent = selectedFile.isDirectory ? selectedFile : selectedFile.parent;
        }

        (newFileForm.type === 'directory') ?
            dispatchFiles({type: fileActionTypes.ADD_DIRECTORY, name: target.name, parent}) :
            dispatchFiles({type: fileActionTypes.ADD_FILE, file: target, parent});

        !!parent && !extendedDirectories.includes(parent) && setExtendDirectory([...extendedDirectories, parent]);
        closeNewFileForm();
    };

    const handleFileWatchSwitch = (e, file) => {
        e.stopPropagation();
        const {target: {checked}} = e;
        if (!!checked && watchedFiles.some(watchedFile => watchedFile.path === file.path))
            return window.remote.dialog.showErrorBox('File', '현재 관찰중인 파일입니다.');

        if (!!checked && errorFiles.includes(file)) {
            return window.remote.dialog.showErrorBox('File', '잘못된 경로입니다.');
        }

        watchFile(file, !!checked);
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
        menu.append(new MenuItem({
            label: 'Delete...', click: () => {
                console.log(file);

                const options = {
                    type: 'question',
                    title: 'Delete',
                    message: `Delete ${file.isDirectory ? 'directory' : 'file'} "${file.name}"?`,
                    buttons: ['Yes', 'No']
                };
                window.remote.dialog.showMessageBox(options, index => {
                    if (index !== 0) return;
                    const forgetFile = file => {
                        console.log(file);
                        !file.isDirectory && watchedFiles.includes(file) && watchFile(file, false);
                        if (!!file.child && file.child.length) file.child.map(file => forgetFile(file));
                    };
                    forgetFile(file);
                    dispatchFiles({type: fileActionTypes.REMOVE_FILE, file});
                });
            }
        }));
        return menu.popup({window: window.remote.getCurrentWindow()})
    };


    return <Presenter
        serverName={serverName}
        files={files}
        addFile={addFile}
        search={search}
        serverFiles={serverFiles}
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