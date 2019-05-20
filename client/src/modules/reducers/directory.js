import {types} from '../actions/directory';

function* generatorColor() {
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow'];
    let index = 0;
    while (true) {
        if (!colors[index]) index = 0;
        yield colors[index++];
    }
}

const colors = generatorColor();

const addFile = (state, {path}) => ({
    ...state,
    [path]: {watch: false, color: colors.next().value, name: path.split('/').pop()}
});
const removeFile = (state, {path}) => {
    const {[path]: _, ...removed} = state;
    return removed;
};

const setFileWatchState = (state, {path}, flag = false) =>
    (state.hasOwnProperty(path)) ? ({...state, [path]: {...state[path], watch: flag}}) : state;

const setAllForget = (state) =>
    Object.entries(state).reduce((pre, [path, state]) => ({...pre, [path]: {...state, watch: false}}), {});

const initialState = {['D://test1.txt']: {watch: false, color: colors.next().value, name: 'D://test1.txt'.split('/').pop()}};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_FILE:
            return addFile(state, action);

        case types.REMOVE_FILE:
            return removeFile(state, action);

        case types.SET_WATCH:
            return setFileWatchState(state, action, true);

        case types.SET_FORGET:
            return setFileWatchState(state, action, false);

        case types.SET_ALL_FORGET:
            return setAllForget(state);
        default:
            return state;
    }
}