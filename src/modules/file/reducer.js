import {
    ADD_DIRECTORY,
    ADD_FILE,
    ADD_SERVER,
    REMOVE_FILE,
    SELECT_INDEX,
    SET_EXTEND,
    SET_NEW_FORM,
    SET_TOKEN,
    SET_WATCH,
} from './actions';
import { colorsIndex } from './colors';
import { changeChildValue, changeValue, DIRECTORY, FILE, findByIndex, SERVER } from '../utils';
import { loadFiles, saveFiles } from '../storage';

const ipcRenderer = window.require('electron').ipcRenderer;

const initialState = {
    list: [...loadFiles()],
    selectedIndex: [],
    newForm: {
        open: false,
        type: DIRECTORY,
    },
};

const checkAdding = (name, selectedIndex = []) => files => {
    if (!name || !selectedIndex.length) throw new Error('인자가 잘못되었습니다.');

    const parent = findByIndex(selectedIndex)(files);
    if (!parent || parent.type === File) throw new Error('추가할 디렉토리를 선택해주세요');

    if (parent.child.some(file => file.name === name)) throw new Error('중복된 이름이 있습니다.');
};

const addServer = (state, { name, url }) => {
    if (!name || !url) return state;
    if (state.list.some(server => server.type === SERVER && server.url === url)) {
        return ipcRenderer.send('notice', '이미 존재하는 서버입니다.');
    }
    return {
        ...state,
        list: saveFiles([...state.list,
            {
                name, url,
                type: SERVER,
                token: '',
                extended: false,
                child: [],
            }])
    };
};

const setToken = (state, { token, url }) => {
    const findIndex = state.list.findIndex(file => file.url === url);

    return {
        ...state,
        list: saveFiles(changeValue(findIndex)({ token })(state.list))
    };
};

const addDirectory = (state, { name }) => {
    try {
        const index = state.selectedIndex;
        checkAdding(name, index)(state.list);

        return {
            ...state,
            newForm: {
                ...state.newForm,
                open: false,
            },
            list: saveFiles(changeChildValue(index)({
                extended: true,
                child: [...findByIndex(index)(state.list).child, {
                    name: name,
                    type: DIRECTORY,
                    extended: false,
                    child: [],
                }]
            })(state.list))
        };

    } catch (e) {
        ipcRenderer.send('notice', e.message);
        return state;
    }
};

const addFile = (state, { file }) => {
    try {
        const index = state.selectedIndex;
        checkAdding(file.name, index)(state.list);

        return {
            ...state,
            newForm: {
                ...state.newForm,
                open: false,
            },
            list: saveFiles(changeChildValue(index)({
                extended: true,
                child: [...findByIndex(index)(state.list).child, {
                    name: file.name,
                    path: file.path,
                    type: FILE,
                    color: colorsIndex.next().value,
                    watch: false,
                }],
            })(state.list))
        };

    } catch (e) {
        ipcRenderer.send('notice', e.message);
        return state;
    }
};

const setWatch = (state, { index, watch }) => {
    const findFile = findByIndex(index)(state.list);
    if (!findFile || findFile.type !== FILE) return state;

    return {
        ...state,
        list: changeChildValue(index)({ watch })(state.list)
    };

};

const removeFile = (state, { index }) => {
    const parentIndex = index.slice(0, -1);
    const parent = findByIndex(parentIndex)(state.list);
    const target = findByIndex(index)(state.list);
    if (!parent) {
        return {
            ...state,
            list: saveFiles([
                ...state.list.slice(0, state.list.indexOf(target)),
                ...state.list.slice(state.list.indexOf(target) + 1)
            ])
        };
    }

    return {
        ...state,
        list: saveFiles(changeChildValue(parentIndex)({
            child: [
                ...parent.child.slice(0, parent.child.indexOf(target)),
                ...parent.child.slice(parent.child.indexOf(target) + 1)
            ]
        })(state.list))
    };
};

const setExtend = (state, { index, extend }) => {
    return {
        ...state,
        list: changeChildValue(index)({
            extended: extend
        })(state.list)
    };
};

export default (state = initialState || [], action) => {
    switch (action.type) {
        case ADD_SERVER:
            return addServer(state, action);

        case SET_TOKEN:
            return setToken(state, action);

        case ADD_DIRECTORY:
            return addDirectory(state, action);

        case ADD_FILE:
            return addFile(state, action);

        case REMOVE_FILE:
            return removeFile(state, action);

        case SET_WATCH:
            return setWatch(state, action);

        case SET_EXTEND:
            return setExtend(state, action);

        case SELECT_INDEX:
            return { ...state, selectedIndex: action.index };

        case SET_NEW_FORM:
            const newFormState = { ...state.newForm, open: action.open };
            if (action.newType) {
                Object.assign(newFormState, { type: action.newType });
            }

            return {
                ...state,
                newForm: newFormState
            };

        default:
            return state;
    }
}