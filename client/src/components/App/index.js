import container from './container';
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
        openNewFileForm: state.newFile.isOpened
    }
};

export default connect(mapStateToProps)(container);