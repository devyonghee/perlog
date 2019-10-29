import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const propTypes = {
    color: PropTypes.string,
    regexp: PropTypes.instanceOf(RegExp),
};

const defaultProps = {
    regexp: null,
};

const useStyles = makeStyles(() => ({
    shadow: {
        textShadow: `red -1px -1px 1px`
    }
}));

const HighLighter = props => {
    const {
        regexp,
        children,
    } = props;

    const classes = useStyles();

    if (!regexp) return children;
    if (typeof children !== 'string') return null;

    const splitText = children.split(regexp);
    const matchText = children.match(regexp);

    if (splitText.length === 1) return children;
    return splitText.map((text, index) => {
        if (index === 0 || !matchText[index - 1]) return text;
        return (
            <Fragment key={index}>
                <span className={classes.shadow}>{matchText[index - 1]}</span>
                {text}
            </Fragment>
        );
    });
};

HighLighter.propTypes = propTypes;
HighLighter.defaultProps = defaultProps;

export default HighLighter;