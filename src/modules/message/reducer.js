import { ADD_MESSAGE, CLEAR_MESSAGE, SET_FILTER } from './actions';
import {red} from '@material-ui/core/colors';
const initialState = {
    filter: null,
    list: [
        {name: 'asdf', color:red, message: 'zxcvxcvasdasd\nzxcvzxvv\nasdasd'},
        ]
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

        default:
            return state;
    }
};