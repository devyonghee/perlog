import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import fileActions from 'src/modules/file/actions';
import { SERVER } from 'src/modules/utils';

const getSelectedFile = fileState => {
    if (!fileState.selected || !fileState.list.hasOwnProperty(fileState.selected)) return null;
    return fileState.list[fileState.selected];
};

const getSelectedServer = (file, serverState) => {
    if (!file) return null;

    if (file.type === SERVER) {
        return serverState.servers.find(server => server.url === file.url);
    }

    return file.parent ? getSelectedServer(file.parent, serverState) : null;
};

const mapStateToProps = state => {
    return {
        opened: state.file.newForm.open,
        type: state.file.newForm.type,
        target: getSelectedFile(state.file),
        server: getSelectedServer(getSelectedFile(state.file), state.server),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        close: () => fileActions.setNewForm(false),
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);