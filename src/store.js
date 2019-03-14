import produce from 'immer';

function* generatorColorIndex() {
    let index = 1;
    while (true) {
        yield index;
        if (++index >= 20) index = 1;
    }
}

const colorIndex = generatorColorIndex();

export const actions = {
    ADD_NODE: "ADD_NODE",
    REMOVE_NODE: "REMOVE_NODE",
    ADD_STREAM: "ADD_STREAM",
    REMOVE_STREAM: "REMOVE_STREAM",
    TOGGLE_WATCH: "TOGGLE_WATCH",
    ADD_MESSAGE: "ADD_MESSAGE",
};

export const nodeReducer = (state, action) => {
    const {ADD_NODE, ADD_STREAM, REMOVE_NODE, REMOVE_STREAM, TOGGLE_WATCH} = actions;
    const {nodeName = ''} = action;
    const nodeIdx = state.findIndex(({name}) => name === nodeName);

    switch (action.type) {
        case ADD_NODE:
            if (nodeIdx >= 0) return state;

            return produce(state, draft => {
                draft.push({
                    name: action.nodeName,
                    color: colorIndex.next().value,
                    streams: [],
                    host: action.host,
                    request: (type, ...args) => action.socket.emit('data', type, ...args),
                })
            });

        case REMOVE_NODE:
            return produce(state, draft => draft.slice(nodeIdx, 1));

        case ADD_STREAM:
            if (nodeIdx < 0 || state[nodeIdx].streams.some(({path}) => path === action.path)) return state;

            return produce(state, draft => {
                draft[nodeIdx].streams.push({
                    name: action.path.split('/').pop(),
                    path: action.path,
                    color: colorIndex.next().value,
                    watch: false,
                })
            });

        case REMOVE_STREAM:
            if (nodeIdx < 0 || !state[nodeIdx].streams.some(({path}) => path === action.path)) return state;
            return produce(state, draft =>
                draft[nodeIdx].streams.slice(draft[action.nodeName].streams.findIndex(({path}) => path === action.path), 1)
            );

        case TOGGLE_WATCH:
            if (nodeIdx < 0 || !state[nodeIdx].streams.some(({path}) => path === action.path)) return state;

            return produce(state, draft => {
                draft[nodeIdx].streams.find(({path}) => path === action.path).watch = action.watch
            });

        default:
            return state;
    }
};

export const messageReducer = (messages, action) => {
    const {ADD_MESSAGE} = actions;

    switch (action.type) {
        case ADD_MESSAGE :
            return produce(messages, draft => {
                const {type, ...message} = action;
                draft.push(message)
            });
        default:
            return messages;
    }
};