import { ADD_MESSAGE, CLEAR_MESSAGE, SET_FILTER, SET_STOP } from './actions';

const initialState = {
    list: [],
    filter: null,
    stop: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const slicedList = state.list.length > 150 ? state.list.slice(10) : state.list;
            return {
                ...state,
                list: [
                    ...slicedList,
                    ...action.messages
                ]
            };

        case CLEAR_MESSAGE:
            return {
                ...state,
                list: [],
            };

        case SET_FILTER:
            return {
                ...state,
                filter: action.filter
            };

        case SET_STOP:
            return {
                ...state,
                stop: action.stop
            };

        default:
            return state;
    }
};