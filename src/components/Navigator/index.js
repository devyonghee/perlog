import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import container from './container';
import serverActions from 'src/modules/server/actions';
import fileActions from 'src/modules/file/actions';

const mapStateToProps = state => {
    return {
        files: state.file.list,
        selectedIndex: state.file.selected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        search: serverActions.search,
        toggleExtend: fileActions.toggleExtend,
        setSelected: fileActions.setSelected,
        openNewAdd: type => fileActions.setNewForm(true, type),
        watchFile: serverActions.requestWatch,
        addFile: fileActions.addFile,
        addDirectory: fileActions.addDirectory,
        removeFile: fileActions.remove,
        select: fileActions.select,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);