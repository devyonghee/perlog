import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { DIRECTORY } from 'src/modules/utils';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    opened: PropTypes.bool,
    type: PropTypes.string,
    close: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    closeNewFileForm: PropTypes.func.isRequired,
    handleAddFile: PropTypes.func.isRequired,
};

const defaultProps = {
    type: '',
    opened: false
};

const container = (props) => {
    const { opened, type, close, handleAddFile, target, server } = props;
    const [name, setName] = useState('');
    const [filterString, setFilterString] = useState('');
    const [selectedFile, setSelectedTarget] = useState(null);

    const initState = () => setName('') & setSelectedTarget();
    const handleClickFile = file => e => {
        e.preventDefault();
        if (selectedFile !== file) setSelectedTarget(file);
    };

    const handleClose = e => {
        e.preventDefault();
        close();
    };

    const handleFilterStringChange = e => {
        e.preventDefault();
        setFilterString(e.target.value.replace(/\\/g, ''));
    };

    const handleNameChange = e => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleClickConfirm = e => {
        e.preventDefault();
        if (!type) return;
        if (type === DIRECTORY) {
            if (!name) return ipcRenderer.send('notice', '폴더명을 입력해주세요.', 'New Directory');
            return handleAddFile({ name }) & initState();
        }
        if (!selectedFile || selectedFile.isDirectory) return ipcRenderer.send('notice', '파일을 선택해주세요.', 'New File');
        return handleAddFile(selectedFile) & initState();
    };

    const handleNameKeyPress = e => {
        if (e.key.toLowerCase() !== 'enter' || !name) return;
        e.preventDefault();
        handleAddFile({ name });
        setName('');
    };

    const handleDoubleClickFile = file => e => {
        e.preventDefault();
        selectedFile !== file && setSelectedTarget(file);
        if (!file.type === DIRECTORY) return handleAddFile(file) & initState();
/*
        if (extendedDirectories.includes(file)) {
            extendedDirectories.splice(extendedDirectories.indexOf(file), 1);
            return setExtendDirectory([...extendedDirectories]);
        }

        setExtendDirectory([...extendedDirectories, file]);
        !file.child && search(file);*/
    };

    return (
        <Presenter
            type={type}
            name={name}
            opened={opened}
            filterString={filterString}
            selectedFile={selectedFile}
            handleClickFile={handleClickFile}
            handleClose={handleClose}
            handleNameChange={handleNameChange}
            handleClickConfirm={handleClickConfirm}
            handleNameKeyPress={handleNameKeyPress}
            handleDoubleClickFile={handleDoubleClickFile}
            handleFilterStringChange={handleFilterStringChange}
        />
    );

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;