import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.number.isRequired,
    request: PropTypes.func.isRequired,
    watch: PropTypes.bool
};

const defaultProps = {
    name: 'stream',
    color: 1,
    request: () => new Error('no prop')
};

const Stream = ({name, color, request, watch = false}) => {
    return (
        <div className='item'>
            <div className="screen_buttons">
                <input type='checkbox'
                       onChange={(path, watch = false) => watch ? request('watch', path) : request('forget', path)}
                       checked={watch}
                />
            </div>
            <div className={`diode floatl color${color}`}/>
            <div className={`object_name floatl color${color}`}>{name}</div>
            <div style={{clear: 'both'}}/>
        </div>
    );
};

Stream.propTypes = propTypes;
Stream.defaultProps = defaultProps;

export default Stream;