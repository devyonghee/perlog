import {connect} from "react-redux";
import { clearMessage } from "src/modules/server/actions";
import container from "./container";

const mapStateToProps = state => {
    return {
        messages: state.messages,
        files: state.file.list,
    }
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps)(container);