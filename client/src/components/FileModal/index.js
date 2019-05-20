import container from './container';
import {connect} from 'react-redux';
import serverAction from "../../modules/actions/server";
import fileModalActions from "../../modules/actions/fileModal";


const mapStateToProps = state => {
    return {
        isOpen: state.fileModal.isOpen,
        type: state.fileModal.addType,
        directory: state.fileModal.directory,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: path => dispatch(serverAction.search(path)),
        close: () => dispatch(fileModalActions.open(false)),
        extension: path => dispatch(fileModalActions.extension(path)),
        shrink: path => dispatch(fileModalActions.shrink(path)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(container);