import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {ThemeProvider} from '@material-ui/styles';

const propTypes = {
    theme: PropTypes.object.isRequired
};

const defaultProps = {};


const presenter = props => {
    return (
        <ThemeProvider theme={props.theme}>
            <Grid container spacing={2}>
                <CssBaseline/>
                <Grid item xs={3}>
                    <Navigator/>
                </Grid>
                <Grid item xs={9}>
                    <Screen/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default presenter;
