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

const presenter = props => {
    const {
        messages,
        screenRef,
        filter,
        copied,
        handleCopyClick,
        initialCopiedState,
    } = props;

    const classes = useStyles();

    return (
        <>
            <RootRef rootRef={screenRef}>
                <Paper className={classes.paper} elevation={2}>
                    {
                        messages
                            .filter(message => (!filter || message.message.includes(filter.source)))
                            .map((data, index) => (
                                <div onMouseEnter={initialCopiedState}
                                     onMouseLeave={initialCopiedState}
                                     className={classes.message}
                                     key={index}
                                >
                                    <Typography style={{ color: data.color[500] }}
                                                className={classes.name}>{data.name}</Typography>

                                    <Typography className={classes.contents}>
                                        {data.message.split('\n').map((line, index) => (
                                            <Fragment key={index}>
                                                <HighLighter regexp={filter}>
                                                    {line}
                                                </HighLighter><br/>
                                            </Fragment>)
                                        )}
                                    </Typography>

                                    <Button variant='outlined' size='small' onClick={handleCopyClick(data.message)} className={classes.copyBtn}>
                                        {copied ? 'copied' : 'copy'}
                                    </Button>
                                </div>
                            ))
                    }
                </Paper>
            </RootRef>
        </>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;