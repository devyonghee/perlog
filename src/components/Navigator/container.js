import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const { ipcRenderer, remote } = window.require('electron');

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
    files: PropTypes.array,
    search: PropTypes.func.isRequired,
    watchFile: PropTypes.func.isRequired,
    addFile: PropTypes.func.isRequired,
    addDirectory: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    watchedFiles: PropTypes.arrayOf(fileType),
    errorFiles: PropTypes.arrayOf(fileType),
};

const defaultProps = {
    serverName: '',
    files: [],
    serverFiles: [],
    watchedFiles: [],
    errorFiles: [],
};

const container = props => {
    const { watchFile, serverFiles, search, watchedFiles, errorFiles, serverName, files, addDirectory, addFile, removeFile } = props;
    const [newFileForm, setOpenNewFileForm] = useState({ opened: false, type: '' });
    const [selectedFile, setSelectedTarget] = useState(null);
    const [extendedDirectories, setExtendDirectory] = useState([]);

    const closeNewFileForm = () => setOpenNewFileForm({ opened: false, type: '' });

    const handleAddFile = target => {
        const currentDirectory = (!!selectedFile) ? selectedFile.child : files;
        if (!!currentDirectory && currentDirectory.some(file => file.name === target.name && file.isDirectory === (newFileForm.type === 'directory'))) {
            return ipcRenderer.send('notice', `이미 존재하는 ${newFileForm.type}입니다.`, newFileForm.type);
        }

        let parent = null;
        if (!!selectedFile) {
            parent = selectedFile.isDirectory ? selectedFile : selectedFile.parent;
        }

        (newFileForm.type === 'directory') ?
            addDirectory(target.name, parent) :
            addFile(target, parent);

        !!parent && !extendedDirectories.includes(parent) && setExtendDirectory([...extendedDirectories, parent]);
        closeNewFileForm();
    };

    const handleFileWatchSwitch = (e, file) => {
        e.stopPropagation();
        const { target: { checked } } = e;
        if (!!checked && watchedFiles.some(watchedFile => watchedFile.path === file.path))
            return ipcRenderer.send('notice', '현재 관찰중인 파일입니다.', 'File');

        if (!!checked && errorFiles.includes(file)) {
            return ipcRenderer.send('notice', '잘못된 경로입니다.', 'File');
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
        const { Menu } = remote;

        const contextMenu = [
            {
                label: 'New File',
                click: () => setOpenNewFileForm({ opened: true, type: 'file' }) | (!serverFiles.length && search())
            },
            {
                label: 'New Directory',
                click: () => setOpenNewFileForm({ opened: true, type: 'directory' })
            },
        ];

        if (file) {
            contextMenu.push({ type: 'separator' }, {
                    label: 'Delete...', click: async () => {
                        const options = {
                            type: 'question',
                            title: 'Delete',
                            message: `Delete ${file.isDirectory ? 'directory' : 'file'} "${file.name}"?`,
                            buttons: ['Yes', 'No']
                        };
                        const returnValue = await remote.dialog.showMessageBox(options);
                        if (returnValue.response !== 0) return;
                        const forgetFile = file => {
                            if(!file.isDirectory) watchFile(file, false);
                            if (!!file.child && file.child.length) file.child.map(forgetFile);
                        };
                        forgetFile(file);
                        removeFile(file);
                    }
                }
            );
        }
        const menu = new Menu.buildFromTemplate(contextMenu);
        return menu.popup();
    };

    return <Presenter
        serverName={serverName}
        files={files}
        search={search}
        serverFiles={serverFiles}
        newFileForm={newFileForm}
        selectedFile={selectedFile}
        watchedFiles={watchedFiles}
        extendedDirectories={extendedDirectories}
        handleAddFile={handleAddFile}
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