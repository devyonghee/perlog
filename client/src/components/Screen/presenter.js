import React, {useRef} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import RootRef from '@material-ui/core/RootRef';


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
    const {messages, screenRef} = props;
    const classes = useStyles();

    return (
        <RootRef rootRef={screenRef}>
            <Paper className={classes.paper} elevation={2}>
                {
                    messages.map(({file, message}, index) => (
                        <div className={classes.message} key={index}>
                            <Typography inline
                                        className={classNames(classes.name, classes[`fileName${file.color}`])}>{file.route}</Typography>
                            <Typography inline className={classes.contents}>{message}</Typography>
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