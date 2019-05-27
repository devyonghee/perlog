import {connect} from "react-redux";
import container from "./container";

const mapStateToProps = state => {
    return {
        messages: state.server.messages
    }
};

export default connect(mapStateToProps)(container);