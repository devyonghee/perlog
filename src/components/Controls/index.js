import React from 'react';
import Stream from "../Stream";
import PropTypes from "prop-types";

const propTypes = {
    node: PropTypes.object.isRequired,
    stream: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    onInputChecked : PropTypes.func.isRequired
};

const defaultProps = {
    nodes: {name: '', color: 0},
    streams: {name: '', color: 0},
    messages: '',
    onInputChecked: () => new Error('no prop')
};

const Controls = ({color, name, streams, request}) => {
    return (
        <div className='group'>
            <div className='header'>
                <div className="screen_buttons">
                </div>
                <div className={`diode floatl active color${color}`}/>
                <div className="object_name floatl">{name}</div>
                <div style={{clear: 'both'}}/>
            </div>
            <div className='items'>
                {streams.map(stream =>
                    <Stream key={stream.name}
                            request={request}
                            node={name}
                            {...stream}/>
                )}
            </div>
        </div>
    );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;