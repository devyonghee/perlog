import axios from 'axios';
import serverActions from '../server/actions';
import fileActions from '../file/actions';

export const SET_USER_INFO = Symbol('SET_USER_INFO');
const ipcRenderer = window.require('electron').ipcRenderer;

const setUserInfo = values => ({
    type: SET_USER_INFO,
    values
});

const checkLogin = (id, password) => {
    return async (url) => {
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

const login = (id, password) => {
    return async (dispatch, getState) => {
        dispatch(setUserInfo({ loading: true }));

        try {
            const { server: { list, tempUrl, tempName } } = getState();
            if (!tempUrl || !tempName) return ipcRenderer.send('notice', '연결할 수 없습니다.');
            const token = await checkLogin(id, password)(tempUrl);
            dispatch(setUserInfo({ id, password, openLogin: false }));
            dispatch(fileActions.setToken(tempUrl, token));

            if (!list.some(server => server.url === tempUrl)) dispatch(serverActions.addServer(tempName, tempUrl));
            dispatch(serverActions.connectAndRegister(tempName, tempUrl, token));
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