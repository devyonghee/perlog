import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import fileActions from 'src/modules/file/actions';
import serverActions from 'src/modules/server/actions';
import { SERVER } from 'src/modules/utils';

const getSelectedServer = (fileList, index, servers) => {
    if (!index || !index.length) return undefined;

    const root = index[0];
    if (root.type === SERVER) return undefined;
    return servers.find(server => server.url === root.url);
};

const mapStateToProps = state => {
    return {
        opened: state.file.newForm.open,
        type: state.file.newForm.type,
        files: state.server.files,
        selectedFile: state.server.selectedFile,
        server: getSelectedServer(state.file.list, state.file.selectedIndex, state.server.list),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleExtend: serverActions.toggleExtend,
        search: serverActions.search,
        selectFile: index => serverActions.setServerInfo({ selectedFile: index }),
        close: () => fileActions.setNewForm(false),
        addDirectory: fileActions.addDirectory,
        addFile: fileActions.addFile,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);