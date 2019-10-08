import {connect} from "react-redux";
import container from "./container";
import serverAction from "src/modules/server/actions";


const mapStateToProps = state => {
    return {
        socket: state.server.socket,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSocket: (name, socket) => dispatch(serverAction.setSocket(name, socket)),
        reset: () => dispatch(serverAction.resetSocket()),
        setFiles: (path, files) => dispatch(serverAction.setFiles(path, files)),
        addMessage: (path, watch) => dispatch(serverAction.addMessage(path, watch)),
        setErrorFile: path => dispatch(serverAction.setErrorFile(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);