import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import themes from './themes';

const propTypes = {
    themeType: PropTypes.string
};

const defaultProps = {
    themeType: 'light'
};


const presenter = props => {
    return (
        <ThemeProvider theme={{...themes, type: props.themeType}}>
            <CssBaseline/>
            <Navigator/>
            <Screen/>
        </ThemeProvider>
    );
};

export default presenter;
