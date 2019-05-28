import React, {useState, useEffect} from 'react';
import Presenter from './presenter';
import {createMuiTheme} from "@material-ui/core/styles";
import {lightBlue, red} from "@material-ui/core/colors";
import {ThemeProvider} from '@material-ui/styles';

const propTypes = {};

const defaultProps = {};

const container = props => {
    const [themeType, setThemeType] = useState('light');

    useEffect(() => {
        window.ipcRenderer.on('changeThemes', (e, type) => setThemeType(type));
    }, []);


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
        <ThemeProvider theme={theme}>
            <Presenter/>
        </ThemeProvider>
    );
};

container.propTypes = propTypes;
container.defaultProps = defaultProps;


export default container;