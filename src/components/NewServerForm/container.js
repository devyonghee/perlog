import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Presenter from './presenter';
import { withHttp } from '../../modules/utils';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    files: PropTypes.array,
    loading: PropTypes.bool,
    connectServer: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
};

const defaultProps = {
    files: [],
    loading: false,
};

const container = (props) => {
    const { connectServer, loading, open, files, closeForm } = props;

    const [values, setValues] = useState({
        name: 'local',
        url: 'localhost:50000',
    });

    useEffect(() => {
        if (!open) setValues({ url: '', name: '' });
    }, [open]);

    const fixValuesAndConnect = async () => {
        const url = values.url.trim();
        const name = values.name.trim();
        if (!url || !name) ipcRenderer.send('notice', '값을 입력해주세요.');
        if (files.some(file => file.name === name)) return ipcRenderer.send('notice', '동일한 이름의 서버가 존재합니다.');
        if (files.some(file => file.url === withHttp(url))) return ipcRenderer.send('notice', '동일한 주소의 서버가 존재합니다.');
        setValues({ ...values, url, name });
        connectServer(url, name);
    };

    const handleKeyPress = async e => {
        if (e.key.toLowerCase() !== 'enter') return;
        await fixValuesAndConnect();
    };

    const handleTextChange = prop => e => {
        e.preventDefault();
        if (values.hasOwnProperty(prop)) setValues({ ...values, [prop]: e.target.value });
    };

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