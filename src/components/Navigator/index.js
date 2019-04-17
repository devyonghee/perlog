import {connect} from "react-redux";
import container from "./container";
import {addFile} from "../../modules/directory";


const mapStateToProps = state => {
    return {
        files: state.directory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFile: path => {
            dispatch(addFile(path))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(container);