import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/serverAction";


const mapStateToProps = state => {
    return {
        serverFiles: state.server.files,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        connect: url => dispatch(serverAction.connectServer(url)),
        disconnect: () => dispatch(serverAction.disconnectServer()),
        search: () => dispatch(serverAction.search()),
        watchFile: (file, watch) => dispatch(serverAction.requestWatch(file, watch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);