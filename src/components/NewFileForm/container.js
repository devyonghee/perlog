import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { DIRECTORY, findByIndex } from 'src/modules/utils';

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
    const { opened, type, close, addDirectory, selectedFile, selectFile, search, toggleExtend, addFile, files } = props;

    const [values, setValues] = useState({
        name: '',
        filter: '',
    });

    useEffect(() => {
        if (!opened || files.length) return;
        search();
    }, [opened, files]);

    const handleClickFile = (index = []) => e => {
        e.preventDefault();
        selectFile(index);
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
        close();
    };

    const handleClickConfirm = e => {
        e.preventDefault();
        if (!type) return;
        if (type === DIRECTORY) {
            if (!values.name) return ipcRenderer.send('notice', '폴더명을 입력해주세요.', 'New Directory');
            addDirectory(values.name);
            setValues({ ...values, name: '' });
            return close();
        }

        const file = findByIndex(selectedFile)(files);
        if (!file || file.type === DIRECTORY) return ipcRenderer.send('notice', '파일을 선택해주세요.', 'New File');
        addFile(file);
        close();
    };

    const handleDoubleClickFile = (index = []) => e => {
        e.preventDefault();
        selectFile(index);

        const file = findByIndex(index)(files);
        if (file.type === DIRECTORY) {
            if (!file.extended) search(index);
            toggleExtend();
            return;
        }
        addFile(file);
        close();
    };

    return (
        <Presenter
            type={type}
            name={values.name}
            opened={opened}
            files={files}
            filterString={values.filter}
            selectedFile={selectedFile}
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