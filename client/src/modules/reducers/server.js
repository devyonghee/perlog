import {types} from "../actions/server";

const initialState = {socket: null};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SOCKET:
            return {...state, socket: action.socket};

        case types.RESET_SOCKET:
            if (!!state.socket) state.socket.disconnect();
            return {...state, socket: null};

        case types.SEARCH:
            if (!!state.socket && action.hasOwnProperty('path')) {
                state.socket.emit('search', action.path);
            }

            return state;
        case types.REQUEST_WATCH:
            if (!!state.socket && action.file.hasOwnProperty('path')) {
                action.watch ? state.socket.emit('watch', action.file) : state.socket.emit('forget', action.file);
            }
            return state;

        default:
            return state;
    }
}