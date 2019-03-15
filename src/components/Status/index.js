import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};

const Status = ({name = '', value = 0}) => (
    <div className="stat">
        <span className="num">{value}</span>
        <span className="label">{name}</span>
    </div>
);

Status.propTypes = propTypes;

export default Status;