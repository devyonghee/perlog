import React, { useState } from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    openNewServer: PropTypes.func.isRequired
};

const container = props => {
    const { openNewServer, setFilter } = props;
    const [filterString, setFilterString] = useState('');

    const handleClickNewServerBtn = e => {
        e.preventDefault();
        openNewServer();
    };

    const handleTextChange = e => {
        e.preventDefault();
        const value = e.currentTarget.value.replace(/\\/g, '');
        setFilterString(e.currentTarget.value);
        setFilter(value ? new RegExp(value) : null);
    };

    return (
        <Presenter
            filterString={filterString}
            handleTextChange={handleTextChange}
            handleClickNewServerBtn={handleClickNewServerBtn}
        />
    );
};

container.propTypes = propTypes;

export default container;