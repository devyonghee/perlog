import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import userActions from 'src/modules/user/actions';

const mapStateToProps = (state, ownProps) => {
    return {
        open: state.user.openLogin,
        loading: state.user.loading,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        login: userActions.login,
        closeForm: ()=> userActions.setUserInfo({ openLogin: false })
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);