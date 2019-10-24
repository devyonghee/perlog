import { connect } from 'react-redux';
import container from './container';
import { FILE } from '../../modules/utils';

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
        messages: state.messages,
        watchCount: calculateWatchCount(state.file.list),
    };
};

export default connect(mapStateToProps)(container);