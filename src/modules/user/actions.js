export const SET_LOGIN_INFO = Symbol('SET_LOGIN_INFO');

const setLoginInfo = (id, password) => ({
    type: SET_LOGIN_INFO,
    id, password
});

export default {
    setLoginInfo
};