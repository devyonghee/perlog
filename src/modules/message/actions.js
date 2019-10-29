export const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const CLEAR_MESSAGE = Symbol('CLEAR_MESSAGE');
export const SET_FILTER = Symbol('SET_FILTER');



const clear = () => {
    return {
        type: CLEAR_MESSAGE,
    };
};


const setFilter = filter => {
    return {
        type: SET_FILTER,
        filter
    };
};

const addMessage = (messages) => {
    return {
        type: ADD_MESSAGE,
        messages
    };
};

export default {
    clear,
    setFilter,
    addMessage
};
