import {connect} from "react-redux";
import container from "./container";

const mapStateToProps = (state) => {
    return {
        messages: state.message,
    }
};

export default connect(mapStateToProps)(container);