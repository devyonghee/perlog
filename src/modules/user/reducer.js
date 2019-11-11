import { SET_USER_INFO } from './actions';

const initialState = {
    id: '',
    password: '',
    openLogin: false,
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...Object.entries(action.values).reduce((newInfos, [key, value]) => {
                    if (state.hasOwnProperty(key)) newInfos[key] = value;
                    return newInfos;
                }, {})
            };
        default:
            return state;
    }
};