import { ADD_SERVER, ADD_FILE, ADD_DIRECTORY, REMOVE_FILE } from './actions';
import { colorsIndex } from './colors';

export const SERVER = Symbol('SERVER');
export const DIRECTORY = Symbol('DIRECTORY');
export const FILE = Symbol('FILE');

const initialState = [];

const sortCompare = (preFile, curFile) => {
    if (preFile.isDirectory !== curFile.isDirectory) {
        return (preFile.isDirectory && !curFile.isDirectory) ? -1 : 1;
    }
    const icmp = preFile.name.toLowerCase().localeCompare(curFile.name.toLowerCase());
    if (icmp !== 0) return icmp;
    if (preFile.name > curFile.name) return 1;
    else if (preFile.name < curFile.name) return -1;
    else return 0;
};

const checkAdding = (name, target) => files => {
    if (!name || !target) throw new Error('인자가 잘못되었습니다.');

    const currentParent = files.find(file => file === target);
    if (!currentParent || currentParent.type === File) throw new Error('추가할 디렉토리를 선택해주세요');

    const child = files.find(file => file.parent && file.parent === currentParent);
    if (child.some(child => child.name === name)) throw new Error('추가할 디렉토리를 선택해주세요');
};

const addServer = (state, { name, url }) => {
    if (!name || !url) return state;
    return [...state, {
        name, url,
        type: SERVER,
    }];
};

const addDirectory = (state, { name, target }) => {
    try {
        checkAdding(name, target)(state);

        const newDirectory = {
            name: name,
            type: DIRECTORY,
            parent: target,
        };

        return [...state, newDirectory];

    } catch (e) {
        console.log(e.message);
        return state;
    }
};

const addFile = (state, { name, path, target }) => {
    try {
        checkAdding(name, target)(state);

        return [...state, {
            name, path,
            type: FILE,
            color: colorsIndex.next().value,
            parent: target,
            watch: false,
        }];

    } catch (e) {
        console.log(e.message);
        return state;
    }
};

const removeFile = (state, { file }) => {
    return state;
};

export default (state = initialState || [], action) => {
    switch (action.type) {
        case ADD_SERVER:
            return addServer(state, action);

        case ADD_DIRECTORY:
            return addDirectory(state, action);

        case ADD_FILE:
            return addFile(state, action);

        case REMOVE_FILE:
            return removeFile(state, action);

        default:
            return state;
    }
}