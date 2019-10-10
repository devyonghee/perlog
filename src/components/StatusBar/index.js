import {connect} from "react-redux";
import { clearMessage } from "src/modules/server/actions";
import container from "./container";

const mapStateToProps = state => {
    return {
        messages: state.server.messages,
        files: state.server.watchedFiles.length
    }
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps)(container);