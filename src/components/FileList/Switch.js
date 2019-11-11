import { Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        margin: 0,
        display: 'flex',
    },

    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },

    track: {
        borderWidth: `1px`,
        borderStyle: `solid`,
        borderColor: ({ customcolor }) => customcolor[500],
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },

    checked: {
        '& + $track': {
            backgroundColor: ({ customcolor }) => customcolor[500],
        },
    },

    switchBase: {
        padding: 2,
        color: ({ customcolor }) => customcolor[300],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: ({ customcolor }) => customcolor[500],
                borderColor: ({ customcolor }) => customcolor[500],
            },
        },
    },
}))(Switch);

export default CustomSwitch;