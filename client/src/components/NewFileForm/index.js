import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    search: PropTypes.func.isRequired,
    closeNewFileForm: PropTypes.func.isRequired,
    addFile: PropTypes.func.isRequired,
    newFileForm: PropTypes.shape({
        type: PropTypes.string,
        opened: PropTypes.bool
    }),
};

const defaultProps = {
    newFileForm: {
        type: '',
        opened: false
    }
};

const container = (props) => {
    const {search, closeNewFileForm, addFile, newFileForm: {type}} = props;
    const [name, setName] = useState('');
    const [selectedFile, setSelectedTarget] = useState(null);
    const [extendedDirectories, setExtendDirectory] = useState([]);

    const initState = () =>  setName('') & setSelectedTarget();
    const handleClickFile = (e, file) => {
        e.preventDefault();
        selectedFile !== file && setSelectedTarget(file);
    };

    const handleCloseForm = () => closeNewFileForm() & initState();
    const handleNameChange = ({target: {value}}) => setName(value);
    const handleClickConfirm = e => {
        e.preventDefault();
        if(!type) return;

        if (type === 'directory') {
            if (!name) return window.remote.dialog.showErrorBox('New Directory', '폴더명을 입력해주세요.');
            return addFile({name}) & initState();
        }
        if (!selectedFile) return window.remote.dialog.showErrorBox('New File', '파일을 선택해주세요.');
        return addFile(selectedFile) & initState();
    };

    const handleNameKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !name) return;
        e.preventDefault();
        addFile({name});
        setName('');
    };

    const handleDoubleClickFile = (e, file) => {
        e.preventDefault();
        selectedFile !== file && setSelectedTarget(file);
        if (!file.isDirectory) return addFile(file) & initState();

        if (extendedDirectories.includes(file)) {
            extendedDirectories.splice(extendedDirectories.indexOf(file), 1);
            return setExtendDirectory([...extendedDirectories]);
        }

        setExtendDirectory([...extendedDirectories, file]);
        !file.child && search(file);
    };

    return (
        <Presenter
            {...props}
            name={name}
            selectedFile={selectedFile}
            extendedDirectories={extendedDirectories}
            handleClickFile={handleClickFile}
            handleCloseForm={handleCloseForm}
            handleNameChange={handleNameChange}
            handleClickConfirm={handleClickConfirm}
            handleNameKeyPress={handleNameKeyPress}
            handleDoubleClickFile={handleDoubleClickFile}
        />
    )

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;