import './log.css';
import React, {useReducer, useEffect} from 'react';
import {nodeReducer, messageReducer, actions} from './store';
import Controls from "./components/Controls";
import Message from "./components/Message";
import StatusBar from "./components/StatusBar";
import io from 'socket.io-client';

const App = () => {
    const [nodes, nodesDispatch] = useReducer(nodeReducer, []);
    const [messages, messageDispatch] = useReducer(messageReducer, []);

    const onKeyUp = e => {
        if (e.key.toLowerCase() !== 'enter' || !e.target.value) return;

        const path = e.target.value;
        nodesDispatch({
            type: actions.ADD_STREAM,
            nodeName: 'pdev2',
            path
        });
        e.target.value = '';
    };


    const connectHost = (nodeName, host) => {
        const socket = io.connect(host, {
            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionAttempts': 2
        });

        socket.on('connect', () => nodesDispatch({type: actions.ADD_NODE, socket, nodeName, host}));
        socket.on('reconnect_failed', () => nodesDispatch({type: actions.REMOVE_NODE, nodeName}));
        socket.on('@watched', path => nodesDispatch({type: actions.TOGGLE_WATCH, nodeName, path, watch: true}));
        socket.on('@forgotten', path => nodesDispatch({type: actions.TOGGLE_WATCH, nodeName, path, watch: false}));
        socket.on('@log', (path, log) => messageDispatch({type: actions.ADD_MESSAGE, nodeName, path, message: log}));
        socket.on('@error', (path, message) => {
            alert(message);
            nodesDispatch({type: 'toggleWatch', nodeName, path, watch: false});
        });
    };
    connectHost.bind(messages);

    useEffect(() => {
        connectHost('pdev2', 'http://localhost:50000');
    }, true);

    return (
        <div className='app'>
            <div id='log_controls'>
                <a className="select_mode active">Nodes</a>
                <div id='log_control_nodes' className='object_controls'>
                    <input type='text' className='filter' onKeyUp={onKeyUp}/>
                    <div className='groups' style={{height: '898px'}}>
                        <div className='items'>
                            {nodes.map(node => <Controls key={node.name} {...node}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <div id='log_screens' style={{width: '1047px'}}>
                <div className='log_screens'>
                    <div className="log_screen">
                        <div className="controls">
                            <a className="clear">clear</a>
                            <a className="filter">filter <input type="text" placeholder='Filter...'/></a>
                        </div>
                        <div className="messages" style={{height: "918px"}}>
                            <div className="msg">
                                {
                                    messages.map((message, index) => {
                                        const node = nodes.find(({name}) => name === message.nodeName) || {
                                            streams: [],
                                            name: message.nodeName,
                                            color: 1
                                        };
                                        const stream = node.streams.find(({path}) => path === message.path) || {
                                            name: message.path.split('/').pop(),
                                            color: 2
                                        };
                                        return (<Message key={index} node={node} stream={stream}
                                                         message={message.message}/>);
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <StatusBar messagesCount={messages.length}
                           streamsCount={nodes.reduce((sum, {streams}) => sum + streams.length, 0)}
                           nodesCount={nodes.length}
                />
            </div>
        </div>
    );
};

export default App;