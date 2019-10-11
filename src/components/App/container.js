import React, { useState, useLayoutEffect } from 'react';
import Presenter from './presenter';
import { createMuiTheme } from '@material-ui/core/styles';
import { getServer } from 'src/modules/storage';
import PropTypes from 'prop-types';

const ipcRenderer = window.require('electron').ipcRenderer;

const propTypes = {
    connect: PropTypes.func.isRequired
};

const defaultProps = {};

const container = props => {
    const { connect } = props;
    const [themeType, setThemeType] = useState('light');
    const [navigationWidth, setNavigationWidth] = useState(240);

    useLayoutEffect(() => {
        ipcRenderer.send('initThemeType');
        ipcRenderer.on('changeThemes', (e, type) => {
            setThemeType(type);
        });

        const server = getServer();
        if (server.url && server.token) connect(server.url, server.token);
    }, []);

    const handleMouseDownDivider = e => {
        e.preventDefault();
        const mouseMoveEvent = e => setNavigationWidth(Math.min(e.clientX, 500));
        const mouseUpEvent = () => {
            document.getElementById('root').removeEventListener('mousemove', mouseMoveEvent);
            document.getElementById('root').removeEventListener('mouseup', mouseUpEvent);
        };

        document.getElementById('root').addEventListener('mousemove', mouseMoveEvent);
        document.getElementById('root').addEventListener('mouseup', mouseUpEvent);
    };

    const theme = createMuiTheme({
        palette: {
            type: themeType,
            background: {
                paper: (themeType === 'dark') ? '#2B2B2B' : '#ffffff',
                default: (themeType === 'dark') ? '#333333' : '#ffffff'
            },
            text: {
                primary: (themeType === 'dark') ? '#ffffff' : '#000000',
                secondary: (themeType === 'dark') ? '#00cc00' : '#000000',
                disabled: (themeType === 'dark') ? '#909090' : '#989898'
            }
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            fontWeightMedium: 500,
            useNextVariants: true,
        }
    });

    return (
        <Presenter
            {...props}
            theme={{ ...theme, navigationWidth, footerHeight: 30 }}
            handleMouseDownDivider={handleMouseDownDivider}
        />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;

export default container;