const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const types = {
    ADD_MESSAGE
};


const addMessage = (file, contents) => {
    return {
        type: ADD_MESSAGE,
        file,
        contents,
    };
};


export default {
    addMessage
};