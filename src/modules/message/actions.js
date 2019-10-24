export const ADD_MESSAGE = Symbol('ADD_MESSAGE');

const addMessage = (name, color, message) => {
    return {
        type: ADD_MESSAGE,
        name, color, message
    };
};

export default {
    addMessage
};
