import {connect} from "react-redux";
import container from "./container";

const mapStateToProps = state => {
    return {
        messages: state.server.messages.length,
        files: state.server.watchedFiles.length
    }
};

export default connect(mapStateToProps)(container);