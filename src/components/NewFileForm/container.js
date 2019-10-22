import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { DIRECTORY } from 'src/modules/utils';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    opened: PropTypes.bool,
    type: PropTypes.string,
    close: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    files: PropTypes.array,
};

const defaultProps = {
    type: '',
    opened: false,
    files: [],
};

const container = (props) => {
    const { opened, type, close, addDirectory, server, search, toggleExtend } = props;
    const [values, setValues] = useState({
        name: '',
        filter: '',
        selected: null
    });

    useEffect(() => {
        if (!opened || server.files.length) return;
        search();
    }, [opened]);

    const handleClickFile = file => e => {
        e.preventDefault();
        setValues({ ...values, selected: file });
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

        // if (!selected || selected.isDirectory) return ipcRenderer.send('notice', '파일을 선택해주세요.', 'New File');
        // return handleAddFile(selected);
    };

    const handleDoubleClickFile = file => e => {
        e.preventDefault();
        setValues({ ...values, selected: file });

        if (file.type === DIRECTORY) {
            toggleExtend(server, file);
            if (!file.extended) search(file);
            // return handleAddFile(file) & initState();
        }
        // !file.child && search(file);
    };

    return (
        <Presenter
            type={type}
            name={values.name}
            opened={opened}
            files={server.files || []}
            filterString={values.filter}
            selected={values.selected}
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