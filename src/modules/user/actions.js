import axios from 'axios';
import serverActions from '../server/actions';

export const SET_USER_INFO = Symbol('SET_USER_INFO');
const ipcRenderer = window.require('electron').ipcRenderer;

const setUserInfo = values => ({
    type: SET_USER_INFO,
    values
});

const checkLogin = (id, password) => {
    return async (url) => {
        console.log(url, id, password);

        if (!url || !id || !password) {
            throw new Error('로그인 오류');
        }

        const response = await axios.post(`${url}/login`, { id, password });
        if (response.status !== 200) {
            throw new Error('서버 오류');
        }
        return response.data;
    };
};

const login = (id, password, url = '') => {
    return async (dispatch, getState) => {
        dispatch(setUserInfo({ loading: true }));

        try {
            const loginUrl = url || getState().server.url;
            const token = await checkLogin(id, password)(loginUrl);
            dispatch(setUserInfo({ id, password, openLogin: false }));
            dispatch(serverActions.connectAndRegister(loginUrl, token));
        } catch (e) {
            const message = e.response && e.response.status === 401 ? '그룹웨어 계정을 확인해주세요' : e.message;
            ipcRenderer.send('notice', message);
            dispatch(setUserInfo({ id: '', password: '', openLogin: true }));

        } finally {
            dispatch(setUserInfo({ loading: false }));
        }
    };
};

export default {
    setUserInfo,
    login
};