import React, { useState } from 'react';
import Presenter from './presenter';

const propTypes = {};

const defaultProps = {};

const container = () => {
    const [navWidth, setNavWidth] = useState(250);

    const handleDragDivider = e => {
        e.preventDefault();
        if(!e.pageX || e.pageX <= 0) return;
        const minMaxWidth = Math.max(50, Math.min(e.clientX, 500));
        setNavWidth(minMaxWidth);
    };

    return (
        <Presenter
            handleDragDivider={handleDragDivider}
            navWidth={navWidth}
        />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;