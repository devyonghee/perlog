const SET_OPEN = Symbol('SET_OPEN');
const SET_FILES = Symbol('SET_FILES');
const EXTEND = Symbol('EXTEND');
const SHRINK = Symbol('SHRINK');

export const types = {
    SET_OPEN,
    SET_FILES,
    EXTEND,
    SHRINK,
};

const setOpen = (isOpened, isFileType = false) => {
    return {
        type: SET_OPEN,
        isOpened,
        isFileType
    };
};

const setFiles = (path, files) => {
    return {
        type: SET_FILES,
        path,
        files,
    };
};

const extend = file => {
    return {
        type: EXTEND,
        file
    };
};

const shrink = file => {
    return {
        type: SHRINK,
        file
    };
};


export default {
    setOpen,
    setFiles,
    extend,
    shrink
};

