import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { getServer } from 'src/modules/storage';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    setSocket: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    setErrorFile: PropTypes.func.isRequired,
    connectServer: PropTypes.func.isRequired,
};

const defaultProps = {};

const container = (props) => {
    const { connectServer } = props;

    const server = getServer();
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        url: server.url || '',
        id: 'shiw111',
        password: '1!a1024726',
        showPassword: false,
    });

    const fixValuesAndConnect = async () => {
        setLoading(true);
        const id = values.id.trim();
        const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url;
        const url = withHttp(values.url.trim());

        if (!url || !id || !values.password) {
            return ipcRenderer.send('notice', '값을 입력해주세요.');
        }
        setValues({ ...values, id, url });
        await connectServer(url, id, values.password);
        setLoading(false);
    };

    const handleKeyPress = async e => {
        if (e.key.toLowerCase() !== 'enter') return;
        await fixValuesAndConnect();
    };

    const handleTextChange = (prop) => (
        (e) => {
            e.preventDefault();
            if (values.hasOwnProperty(prop)) setValues({ ...values, [prop]: e.target.value });
        }
    );

    const handleClickShowPassword = e => {
        e.preventDefault();
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <Presenter
            values={values}
            loading={loading}
            handleKeyPress={handleKeyPress}
            handleTextChange={handleTextChange}
            handleConfirmClick={fixValuesAndConnect}
            handleClickShowPassword={handleClickShowPassword}
        />
    );

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;