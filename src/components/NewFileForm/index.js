import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import fileActions from 'src/modules/file/actions';
import serverActions from 'src/modules/server/actions';
import { SERVER } from 'src/modules/utils';

const getSelectedServerIndex = (fileList, index, servers) => {
    if (index < 0 || !fileList.hasOwnProperty(index)) return -1;
    if (fileList[index].type === SERVER) return servers.findIndex(server => server.url === fileList[index].url);
    return getSelectedServerIndex(fileList, fileList[index].parentIndex, servers);
};

const mapStateToProps = state => {
    const selectedServerIndex = getSelectedServerIndex(state.file.list, state.file.selectedIndex, state.server.servers);

    return {
        opened: state.file.newForm.open,
        type: state.file.newForm.type,
        serverIndex: selectedServerIndex,
        files: selectedServerIndex >= 0 ? state.server.servers[selectedServerIndex] : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleExtend: serverActions.toggleExtend,
        search: serverActions.search,
        close: () => fileActions.setNewForm(false),
        addDirectory: fileActions.addDirectory,
        addFile: fileActions.addFile,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);