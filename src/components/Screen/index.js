import {connect} from "react-redux";
import container from "./container";

const mapStateToProps = (state) => {
    return {
        messages: state.message.list,
        filter: state.message.filter,
    }
};

export default connect(mapStateToProps)(container);