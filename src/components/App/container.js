import React, {Component} from 'react';
import Presenter from './presenter';

const propTypes = {};

const defaultProps = {};

const container = class extends Component {
    render() {
        return (
            <Presenter/>
        );
    }
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;