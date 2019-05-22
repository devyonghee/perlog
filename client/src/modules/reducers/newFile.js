import {types} from '../actions/newFile';
import File from '../model/File';

const initialState = {
    isOpened: false,
    isFileType: false,
    files: [],
};

const openModal = (state, {isOpened, isFileType}) => ({...state, isOpened, isFileType});

const setFiles = (state, {path, files:newFiles}) => {
    const paths = path.replace(/(\\+|\/+)/g, '/').split('/').filter(String);
    const {files: [...stateFiles]} = state;

    paths.reduce((files, path, currentIndex, paths) => {
        const newDirectory = new File(path, paths.slice(0, currentIndex + 1).join('/'), true);

        let directory = files.find(file => file.is(newDirectory));
        if (!directory) {
            files.push(newDirectory);
            directory = newDirectory;
            directory.extend();
        }

        if (paths.length !== (currentIndex + 1)) {
            return directory.child;
        }

        if(!newFiles || !newFiles.length){
            directory.setChild(null);
            return;
        }

        directory.setChild(newFiles.map(file => (new File(file.name, file.path, file.isDirectory))).sort(file => file.isDirectory ? -1 : 1));
    }, stateFiles);

    return {
        ...state,
        files: [...stateFiles]
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OPEN:
            return openModal(state, action);

        case types.SET_FILES:
            return setFiles(state, action);

        case types.EXTEND:
            action.file.extend();
            return {...state, files: [...state.files]};

        case types.SHRINK:
            action.file.shrink();
            return {...state, files: [...state.files]};
        default:
            return state;
    }
}