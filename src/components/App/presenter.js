import React from 'react';
import Navigator from "../Navigator";
import Screen from "../Screen";
import StatusBar from "../StatusBar";
import ConnectForm from "../ConnectForm";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import {ThemeProvider} from '@material-ui/styles';
import Slide from '@material-ui/core/Slide';

const propTypes = {
    theme: PropTypes.object.isRequired,
    handleMouseDownDivider: PropTypes.func.isRequired,
    hasSocket: PropTypes.bool,
};

const defaultProps = {hasSocket: false};

const presenter = props => {
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            {props.hasSocket ?
                <Slide direction="up" style={{display: 'unset'}} in={props.hasSocket} mountOnEnter unmountOnExit>
                    <div>
                        <Navigator/>
                        <Divider onMouseDown={props.handleMouseDownDivider} style={{
                            position: 'absolute',
                            height: '100vh',
                            width: '2px',
                            left: props.theme.navigationWidth,
                            cursor: 'w-resize',
                            zIndex: '1'
                        }}/>
                        <div style={{
                            width: `calc(100vw - ${props.theme.navigationWidth}px)`,
                            padding: '16px',
                            float: 'right',
                        }}>
                            <Screen/>
                            <StatusBar/>
                        </div>
                    </div>
                </Slide> :
                <ConnectForm/>}
        </ThemeProvider>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;
