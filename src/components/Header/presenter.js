import React from 'react';
import useStyle from './styles';
import { AppBar, Button, Toolbar, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';

const propTypes = {
    handleClickNewServerBtn: PropTypes.func.isRequired
};

const defaultProps = {};

const CustomToolbar = withStyles(() => ({ root: { backgroundColor: '#ffffff' } }))(Toolbar);
const presenter = props => {
    const {
        filterString,
        handleTextChange,
        handleClickNewServerBtn
    } = props;

    const classes = useStyle();

    return (
        <AppBar position='relative' elevation={0} className={classes.root}>
            <CustomToolbar variant='dense'>
                <Button variant="outlined" size='small' disableFocusRipple onClick={handleClickNewServerBtn}>
                    <AddCircleOutlineIcon className={classes.plusIcon} fontSize='small'/>
                    Connect Server
                </Button>

                <Box className={classes.search}>
                    <SearchIcon className={classes.searchIcon}/>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{
                            'aria-label': 'Search',
                            onChange: handleTextChange,
                            value: filterString
                        }}
                    />
                </Box>
            </CustomToolbar>
        </AppBar>
    );
};

presenter.propTypes = propTypes;
presenter.defaultProps = defaultProps;

export default presenter;