import React from 'react';
import Stream from "../Stream";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

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
            <div className='items'>
                {prop.streams.map(stream =>
                    <Stream key={stream.name}
                            node={prop.name}
                            onInputChecked={prop.onInputChecked}
                            {...stream}/>
                )}
            </div>
    );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;