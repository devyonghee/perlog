import {
    ADD_DIRECTORY,
    ADD_FILE,
    ADD_SERVER,
    REMOVE_FILE,
    SELECT_INDEX,
    SET_NEW_FORM,
    SET_WATCH,
    TOGGLE_EXTEND
} from './actions';
import { colorsIndex } from './colors';
import { changeChildValue, DIRECTORY, FILE, findByIndex, SERVER } from '../utils';

const ipcRenderer = window.require('electron').ipcRenderer;

const initialState = {
    list: [],
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
    if(state.list.some(server => server.type === SERVER && server.url === url)){
        return ipcRenderer.send('notice', '이미 존재하는 서버입니다.')
    }
    return {
        ...state,
        list: [...state.list,
            {
                name, url,
                type: SERVER,
                extended: false,
                child: [],
            }]
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
            list: changeChildValue(index)({
                extended: true,
                child: [...findByIndex(index)(state.list).child, {
                    name: name,
                    type: DIRECTORY,
                    extended: false,
                    child: [],
                }]
            })(state.list)
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
            list: changeChildValue(index)({
                extended: true,
                child: [...findByIndex(index)(state.list).child, {
                    name: file.name,
                    path: file.path,
                    type: FILE,
                    color: colorsIndex.next().value,
                    watch: false,
                }],
            })(state.list)
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

const removeFile = (state, { file }) => {
    return state;
};

const toggleExtend = (state, { index = [], extend = null }) => {
    const selectedIndex = index.length ? index : state.selectedIndex;
    const selected = findByIndex(selectedIndex)(state.list);
    if (!selected || selected.type === FILE) return state;

    const newExtend = extend !== null ? extend : !selected.extended;
    return {
        ...state,
        list: changeChildValue(selectedIndex)({
            extended: newExtend
        })(state.list)
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
        case SET_WATCH:
            return setWatch(state, action);

        case TOGGLE_EXTEND:
            return toggleExtend(state, action);

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