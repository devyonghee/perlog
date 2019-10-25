import { ADD_MESSAGE, SET_FILTER } from './actions';

const initialState = {
    filter: null,
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                list: [
                    ...state.list,
                    { name: action.name, color: action.color, message: action.message }
                ]
            };

        case SET_FILTER:
            return {
                ...state,
                filter: action.filter
            };

        default:
            return state;
    }
};