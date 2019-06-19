import container from './container';
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        hasSocket: !!state.server.socket,
    }
};

export default connect(mapStateToProps)(container);