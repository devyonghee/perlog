import colors from '../colors';

function* generatorColor() {
    let index = 0;
    while (true) {
        if (colors.length >= 20) index = 0;
        yield index++;
    }
}

const colorsIndex = generatorColor();

const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
const REMOVE_DIRECTORY = Symbol('REMOVE_DIRECTORY');
const ADD_FILE = Symbol('ADD_FILE');
const REMOVE_FILE = Symbol('REMOVE_FILE');

export const types = {
    ADD_DIRECTORY,
    REMOVE_DIRECTORY,
    ADD_FILE,
    REMOVE_FILE,
};

const addDirectory = (state, {name, parent = null}) => {
    const newDirectory = {
        name,
        isDirectory: true,
        parent: null,
        child: [],
    };

    if (!parent) {
        return [...state, newDirectory];
    }

    parent.child.push(newDirectory);
    newDirectory.parent = parent;
    return [...state];
};


const addFile = (state, {file, parent = null}) => {
    if (!file.name || !file.path) return state;

    const newFile = {
        name: file.name,
        path: file.path,
        isDirectory: false,
        parent: null,
        color: colorsIndex.next().value,
    };

    if (!parent) {
        return [...state, newFile];
    }

    const selectDirectory = parent.isDirectory ? parent : parent.parent;
    selectDirectory.child.push(newFile);
    return [...state];
};

// const removeFile = (state, {path}) => {
//     const {[path]: _, ...rest} = state;
//     return rest;
// };

export default (state, action) => {
    switch (action.type) {
        case types.ADD_DIRECTORY:
            return addDirectory(state, action);

        case types.REMOVE_DIRECTORY:
            // return removeDirectory(state, action);
            return state;

        case types.ADD_FILE:
            return addFile(state, action);

        case types.REMOVE_FILE:
            // return removeFile(state, action);

        default:
            return state;
    }
}