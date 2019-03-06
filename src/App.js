import './log.css';
import React, {useState, useEffect, useReducer} from 'react';
import Controls from "./components/Controls";
import LogScreen from "./components/LogScreen";
import StatusBar from "./components/StatusBar";
import io from 'socket.io-client';

const nodeReducer = (nodes, action) => {
    switch (action.type) {
        case'addNode':
            if (nodes.hasOwnProperty(action.nodeName)) return nodes;
            return {
                ...nodes,
                [action.nodeName]: {
                    color: 1,
                    streams: {},
                    host: action.host,
                    request: (type, ...args) => action.socket.emit('data', type, ...args),
                }
            };
        case'removeNode':
            !!nodes[action.nodeName] && delete nodes[action.nodeName];
            return {...nodes};
        case'addStream':
            if (!nodes.hasOwnProperty(action.nodeName) || nodes[action.nodeName].streams.hasOwnProperty(action.streamName)) return nodes;
            nodes[action.nodeName].streams[action.streamName] = {
                path: action.path,
                color: 2,
                watch: false,
            };
            return {...nodes};
        case'removeStream':
            if (nodes.hasOwnProperty(action.nodeName) && nodes[action.nodeName].streams.hasOwnProperty(action.streamName))
                delete nodes[action.streamName].streams[action.streamName];
            return {...nodes};
        case 'toggleWatch':
            if (nodes.hasOwnProperty(action.nodeName) && nodes[action.nodeName].streams.hasOwnProperty(action.streamName))
                nodes[action.streamName].streams[action.streamName].watch = action.watch;
            return {...nodes};
    }
};


const App = () => {
    const [initRender, setInitRender] = useState(false);
    const [nodes, nodesDispatch] = useState(nodeReducer, {});

    const onKeyUp = e => {
        if (e.key.toLowerCase() === 'enter' && !!e.target.value) {
            // nodesDispatch({type: 'addStream', nodeName : 'pdev2', streamName: e.target.value, path: e.target.value});
            nodesDispatch({type: 'removeNode', nodeName: 'pdev2'});
            e.target.value = '';
        }
    };

    const connectHost = (nodeName, host) => {
        const socket = io.connect(host, {
            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionAttempts': 2
        });

        socket.on('connect', () => nodesDispatch({type: 'addNode', socket, nodeName, host}));
        socket.on('reconnect_failed', () => nodesDispatch({type: 'removeNode', nodeName}));
        socket.on('@watched', path => nodesDispatch({type: 'toggleWatch', nodeName, path, watch: true}));
        socket.on('@forgotten', path => nodesDispatch({type: 'toggleWatch', nodeName, path, watch: false}));
        socket.on('@log', (path, log) => nodesDispatch({type: 'message', nodeName, path}));
        socket.on('@error', (path, message) => {
            alert(message);
            nodesDispatch({type: 'toggleWatch', nodeName, path, watch: false});
        });
    };

    useEffect(() => {
        if (initRender) {
            connectHost('pdev2', 'http://localhost:50000');
        }
    }, initRender);

    return (
        <div className='app'>
            <div id='log_controls'>
                <a className="select_mode active">Nodes</a>
                <div id='log_control_nodes' className='object_controls'>
                    <input type='text' className='filter' onKeyUp={onKeyUp}/>
                    <div className='groups' style={{height: '898px'}}>
                        <div className='items'>
                            {Object.entries(nodes).map(([nodeName, node], index) => <Controls key={index}
                                                                                              name={nodeName} {...node}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <div id='log_screens' style={{width: '1047px'}}>
                <div className='log_screens'>
                    {/*<LogScreen messages={}/>*/}
                </div>
                {/*<StatusBar messagesCount={message.length} streamsCount={this.props.streams.length} nodesCount={this.props.nodes.length}/>*/}
            </div>
        </div>
    );
};

export default App;