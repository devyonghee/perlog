import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import serverActions from 'src/modules/server/actions';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openNewServer: () => serverActions.setOpenForm(true)
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);