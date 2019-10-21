import React from 'react';
import Presenter from './presenter';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {};

const container = props => {

    // const handleMouseDownDivider = e => {
    //     e.preventDefault();
    //     const mouseMoveEvent = e => setNavigationWidth(Math.min(e.clientX, 500));
    //     const mouseUpEvent = () => {
    //         document.getElementById('root').removeEventListener('mousemove', mouseMoveEvent);
    //         document.getElementById('root').removeEventListener('mouseup', mouseUpEvent);
    //     };
    //
    //     document.getElementById('root').addEventListener('mousemove', mouseMoveEvent);
    //     document.getElementById('root').addEventListener('mouseup', mouseUpEvent);
    // };

    return (
        <Presenter />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;