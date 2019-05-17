import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/actions/server";
import directoryActions from "../../modules/actions/directory";


const mapStateToProps = state => {
    return {
        directories: state.directory,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        connect: url => dispatch(serverAction.connectServer(url)),
        disconnect: () => {
            dispatch(serverAction.resetSocket());
            dispatch(directoryActions.setAllForget());
        },

        watchFile: path => {
            dispatch(serverAction.request('watch', path));
            dispatch(directoryActions.setWatch(path))
        },

        forgetFile: path => {
            dispatch(serverAction.request('forget', path));
            dispatch(directoryActions.setForget(path))
        },

        addFile: path => dispatch(directoryActions.addFile(path)),
        removeFile: path => dispatch(directoryActions.removeFile(path)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);