import container from './container';
import {connect} from 'react-redux';
import serverAction from "../../modules/actions/server";
import newFileActions from "../../modules/actions/newFile";
import navigationActions from "../../modules/actions/navigation";


const mapStateToProps = state => {
    return {
        isFileType: state.newFile.isFileType,
        files: state.newFile.files,
        selectedFile: state.newFile.selected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: path => dispatch(serverAction.search(path)),
        close: () => dispatch(newFileActions.setOpen(false)),
        extend: (indexes, extend) => dispatch(newFileActions.setExtend(indexes, extend)),
        addDirectory: name => {
            dispatch(navigationActions.addDirectory(name));
            dispatch(newFileActions.setOpen(false));
        },
        setSelectTarget: file => dispatch(newFileActions.setSelectTarget(file)),
        removeDirectory: () => dispatch(navigationActions.removeDirectory()),
        addFile: file => {
            dispatch(navigationActions.addFile(file));
            dispatch(newFileActions.setOpen(false));
        },
        removeFile: () => dispatch(navigationActions.removeFile()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(container);