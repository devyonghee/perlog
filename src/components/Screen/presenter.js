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
        messages, screenRef,
        filterString,
        handleFilterStringChange,
    } = props;
    const classes = useStyles();
    const regexp = !!filterString ? new RegExp(filterString, 'gi') : null;

    return (
        <RootRef rootRef={screenRef}>
            <Paper className={classes.paper} elevation={2}>
                {
                    messages.map(({file, message}, index) => {
                        if (!!regexp && !regexp.test(message)) return null;

                        return (
                            <div className={classes.message} key={index}>
                                <Typography inline
                                            className={classes.name}>{file.route}</Typography>
                                <Typography inline className={classes.contents}>
                                    {message.split('\n').map((line, index) => (
                                        <Fragment key={index}>
                                            <HighLighter regexp={regexp}>{line}</HighLighter><br/>
                                        </Fragment>)
                                    )}
                                </Typography>
                            </div>
                        )
                    })
                }
            </Paper>
        </RootRef>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;