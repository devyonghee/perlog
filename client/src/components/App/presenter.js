import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import NewFileForm from "../NewFileForm";
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import themes from './themes';

const presenter = (props) => {

    return (
        <ThemeProvider theme={{...themes, type:props.themeType}}>
            <CssBaseline/>
            <Navigator/>
            <Screen/>
            {props.openNewFileForm ? <NewFileForm/> : null}
        </ThemeProvider>
    );
};

export default presenter;
