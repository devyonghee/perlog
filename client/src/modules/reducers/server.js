import {types} from "../actions/server";

const initialState = null;

export default (socket = initialState, action) => {
    switch (action.type) {
        case types.SET_SOCKET:
            return action.socket;

        case types.RESET_SOCKET:
            if (!!socket) socket.disconnect();
            return null;

        case types.REQUEST:
            if (!socket || !action.hasOwnProperty('event') || !action.hasOwnProperty('path')) return socket;
            socket.emit(action.event, action.path);
            return socket;

        default:
            return socket;
    }
}