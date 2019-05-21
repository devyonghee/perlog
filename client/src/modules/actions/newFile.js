const SET_OPEN = Symbol('SET_OPEN');
const SET_DIRECTORY_FILES = Symbol('SET_DIRECTORY_FILES');
const EXTENSION = Symbol('EXTENSION');
const SHRINK = Symbol('SHRINK');

export const types = {
    SET_OPEN,
    SET_DIRECTORY_FILES,
    EXTENSION,
    SHRINK,
};

const setOpen = (isOpened, isFileType = false) => {
    return {
        type: SET_OPEN,
        isOpened,
        isFileType
    };
};

const setDirectoryFiles = (path, files) => {
    return {
        type: SET_DIRECTORY_FILES,
        path,
        files,
    };
};

const extension = path => {
    return {
        type: EXTENSION,
        path
    };
};

const shrink = path => {
    return {
        type: SHRINK,
        path
    };
};


export default {
    setOpen,
    setDirectoryFiles,
    extension,
    shrink
};

