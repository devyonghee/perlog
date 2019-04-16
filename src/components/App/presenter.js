import React from 'react';
import Navigator from "../Navigator";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from "@material-ui/core";
import styles from "./styles";


const presenter = ({classes}) => {

    // const onInputChecked = (socket, type, ...args) => socket.emit('data', type, ...args);
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
        <div>
            <CssBaseline/>
            <Navigator/>
            <div>
                <div>
                    <input type='text' className={styles.filter}/>
                    <div style={{height: '898px'}}>
                        <div>
                            {/*{nodes.map(node => <Controls key={node.name}*/}
                            {/*onInputChecked={onInputChecked} {...node}/>)}*/}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <button>clear</button>
                            <button>filter <input type="text" placeholder='Filter...'/></button>
                        </div>
                        <div>
                            <div>
                                {/*{*/}
                                {/*messages.map((message, index) => {*/}
                                {/*const node = nodes.find(({name}) => name === message.nodeName) || {*/}
                                {/*streams: [],*/}
                                {/*name: message.nodeName,*/}
                                {/*color: 1*/}
                                {/*};*/}
                                {/*const stream = node.streams.find(({path}) => path === message.path) || {*/}
                                {/*name: message.path.split('/').pop(),*/}
                                {/*color: 2*/}
                                {/*};*/}
                                {/*return (<Message key={index} node={node} stream={stream}*/}
                                {/*message={message.message}/>);*/}
                                {/*})*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(presenter);
