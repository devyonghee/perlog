import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';

const propTypes = {
    isOpen: PropTypes.bool,
    type: PropTypes.string,
    directory: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    extension: PropTypes.func.isRequired,
    shrink: PropTypes.func.isRequired,
};

const defaultProps = {
    isOpen: false,
    type: '',
};

const container = (props) => {
    const [name, setName] = useState('');

    const handleNameChange = ({target: {value}}) => setName(value);
    const handleNameKeyPress = e => {
        if (e.key.toLowerCase() !== "enter" || !name) return;
        e.preventDefault();
        setName('');
    };

    return (
        <Presenter
            {...props}
            handleNameChange={handleNameChange}
            handleNameKeyPress={handleNameKeyPress}
            name={name}
        />
    )

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;