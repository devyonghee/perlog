import React, {useState, useEffect} from 'react';
import Presenter from './presenter';

const propTypes = {
};

const defaultProps = {
};

const container = props => {
    const [themeType, setThemeType] = useState('light');

    useEffect(() => {
        window.ipcRenderer.on('changeThemes', (e, type) => setThemeType(type));
    }, []);

    return (
        <Presenter
            themeType={themeType}
        />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;