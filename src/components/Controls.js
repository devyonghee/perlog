import React from 'react';
import Stream from "./Stream";

const Controls = ({color, name, request, streams}) => {
    const onChange = (path, watch = false) => {
        watch ? request('watch', path) : request('forget', path);
    };

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
                {Object.entries(streams).map(([streamName, stream], index) =>
                    <Stream key={index}
                            onChange={e => {
                                e.preventDefault();
                                onChange(stream.path, !stream.watch)
                            }}
                            node={name}
                            name={streamName} {...stream}/>
                )}
            </div>
        </div>
    );
};

export default Controls;