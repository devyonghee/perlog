import { ADD_MESSAGE } from './actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [
                ...state,
                { name: action.name, color: action.color, message: action.message }
            ];

        default:
            return state;
    }
};