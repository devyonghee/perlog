import {createAction, handleActions} from "redux-actions";


const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const addMessage = createAction(ADD_MESSAGE);

export const addMessageFromFile = (path, message) => {
    return (dispatch, getState) => {
        const file = getState().directory.find(file => file.path === path);
        if (!file || !file.watch) return;
        dispatch(addMessage({path, message, color: file.color}))
    }
};


export default handleActions({
    [ADD_MESSAGE]: (state, action) => {
        const {payload: {path, message, color}} = action;
        return [...state, {path, message, color}];
    },
}, []);