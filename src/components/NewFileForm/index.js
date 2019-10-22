import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import fileActions from 'src/modules/file/actions';
import serverActions from 'src/modules/server/actions';
import { SERVER } from 'src/modules/utils';

const getSelectedServer = (file, serverState) => {
    if (!file) return null;
    if (file.type === SERVER) {
        const server = serverState.servers.find(server => server.url === file.url);
        return server ? server : null;
    }
    if (file.parent) return getSelectedServer(file.parent, serverState);
    return null;
};

const mapStateToProps = state => {
    return {
        opened: state.file.newForm.open,
        type: state.file.newForm.type,
        server: getSelectedServer(state.file.selected, state.server),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        shrink: serverActions.to,
        search: serverActions.search,
        close: () => fileActions.setNewForm(false),
        addDirectory: fileActions.addDirectory,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);