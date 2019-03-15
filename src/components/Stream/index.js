import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.number.isRequired,
    onInputChecked: PropTypes.func.isRequired,
    watch: PropTypes.bool
};

const defaultProps = {
    name: 'stream',
    color: 1,
    onInputChecked: () => new Error('no prop')
};

const Stream = ({name, color, onInputChecked, watch = false}) => {
    return (
        <div className='item'>
            <div className="screen_buttons">
                <input type='checkbox'
                       onChange={onInputChecked}
                       checked={watch}
                />
            </div>
            <div className={`diode floatl color-${color}`}/>
            <div className={`object_name floatl color-${color}`}>{name}</div>
            <div style={{clear: 'both'}}/>
        </div>
    );
};

Stream.propTypes = propTypes;
Stream.defaultProps = defaultProps;

export default Stream;