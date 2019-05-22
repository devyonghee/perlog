import container from './container';
import {connect} from 'react-redux';
import serverAction from "../../modules/actions/server";
import fileModalActions from "../../modules/actions/newFile";


const mapStateToProps = state => {
    return {
        isFileType: state.newFile.isFileType,
        files: state.newFile.files,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: path => dispatch(serverAction.search(path)),
        close: () => dispatch(fileModalActions.setOpen(false)),
        extend: file => dispatch(fileModalActions.extend(file)),
        shrink: file => dispatch(fileModalActions.shrink(file)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(container);