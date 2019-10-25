import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import serverActions from 'src/modules/server/actions';
import messageActions from 'src/modules/message/actions';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openNewServer: () => serverActions.setServerInfo({ openNewServer: true }),
        setFilter: () => messageActions.setFilter
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);