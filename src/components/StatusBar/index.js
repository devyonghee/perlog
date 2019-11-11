import { connect } from 'react-redux';
import container from './container';
import { FILE } from 'src/modules/utils';
import messageActions from 'src/modules/message/actions';
import { bindActionCreators } from 'redux';

const calculateWatchCount = (files) => {
    let count = 0;
    const addWatchFile = file => {
        if (file.type !== FILE && Array.isArray(file.child)) file.child.map(addWatchFile);
        if (file.watch) count++;
    };
    files.map(addWatchFile);
    return count;
};

const mapStateToProps = state => {
    return {
        messageCount: state.message.list.length,
        stop: state.message.stop,
        watchCount: calculateWatchCount(state.file.list),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clear: messageActions.clear,
        setStop: messageActions.setStop
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(container);