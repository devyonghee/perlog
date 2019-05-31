import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/serverAction";


const mapStateToProps = state => {
    return {
        serverFiles: state.server.files,
        watchedFiles: state.server.watchedFiles,
        errorFiles: state.server.errorFiles,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        connect: url => dispatch(serverAction.connectServer(url)),
        disconnect: () => dispatch(serverAction.disconnectServer()),
        search: (directory = null) => dispatch(serverAction.search(directory)),
        watchFile: (file, watch) => dispatch(serverAction.requestWatch(file, watch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);