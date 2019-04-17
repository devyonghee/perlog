import {createAction, handleActions} from "redux-actions";

const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
const REMOVE_DIRECTORY = Symbol('REMOVE_DIRECTORY');
const ADD_FILE = Symbol('ADD_FILE');
const REMOVE_FILE = Symbol('REMOVE_FILE');
const WATCH = Symbol('WATCH');
const FORGOT = Symbol('FORGOT');

export const addDirectory = createAction(ADD_DIRECTORY);
export const removeDirectory = createAction(REMOVE_DIRECTORY);

export const addFile = createAction(ADD_FILE);
export const removeFile = createAction(REMOVE_FILE);

export const watch = createAction(WATCH);
export const forgot = createAction(FORGOT);


export default handleActions({
    [ADD_DIRECTORY]: (state, action) => {
        return state;
    },

    [REMOVE_DIRECTORY]: (state, action) => {
        return state;
    },

    [ADD_FILE]: (state, action) => {
        const {payload: path} = action;
        return [...state, {path}];
    },

    [REMOVE_FILE]: (state, action) => {
        return state;
    },

    [WATCH]: (state, action) => {
        return state;
    },

    [FORGOT]: (state, action) => {
        return state;
    },

}, [])