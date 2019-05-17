import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import styles from "./themes";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {cyan, red, green} from "@material-ui/core/colors";

const themes = createMuiTheme({
    palette: {
        primary: cyan,
        secondary: green,
        error: red,
        background:{
            paper:'white'
        }
    },
    type: 'white',
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
    }
});

const presenter = ({}) => {

    return (
        <MuiThemeProvider theme={themes}>
            <CssBaseline/>
            <Navigator/>
            <Screen/>
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(presenter);
