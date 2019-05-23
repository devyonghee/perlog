import React, {useState, useEffect} from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    openNewFileForm: PropTypes.bool
};

const defaultProps = {
    openNewFileForm: false
};

const container = (props) => {
    const [themeType, setThemeType] = useState('light');
    useEffect(() => {
        window.ipcRenderer.on('changeThemes', (e, type) => setThemeType(type));
    }, []);

    return (
        <Presenter
            {...props}
            themeType={themeType}
        />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;