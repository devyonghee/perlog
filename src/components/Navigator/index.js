import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import serverActions from 'src/modules/server/actions';
import fileActions from 'src/modules/file/actions';

const mapStateToProps = state => {
    return {
        serverName: state.server.name,
        serverFiles: state.server.files,
        watchedFiles: state.server.watchedFiles,
        errorFiles: state.server.errorFiles,
        files: state.file
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        search: serverActions.search,
        watchFile: serverActions.requestWatch,
        addFile: fileActions.addFile,
        addDirectory: fileActions.addDirectory,
        removeFile: fileActions.remove,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);