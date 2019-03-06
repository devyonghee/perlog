import React from 'react';

const Stat = ({name = '', value = 0}) => (
    <div className="stat">
        <span className="num">{value}</span>
        <span className="label">{name}</span>
    </div>
);

export default Stat;