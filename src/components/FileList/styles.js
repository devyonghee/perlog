import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: '2px',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0, 0.08)',
        },
        paddingLeft: ({ depth }) => `${(theme.spacing(3)) * (depth)}px !important`,
        height: ({ dense }) => dense ? '25px' : '45px',
    },
    iconWrap: {
        alignItems: 'center',
        marginRight: '0'
    },

    iconPadding: {
        paddingLeft: '24px',
    },

    arrowIcon: {
        cursor: 'pointer',
    },

    iconMargin: {
        margin: 'auto 0px',
        height: ({ dense }) => dense ? theme.spacing(2) : 'auto',
    },

    arrowMargin: {
        marginLeft: '23px'
    },

    textList: {
        overflow: 'hidden',
        width: '100px',
        userSelect: 'none',
    },

    emptyText: {
        paddingLeft: ({ depth }) => `${(theme.spacing(3) * depth) + 56}px !important`,
        height: ({ dense }) => dense ? '25px' : '45px',
    },

    switchRoot: {
        padding: 0,
        margin: 0,
    },
}));

export default useStyles;