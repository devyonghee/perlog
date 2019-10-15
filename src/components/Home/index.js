import container from './container';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import serverActions from 'src/modules/server/actions';

const mapStateToProps = state => {
    return {
        hasSocket: !!state.server.socket,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);