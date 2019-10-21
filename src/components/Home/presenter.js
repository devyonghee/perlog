import React from 'react';
import Navigator from '../Navigator';
import Screen from '../Screen';
import StatusBar from '../StatusBar';
import Header from '../Header';
import NewServerForm from '../NewServerForm';
import NewFileForm from '../NewFileForm';
import LoginForm from '../LoginForm';
import { Box, Container } from '@material-ui/core';
import useStyles from './styles';

const propTypes = {};

const defaultProps = { hasSocket: false };

const presenter = props => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Header/>
            <Container className={classes.container}>
                <Navigator/>
                <Box className={classes.screenBox}>
                    <Screen/>
                    <StatusBar/>
                </Box>
            </Container>
            <NewServerForm/>
            <NewFileForm/>
            <LoginForm/>
        </Box>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;
