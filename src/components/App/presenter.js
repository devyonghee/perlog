import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from "@material-ui/core";
import styles from "./styles";


const presenter = ({classes}) => {
    return (
        <div>
            <CssBaseline/>
            <Navigator/>
            <Screen/>
        </div>
    );
};

export default withStyles(styles)(presenter);
