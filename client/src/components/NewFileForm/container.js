import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    isFileType: PropTypes.bool,
    search: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    extend: PropTypes.func.isRequired,
    addDirectory : PropTypes.func.isRequired,
    addFile : PropTypes.func.isRequired,
    selectedFile : PropTypes.object,
    setSelectTarget : PropTypes.func.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.array,
            name: PropTypes.string,
            path: PropTypes.string,
            isDirectory: PropTypes.bool,
            isExtended: PropTypes.bool,
        })),
};

const defaultProps = {
    isFileType: false,
    selectedFile: null,
    files: []
};

const container = (props) => {
    const {search, close, isFileType, files, extend, addDirectory, setSelectTarget, selectedFile, addFile} = props;
    const [name, setName] = useState('');

    const handleClickFile = (e, file) => {
        e.preventDefault();
        setSelectTarget(file);
    };
    const handleCloseForm = () => setName('') & close();
    const handleNameChange = ({target: {value}}) => setName(value);
    const handleClickConfirm = e => {
        e.preventDefault();
        if (!isFileType) {
            if (!name) return window.remote.dialog.showErrorBox('directory', '폴더명을 입력해주세요.');
            return addDirectory(name) & setName('');
        }
    };

    const handleNameKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !name) return;
        e.preventDefault();
        addDirectory(name);
        setName('');
    };
    const handleDoubleClickFile = (e, file, indexes) => {
        e.preventDefault();
        if (!file.isDirectory) return addFile(file);
        if (file.isExtended) return extend(indexes, false);
        if (!!file.child && file.child.length < 1) search(file.path);
        extend(indexes, true);
    };

    useEffect(() => {
        !!isFileType && !files.length && search('')
    }, []);

    return (
        <Presenter
            files={files}
            isFileType={isFileType}
            selectedFile={selectedFile}
            handleClickFile={handleClickFile}
            handleCloseForm={handleCloseForm}
            handleNameChange={handleNameChange}
            handleClickConfirm={handleClickConfirm}
            handleNameKeyPress={handleNameKeyPress}
            handleDoubleClickFile={handleDoubleClickFile}
            name={name}
        />
    )

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;