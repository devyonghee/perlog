const SET_SELECT_TARGET = Symbol('SET_SELECT_TARGET');
const SET_OPEN = Symbol('SET_OPEN');
const SET_FILES = Symbol('SET_FILES');
const SET_EXTEND = Symbol('SET_EXTEND');

export const types = {
    SET_SELECT_TARGET,
    SET_OPEN,
    SET_FILES,
    SET_EXTEND,
};

const setSelectTarget = file => {
    return {
        type: SET_SELECT_TARGET,
        file
    };
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

const setExtend = (extend) => {
    return {
        type: SET_EXTEND,
        extend
    };
};

export default {
    setSelectTarget,
    setOpen,
    setFiles,
    setExtend,
};

