import React from 'react';
import Stream from "../Stream";
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    streams: PropTypes.object.isRequired,
    onInputChecked: PropTypes.func.isRequired
};

const defaultProps = {
    name: '',
    color: 0,
    streams: {name: '', color: 0},
    onInputChecked: () => new Error('no prop')
};

const Controls = prop => {
    return (
        <div className='group'>
            <div className='header'>
                <div className="screen_buttons">
                </div>
                <div className={`diode floatl active color-${prop.color}`}/>
                <div className="object_name floatl">{prop.name}</div>
                <div style={{clear: 'both'}}/>
            </div>
            <div className='items'>
                {prop.streams.map(stream =>
                    <Stream key={stream.name}
                            node={prop.name}
                            onInputChecked={prop.onInputChecked}
                            {...stream}/>
                )}
            </div>
        </div>
    );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;