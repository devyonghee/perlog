export const ADD_MESSAGE = Symbol('ADD_MESSAGE');

const addMessage = (name, color, content) => ({
    type: ADD_MESSAGE,
    name,
    content,
    color
});

export default {
    addMessage
}
