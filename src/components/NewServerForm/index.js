import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import serverActions from 'src/modules/server/actions';

const mapStateToProps = (state) => {
    return {
        open: state.server.openNewServer,
        loading: state.server.loading,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        connectServer: serverActions.connect,
        closeForm: () => serverActions.setServerInfo({ openNewServer: false }),
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);