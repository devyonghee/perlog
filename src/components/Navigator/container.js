import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const { ipcRenderer, remote } = window.require('electron');

const File = PropTypes.shape({
    child: PropTypes.array,
    parent: PropTypes.object,
    name: PropTypes.string,
    path: PropTypes.string,
    isDirectory: PropTypes.bool,
    type: PropTypes.func,
});

const Server = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    files: PropTypes.array,
});


const propTypes = {
    files: PropTypes.array.isRequired,
    extend: PropTypes.func.isRequired,
};

const defaultProps = {
    servers: [],
};

const container = props => {
    const { search, files, extend, addDirectory, addFile, removeFile } = props;
    const [newFileForm, setOpenNewFileForm] = useState({ opened: false, type: '' });
    const [selectedTargetIndex, setSelectedTargetIndex] = useState(-1);

    const selectedTarget = useMemo(() => files[selectedTargetIndex], [files, selectedTargetIndex]);
    // const closeNewFileForm = () => setOpenNewFileForm({ opened: false, type: '' });

    // const handleAddFile = target => {
    //     const currentDirectory = (!!selectedFile) ? selectedFile.child : files;
    //     if (!!currentDirectory && currentDirectory.some(file => file.name === target.name && file.isDirectory === (newFileForm.type === 'directory'))) {
    //         return ipcRenderer.send('notice', `이미 존재하는 ${newFileForm.type}입니다.`, newFileForm.type);
    //     }
    //
    //     let parent = null;
    //     if (!!selectedFile) {
    //         parent = selectedFile.isDirectory ? selectedFile : selectedFile.parent;
    //     }
    //
    //     (newFileForm.type === 'directory') ?
    //         addDirectory(target.name, parent) :
    //         addFile(target, parent);
    //
    //     !!parent && !extendedDirectories.includes(parent) && setExtendDirectory([...extendedDirectories, parent]);
    //     closeNewFileForm();
    // };
    //
    // const handleFileWatchSwitch = (e, file) => {
    //     e.stopPropagation();
    //     const { target: { checked } } = e;
    //     if (!!checked && watchedFiles.some(watchedFile => watchedFile.path === file.path))
    //         return ipcRenderer.send('notice', '현재 관찰중인 파일입니다.', 'File');
    //
    //     if (!!checked && errorFiles.includes(file)) {
    //         return ipcRenderer.send('notice', '잘못된 경로입니다.', 'File');
    //     }
    //
    //     watchFile(file, !!checked);
    // };
    //

    const handleClickList = (target) => e => {
        e.stopPropagation();
        setSelectedTargetIndex(files.findIndex(file => file === target));
    };

    const handleDoubleClickFile = (target) => e => {
        e.preventDefault();
        const findIndex = files.findIndex(file => file === target);
        setSelectedTargetIndex(findIndex);
        if (findIndex < 0) return;

        extend(findIndex);
        // if (extendedDirectories.includes(file)) {
        //     extendedDirectories.splice(extendedDirectories.indexOf(file), 1);
        //     return setExtendDirectory([...extendedDirectories]);
        // }
        // setExtendDirectory([...extendedDirectories, file]);
    };

    const handleContextMenuList = target => e => {
        e.stopPropagation();
        const findIndex = files.findIndex(file => file === target);
        setSelectedTargetIndex(findIndex);
        if (findIndex < 0) return;

        const { Menu } = remote;
        const contextMenu = [
            {
                label: 'New File',
                // click: () => setOpenNewFileForm({ opened: true, type: 'file' }) | (!serverFiles.length && search())
            },
            {
                label: 'New Directory',
                // click: () => setOpenNewFileForm({ opened: true, type: 'directory' })
            },
        ];

        contextMenu.push({ type: 'separator' }, {
                label: 'Delete...', click: async () => {
                    const options = {
                        type: 'question',
                        title: 'Delete',
                        message: `Delete ${target.type.toLowerCase()} "${target.name}"?`,
                        buttons: ['Yes', 'No']
                    };
                    const returnValue = await remote.dialog.showMessageBox(options);

                    if (returnValue.response !== 0) return;
                    const forgetFile = file => {
                        // if(!file.isDirectory) watchFile(file, false);
                        // if (!!file.child && file.child.length) file.child.map(forgetFile);
                    };
                }
            }
        );
        const menu = new Menu.buildFromTemplate(contextMenu);
        return menu.popup();
    };

    return <Presenter
        files={files}
        search={search}
        newFileForm={newFileForm}
        handleClickList={handleClickList}
        selectedTarget={selectedTarget}
        // watchedFiles={watchedFiles}
        // handleAddFile={handleAddFile}
        // closeNewFileForm={closeNewFileForm}
        handleDoubleClickFile={handleDoubleClickFile}
        // handleFileWatchSwitch={handleFileWatchSwitch}
        handleContextMenuList={handleContextMenuList}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;