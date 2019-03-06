import React from 'react';

const Stream = ({node, path, color, onChange, watch = false}) => {
    return (
        <div className='item'>
            <div className="screen_buttons">
                <input type='checkbox'
                       onChange={onChange}
                       checked={watch}
                       />
            </div>
            <div className={`diode floatl color${color}`}/>
            <div className={`object_name floatl color${color}`}>{path}</div>
            <div style={{clear: 'both'}}/>
        </div>
    );
};

export default Stream;