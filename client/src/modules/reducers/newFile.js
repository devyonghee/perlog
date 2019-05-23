import {types} from '../actions/newFile';

const initialState = {
    selected: null,
    isOpened: false,
    isFileType: false,
    files: [],
};

const openModal = (state, {isOpened, isFileType}) => ({...state, isOpened, isFileType});

const setFiles = (state, {path, files: newFiles}) => {
    const paths = path.replace(/(\\+|\/+)/g, '/').split('/').filter(String);
    if(!paths.length) return state;

    const {files: stateFiles} = state;

    return {
        ...state,
        files: paths.reduce((currentFiles, path, currentIndex, paths) => {
            const currentPath = paths.slice(0, currentIndex + 1).join('/');

            let currentDirectory = currentFiles.find(file => file.path === currentPath);
            if (!currentDirectory) {
                currentDirectory = {
                    name: path,
                    path: currentPath,
                    isDirectory: true,
                    isExtended: true,
                    child: []
                };
                currentFiles.push(currentDirectory);
            }

            if (paths.length !== (currentIndex + 1)) {
                return currentDirectory.child;
            }

            if (!newFiles || !newFiles.length) {
                currentDirectory.child = null;
                return;
            }

            currentDirectory.child = newFiles.map((file, index) => ({
                ...file,
                path: file.path.replace(/(\\+|\/+)/g, '/'),
                isExtended: false,
                parent: currentDirectory,
                child: []
            })).sort(file => file.isDirectory ? -1 : 1);
            return [...stateFiles];
        }, stateFiles)
    }
};


const applyExtend = (state, {extend}) => {
    const {selected, files} = state;
    if (!selected) return state;
    selected.isExtended = extend;
    return {
        ...state,
        files: [...files]
    };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SELECT_TARGET:
            return {
                ...state,
                selected: action.file,
            };

        case types.SET_OPEN:
            return openModal(state, action);

        case types.SET_FILES:
            return setFiles(state, action);

        case types.SET_EXTEND:
            return applyExtend(state, action);

        default:
            return state;
    }
}