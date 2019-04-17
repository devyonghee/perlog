import React, {Component} from 'react';
import Presenter from './presenter';
import io from 'socket.io-client'

const propTypes = {};

const defaultProps = {};

const container = class extends Component {
    componentDidMount() {
        // const socket = io.connect('http://localhost:50000');
        // socket.on('connect', () => {
        //     socket.emit('connected', 'shiw111');
        //     socket.emit('watch', 'D:/test.txt');
        // });
        //
        // socket.on('log', (path, log) => console.log(path, log));
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