import React, {useEffect} from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    openFileAddModal: PropTypes.bool

};

const defaultProps = {
    openFileAddModal: false
};

const container = (props) => {
    useEffect(() => {
        window.ipcRenderer.on('changeThemes', (e, type) => console.log(type));
    }, []);

    return (
        <Presenter
            {...props}
        />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;