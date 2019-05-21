import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/actions/server";
import directoryActions from "../../modules/actions/directory";
import fileModalActions from "../../modules/actions/newFile";


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
        openNewFileForm: type => dispatch(fileModalActions.setOpen(true, type === 'file')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);