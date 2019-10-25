import React, {Fragment} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import RootRef from '@material-ui/core/RootRef';
import HighLighter from "../Highlighter";


const propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            file: PropTypes.shape({
                color: PropTypes.number.isRequired,
                route: PropTypes.string.isRequired,
            }).isRequired,
        })
    ),
    screenRef: PropTypes.object,
};

const defaultProps = {
    messages: [],
};

const presenter = (props) => {
    const {
        messages,
        screenRef,
        filter,
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
                                <Typography className={classes.contents}>
                                    {message.message.split('\n').map((line, index) => (
                                        <Fragment key={index}>
                                            <HighLighter regexp={filter}>{line}</HighLighter><br/>
                                        </Fragment>)
                                    )}
                                </Typography>
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