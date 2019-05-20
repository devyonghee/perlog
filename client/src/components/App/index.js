import container from './container';
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
        openFileAddModal: state.fileModal.isOpen
    }
};

export default connect(mapStateToProps)(container);