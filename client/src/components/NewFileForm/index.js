import container from './container';
import {connect} from 'react-redux';
import serverAction from "../../modules/actions/server";
import fileModalActions from "../../modules/actions/newFile";


const mapStateToProps = state => {
    return {
        isFileType: state.newFile.isFileType,
        directory: state.newFile.directory,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: path => dispatch(serverAction.search(path)),
        close: () => dispatch(fileModalActions.setOpen(false)),
        extend: path => dispatch(fileModalActions.extension(path)),
        shrink: path => dispatch(fileModalActions.shrink(path)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(container);