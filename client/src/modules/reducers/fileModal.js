import {types} from '../actions/fileModal';


const initialState = {
    isOpen: false,
    addType: '',
    directory: {},
};

const openModal = (state, {isOpen, addType = ''}) => ({...state, isOpen, addType});


export default (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN:
            return openModal(state, action);

        case types.SET_DIRECTORY_CHILDREN:
        case types.EXTENSION:
        case types.SHRINK:
            return state;
        default:
            return state;
    }
}