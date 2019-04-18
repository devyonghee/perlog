import {createAction, handleActions} from "redux-actions";


const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const addMessage = createAction(ADD_MESSAGE);

export default handleActions({
    [ADD_MESSAGE]: (state, action) => {
        const {payload: {path, message, color}} = action;
        return [...state, {path, message, color}];
    },
}, []);