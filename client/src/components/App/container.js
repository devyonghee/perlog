import React, {Component} from 'react';
import Presenter from './presenter';

const propTypes = {};

const defaultProps = {};

const container = class extends Component {
    componentDidMount(){
        window.ipcRenderer.on('changeThemes', (e, type) => console.log(type))
    }

    render() {
        return (
            <Presenter/>
        );
    }
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;