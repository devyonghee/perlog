import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import StatusBar from "../StatusBar";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import {ThemeProvider} from '@material-ui/styles';

const propTypes = {
    theme: PropTypes.object.isRequired
};

const defaultProps = {};

const presenter = props => {
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            <Navigator/>
            <Divider onMouseDown={props.handleDivider} style={{
                position: 'absolute',
                height: '100vh',
                width: '2px',
                left: props.theme.navigationWidth,
                cursor: 'w-resize',
                zIndex: '1'
            }}/>
            <div style={{
                float: 'right',
                width: `calc(100vw - ${props.theme.navigationWidth}px)`,
                height: `100vh`
            }}>
                <Screen/>
                <StatusBar/>
            </div>
        </ThemeProvider>
    );
};

export default presenter;
