import { SET_LOGIN_INFO } from './actions';

const initialState = {
    id: '',
    password: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_INFO:
            return { ...state, id: action.id, password: action.password };
        default:
            return state;
    }
};