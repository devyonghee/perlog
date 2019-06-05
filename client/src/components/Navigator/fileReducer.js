import {colorsIndex} from '../colors';


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
        name: name.trim(),
        isDirectory: true,
        parent: null,
        route: name.trim(),
        child: [],
    };

    if (!parent) {
        return [...state, newDirectory].sort(file => file.isDirectory ? -1 : 0);
    }

    newDirectory.parent = parent;
    newDirectory.route = [parent.route, newDirectory.name].join('/');
    parent.child.push(newDirectory);
    parent.child.sort(file => file.isDirectory ? -1 : 0);
    return [...state];
};


const addFile = (state, {file, parent = null}) => {
    if (!file.name || !file.path) return state;

    const newFile = {
        name: file.name.trim(),
        route : file.name.trim(),
        path: file.path,
        isDirectory: false,
        parent: null,
        color: colorsIndex.next().value,
    };

    if (!parent) {
        return [...state, newFile].sort(file => file.isDirectory ? -1 : 0);
    }

    newFile.parent = parent;
    newFile.route = [parent.route, newFile.name].join('/');
    parent.child.push(newFile);
    parent.child.sort(file => file.isDirectory ? -1 : 0);
    return [...state];
};

const removeFile = (state, {file}) => {
    const parent = (!!file.parent) ? file.parent.child : state;
    parent.splice(parent.indexOf(file), 1);
    return [...state];
};

export default (state, action) => {
    switch (action.type) {
        case types.ADD_DIRECTORY:
            return addDirectory(state, action);

        case types.ADD_FILE:
            return addFile(state, action);

        case types.REMOVE_FILE:
            return removeFile(state, action);

        default:
            return state;
    }
}