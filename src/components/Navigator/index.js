import {connect} from "react-redux";
import container from "./container";
import {addFile, watch, forgot} from "../../modules/directory";
import {addMessage} from "../../modules/message";


const mapStateToProps = state => {
    return {
        files: state.directory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFile: path => {
            dispatch(addFile(path))
        },

        watchFile: path => {
            dispatch(watch(path))
        },

        forgotFile: path => {
            dispatch(forgot(path))
        },

        addMessage: (path, message, color) => {
            dispatch(addMessage({path, message, color}));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(container);