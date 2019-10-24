import React from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { DIRECTORY, FILE, findByIndex, SERVER } from 'src/modules/utils';

const { remote, ipcRenderer } = window.require('electron');

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
    const { files, toggleExtend, selectIndex, servers, selectServer, selectedIndex, openNewAdd, watch } = props;

    const handleChangeSwitch = index => e => {
        e.stopPropagation();
        const findFile = findByIndex(index)(files);
        if(!findFile || findFile.type !== FILE) return;

        const { target: { checked } } = e;
        if (checked && findFile.watch) {
            return ipcRenderer.send('notice', '현재 관찰중인 파일입니다.', 'File');
        }
        watch(index, checked);
    };


    const handleClickList = (index = []) => e => {
        e.stopPropagation();
        selectIndex(index);
    };

    const handleDoubleClickFile = (index) => e => {
        e.preventDefault();
        selectIndex(index);
        const file = findByIndex(files);
        if (file && file.type !== FILE) toggleExtend();
    };

    const handleContextMenuList = index => e => {
        e.stopPropagation();
        selectIndex(index);

        const target = findByIndex(index)(files);
        if (!target) return;

        const { Menu } = remote;
        const contextMenu = (target.type !== FILE) ? [
            {
                label: 'New File',
                click: () => {
                    const rootFile = findByIndex(index.slice(0, 1))(files);
                    if (!rootFile || rootFile.type !== SERVER) return;
                    selectServer(servers.findIndex(url => url === rootFile.url));
                    openNewAdd(FILE);
                }
            },
            {
                label: 'New Directory',
                click: () => openNewAdd(DIRECTORY)
            },
            { type: 'separator' },
        ] : [];

        contextMenu.push({
            label: 'Delete...',
            click: async () => {
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

        });

        const menu = new Menu.buildFromTemplate(contextMenu);
        return menu.popup();
    };

    return <Presenter
        files={files}
        selectedIndex={selectedIndex}
        handleClickList={handleClickList}
        handleChangeSwitch={handleChangeSwitch}
        handleDoubleClickFile={handleDoubleClickFile}
        handleContextMenuList={handleContextMenuList}
    />;
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;