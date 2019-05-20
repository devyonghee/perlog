import {types} from "../actions/server";

const initialState = {socket: null, directory: {}};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SOCKET:
            return {...state, socket: action.socket};

        case types.RESET_SOCKET:
            if (!!state.socket) state.socket.disconnect();
            return null;

        default:
            return state;
    }
}