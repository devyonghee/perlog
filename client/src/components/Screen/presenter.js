import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
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
    const regexp = new RegExp(filterString, 'gi');

    return (
        <RootRef rootRef={screenRef}>
            <Paper className={classes.paper} elevation={2}>
                <div className={classes.search} style={!!filterString ? {display: 'block'} : null}>
                    <div className={classes.searchIcon} children={<SearchIcon/>}/>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{
                            'aria-label': 'Search',
                            onChange: handleFilterStringChange,
                            value: filterString
                        }}
                    />
                </div>
                {
                    messages.map(({file, message}, index) => {
                        if (!!filterString && !regexp.test(message)) return null;

                        return (
                            <div className={classes.message} key={index}>
                                <Typography inline
                                            className={classNames(classes.name, classes[`fileName${file.color}`])}>{file.route}</Typography>
                                <Typography inline className={classes.contents}>
                                    {!!filterString ?
                                        <HighLighter regexp={regexp}>{message}</HighLighter> :
                                        message
                                    }
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