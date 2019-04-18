import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";

const presenter = ({messages}) => {
    return (
        <div style={{'padding-left': '260px'}}>
            {
                messages.map(message => (
                    <div>
                        <span>{message.path}</span>
                        <span>{message.color}</span>
                        <span>{message.message}</span>
                    </div>

                ))
            }
        </div>
    );
};


export default withStyles(styles)(presenter);