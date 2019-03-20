import React, {useReducer, useEffect} from 'react';
import {nodeReducer, messageReducer, actions} from '../../store';
import Controls from "../Controls";
import Message from "../Message";
import StatusBar from "../StatusBar";
import Navigator from "../Navigator";
import Header from '../Header';
import io from 'socket.io-client';
import styles from './styles.module.scss';
import CssBaseline from '@material-ui/core/CssBaseline';



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

    const onInputChecked = (socket, type, ...args) => socket.emit('data', type, ...args);
    // const connectHost = (nodeName, host) => {
    //     const socket = io.connect(host, {
    //         'reconnection': true,
    //         'reconnectionDelay': 1000,
    //         'reconnectionAttempts': 2
    //     });
    //
    //     socket.on('connect', () => nodesDispatch({type: actions.ADD_NODE, socket, nodeName, host}));
    //     socket.on('reconnect_failed', () => nodesDispatch({type: actions.REMOVE_NODE, nodeName}));
    //     socket.on('@watched', path => nodesDispatch({type: actions.TOGGLE_WATCH, nodeName, path, watch: true}));
    //     socket.on('@forgotten', path => nodesDispatch({type: actions.TOGGLE_WATCH, nodeName, path, watch: false}));
    //     socket.on('@log', (path, log) => messageDispatch({type: actions.ADD_MESSAGE, nodeName, path, message: log}));
    //     socket.on('@error', (path, message) => {
    //         alert(message);
    //         nodesDispatch({type: 'toggleWatch', nodeName, path, watch: false});
    //     });
    // };

    // useEffect(() => {
    //     connectHost('pdev2', 'http://localhost:50000');
    // }, []);

    return (
        <div className={styles.app}>
            <CssBaseline/>
            <Header />
            <Navigator/>
            <div className={styles.control}>
                <div className={styles.object_controls}>
                    <input type='text' className={styles.filter} onKeyUp={onKeyUp}/>
                    <div className={styles.groups} style={{height: '898px'}}>
                        <div>
                            {nodes.map(node => <Controls key={node.name}
                                                         onInputChecked={onInputChecked} {...node}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.screens}>
                <div>
                    <div className={styles.screen}>
                        <div className={styles.controls}>
                            <a>clear</a>
                            <a className={styles.filter}>filter <input type="text" placeholder='Filter...'/></a>
                        </div>
                        <div className={styles.messages} style={{height: "918px"}}>
                            <div className={styles.message}>
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
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <StatusBar messages={messages.length}
                           streams={nodes.reduce((sum, {streams}) => sum + streams.length, 0)}
                           nodes={nodes.length}
                />
            </div>
        </div>
    );
};

export default App;