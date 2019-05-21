import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import NewFileForm from "../NewFileForm";
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import themes from './themes';

const presenter = (props) => {
    return (
        <MuiThemeProvider theme={themes}>
            <CssBaseline/>
            <Navigator/>
            <Screen/>
            {props.openNewFileForm ? <NewFileForm/> : null}
        </MuiThemeProvider>
    );
};

export default presenter;
