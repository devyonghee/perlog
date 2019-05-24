import {types} from '../actions/navigation';

function* generatorColor() {
    let index = 0;
    while (true) {
        if (index >= 20) index = 0;
        yield index++;
    }
}

const colors = generatorColor();

const initialState = {
    selected: null,
    files: [{
        watch: false,
        name: 'D://test1.txt',
        color: colors.next().value,
        path: 'D://test1.txt',
        isDirectory: false,
        child: []
    },{
        watch: false,
        name: 'D://test1.txt',
        color: colors.next().value,
        path: 'D://test1.txt',
        isDirectory: false,
        child: []
    }]
};

const addDirectory = (state, {name}) => {
    const {selected, files} = state;
    const newDirectory = {
        name,
        isDirectory: true,
        isExtended: false,
        parent: null,
        child: [],
        watch: false,
    };

    if (!selected) {
        files.push(newDirectory);
        return {...state, files: [...files]};
    }

    selected.child.push(newDirectory);
    selected.isExtended = true;
    newDirectory.parent = selected;
    return {...state, files: [...files]};
};


const addFile = (state, {file}) => {
    if(!file.name || !file.path) return state;

    const {selected, files} = state;
    const newFile = {
        name: file.name,
        path: file.path,
        isDirectory: false,
        parent: null,
        watch: false,
        color: colors.next().value,
    };

    if (!selected) {
        files.push(newFile);
        return {...state, files: [...files]};
    }

    const selectDirectory = (selected.isDirectory) ? selected : selected.parent;
    selectDirectory.child.push(newFile);
    selectDirectory.isExtended = true;
    return {...state, files: [...files]};
};

const removeFile = (state, {path}) => {
    const {[path]: _, ...removed} = state;
    return removed;
};

const applyWatchFile = (state, {file, watch}) => {
    file.watch = watch;
    return {...state, files: [...state.files]};
};

const setAllForget = (state) =>
    Object.entries(state).reduce((pre, [path, state]) => ({...pre, [path]: {...state, watch: false}}), {});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SELECT_TARGET:
            return {
                ...state,
                selected: action.file,
            };

        case types.ADD_DIRECTORY:
            return addDirectory(state, action);

        case types.REMOVE_DIRECTORY:
            // return removeDirectory(state, action);
            return state;

        case types.ADD_FILE:
            return addFile(state, action);

        case types.REMOVE_FILE:
            return removeFile(state, action);

        case types.SET_WATCH:
            return applyWatchFile(state, action);

        case types.SET_ALL_FORGET:
            return setAllForget(state);
        default:
            return state;
    }
}