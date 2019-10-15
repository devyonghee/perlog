import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { getServer } from 'src/modules/storage';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    loading: PropTypes.bool,
    connectServer: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
};

const defaultProps = {
    loading: false,
};

const container = (props) => {
    const { connectServer, loading, open, closeForm } = props;

    const [values, setValues] = useState({
        name: 'local',
        url: 'localhost:50000',
    });

    // useEffect(() => setValues({ url: '', name: '' }), [open]);

    const fixValuesAndConnect = async () => {
        const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url;
        const url = withHttp(values.url.trim());
        const name = values.name.trim();
        if (!url || !name) {
            return ipcRenderer.send('notice', '값을 입력해주세요.');
        }
        setValues({ ...values, url, name });
        connectServer(url, name);
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

    return (
        <Presenter
            open={open}
            values={values}
            loading={loading}
            closeForm={closeForm}
            handleKeyPress={handleKeyPress}
            handleTextChange={handleTextChange}
            handleConfirmClick={fixValuesAndConnect}
        />
    );

};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;