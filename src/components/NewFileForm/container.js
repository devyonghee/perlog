import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { DIRECTORY } from 'src/modules/utils';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    opened: PropTypes.bool,
    type: PropTypes.string,
    serverIndex: PropTypes.number,
    close: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
};

const defaultProps = {
    type: '',
    opened: false,
    serverIndex: -1
};

const container = (props) => {
    const { opened, type, close, addDirectory, serverIndex, search, toggleExtend, addFile, files } = props;

    const [values, setValues] = useState({
        name: '',
        filter: '',
        selectedIndex: -1
    });

    useEffect(() => {
        if (!opened) return;
        search();
    }, [opened]);

    const handleClickFile = target => e => {
        e.preventDefault();
        setValues({ ...values, selectedIndex: files.findIndex(file => file === target) });
    };

    const handleClose = e => {
        e.preventDefault();
        close();
    };

    const handleChange = key => e => {
        e.preventDefault();
        if (!values.hasOwnProperty(key)) return;
        setValues({
            ...values,
            [key]: key === 'filter' ? e.target.value.replace(/\\/g, '') : e.target.value
        });
    };

    const handleKeyPress = e => {
        if (e.key.toLowerCase() !== 'enter') return;
        e.preventDefault();
        if (!values.name) return ipcRenderer.send('notice', '폴더명을 입력해주세요.', 'New Directory');
        addDirectory(values.name);
        setValues({ ...values, name: '' });
    };

    const handleClickConfirm = e => {
        e.preventDefault();
        if (!type) return;
        if (type === DIRECTORY) {
            if (!values.name) return ipcRenderer.send('notice', '폴더명을 입력해주세요.', 'New Directory');
            addDirectory(values.name);
            return setValues({ ...values, name: '' });
        }

        if (values.selectedIndex < 0 || (files[values.selectedIndex] && files[values.selectedIndex].type === DIRECTORY)) return ipcRenderer.send('notice', '파일을 선택해주세요.', 'New File');
        return addFile(values.selectedIndex);
    };

    const handleDoubleClickFile = target => e => {
        e.preventDefault();
        const fileIndex = files.findIndex(file => file === target);
        setValues({ ...values, selectedIndex: fileIndex });

        if (target.type === DIRECTORY) {
            toggleExtend(serverIndex, fileIndex);
            if (!target.extended) search(fileIndex);
            // return handleAddFile(file) & initState();
        }
        // !file.child && search(file);
    };

    return (
        <Presenter
            type={type}
            name={values.name}
            opened={opened}
            files={files}
            filterString={values.filter}
            selected={files[values.selectedIndex]}
            handleClose={handleClose}
            handleChange={handleChange}
            handleKeypress={handleKeyPress}
            handleClickFile={handleClickFile}
            handleClickConfirm={handleClickConfirm}
            handleDoubleClickFile={handleDoubleClickFile}
        />
    );

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;