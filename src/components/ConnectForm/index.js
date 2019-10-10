import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import serverAction from 'src/modules/server/actions';

const mapStateToProps = state => {
    return {
        socket: state.server.socket,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setSocket: (name, socket) => serverAction.setSocket(name, socket),
        reset: () => serverAction.resetSocket(),
        setFiles: (path, files) => serverAction.setFiles(path, files),
        addMessage: (path, watch) => serverAction.addMessage(path, watch),
        setErrorFile: path => serverAction.setErrorFile(path),
        connectServer: serverAction.connect,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);