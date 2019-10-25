export const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const SET_FILTER = Symbol('SET_FILTER');

const setFilter = filter => {
    return {
        type: ADD_MESSAGE,
        filter
    };
};

const addMessage = (name, color, message) => {
    return {
        type: ADD_MESSAGE,
        name, color, message
    };
};

export default {
    setFilter,
    addMessage
};
