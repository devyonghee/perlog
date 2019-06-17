import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string
};

const defaultProps = {
    color: 'red',
};


const HighLighter = props => {
    const {
        regexp,
        children,
        color
    } = props;

    if (typeof children !== "string") return null;

    const splitText = children.split(regexp);
    const matchText = children.match(regexp);

    if (splitText.length === 1) return children;
    return splitText.map((text, index) => {
        if (index === 0 || !matchText[index - 1]) return text;
        return (
            <Fragment key={index}>
                <span style={{textShadow: `${color} -1px -1px 1px`}}>{matchText[index - 1]}</span>
                {text}
            </Fragment>
        )
    });
};

HighLighter.propTypes = propTypes;
HighLighter.defaultProps = defaultProps;

export default HighLighter;