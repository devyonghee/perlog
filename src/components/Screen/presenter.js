import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, RootRef, Typography } from '@material-ui/core';
import useStyles from './styles';
import HighLighter from '../Highlighter';

const propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            color: PropTypes.object.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    filter: PropTypes.object
};

const defaultProps = {
    messages: [],
};

const presenter = (props) => {
    const {
        messages,
        screenRef,
        filter,
        handleMessageClick
    } = props;

    const classes = useStyles();

    return (
        <RootRef rootRef={screenRef}>
            <Paper className={classes.paper} elevation={2}>
                {
                    messages
                        .filter(message => (!filter || filter.test(message.message)))
                        .map((message, index) => (
                            <div className={classes.message} key={index}>
                                <Typography style={{ color: message.color[500] }}
                                            className={classes.name}>{message.name}</Typography>
                                <Button classes={{ root: classes.contentsRoot, label: classes.contentsLabel }}
                                        onClick={handleMessageClick}
                                        disableFocusRipple>
                                    {message.message.split('\n').map((line, index) => (
                                        <Fragment key={index}>
                                            <HighLighter regexp={filter}>
                                                {line}
                                            </HighLighter><br/>
                                        </Fragment>)
                                    )}
                                </Button>
                            </div>
                        ))
                }
            </Paper>
        </RootRef>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;