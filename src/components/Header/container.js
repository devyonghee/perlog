import React from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
    openNewServer: PropTypes.func.isRequired
};

const container = props => {
    const { openNewServer } = props;

    const handleClickNewServerBtn = (e) => {
        e.preventDefault();
        openNewServer();
    };

    return (
        <Presenter
            handleClickNewServerBtn={handleClickNewServerBtn}
        />
    );
};

container.propTypes = propTypes;

export default container;