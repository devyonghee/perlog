import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/serverAction";


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
        addMessage: (file, watch) => dispatch(serverAction.addMessage(file, watch)),
        setErrorFile: path => dispatch(serverAction.setErrorFile(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);