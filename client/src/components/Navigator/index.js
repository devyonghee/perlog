import {connect} from "react-redux";
import container from "./container";
import navigationActions from "../../modules/actions/navigation";
import serverAction from "../../modules/actions/server";
import newFileActions from "../../modules/actions/newFile";


const mapStateToProps = state => {
    return {
        files: state.navigation.files,
        selectedFile: state.navigation.selected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        connect: url => dispatch(serverAction.connectServer(url)),
        disconnect: () => dispatch(serverAction.disconnectServer()),
        watchFile: (file, watch) => {
            dispatch(navigationActions.setWatch(file, watch));
            dispatch(serverAction.requestWatch(file, watch));
        },
        setSelectTarget: file => dispatch(navigationActions.setSelectTarget(file)),
        openNewFileForm: type => dispatch(newFileActions.setOpen(true, type === 'file')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(container);