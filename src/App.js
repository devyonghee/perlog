import React from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Home from './components/Home';

const App = () => {
    const theme = createMuiTheme({
        palette: {
            background: {
                paper: '#2B2B2B',
                default: '#333333'
            },
            text: {
                primary: '#ffffff',
                secondary: '#00cc00',
                disabled: '#909090'
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
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Home/>
        </ThemeProvider>
    );
};

export default App;