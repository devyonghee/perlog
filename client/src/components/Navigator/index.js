import {connect} from "react-redux";
import container from "./container";
import serverAction from "../../modules/serverAction";


const mapStateToProps = state => {
    return {
        serverName: state.server.name,
        serverFiles: state.server.files,
        watchedFiles: state.server.watchedFiles,
        errorFiles: state.server.errorFiles,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (directory = null) => dispatch(serverAction.search(directory)),
        watchFile: (file, watch) => dispatch(serverAction.requestWatch(file, watch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);