import {types} from '../actions/newFile';

const initialState = {
    isOpened: false,
    isFileType: false,
    directory: {},
};

const openModal = (state, {isOpened, isFileType}) => ({...state, isOpened, isFileType});

const setDirectory = (state, {path, files}) => {
    const paths = path.replace(/(\\+|\/+)/g, '/').split('/').filter(String);
    const {directory} = state;

    paths.reduce((directory, path, currentIndex, paths) => {

        if (!directory.hasOwnProperty(path)) {
            directory[path] = {
                name: path,
                path: paths.slice(0, currentIndex + 1).join('/'),
                isDirectory: true,
                depth: currentIndex,
                child: {}
            };
        }

        directory[path]['isExtended'] = true;

        if (paths.length !== (currentIndex + 1)) {
            return directory[path].child;
        }

        return directory[path].child = Object.entries(files).reduce((files, [name, file]) => {
            files[name] = (files.hasOwnProperty(name) && !!file.isDirectory) ?
                {...files[name], isExtended: false, depth: currentIndex + 1, child: {}} :
                {...files[name], depth: currentIndex + 1};
            return files;
        }, files);

    }, directory);

    return {
        ...state,
        directory: Object.assign({}, directory)
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OPEN:
            return openModal(state, action);

        case types.SET_DIRECTORY_FILES:
            return setDirectory(state, action);

        case types.EXTENSION:
        case types.SHRINK:
            return state;
        default:
            return state;
    }
}