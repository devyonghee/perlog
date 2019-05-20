const OPEN = Symbol('OPEN');
const CLOSE = Symbol('CLOSE');
const SET_DIRECTORY_CHILDREN = Symbol('SET_DIRECTORY_CHILDREN');
const EXTENSION = Symbol('EXTENSION');
const SHRINK = Symbol('SHRINK');

export const types = {
    OPEN,
    CLOSE,
    SET_DIRECTORY_CHILDREN,
    EXTENSION,
    SHRINK,
};

const open = (isOpen, addType = '') => {
    return {
        type: OPEN,
        isOpen,
        addType
    };
};

const setDirectoryChildren = path => {
    return {
        type: SET_DIRECTORY_CHILDREN,
        path
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
    open,
    setDirectoryChildren,
    extension,
    shrink
};

