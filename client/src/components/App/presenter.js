import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import FileModal from "../FileModal";
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import themes from './themes';

const presenter = (props) => {
    return (
        <MuiThemeProvider theme={themes}>
            <CssBaseline/>
            <Navigator/>
            <Screen/>
            {props.openFileAddModal ? <FileModal/> : null}
        </MuiThemeProvider>
    );
};

export default presenter;
