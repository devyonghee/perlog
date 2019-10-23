import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { FILE, DIRECTORY, findByIndex, SERVER } from 'src/modules/utils';

const { ipcRenderer, remote } = window.require('electron');

const propTypes = {
    files: PropTypes.array,
    selectedTarget: PropTypes.object,
    toggleExtend: PropTypes.func.isRequired,
    selectIndex: PropTypes.func.isRequired,
    openNewAdd: PropTypes.func.isRequired,
};

const defaultProps = {
    files: [],
    selectedTarget: null
};

const container = props => {
    const { files, toggleExtend, selectIndex, servers, selectServer, selectedIndex, openNewAdd } = props;

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

    const handleClickList = (index = []) => e => {
        e.stopPropagation();
        selectIndex(index);
    };

    const handleDoubleClickFile = (index) => e => {
        e.preventDefault();
        selectIndex(index);
        toggleExtend();
    };

    const handleContextMenuList = index => e => {
        e.stopPropagation();
        selectIndex(index);

        const target = findByIndex(index)(files);
        if (!target) return;

        const { Menu } = remote;
        const contextMenu = [
            {
                label: 'New File',
                click: () => {
                    const rootFile = findByIndex(index.slice(0,1))(files);
                    if(!rootFile || rootFile.type !== SERVER) return;
                    selectServer(servers.findIndex(url=> url === rootFile.url));
                    openNewAdd(FILE)
                }
            },
            {
                label: 'New Directory',
                click: () => openNewAdd(DIRECTORY)
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
        handleClickList={handleClickList}
        selectedIndex={selectedIndex}
        handleDoubleClickFile={handleDoubleClickFile}
        // handleFileWatchSwitch={handleFileWatchSwitch}
        handleContextMenuList={handleContextMenuList}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;