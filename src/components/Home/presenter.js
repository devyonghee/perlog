import React from 'react';
import Navigator from '../Navigator';
import Screen from '../Screen';
import StatusBar from '../StatusBar';
import Header from '../Header';
import NewServerForm from '../NewServerForm';
import NewFileForm from '../NewFileForm';
import LoginForm from '../LoginForm';
import PropTypes from 'prop-types';
import { Box, Container, Divider } from '@material-ui/core';
import useStyles from './styles';

const propTypes = {
    navWidth: PropTypes.number.isRequired,
    handleDragDivider: PropTypes.func.isRequired
};

const defaultProps = { hasSocket: false };

const presenter = props => {
    const { navWidth, handleDragDivider } = props;
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Header/>
            <Container className={classes.container}>
                <Navigator width={navWidth}/>
                <Divider draggable onDrag={handleDragDivider} onDragOver={e=>e.preventDefault()} className={classes.divider}/>
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
