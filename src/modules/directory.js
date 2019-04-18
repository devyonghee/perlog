import {createAction, handleActions} from "redux-actions";

function* generatorColor() {
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow'];
    let index = 0;
    while (true) {
        if (!colors[index]) index = 0;
        yield colors[index++];
    }
}
const colors = generatorColor();

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
        return [...state, {path, watch: false, color: colors.next().value}];
    },

    [REMOVE_FILE]: (state, action) => {
        return state;
    },

    [WATCH]: (state, action) => {
        const {payload: path} = action;
        return state.map(file => {
            return (file.path === path) ? {...file, watch: true} : file;
        })
    },

    [FORGOT]: (state, action) => {
        const {payload: path} = action;
        return state.map(file => {
            return (file.path === path) ? {...file, watch: false} : file;
        })
    },

}, [])