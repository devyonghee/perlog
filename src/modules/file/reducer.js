import {
    ADD_DIRECTORY,
    ADD_FILE,
    ADD_SERVER,
    REMOVE_FILE, SELECT_INDEX,
    SET_NEW_FORM,
    TOGGLE_EXTEND
} from './actions';
import { colorsIndex } from './colors';
import { changeChildValue, DIRECTORY, FILE, findByIndex, SERVER } from '../utils';

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
            list: changeChildValue(index)({
                child: [...findByIndex(index)(state.list).child, {
                    name: name,
                    type: DIRECTORY,
                    parentIndex: state.selectedIndex,
                    extended: false,
                    child: [],
                }]
            })(state.list)
        };

    } catch (e) {
        console.log(e.message);
        return state;
    }
};

const addFile = (state, { name, path }) => {
    try {
        const index = state.selectedIndex;
        checkAdding(name, index)(state.list);

        return {
            ...state,
            list: changeChildValue(index)({
                child: [...findByIndex(index)(state.list).child, {
                    name, path,
                    type: FILE,
                    color: colorsIndex.next().value,
                    parentIndex: state.selectedIndex,
                    watch: false,
                }]
            })(state.list)
        };

    } catch (e) {
        console.log(e.message);
        return state;
    }
};

const removeFile = (state, { file }) => {
    return state;
};

const toggleExtend = (state) => {
    const index = state.selectedIndex;
    const selected = findByIndex(index)(state.list);
    if (!selected) return state;

    return {
        ...state,
        list: changeChildValue(index)({
            extended: !selected.extended
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