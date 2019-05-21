import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    isFileType: PropTypes.bool,
    directory: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    extension: PropTypes.func.isRequired,
    shrink: PropTypes.func.isRequired,
};

const defaultProps = {
    isFileType: false,
};

const container = (props) => {
    const {search, close, isFileType, directory} = props;
    const [name, setName] = useState('');

    const handleCloseForm = () => setName('') & close();
    const handleNameChange = ({target: {value}}) => setName(value);
    const handleNameKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !name) return;
        e.preventDefault();
        setName('');
    };
    const handleDoubleClickFile = (e, path) => {
        e.preventDefault();

        search(path)
    };

    useEffect(() => {
        !!isFileType && !Object.keys(directory).length && search('')
    }, []);

    return (
        <Presenter
            isFileType={isFileType}
            directory={directory}
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