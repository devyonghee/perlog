import React, {useState, useLayoutEffect} from 'react';
import Presenter from './presenter';
import {createMuiTheme} from "@material-ui/core/styles";
import {lightBlue, red} from "@material-ui/core/colors";
import {ThemeProvider} from '@material-ui/styles';

const propTypes = {};

const defaultProps = {};

const container = props => {
    const [themeType, setThemeType] = useState('light');
    const [navigationWidth, setNavigationWidth] = useState(240);

    useLayoutEffect(() => {
        window.ipcRenderer.on('changeThemes', (e, type) => setThemeType(type));
    });

    const handleDivider = e => {
        e.preventDefault();
        const mouseMoveEvent = e => setNavigationWidth(e.clientX);
        const mouseUpEvent = () => {
            document.getElementById('root').removeEventListener('mousemove', mouseMoveEvent);
            document.getElementById('root').removeEventListener('mouseup', mouseUpEvent)
        };

        document.getElementById('root').addEventListener('mousemove', mouseMoveEvent);
        document.getElementById('root').addEventListener('mouseup', mouseUpEvent);
    };


    const theme = createMuiTheme({
        palette: {
            primary: lightBlue,
            secondary: red,
            background: {
                paper: 'white'
            },
            type: themeType
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
            handleDivider={handleDivider}
            theme={{...theme, navigationWidth, footerHeight: 50}}
        />
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;