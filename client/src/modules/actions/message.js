const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const types = {
    ADD_MESSAGE
};


const addMessage = (file, contents, color) => {
    return {
        type: ADD_MESSAGE,
        file,
        contents,
        color
    };
};

const addMessageOfWatchedFile = (path, contents) => {
    return (dispatch, getState) => {
        if (!getState().directory.hasOwnProperty(path)) return;
        const file = getState().directory[path];
        dispatch(addMessage(file.name, contents, file.color))
    }
};


export default {
    addMessageOfWatchedFile
};