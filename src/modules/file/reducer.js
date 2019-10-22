import { ADD_DIRECTORY, ADD_FILE, ADD_SERVER, REMOVE_FILE, SET_NEW_FORM, SET_SELECTED, TOGGLE_EXTEND } from './actions';
import { colorsIndex } from './colors';
import { changeMiddleValue, DIRECTORY, FILE, SERVER } from '../utils';

const initialState = {
    list: [],
    selected: null,
    newForm: {
        open: false,
        type: '',
    },
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
    return {
        ...state,
        list: [...state.list, {
            name, url,
            type: SERVER,
            extended: false,
        }]
    };
};

const addDirectory = (state, { name, target }) => {
    try {
        checkAdding(name, target)(state);

        const newDirectory = {
            name: name,
            type: DIRECTORY,
            parent: target,
            extended: false,
        };

        return {
            ...state,
            list: [...state.list, {
                newDirectory
            }]
        };

    } catch (e) {
        console.log(e.message);
        return state;
    }
};

const addFile = (state, { name, path, target }) => {
    try {
        checkAdding(name, target)(state);

        return {
            ...state,
            list: [...state.list, {
                name, path,
                type: FILE,
                color: colorsIndex.next().value,
                parent: target,
                watch: false,
            }]
        };

    } catch (e) {
        console.log(e.message);
        return state;
    }
};

const removeFile = (state, { file }) => {
    return state;
};

const toggleExtend = (state, { target }) => {
    const findIndex = state.list.findIndex(file => file === target);
    if (findIndex < -1) return state;
    return {
        ...state,
        list: changeMiddleValue(findIndex)({ extended: !state.list[findIndex].extended })(state.list)
    };
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

        case TOGGLE_EXTEND:
            return toggleExtend(state, action);

        case SET_SELECTED:
            return {
                ...state,
                selected: action.target
            };

        case SET_NEW_FORM:
            return {
                ...state,
                newForm: {
                    open: action.open,
                    type: action.newType,
                }
            };

        default:
            return state;
    }
}