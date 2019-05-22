import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    isFileType: PropTypes.bool,
    files: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    extend: PropTypes.func.isRequired,
    shrink: PropTypes.func.isRequired,
};

const defaultProps = {
    isFileType: false,
};

const container = (props) => {
    const {search, close, isFileType, files, shrink, extend} = props;
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSelectFile = (e, file) => {
        e.preventDefault();
        setSelectedFile(file);
    };
    const handleCloseForm = () => setName('') & close();
    const handleNameChange = ({target: {value}}) => setName(value);
    const handleNameKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !name) return;
        e.preventDefault();
        setName('');
    };
    const handleDoubleClickFile = (e, file) => {
        e.preventDefault();
        if (!file.isDirectory) return;
        if (file.isExtended) return shrink(file);
        if (!!file.child && file.child.length < 1) search(file.path);
        extend(file);
    };

    useEffect(() => {
        !!isFileType && !files.length && search('')
    }, []);

    return (
        <Presenter
            isFileType={isFileType}
            files={files}
             selectedFile={selectedFile}
            handleSelectFile={handleSelectFile}
            handleCloseForm={handleCloseForm}
            handleNameChange={handleNameChange}
            handleNameKeyPress={handleNameKeyPress}
            handleDoubleClickFile={handleDoubleClickFile}
            name={name}
        />
    )

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;