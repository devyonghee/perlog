import { ADD_MESSAGE } from './actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const { message, color, name } = action;
            return [
                ...state,
                { message, color, name }
            ];

        default:
            return state;
    }
};