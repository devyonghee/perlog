import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/actions/server";
import directoryActions from "../../modules/actions/directory";
import fileModalActions from "../../modules/actions/fileModal";


const mapStateToProps = state => {
    return {
        directories: state.directory,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        connect: url => dispatch(serverAction.connectServer(url)),
        disconnect: () => dispatch(serverAction.disconnectServer()),
        watchFile: path => dispatch(serverAction.watch(path)),
        forgetFile: path => dispatch(serverAction.forget(path)),
        addFile: path => dispatch(directoryActions.addFile(path)),
        removeFile: path => dispatch(directoryActions.removeFile(path)),
        openModal: type => dispatch(fileModalActions.open(true, type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);