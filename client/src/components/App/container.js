import React, {useEffect} from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    openNewFileForm: PropTypes.bool
};

const defaultProps = {
    openNewFileForm: false
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